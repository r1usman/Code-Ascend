require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const problemsRouter = require('./routes/problemRoutes');

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


// Routes
app.use('/problems', problemsRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ==================================================
// ==================================================
// ==================================================

/*
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const problemsRouter = require('./routes/problemRoutes');
const solutionsRouter = require('./routes/solutionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/problems', problemsRouter);
app.use('/problems', solutionsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

/*
=> problem_1, problem_2, problem_6, problem_9, problem_15

/Format1
  /problem_1
    /Metadata.json
    /Question.json
    /sol1.json
    /sol2.json
    /sol3.json
    /sol4.json
  /problem_2
    /Metadata.json
    /Question.json
    /sol1.json
    /sol2.json
    /sol3.json
    /sol4.json
  ...


=> What to get from where

- Question.json:

"Description"
"Input"
"Output"
"Examples": []
"Note"

- Metadata.json:

"difficulty"
"raw_tags"
"name"
"tags"

- real_sol.json:
"code"
"language"
"solutionNumber"


=> Schema's
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

*/

/*
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
});


=> 

how to save them in mongo atlas
*/

// ===================================