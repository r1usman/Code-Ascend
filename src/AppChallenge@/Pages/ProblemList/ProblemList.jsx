import { useState } from "react"; // Keep useState if needed later, though not used in this version

// Define the array of problems
const problems = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "48.1%",
    tags: ["Array", "Hash Table"],
    link: "#", // Added a placeholder link
  },
  {
    title: "Add Two Numbers",
    difficulty: "Medium",
    acceptance: "40.5%",
    tags: ["Linked List", "Math"],
    link: "#",
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: "33.1%",
    tags: ["Hash Table", "String", "Sliding Window"],
    link: "#",
  },
  {
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptance: "35.2%",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    link: "#",
  },
  {
    title: "Container With Most Water",
    difficulty: "Medium",
    acceptance: "57.3%",
    tags: ["Array", "Two Pointers"],
    link: "#",
  },
  {
    title: "3Sum",
    difficulty: "Medium",
    acceptance: "30.1%",
    tags: ["Array", "Two Pointers"],
    link: "#",
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    acceptance: "41.2%",
    tags: ["String", "Stack"],
    link: "#",
  },
  {
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    acceptance: "61.5%",
    tags: ["Linked List", "Recursion"],
    link: "#",
  },
  {
    title: "Maximum Subarray",
    difficulty: "Easy",
    acceptance: "47.9%",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    link: "#",
  },
  {
    title: "Jump Game",
    difficulty: "Medium",
    acceptance: "38.5%",
    tags: ["Array", "Dynamic Programming", "Greedy"],
    link: "#",
  },
];

function ProblemsList() {
  return (
    <div className="mb-6 rounded-lg shadow-md overflow-hidden bg-dark-bg-secondary4">
      {" "}
      {/* Added overflow-hidden to contain rounded corners */}
      <table className="min-w-full divide-y divide-gray-700">
        <tbody className="divide-y divide-gray-700">
          {/* Map over the problems array to create table rows */}
          {problems.map((problem, index) => (
            <tr
              key={index} // Using index as key, better to use a unique ID if available
              // Apply alternating background colors based on index
              className={index % 2 === 0 ? "bg-gray-800" : ""}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href={problem.link} // Use problem link
                  className="text-sm font-medium text-blue-400 hover:text-blue-600"
                >
                  {problem.title} {/* Use problem title */}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Applied dark mode background and text colors directly based on difficulty */}
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      problem.difficulty === "Easy"
                        ? "bg-green-800 text-green-100"
                        : ""
                    }
                    ${
                      problem.difficulty === "Medium"
                        ? "bg-yellow-800 text-yellow-100"
                        : ""
                    }
                    ${
                      problem.difficulty === "Hard"
                        ? "bg-red-800 text-red-100"
                        : ""
                    }
                  `}
                >
                  {problem.difficulty} {/* Use problem difficulty */}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {problem.acceptance} {/* Use problem acceptance */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {/* Join tags with a comma and space */}
                {problem.tags.join(", ")} {/* Use problem tags */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProblemsList;
