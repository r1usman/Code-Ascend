import React, { useState } from 'react';
// Importing icons from lucide-react
import {
  BookOpen,
  Settings,
  Search,
  ChevronDown,
  Home,
  BookMarked,
  PlayCircle,
  PercentCircle,
  Star,
  Layers,
  BarChart3,
  ArrowRight,
  Filter,
} from 'lucide-react';
import Header from '../components/Header';

// Dummy Data for Enrolled Courses
const enrolledCoursesData = [
  {
    id: 1,
    title: 'Advanced Algorithms & Data Structures',
    instructor: 'Dr. Evelyn Reed',
    imageUrl:
      'https://assets.leetcode.com/users/images/942e9e91-7f81-4513-8544-c462980a5d3a_1738741032.3553998.png',
    duration: '8 Weeks',
    progress: 75, // Percentage completion
    nextLesson: 'Dynamic Programming Part 2',
    category: 'Algorithms',
  },
  {
    id: 3,
    title: 'AI & Machine Learning Foundations',
    instructor: 'Dr. Anya Sharma',
    imageUrl:
      'https://assets.leetcode.com/users/images/e4dc0f86-8227-4697-ba44-2e8797fc71bb_1747344219.8741543.png',
    duration: '12 Weeks',
    progress: 40,
    nextLesson: 'Introduction to Neural Networks',
    category: 'AI & ML',
  },
  {
    id: 'newly-added-course', // Example of a course with no progress yet
    title: 'Introduction to Web Security',
    instructor: 'Prof. Alex Mercer',
    imageUrl:
      'https://assets.leetcode.com/users/images/b0a08a5c-c575-48f6-9110-b6ae4e011e98_1655746322.579097.png', // Reusing an image for example
    duration: '6 Weeks',
    progress: 0,
    nextLesson: 'Understanding Common Vulnerabilities',
    category: 'Cybersecurity',
  },
];

// --- Shadcn-UI like conceptual components (Ensure these are defined as in previous artifacts or use actual shadcn/ui) ---
const Input = React.forwardRef(({ className, type, icon, ...props }, ref) => (
  <div className="relative w-full">
    {icon && (
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        {icon}
      </div>
    )}
    <input
      type={type}
      className={`block w-full focus:border-text_primary focus:ring-text_primary ${
        icon ? 'pl-12' : 'pl-4'
      } rounded-lg border-border_Col bg-dark-bg-secondary2 py-3 pr-4 font-poppins text-dark-text-color placeholder-dark-text-muted shadow-sm sm:text-sm ${className}`}
      ref={ref}
      {...props}
    />
  </div>
));

const Label = ({ children, htmlFor, className = '' }) => (
  <label
    htmlFor={htmlFor}
    className={`mb-1.5 block font-poppins text-sm font-medium text-dark-text-muted ${className}`}
  >
    {children}
  </label>
);

const Button = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  iconLeft,
  iconRight,
  ...props
}) => {
  const baseStyle =
    'font-poppins font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-75 flex items-center justify-center shadow-sm hover:shadow-md';
  let variantStyle = '';
  if (variant === 'primary') {
    variantStyle =
      'bg-text_primary text-dark-bg-primary hover:opacity-90 focus:ring-orange-400';
  } else if (variant === 'secondary') {
    variantStyle =
      'bg-dark-bg-secondary4 text-dark-text-color hover:bg-border_Col focus:ring-text_primary/50';
  } else if (variant === 'ghost') {
    variantStyle =
      'bg-transparent text-dark-text-muted hover:bg-dark-bg-secondary4 hover:text-text_primary focus:ring-text_primary/30 shadow-none';
  } else {
    // default
    variantStyle =
      'bg-dark-bg-secondary2 text-dark-text-color hover:bg-border_Col focus:ring-text_primary/50';
  }
  const sizeStyle =
    size === 'sm'
      ? 'px-3 py-1.5 text-xs'
      : size === 'lg'
      ? 'px-6 py-3 text-base'
      : 'px-4 py-2.5 text-sm';
  const iconSizeStyle = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {iconLeft &&
        React.cloneElement(iconLeft, {
          className: `${iconSizeStyle} ${children ? 'mr-2' : ''}`,
        })}
      {children}
      {iconRight &&
        React.cloneElement(iconRight, {
          className: `${iconSizeStyle} ${children ? 'ml-2' : ''}`,
        })}
    </button>
  );
};
// --- End Shadcn-UI like conceptual components ---

// Header Component for Student Dashboard

// Footer Component - REMAINS THE SAME (or adapt for student)
const Footer = () => (
  <footer className="border-t border-border_Col bg-dark-bg-primary py-10 text-dark-text-muted">
    <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
      <p className="font-poppins text-sm">
        &copy; {new Date().getFullYear()} StudentPortal. Keep Learning!
      </p>
    </div>
  </footer>
);

