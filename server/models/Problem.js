// models/Problem.js
const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  input: String,
  output: String,
  explanation: String
});

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
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Problem', problemSchema);