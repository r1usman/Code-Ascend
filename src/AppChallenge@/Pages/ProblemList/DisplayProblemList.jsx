import { Carousel } from "react-responsive-carousel"; // Import Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { CustomNextArrow, CustomPrevArrow } from "./Components/CustomButtons";
import { courses } from "./Utils/data";
import ProblemCategories from "./ProblemCategories";
import ProblemList from "./ProblemList";

// Assume Tailwind CSS is configured in your project, including the 'dark' variant.
// Add this to your tailwind.config.js:
// module.exports = {
//   darkMode: 'class', // This enables dark mode based on a 'dark' class on the HTML or body element
//   // ... other configuration
// }

// Custom Next Arrow component for react-responsive-carousel

function DisplayProblemList() {
  // State to manage the expanded/collapsed state of categories

  // Example course data with image URLs (using placeholders)

  // Example problem categories data

  // Number of categories to show when collapsed

  // Settings for react-responsive-carousel
  const carouselSettings = {
    showThumbs: false, // Hide thumbnail navigation
    showStatus: false, // Hide status text (e.g., 1 of 10)
    showIndicators: false, // Hide dot indicators
    infiniteLoop: true, // Loop the carousel
    autoPlay: true, // Auto-play the carousel
    interval: 3000, // Auto-play interval in milliseconds
    transitionTime: 500, // Transition speed
    centerMode: true, // Enable center mode (shows partial next/prev slides)
    centerSlidePercentage: 100 / 4, // Adjust percentage based on slidesToShow (approximate for responsiveness)
    renderArrowPrev: (
      clickHandler,
      hasPrev,
      label // Changed = to :
    ) => (
      <CustomPrevArrow
        onClickHandler={clickHandler}
        hasPrev={hasPrev}
        label={label}
      />
    ),
    renderArrowNext: (
      clickHandler,
      hasNext,
      label // Changed = to :
    ) => (
      <CustomNextArrow
        onClickHandler={clickHandler}
        hasNext={hasNext}
        label={label}
      />
    ),
    // Note: react-responsive-carousel handles responsiveness differently than react-slick.
    // You might need to adjust centerSlidePercentage or use CSS media queries
    // targeting the carousel's internal classes for more precise responsive behavior.
  };

  return (
    // Applied dark mode classes directly
    <div className="min-h-screen bg-dark-bg-secondary4 rounded-md font-poppins text-gray-100 transition-colors duration-300 max-w-5xl mx-auto  \">
      {/* Main Content Area */}
      <main className="flex-1 p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          {/* Applied dark mode text color directly */}

          {/* Removed Dark Mode Toggle Button */}
        </div>

        {/* Course Carousel Section */}
        {/* Added 'relative group' for hover effect on arrows */}
        <div className="mb-6 rounded-lg shadow-md relative group">
          {" "}
          {/* Removed p-6, bg-white, dark:bg-gray-800 */}
          {/* Carousel component from react-responsive-carousel */}
          <Carousel {...carouselSettings}>
            {courses.map((course, index) => (
              <div key={index} className="px-2">
                {" "}
                {/* Added horizontal padding for spacing between slides */}
                <div className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition duration-200 ease-in-out">
                  <img
                    src={course.imageUrl}
                    alt={course.name}
                    className="w-full h-auto object-cover" // Ensure image covers the area and maintains aspect ratio
                  />
                  {/* Optional: Add course name overlay */}
                  {/* <div className="p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center text-sm font-medium">
                                {course.name}
                            </div> */}
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Problem Categories Section */}
        {/* Added relative positioning for the absolute expand button */}
        <ProblemCategories />
        {/* Problem Table/List */}
        {/* Applied dark mode background and text colors directly */}
        <div className=" text-gray-100 shadow-md rounded-lg overflow-hidden ">
          <ProblemList />
        </div>
      </main>
    </div>
  );
}

export default DisplayProblemList ;
