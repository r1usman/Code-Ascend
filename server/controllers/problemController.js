const Problem = require('../models/Problem');
const Solution = require('../models/Solution');
require('../models/Solution');


// (1) 
// Get all problems
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View all problems
exports.viewAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.render('problems', { problems });
  } catch (err) {
    console.error('Error fetching problems:', err);
    res.status(500).send('Internal Server Error');
  }
};

// (2) 
// Get problem by ID and populate solutions
exports.getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.problemId)
      .populate('solutions');

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    res.status(200).json(problem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// View problem by ID and populate solutions
exports.viewProblemById = async (req, res) => {
  try {
    const problemId = req.params.id;

    const problem = await Problem.findById(problemId).lean();
    const solutions = await Solution.find({ problem: problemId }).lean();

    if (!problem) {
      return res.status(404).send('Problem not found');
    }

    res.render('problem', { problem, solutions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};