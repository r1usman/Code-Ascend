import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Add this import

function ProblemsList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Add this hook

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const api = axios.create({
          baseURL: "https://jz675pcc-4000.inc1.devtunnels.ms",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        const response = await api.get("/problems");
        
        const transformedProblems = response.data.map(problem => ({
          id: problem._id, // Make sure to include the id
          title: problem.name,
          difficulty: problem.difficulty.split("_").join(" "),
          tags: problem.tags,
          description: problem.description,
          examples: problem.examples
        }));
        
        setProblems(transformedProblems);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching problems:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  // Function to handle problem click
  const handleProblemClick = (problemId) => {
    navigate(`/problems/${problemId}`);
  };

  // ... rest of your existing code ...

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toUpperCase()) {
      case "EASY":
        return "bg-green-800 text-green-100";
      case "MEDIUM":
        return "bg-yellow-800 text-yellow-100";
      case "MEDIUM_HARD":
      case "MEDIUM HARD":
        return "bg-orange-800 text-orange-100";
      case "HARD":
        return "bg-red-800 text-red-100";
      case "VERY_HARD":
      case "VERY HARD":
        return "bg-purple-800 text-purple-100";
      default:
        return "bg-gray-800 text-gray-100";
    }
  };
  return (
    <div className="mb-6 rounded-lg shadow-md overflow-hidden bg-dark-bg-secondary4">
      <table className="min-w-full divide-y divide-gray-700">
        <tbody className="divide-y divide-gray-700">
          {problems.map((problem, index) => (
            <tr
              key={problem.id}
              className={index % 2 === 0 ? "bg-gray-800" : ""}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <button // Changed from <a> to <button>
                  onClick={() => handleProblemClick(problem.id)}
                  className="text-sm font-medium text-blue-400 hover:text-blue-600 hover:underline text-left"
                >
                  {problem.title}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(problem.difficulty)}`}
                >
                  {problem.difficulty}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {problem.tags.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProblemsList;
