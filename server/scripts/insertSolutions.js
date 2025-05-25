const rawSolutions = JSON.parse(fs.readFileSync('Solution.json'));

const solutionDoc = {
  problemId: "binary_string_problem_001", // You need to add this
  problemName: "Binary String Calculation", // You need to add this
  solutions: rawSolutions.map((code, index) => ({
    code: code,
    language: "python", // Inferred from code
    solutionNumber: index + 1
  })),
  createdAt: new Date() // Added during import
};