import React, { useState } from 'react';
// Importing icons from lucide-react
import {
  Code,
  Video,
  PlusCircle,
  BookOpen,
  Settings,
  Edit3,
  X,
  UploadCloud,
  Tag,
  DollarSign,
  BarChart3,
  Layers,
  ChevronDown,
} from 'lucide-react'; // Added X for close, UploadCloud, Tag, DollarSign etc.
import { useRole } from '../context/CoursesContext';
import { Link } from 'react-router-dom';

// Dummy Course Data (representing instructor's courses) - REMAINS THE SAME
const coursesData = [ 
  {
    id: 1,
    title: 'Advanced Algorithms & Data Structures',
    imageUrl:
      'https://assets.leetcode.com/users/images/942e9e91-7f81-4513-8544-c462980a5d3a_1738741032.3553998.png',
    hasCodingChallenges: true,
    hasLiveClasses: true,
    duration: '8 Weeks',
    status: 'Published',
    tags: ['Algorithms', 'Advanced'],
    price: 99.99, // Added price for consistency
    rating: 4.8, // Added for consistency
    students: 1250, // Added for consistency
  },
  {
    id: 2,
    title: 'Decentralized Systems & Blockchain',
    imageUrl:
      'https://assets.leetcode.com/users/images/b0a08a5c-c575-48f6-9110-b6ae4e011e98_1655746322.579097.png',
    hasCodingChallenges: true,
    hasLiveClasses: false,
    duration: '10 Weeks',
    status: 'Published',
    tags: ['Blockchain', 'Web3'],
    price: 129.99,
    rating: 4.9,
    students: 980,
  },
  {
    id: 3,
    title: 'AI & Machine Learning Foundations',
    imageUrl:
      'https://assets.leetcode.com/users/images/e4dc0f86-8227-4697-ba44-2e8797fc71bb_1747344219.8741543.png',
    hasCodingChallenges: true,
    hasLiveClasses: true,
    duration: '12 Weeks',
    status: 'Draft',
    tags: ['AI', 'Python'],
    price: 149.99,
    rating: 4.7,
    students: 2100,
  },
];

// --- Shadcn-UI like conceptual components ---
const Input = React.forwardRef(({ className, type, icon, ...props }, ref) => (
  <div className="relative">
    {icon && (
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
    )}
    <input
      type={type}
      className={`block w-full focus:border-text_primary focus:ring-text_primary ${
        icon ? 'pl-10' : 'pl-3'
      } rounded-md border-border_Col bg-dark-bg-secondary2 py-2.5 pr-3 font-poppins text-dark-text-color placeholder-dark-text-muted shadow-sm sm:text-sm ${className}`}
      ref={ref}
      {...props}
    />
  </div>
));

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={`block w-full resize-none rounded-md border-border_Col bg-dark-bg-secondary2 px-3 py-2.5 font-poppins text-dark-text-color placeholder-dark-text-muted shadow-sm focus:border-text_primary focus:ring-text_primary sm:text-sm ${className}`}
    ref={ref}
    rows={4}
    {...props}
  />
));

const Label = ({ children, htmlFor, className = '' }) => (
  <label
    htmlFor={htmlFor}
    className={`mb-1.5 block font-poppins text-sm font-medium text-dark-text-muted ${className}`}
  >
    {children}
  </label>
);

const Checkbox = React.forwardRef(
  ({ children, id, className, ...props }, ref) => (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className={`h-4 w-4 rounded border-border_Col bg-dark-bg-secondary4 text-text_primary focus:ring-text_primary focus:ring-offset-dark-bg-secondary1 ${className}`}
        ref={ref}
        {...props}
      />
      <Label htmlFor={id} className="mb-0 ml-2 text-dark-text-color">
        {children}
      </Label>
    </div>
  )
);

