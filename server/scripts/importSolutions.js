// importSolutions.js
const mongoose = require('mongoose');
const fs = require('fs');
const Solution = require('../models/Solution');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://obaidullahpod:obaidpass@cluster0.jmmljb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Function to detect programming language from code
const detectLanguage = (code) => {
  // Remove escape characters for analysis
  const cleanCode = code.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  
  // C++ indicators
  if (cleanCode.includes('#include') || cleanCode.includes('cout') || cleanCode.includes('cin') || 
      cleanCode.includes('std::') || cleanCode.includes('vector<') || cleanCode.includes('endl')) {
    return 'cpp';
  }
  
  // Java indicators
  if (cleanCode.includes('public class') || cleanCode.includes('System.out') || 
      cleanCode.includes('Scanner') || cleanCode.includes('import java')) {
    return 'java';
  }
  
  // JavaScript indicators
  if (cleanCode.includes('console.log') || cleanCode.includes('let ') || 
      cleanCode.includes('const ') || cleanCode.includes('function') || cleanCode.includes('=>')) {
    return 'javascript';
  }
  
  // Python indicators (default for most competitive programming)
  if (cleanCode.includes('def ') || cleanCode.includes('import ') || 
      cleanCode.includes('print(') || cleanCode.includes('input()') || 
      cleanCode.includes('range(') || cleanCode.includes('for i in')) {
    return 'python';
  }
  
  // Default to python for competitive programming
  return 'python';
};

const importSolutions = async () => {
  try {
    console.log('Reading Solution.json file...');
    
    // Read Solution.json file
    const fileContent = fs.readFileSync('Solution.json', 'utf8');
    
    console.log('File content length:', fileContent.length);
    console.log('Parsing JSON...');
    
    // Parse the JSON array
    const rawSolutions = JSON.parse(fileContent);
    
    console.log('Successfully parsed JSON');
    console.log('Number of solutions found:', rawSolutions.length);
    
    // Validate that it's an array
    if (!Array.isArray(rawSolutions)) {
      throw new Error('Solution.json must contain an array of code strings');
    }
    
    // Create solution document
    const solutionDoc = {
      problemId: "Problem 1",
      problemName: "XYZ",
      solutions: rawSolutions.map((code, index) => ({
        code: code,
        language: detectLanguage(code),
        solutionNumber: index + 1
      })),
      createdAt: new Date()
    };

    console.log('Created solution document');
    
    // Log language distribution
    const languages = solutionDoc.solutions.reduce((acc, sol) => {
      acc[sol.language] = (acc[sol.language] || 0) + 1;
      return acc;
    }, {});
    console.log('Language distribution:', languages);

    console.log('Saving to MongoDB Atlas...');
    
    // Save to MongoDB
    const solution = new Solution(solutionDoc);
    await solution.save();
    
    console.log('✅ Solutions imported successfully!');
    console.log('📊 Total solutions imported:', rawSolutions.length);
    console.log('🆔 Problem ID:', solutionDoc.problemId);
    console.log('📝 Problem Name:', solutionDoc.problemName);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    
    if (error.name === 'SyntaxError') {
      console.error('JSON parsing failed. Please check your Solution.json format:');
      console.error('Expected format: ["code1", "code2", "code3", ...]');
    }
    
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB Atlas');
  importSolutions();
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 Disconnected from MongoDB Atlas');
});

// Handle process termination
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
});

console.log('🚀 Starting import process...');
console.log('📡 Connecting to MongoDB Atlas...');