// Enrolled Course Card Component
const EnrolledCourseCard = ({ course }) => {
  const {
    title,
    instructor,
    imageUrl,
    duration,
    progress,
    nextLesson,
    category,
  } = course;

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border_Col bg-dark-bg-secondary1 shadow-lg transition-all duration-300 ease-in-out hover:border-text_primary/50 hover:shadow-orange-600/20">
      <div className="relative h-44 w-full overflow-hidden">
        {' '}
        {/* Slightly smaller height */}
        <img
          src={imageUrl}
          alt={`Course: ${title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x330/1A1A1A/999999?text=Course+Art`;
          }}
        />
        <span className="absolute left-2.5 top-2.5 rounded-md bg-dark-bg-secondary4 px-2.5 py-1 font-poppins text-xs font-semibold text-text_primary shadow">
          {category || 'General'}
        </span>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-2 right-2.5 rounded bg-black/50 px-2 py-0.5 font-poppins text-xs font-medium text-white">
          {duration}
        </div>
      </div>

      <div className="flex flex-grow flex-col p-4">
        <h3
          className="text-md mb-1 truncate font-general text-dark-text-color transition-colors group-hover:text-text_primary"
          title={title}
        >
          {title}
        </h3>
        <p className="mb-3 font-poppins text-xs text-dark-text-muted">
          By {instructor}
        </p>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="mb-1 flex justify-between font-poppins text-xs text-dark-text-muted">
            <span>Progress</span>
            <span className="font-semibold text-text_primary">{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full border border-border_Col bg-dark-bg-secondary4">
            <div
              className="h-full rounded-full bg-text_primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <p className="mb-1 font-poppins text-xs text-dark-text-muted">
          Next up:
        </p>
        <p
          className="mb-4 truncate font-poppins text-sm text-dark-text-color"
          title={nextLesson}
        >
          {nextLesson || 'Course Conclusion'}
        </p>

        <Button
          variant="primary"
          className="mt-auto w-full"
          iconLeft={<PlayCircle className="h-4 w-4" />}
        >
          {progress > 0 ? 'Continue Learning' : 'Start Course'}
        </Button>
      </div>
    </div>
  );
};

// Enrolled Course Grid Component
const EnrolledCourseGrid = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="rounded-lg border border-border_Col bg-dark-bg-secondary1 py-10 text-center shadow-lg">
        <BookMarked className="mx-auto mb-4 h-16 w-16 text-dark-text-muted" />
        <p className="mb-2 font-poppins text-lg text-dark-text-muted">
          You are not enrolled in any courses yet.
        </p>
        <p className="mb-6 font-poppins text-sm text-dark-text-muted">
          Explore our catalog and start your learning journey!
        </p>
        <Button variant="primary" size="lg" iconRight={<ArrowRight />}>
          Find Courses to Join
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {courses.map((course) => (
        <EnrolledCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

// Search Courses Section
const SearchCoursesSection = () => {
  return (
    <div className="mb-8 rounded-xl border border-border_Col bg-dark-bg-secondary1 p-6 shadow-xl sm:p-8 md:mb-12">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
        <div className="w-full flex-grow">
          <Label
            htmlFor="searchStudentCourses"
            className="mb-2 text-lg text-dark-text-color"
          >
            Discover Your Next Course
          </Label>
          <Input
            id="searchStudentCourses"
            type="text"
            placeholder="Search by title, skill, or category (e.g., Python, Web Design)"
            icon={<Search className="h-5 w-5 text-dark-text-muted" />}
            className="py-3.5 text-base" // Larger input
          />
        </div>
        <Button
          variant="primary"
          size="lg"
          className="mt-3 w-full px-8 py-3.5 md:mt-0 md:w-auto"
          iconLeft={<Search />}
        >
          Search
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="font-poppins text-xs text-dark-text-muted">
          Popular:
        </span>
        {['Python', 'React', 'Data Analysis', 'UX Design'].map((tag) => (
          <button
            key={tag}
            className="rounded-full bg-dark-bg-secondary4 px-2.5 py-1 font-poppins text-xs text-text_primary transition-colors hover:bg-border_Col"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Student Dashboard Page Component
const StudentCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(enrolledCoursesData);

  return (
    <div className="flex min-h-screen flex-col bg-dark-bg-primary font-poppins text-dark-text-color">
      <Header />

      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        {/* Welcome Message or Quick Stats (Optional) */}
        <div className="mb-8">
          <h2 className="font-general text-3xl tracking-tight text-dark-text-color sm:text-4xl">
            Welcome Back, Learner!
          </h2>
          <p className="mt-1 font-poppins text-dark-text-muted">
            Continue your learning journey and explore new skills.
          </p>
        </div>

        {/* Search Courses Section */}
        <SearchCoursesSection />

        {/* Enrolled Courses Section */}
        <div className="mb-4 flex items-center justify-between md:mb-6">
          <h3 className="font-general text-xl text-dark-text-color sm:text-2xl">
            My Enrolled Courses
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconLeft={<Filter className="h-3.5 w-3.5" />}
          >
            Filter
          </Button>
        </div>
        <EnrolledCourseGrid courses={enrolledCourses} />
      </main>

      <Footer />
    </div>
  );
};

export default StudentCourses;
