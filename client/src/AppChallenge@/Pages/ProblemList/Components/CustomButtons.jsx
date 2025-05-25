export const CustomNextArrow = ({
  onClickHandler,
  hasNext,
  label,
  className,
}) => {
  // Added className prop
  // Only render if there is a next slide
  if (!hasNext) {
    return null;
  }
  return (
    // Positioned absolutely, vertically centered, 50px inside right boundary, and hidden until group hover
    <button
      type="button"
      onClick={onClickHandler}
      title={label}
      // Corrected className usage to append the passed className
      className={`absolute inset-y-1/2 right-[50px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-1/2 cursor-pointer focus:outline-none ${className}`}
    >
      {/* Custom arrow icon - using inline SVG for simplicity and styling */}
      {/* Adjusted colors for a lighter appearance */}
      <svg
        className="h-10 w-10 text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 rounded-full p-1 shadow-md"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </button>
  );
};

// Custom Prev Arrow component for react-responsive-carousel
export const CustomPrevArrow = ({
  onClickHandler,
  hasPrev,
  label,
  className,
}) => {
  // Added className prop
  // Only render if there is a previous slide
  if (!hasPrev) {
    return null;
  }
  return (
    // Positioned absolutely, vertically centered, 50px inside left boundary, and hidden until group hover
    <button
      type="button"
      onClick={onClickHandler}
      title={label}
      // Corrected className usage to append the passed className
      className={`absolute inset-y-1/2 left-[50px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-1/2 cursor-pointer focus:outline-none ${className}`}
    >
      {/* Custom arrow icon - using inline SVG for simplicity and styling */}
      {/* Adjusted colors for a lighter appearance */}
      <svg
        className="h-10 w-10 text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 rounded-full p-1 shadow-md"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>
  );
};
