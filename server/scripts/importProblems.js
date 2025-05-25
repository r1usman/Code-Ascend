const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Problem = require('../models/Problem');

const MONGO_URI = 'mongodb+srv://obaidullahpod:obaidpass@cluster0.jmmljb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DATA_DIR = path.join(__dirname, '../Format1');

function generateFallbackName(dir, metadata, question) {
  const problemNumber = dir.replace('problem_', '');
  
  // Try various sources for the name
  if (question && question.Title) return question.Title;
  if (question && question.Name) return question.Name;
  if (question && question.Problem) return question.Problem;
  
  // Extract from description if available
  if (question && question.Description) {
    const firstLine = question.Description.split('\n')[0].trim();
    if (firstLine.length > 0 && firstLine.length < 100) {
      return firstLine;
    }
  }
  
  // Use directory name as last resort
  return `Problem ${problemNumber}`;
}

async function run() {
  await mongoose.connect(MONGO_URI);
  const dirs = fs.readdirSync(DATA_DIR).filter(dir => dir.startsWith('problem_'));

  let imported = 0;
  let skipped = 0;

  for (const dir of dirs) {
    const problemPath = path.join(DATA_DIR, dir);
    const metadataPath = path.join(problemPath, 'Metadata.json');
    const questionPath = path.join(problemPath, 'Question.json');

    if (!fs.existsSync(metadataPath) || !fs.existsSync(questionPath)) {
      console.warn(`Skipping ${dir}: Missing required files`);
      skipped++;
      continue;
    }

    try {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      const question = JSON.parse(fs.readFileSync(questionPath, 'utf8'));

      // Generate name if missing
      let problemName = metadata.name;
      if (!problemName || problemName.trim() === '') {
        problemName = generateFallbackName(dir, metadata, question);
        console.log(`Generated name for ${dir}: "${problemName}"`);
      }

      const problem = new Problem({
        name: problemName,
        difficulty: metadata.difficulty || 'Medium', // Default difficulty
        raw_tags: metadata.raw_tags || [],
        tags: metadata.tags || [],
        description: question.Description || '',
        input_format: question.Input || '',
        output_format: question.Output || '',
        examples: question.Examples || [],
        note: question.Note || '',
      });

      await problem.save();
      console.log(`✅ Imported: ${problemName}`);
      imported++;
      
    } catch (error) {
      console.error(`❌ Error processing ${dir}:`, error.message);
      skipped++;
    }
  }

  console.log(`\n📊 Summary: ${imported} imported, ${skipped} skipped`);
  mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  mongoose.disconnect();
});