const Select = React.forwardRef(
  ({ children, className, icon, ...props }, ref) => (
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
      )}
      <select
        className={`block w-full focus:border-text_primary focus:ring-text_primary ${
          icon ? 'pl-10' : 'pl-3'
        } appearance-none rounded-md border-border_Col bg-dark-bg-secondary2 py-2.5 pr-8 font-poppins text-dark-text-color placeholder-dark-text-muted shadow-sm sm:text-sm ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDown className="h-4 w-4 text-dark-text-muted" />
      </div>
    </div>
  )
);
// --- End Shadcn-UI like conceptual components ---

// Create Course Modal Component
const CreateCourseModal = ({ isOpen, onClose, onCourseCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [hasCodingChallenges, setHasCodingChallenges] = useState(false);
  const [hasLiveClasses, setHasLiveClasses] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourseData = {
      id: Date.now().toString(), // Simple ID generation
      title,
      description,
      imageUrl,
      duration,
      price: parseFloat(price) || 0,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      category,
      level,
      hasCodingChallenges,
      hasLiveClasses,
      status: 'Draft', // Default status for new courses
      // instructor: "Current Logged In Instructor" // This would be set on the backend
    };
    onCourseCreate(newCourseData);
    onClose(); // Close modal after submission
    // Optionally reset form fields
    setTitle('');
    setDescription('');
    setImageUrl('');
    setDuration('');
    setPrice('');
    setTags('');
    setCategory('');
    setLevel('');
    setHasCodingChallenges(false);
    setHasLiveClasses(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-dark-bg-overlay/80 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border border-border_Col bg-dark-bg-secondary1 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border_Col p-5 sm:p-6">
          <h3 className="font-general text-xl text-dark-text-color">
            Create New Course
          </h3>
          <button
            onClick={onClose}
            className="text-dark-text-muted transition-colors hover:text-text_primary"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body - Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 overflow-y-auto p-5 sm:p-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Introduction to React"
                required
              />
            </div>
            <div>
              <Label htmlFor="courseDuration">Duration</Label>
              <Input
                id="courseDuration"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 8 Weeks, 20 Hours"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="courseDescription">Description</Label>
            <Textarea
              id="courseDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the course content and objectives..."
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="courseImageUrl">Image URL</Label>
              <Input
                id="courseImageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.png"
                icon={<UploadCloud className="h-4 w-4 text-dark-text-muted" />}
              />
            </div>
            <div>
              <Label htmlFor="coursePrice">Price ($)</Label>
              <Input
                id="coursePrice"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 99.99 (0 for free)"
                min="0"
                step="0.01"
                icon={<DollarSign className="h-4 w-4 text-dark-text-muted" />}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="courseCategory">Category</Label>
              <Select
                id="courseCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                icon={<Layers className="h-4 w-4 text-dark-text-muted" />}
              >
                <option value="">Select Category</option>
                <option value="web-development">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="ai-ml">AI & Machine Learning</option>
                <option value="mobile-dev">Mobile Development</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="design">Design</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="courseLevel">Difficulty Level</Label>
              <Select
                id="courseLevel"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                icon={<BarChart3 className="h-4 w-4 text-dark-text-muted" />}
              >
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="all-levels">All Levels</option>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="courseTags">Tags (comma-separated)</Label>
            <Input
              id="courseTags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., React, JavaScript, Frontend"
              icon={<Tag className="h-4 w-4 text-dark-text-muted" />}
            />
          </div>

          <div className="space-y-3 pt-2">
            <Label>Course Features</Label>
            <Checkbox
              id="hasCodingChallenges"
              checked={hasCodingChallenges}
              onChange={(e) => setHasCodingChallenges(e.target.checked)}
            >
              Includes Coding Challenges
            </Checkbox>
            <Checkbox
              id="hasLiveClasses"
              checked={hasLiveClasses}
              onChange={(e) => setHasLiveClasses(e.target.checked)}
            >
              Includes Live Classes
            </Checkbox>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-end rounded-b-xl border-t border-border_Col bg-dark-bg-secondary2 p-5 sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="mr-3 rounded-md px-4 py-2 font-poppins text-sm text-dark-text-muted transition-colors hover:text-dark-text-color"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="createCourseForm" // This assumes the form has id="createCourseForm", let's add it to the form tag
            onClick={handleSubmit} // We can call handleSubmit directly as the button is outside the form tag in this structure
            className="flex items-center rounded-lg bg-text_primary px-5 py-2.5 font-poppins text-sm font-semibold text-dark-bg-primary shadow-md transition-all duration-300 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Create Course
          </button>
        </div>
      </div>
    </div>
  );
};

// Header Component

const Header = (
  { onOpenCreateCourseModal } // Added prop to open modal
) => {
  const { isStudent, toggleView } = useRole(); // Assuming this is used to check if the user is a student or instructor
  return (
    <header className="sticky top-0 z-50 border-b border-border_Col bg-dark-bg-secondary2 text-dark-text-color shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <BookOpen className="mr-2 h-8 w-8 text-text_primary" />
          <h1 className="font-general text-3xl tracking-tight">
            Course<span className="text-text_primary">Craft</span>
          </h1>
        </div>
        <nav className="flex items-center space-x-4 sm:space-x-6">
          <Link
            to="/student-courses"
            onClick={toggleView} // Toggle view when clicked
            className="hidden font-poppins text-sm transition-colors duration-300 hover:text-text_primary sm:block"
          >
            {isStudent ? 'Instructor View' : 'Student View'}
          </Link>
          <button
            onClick={onOpenCreateCourseModal} // Trigger modal open
            className="flex items-center rounded-lg bg-text_primary px-4 py-2 font-poppins text-xs font-semibold text-dark-text-color shadow-sm transition-all duration-300 hover:opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <PlusCircle className="mr-1.5 h-4 w-4 sm:mr-2" /> Create Course
          </button>
          <a
            href="#"
            className="text-dark-text-muted transition-colors duration-300 hover:text-text_primary"
          >
            <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
        </nav>
      </div>
    </header>
  );
};

// Footer Component - REMAINS THE SAME
const Footer = () => (
  <footer className="border-t border-border_Col bg-dark-bg-primary py-10 text-dark-text-muted">
    <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
      <p className="font-poppins text-sm">
        &copy; {new Date().getFullYear()} CourseCraft. All rights reserved.
        Built for Instructors.
      </p>
    </div>
  </footer>
);

// CourseCard Component - REMAINS THE SAME
const CourseCard = ({ course }) => {
  const {
    title,
    imageUrl,
    hasCodingChallenges,
    hasLiveClasses,
    duration,
    status,
    tags,
    price,
  } = course;
  const statusColor =
    status === 'Published'
      ? 'bg-green-500'
      : status === 'Draft'
      ? 'bg-yellow-500'
      : 'bg-slate-500';

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border_Col bg-dark-bg-secondary1 shadow-lg transition-all duration-300 ease-in-out hover:border-text_primary/50 hover:shadow-orange-600/20">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={`Course: ${title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x360/1A1A1A/999999?text=Image+Missing`;
          }}
        />
        <span
          className={`absolute left-2.5 top-2.5 rounded-md px-2.5 py-1 font-poppins text-xs font-semibold shadow ${statusColor} ${
            status === 'Draft' ? 'text-dark-bg-primary' : 'text-white'
          }`}
        >
          {status}
        </span>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-2.5 right-2.5 text-white">
          <p className="rounded bg-black/50 px-2 py-0.5 font-poppins text-xs font-medium">
            {duration}
          </p>
        </div>
      </div>
      <div className="flex flex-grow flex-col p-4">
        <h3
          className="text-md mb-2 truncate font-general text-dark-text-color transition-colors group-hover:text-text_primary"
          title={title}
        >
          {title}
        </h3>
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded bg-dark-bg-secondary4 px-2 py-0.5 font-poppins text-xs text-dark-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mb-3 flex items-center space-x-3 font-poppins text-xs text-dark-text-muted">
          {hasCodingChallenges && (
            <div
              className="flex items-center"
              title="Coding Challenges Included"
            >
              <Code className="mr-1 h-3.5 w-3.5 text-text_primary" />
              <span>Challenges</span>
            </div>
          )}
          {hasLiveClasses && (
            <div className="flex items-center" title="Live Classes Included">
              <Video className="mr-1 h-3.5 w-3.5 text-text_primary" />
              <span>Live Classes</span>
            </div>
          )}
        </div>
        <div className="mb-3 mt-auto text-lg font-bold text-text_primary">
          ${price}
        </div>
        <Link
          to={`/instructor-manage`}
          className="flex w-full items-center justify-center rounded-md bg-text_primary px-4 py-2.5 font-poppins text-sm font-semibold text-dark-bg-primary shadow-md transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
        >
          <Edit3 className="mr-2 h-4 w-4" />
          Manage Course
        </Link>
      </div>
    </div>
  );
};

// CourseGrid Component - REMAINS THE SAME
const CourseGrid = ({ courses, onOpenCreateCourseModal }) => {
  // Added prop to open modal
  if (!courses || courses.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="mb-4 font-poppins text-lg text-dark-text-muted">
          You haven't created any courses yet.
        </p>
        <button
          onClick={onOpenCreateCourseModal} // Trigger modal open
          className="mx-auto flex items-center rounded-lg bg-text_primary px-6 py-3 font-poppins text-sm font-semibold text-dark-text-color shadow-md transition-all duration-300 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Create Your First Course
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

// Main App Component - Root of the application
function InstructorCourses() {
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
  const [instructorCourses, setInstructorCourses] = useState(coursesData); // State for courses

  const handleOpenCreateCourseModal = () => setIsCreateCourseModalOpen(true);
  const handleCloseCreateCourseModal = () => setIsCreateCourseModalOpen(false);

  const handleCourseCreate = (newCourse) => {
    setInstructorCourses((prevCourses) => [newCourse, ...prevCourses]); // Add new course to the beginning
    console.log('New course created:', newCourse);
  };

  return (
    <div className="flex min-h-screen flex-col bg-dark-bg-primary font-poppins text-dark-text-color">
      <Header onOpenCreateCourseModal={handleOpenCreateCourseModal} />

      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <h2 className="font-general text-2xl tracking-tight text-dark-text-color sm:text-3xl">
            Your Courses
          </h2>
          {/* Button to create course can also be here if preferred, or only in header */}
        </div>

        <CourseGrid
          courses={instructorCourses}
          onOpenCreateCourseModal={handleOpenCreateCourseModal}
        />
      </main>

      <Footer />

      <CreateCourseModal
        isOpen={isCreateCourseModalOpen}
        onClose={handleCloseCreateCourseModal}
        onCourseCreate={handleCourseCreate}
      />
    </div>
  );
}

export default InstructorCourses;
