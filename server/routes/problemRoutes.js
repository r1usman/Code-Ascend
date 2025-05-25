const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');

// (1)
// Get all problems
router.get('/', problemController.getAllProblems);
// View all problems
router.get('/view', problemController.viewAllProblems);


// (2) 
// Get problem by ID and populate solutions
router.get('/:problemId', problemController.getProblemById);
// View problem by ID and populate solutions
router.get('/view/:id', problemController.viewProblemById);  

module.exports = router;