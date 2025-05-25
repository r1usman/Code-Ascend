const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://obaidullahpod:obaidpass@cluster0.jmmljb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Example Schema (based on your requirements)
const exampleSchema = new mongoose.Schema({
  input: String,
  output: String,
  explanation: String
}, { _id: false });

// Problem Schema
const problemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: String,
  raw_tags: [String],
  tags: [String],
  description: String,
  input_format: String,
  output_format: String,
  examples: [exampleSchema],
  note: String,
  solutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution'
  }],
  createdAt: { type: Date, default: Date.now }
});

// Solution Schema
const solutionSchema = new mongoose.Schema({
  problem: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  code: { type: String, required: true },
  language: { type: String, required: true },
  solutionNumber: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Models
const Problem = mongoose.model('Problem', problemSchema);
const Solution = mongoose.model('Solution', solutionSchema);

class DataImporter {
  constructor() {
    this.basePath = './Format1'; // Adjust path as needed
    this.problemFolders = ['problem_1', 'problem_2', 'problem_6', 'problem_9', 'problem_15'];
  }

  async connectToMongoDB() {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  async readJsonFile(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const parsed = JSON.parse(data);
      console.log(`📄 Successfully read: ${path.basename(filePath)}`);
      return parsed;
    } catch (error) {
      console.error(`❌ Error reading file ${filePath}:`, error.message);
      return null;
    }
  }

  async processProblem(problemFolder) {
    console.log(`\n📁 Processing ${problemFolder}...`);
    
    const problemPath = path.join(this.basePath, problemFolder);
    
    try {
      // Check if directory exists
      await fs.access(problemPath);
    } catch (error) {
      console.error(`❌ Directory ${problemPath} not found`);
      return null;
    }

    // Read all required files
    const [metadataData, questionData] = await Promise.all([
      this.readJsonFile(path.join(problemPath, 'Metadata.json')),
      this.readJsonFile(path.join(problemPath, 'Question.json'))
    ]);

    if (!metadataData || !questionData) {
      console.error(`❌ Missing required files for ${problemFolder}`);
      return null;
    }

    // Debug: Log the actual file contents
    console.log(`📋 Metadata content:`, JSON.stringify(metadataData, null, 2));
    console.log(`📋 Question content keys:`, Object.keys(questionData));

    // Handle different possible field names in metadata
    const name = metadataData.name || 
                 metadataData.problemName || 
                 metadataData.title || 
                 metadataData.Name || 
                 problemFolder; // fallback to folder name

    // Handle null name field
    const finalName = (name === null || !name) ? problemFolder : name;
    console.log(`📝 Problem name: ${finalName} ${finalName === problemFolder ? '(using folder name)' : ''}`);

    // Helper function to parse string arrays
    const parseStringArray = (str) => {
      if (!str) return [];
      if (Array.isArray(str)) return str;
      if (typeof str === 'string') {
        try {
          // Handle string representations like "['tag1', 'tag2']"
          return JSON.parse(str.replace(/'/g, '"'));
        } catch (e) {
          // If parsing fails, split by comma
          return str.split(',').map(tag => tag.trim().replace(/['"[\]]/g, ''));
        }
      }
      return [];
    };

    // Create problem document with flexible field mapping
    const problemData = {
      name: finalName,
      difficulty: metadataData.difficulty || metadataData.Difficulty || 'Unknown',
      raw_tags: parseStringArray(metadataData.raw_tags),
      tags: parseStringArray(metadataData.tags),
      description: questionData.Description || questionData.description || '',
      input_format: questionData.Input || questionData.input || questionData.input_format || '',
      output_format: questionData.Output || questionData.output || questionData.output_format || '',
      examples: questionData.Examples || questionData.examples || [],
      note: questionData.Note || questionData.note || questionData.notes || ''
    };

    console.log(`📝 Problem data to save:`, {
      name: problemData.name,
      difficulty: problemData.difficulty,
      raw_tags: problemData.raw_tags,
      tags: problemData.tags,
      hasDescription: !!problemData.description,
      examplesCount: problemData.examples.length
    });

    // Save problem to database
    const problem = new Problem(problemData);
    const savedProblem = await problem.save();
    console.log(`✅ Saved problem: ${savedProblem.name}`);

    // Process solutions
    const solutionIds = [];
    for (let i = 1; i <= 4; i++) {
      const solutionPath = path.join(problemPath, `sol${i}.json`);
      const solutionData = await this.readJsonFile(solutionPath);
      
      if (solutionData) {
        const solution = new Solution({
          problem: savedProblem._id,
          code: solutionData.code,
          language: solutionData.language,
          solutionNumber: solutionData.solutionNumber || i
        });
        
        const savedSolution = await solution.save();
        solutionIds.push(savedSolution._id);
        console.log(`  ✅ Saved solution ${i} (${solutionData.language})`);
      } else {
        console.log(`  ⚠️  Solution ${i} not found or invalid`);
      }
    }

    // Update problem with solution references
    savedProblem.solutions = solutionIds;
    await savedProblem.save();
    
    console.log(`✅ Updated problem with ${solutionIds.length} solution references`);
    return savedProblem;
  }

  async importAllData() {
    try {
      await this.connectToMongoDB();
      
      console.log('🚀 Starting data import...');
      console.log(`📂 Processing ${this.problemFolders.length} problems`);

      const results = [];
      for (const problemFolder of this.problemFolders) {
        try {
          const result = await this.processProblem(problemFolder);
          if (result) {
            results.push(result);
          }
        } catch (error) {
          console.error(`❌ Error processing ${problemFolder}:`, error.message);
        }
      }

      console.log(`\n🎉 Import completed!`);
      console.log(`✅ Successfully imported ${results.length} problems`);
      console.log(`📊 Total solutions: ${results.reduce((sum, p) => sum + p.solutions.length, 0)}`);

      return results;
    } catch (error) {
      console.error('❌ Import failed:', error);
      throw error;
    } finally {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed');
    }
  }

  // Utility methods
  async inspectFiles(problemFolder) {
    console.log(`\n🔍 Inspecting files in ${problemFolder}...`);
    const problemPath = path.join(this.basePath, problemFolder);
    
    try {
      const files = await fs.readdir(problemPath);
      console.log(`📁 Files found: ${files.join(', ')}`);
      
      for (const file of ['Metadata.json', 'Question.json']) {
        const filePath = path.join(problemPath, file);
        const content = await this.readJsonFile(filePath);
        if (content) {
          console.log(`\n📄 ${file} structure:`);
          console.log(`   Keys: ${Object.keys(content).join(', ')}`);
          console.log(`   Content preview:`, JSON.stringify(content, null, 2).substring(0, 300) + '...');
        }
      }
    } catch (error) {
      console.error(`❌ Error inspecting ${problemFolder}:`, error.message);
    }
  }

  async clearDatabase() {
    console.log('⚠️  Clearing existing data...');
    await Problem.deleteMany({});
    await Solution.deleteMany({});
    console.log('✅ Database cleared');
  }

  async verifyData() {
    const problemCount = await Problem.countDocuments();
    const solutionCount = await Solution.countDocuments();
    
    console.log('\n📊 Database Summary:');
    console.log(`   Problems: ${problemCount}`);
    console.log(`   Solutions: ${solutionCount}`);
    
    // Show sample data
    const sampleProblem = await Problem.findOne().populate('solutions');
    if (sampleProblem) {
      console.log(`\n📝 Sample Problem: ${sampleProblem.name}`);
      console.log(`   Difficulty: ${sampleProblem.difficulty}`);
      console.log(`   Solutions: ${sampleProblem.solutions.length}`);
    }
  }
}

// Usage Examples
async function main() {
  const importer = new DataImporter();
  
  try {
    // Option 1: Inspect files first to see their structure
    // await importer.inspectFiles('problem_1');
    
    // Option 2: Clear database and import fresh data
    // await importer.clearDatabase();
    
    // Option 3: Import data (now this should work!)
    await importer.importAllData();
    
    // Option 4: Verify imported data
    // await importer.connectToMongoDB();
    // await importer.verifyData();
    // await mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ Main process failed:', error);
    process.exit(1);
  }
}

// Alternative: Inspect all problem files
async function inspectAllFiles() {
  const importer = new DataImporter();
  
  for (const problemFolder of importer.problemFolders) {
    await importer.inspectFiles(problemFolder);
  }
}

// Alternative: Import single problem
async function importSingleProblem(problemFolder) {
  const importer = new DataImporter();
  await importer.connectToMongoDB();
  
  try {
    await importer.processProblem(problemFolder);
  } finally {
    await mongoose.connection.close();
  }
}

// Run the import
if (require.main === module) {
  main();
}

module.exports = { DataImporter, Problem, Solution };

// =====================================
// SETUP INSTRUCTIONS
// =====================================

/*
1. Install dependencies:
   npm install mongoose

2. Update MongoDB connection string:
   - Replace MONGODB_URI with your actual MongoDB Atlas connection string
   - Format: mongodb+srv://username:password@cluster.mongodb.net/database_name

3. Adjust file paths:
   - Update basePath to point to your Format1 directory
   - Ensure problem folders exist: problem_1, problem_2, problem_6, problem_9, problem_15

4. File structure expected:
   Format1/
   ├── problem_1/
   │   ├── Metadata.json
   │   ├── Question.json
   │   ├── sol1.json
   │   ├── sol2.json
   │   ├── sol3.json
   │   └── sol4.json
   └── problem_2/
       ├── ...

5. JSON file formats:

   Metadata.json:
   {
     "name": "Problem Name",
     "difficulty": "Easy/Medium/Hard",
     "raw_tags": ["array", "sorting"],
     "tags": ["Array", "Sorting"]
   }

   Question.json:
   {
     "Description": "Problem description...",
     "Input": "Input format...",
     "Output": "Output format...",
     "Examples": [
       {
         "input": "sample input",
         "output": "sample output",
         "explanation": "explanation..."
       }
     ],
     "Note": "Additional notes..."
   }

   sol1.json:
   {
     "code": "def solution():\n    pass",
     "language": "python",
     "solutionNumber": 1
   }

6. Run the script:
   node script_name.js
*/