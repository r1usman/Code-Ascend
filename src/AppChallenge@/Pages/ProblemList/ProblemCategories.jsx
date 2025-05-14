import { useState, useRef, useEffect } from "react";
import { problemCategories } from "./Utils/data";
// Assuming problemCategories is imported from "./data"
// import { problemCategories } from "./data";

// Placeholder data if not importing from "./data"

function ProblemCategories() {
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

  // Threshold to decide if Expand button is needed
  const initialVisibleThreshold = 10;

  return (
    // Added relative positioning for the absolute expand/collapse button
    // Added background color and padding
    <div className="mb-6 rounded-lg shadow-md  p-2 relative">
      {/* Categories List Container */}
      {/* Added overflow-hidden and max-h for single line effect when collapsed */}
      {/* Removed flex-wrap when collapsed, added when expanded */}
      <div
        className={`
          ${
            isCategoriesExpanded
              ? "flex flex-wrap"
              : "overflow-hidden max-h-16 whitespace-nowrap"
          }
          flex items-center
        `}
      >
        {problemCategories.map((category, index) => (
          <span
            key={index}
            // Added mr-2 and mb-2 for spacing between categories
            // Added inline-block to ensure margins are applied correctly
            className="inline-block   text-sm font-medium px-2.5 py-0.5 rounded-full cursor-pointer  hover:bg-btn-bg transition duration-200 ease-in-out mr-2 mb-2"
          >
            {category}
          </span>
        ))}
        
        {problemCategories.length > initialVisibleThreshold && (
          <button
            onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
            className={`${
              !isCategoriesExpanded ? "-translate-y-0.5 " : "bottom-2  "
            } absolute right-2 z-10 px-4 py-2 text-sm font-medium  bg-white text-btn-txt  rounded-md  focus:outline-none transition duration-200 ease-in-out 
           
          `}
          >
            {isCategoriesExpanded ? "Collapse" : "Expand"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProblemCategories;
