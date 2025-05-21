import React, { useState } from 'react';
// Importing icons from lucide-react
import {
  BookOpen,
  Settings,
  Home,
  BookMarked,
  PlayCircle,
  PercentCircle,
  Star,
  Layers,
  BarChart3,
  ArrowRight,
  Filter,
  ChevronDown,
  ChevronRight,
  Check,
  ListVideo,
  FileText,
  Trophy,
  CalendarClock,
  RadioTower,
  Download,
} from 'lucide-react';
import Header from '../components/Header';

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

const Card = ({ children, className = '' }) => (
  <div
    className={`rounded-lg border border-border_Col bg-dark-bg-secondary1 shadow-xl ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ children, className = '' }) => (
  <div className={`border-b border-border_Col p-5 sm:p-6 ${className}`}>
    {children}
  </div>
);
const CardTitle = ({ children, className = '' }) => (
  <h3 className={`font-general text-xl text-dark-text-color ${className}`}>
    {children}
  </h3>
);
const CardDescription = ({ children, className = '' }) => (
  <p className={`mt-1 font-poppins text-sm text-dark-text-muted ${className}`}>
    {children}
  </p>
);
const CardContent = ({ children, className = '' }) => (
  <div className={`p-5 sm:p-6 ${className}`}>{children}</div>
);

const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });
};
const TabsList = ({ children, activeTab, setActiveTab, className = '' }) => (
  <div
    className={`flex space-x-1 rounded-lg border border-border_Col bg-dark-bg-secondary2 p-1 ${className}`}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { activeTab, setActiveTab });
      }
      return child;
    })}
  </div>
);
const TabsTrigger = ({
  children,
  value,
  activeTab,
  setActiveTab,
  className = '',
}) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`rounded-md px-4 py-2 font-poppins text-sm transition-colors duration-200 focus:outline-none
            ${
              activeTab === value
                ? 'bg-text_primary text-dark-bg-primary shadow-md'
                : 'text-dark-text-muted hover:bg-dark-bg-secondary4 hover:text-dark-text-color'
            } ${className}`}
  >
    {children}
  </button>
);
const TabsContent = ({ children, value, activeTab, className = '' }) =>
  activeTab === value ? (
    <div className={`mt-6 ${className}`}>{children}</div>
  ) : null;

const Accordion = ({
  children,
  type = 'single',
  collapsible = false,
  className,
}) => {
  const [openItem, setOpenItem] = useState(
    type === 'single' && !collapsible
      ? React.Children.toArray(children)[0]?.props.value || null
      : null
  );

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            openItem,
            setOpenItem,
            collapsible,
          });
        }
        return child;
      })}
    </div>
  );
};
const AccordionItem = ({
  children,
  value,
  openItem,
  setOpenItem,
  collapsible,
  className,
}) => {
  const isOpen = openItem === value;
  const toggleItem = () => {
    if (isOpen && collapsible) {
      setOpenItem(null);
    } else {
      setOpenItem(value);
    }
  };
  return (
    <div className={`border-b border-border_Col ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { isOpen, toggleItem });
        }
        return child;
      })}
    </div>
  );
};
const AccordionTrigger = ({ children, isOpen, toggleItem, className }) => (
  <button
    onClick={toggleItem}
    className={`flex w-full items-center justify-between px-1 py-4 text-left font-poppins font-medium text-dark-text-color transition-colors hover:text-text_primary ${className}`}
  >
    {children}
    <ChevronDown
      className={`h-5 w-5 transition-transform duration-200 ${
        isOpen
          ? 'rotate-180 transform text-text_primary'
          : 'text-dark-text-muted'
      }`}
    />
  </button>
);
const AccordionContent = ({ children, isOpen, className }) => (
  <div
    className={`overflow-hidden transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    }`}
  >
    <div
      className={`px-1 pb-4 pt-1 font-poppins text-sm text-dark-text-muted ${className}`}
    >
      {children}
    </div>
  </div>
);

// --- End Shadcn-UI like conceptual components ---

// Dummy Data for Student Course Detail Page
const studentCourseDetailData = {
  id: 1,
  title: 'Advanced Algorithms & Data Structures',
  instructor: 'Dr. Evelyn Reed',
  instructorAvatar: 'https://placehold.co/40x40/EA580C/FFFFFF?text=ER',
  imageUrl:
    'https://assets.leetcode.com/users/images/942e9e91-7f81-4513-8544-c462980a5d3a_1738741032.3553998.png',
  description:
    'Master complex algorithms and data structures with hands-on coding challenges and live problem-solving sessions. This course covers topics like advanced sorting, graph algorithms, dynamic programming, and data structure optimization, preparing you for complex software engineering challenges.',
  duration: '8 Weeks',
  overallProgress: 75,
  category: 'Algorithms & Data Structures',
  level: 'Advanced',
  lessonsCount: 48,
  certificateAvailable: true,
  nextLiveClass: {
    topic: 'Advanced Graph Traversal Techniques',
    dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
  },
  modules: [
    {
      id: 'mod1',
      title: 'Module 1: Introduction & Advanced Sorting',
      lessons: [
        {
          id: 'lec101',
          title: 'Recap of Basic Sorting Algorithms',
          type: 'video',
          duration: '15 min',
          completed: true,
        },
        {
          id: 'lec102',
          title: 'Merge Sort and Quick Sort In-depth',
          type: 'video',
          duration: '25 min',
          completed: true,
        },
        {
          id: 'lec103',
          title: 'Coding Challenge: Implement Merge Sort',
          type: 'assignment',
          completed: true,
        },
        {
          id: 'lec104',
          title: 'Non-Comparison Sorts (Counting, Radix)',
          type: 'video',
          duration: '20 min',
          completed: true,
        },
      ],
    },
    {
      id: 'mod2',
      title: 'Module 2: Trees and Heaps',
      lessons: [
        {
          id: 'lec201',
          title: 'Advanced Tree Traversals (BFS, DFS)',
          type: 'video',
          duration: '30 min',
          completed: true,
        },
        {
          id: 'lec202',
          title: 'Binary Heaps and Priority Queues',
          type: 'video',
          duration: '22 min',
          completed: true,
        },
        {
          id: 'lec203',
          title: 'Coding Challenge: Heapify an Array',
          type: 'assignment',
          completed: false,
        },
      ],
    },
    {
      id: 'mod3',
      title: 'Module 3: Graph Algorithms',
      lessons: [
        {
          id: 'lec301',
          title: 'Graph Representations (Adjacency Matrix/List)',
          type: 'video',
          duration: '18 min',
          completed: false,
        },
        {
          id: 'lec302',
          title: "Dijkstra's Algorithm",
          type: 'video',
          duration: '28 min',
          completed: false,
        },
      ],
    },
  ],
  assessments: [
    {
      id: 'test1',
      type: 'test',
      title: 'Quiz 1: Sorting Algorithms',
      date: '2025-04-10',
      score: 85,
      status: 'Graded',
    },
    {
      id: 'assign1',
      type: 'assignment',
      title: 'Assignment 1: Implement Quick Sort',
      date: '2025-04-15',
      score: 92,
      status: 'Graded',
    },
    {
      id: 'test2',
      type: 'test',
      title: 'Midterm: Trees and Heaps',
      date: '2025-05-01',
      score: null,
      status: 'Upcoming',
    },
    {
      id: 'assign2',
      type: 'assignment',
      title: 'Assignment 2: Graph Pathfinding',
      date: '2025-05-10',
      score: 78,
      status: 'Graded',
    },
  ],
};

// Header Component for Student Portal (can be reused from StudentDashboardPage)

// Footer Component - REMAINS THE SAME
const Footer = () => (
  <footer className="border-t border-border_Col bg-dark-bg-primary py-10 text-dark-text-muted">
    <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
      <p className="font-poppins text-sm">
        &copy; {new Date().getFullYear()} StudentPortal. Keep Learning!
      </p>
    </div>
  </footer>
);

// Main Student Course Detail Page Component
const ManageStudent = () => {
  const [course, setCourse] = useState(studentCourseDetailData); // In a real app, fetch this based on course ID

  const getLessonIcon = (type, completed) => {
    if (completed)
      return <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />;
    if (type === 'video')
      return (
        <PlayCircle className="mr-3 h-5 w-5 flex-shrink-0 text-text_primary" />
      );
    if (type === 'assignment')
      return (
        <FileText className="mr-3 h-5 w-5 flex-shrink-0 text-text_primary" />
      );
    return (
      <BookMarked className="mr-3 h-5 w-5 flex-shrink-0 text-text_primary" />
    );
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return 'Not scheduled';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-dark-bg-primary font-poppins text-dark-text-color">
      <Header />

      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        {/* Course Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="mb-1 text-sm font-semibold text-text_primary">
                {course.category}
              </p>
              <h1 className="font-general text-3xl tracking-tight text-dark-text-color sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-2 max-w-3xl font-poppins text-dark-text-muted">
                {course.description.substring(0, 150)}...
              </p>{' '}
              {/* Short description */}
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full md:w-auto"
              iconLeft={<PlayCircle />}
            >
              {course.overallProgress > 0
                ? 'Continue Course'
                : 'Start Learning'}
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border_Col bg-dark-bg-secondary1 p-4 text-sm">
            <div className="flex items-center">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="mr-2 h-8 w-8 rounded-full border-2 border-text_primary"
              />
              <span className="text-dark-text-muted">
                Instructor:{' '}
                <span className="font-semibold text-dark-text-color">
                  {course.instructor}
                </span>
              </span>
            </div>
            <span className="text-dark-text-muted">
              Level:{' '}
              <span className="font-semibold text-dark-text-color">
                {course.level}
              </span>
            </span>
            <span className="text-dark-text-muted">
              Duration:{' '}
              <span className="font-semibold text-dark-text-color">
                {course.duration}
              </span>
            </span>
            <span className="text-dark-text-muted">
              {course.lessonsCount} Lessons
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {/* Left Column: Course Content & Performance */}
          <div className="space-y-8 lg:col-span-2">
            {/* Course Content (Syllabus) */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {course.modules.map((module, index) => (
                    <AccordionItem key={module.id} value={`item-${index}`}>
                      <AccordionTrigger>{module.title}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <li
                              key={lesson.id}
                              className={`flex items-center justify-between rounded-md p-2.5 ${
                                lesson.completed
                                  ? 'bg-dark-bg-secondary4/30'
                                  : 'hover:bg-dark-bg-secondary2'
                              }`}
                            >
                              <div className="flex items-center">
                                {getLessonIcon(lesson.type, lesson.completed)}
                                <span
                                  className={`text-sm ${
                                    lesson.completed
                                      ? 'text-dark-text-muted line-through'
                                      : 'text-dark-text-color'
                                  }`}
                                >
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-xs text-dark-text-muted">
                                {lesson.duration}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* My Performance Section */}
            <Card>
              <CardHeader>
                <CardTitle>My Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tests">
                  <TabsList className="mb-4">
                    <TabsTrigger value="tests">Coding Tests</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tests">
                    {course.assessments.filter((a) => a.type === 'test')
                      .length > 0 ? (
                      <ul className="space-y-3">
                        {course.assessments
                          .filter((a) => a.type === 'test')
                          .map((test) => (
                            <li
                              key={test.id}
                              className="flex items-center justify-between rounded-md border border-border_Col bg-dark-bg-secondary2 p-3"
                            >
                              <div>
                                <p className="text-sm font-semibold text-dark-text-color">
                                  {test.title}
                                </p>
                                <p className="text-xs text-dark-text-muted">
                                  Date:{' '}
                                  {new Date(test.date).toLocaleDateString()} |
                                  Status:{' '}
                                  <span
                                    className={`${
                                      test.status === 'Graded'
                                        ? 'text-green-400'
                                        : 'text-yellow-400'
                                    }`}
                                  >
                                    {test.status}
                                  </span>
                                </p>
                              </div>
                              {test.status === 'Graded' &&
                              test.score !== null ? (
                                <span
                                  className={`text-lg font-bold ${
                                    test.score >= 70
                                      ? 'text-green-400'
                                      : 'text-red-400'
                                  }`}
                                >
                                  {test.score}%
                                </span>
                              ) : (
                                <Button variant="ghost" size="sm" disabled>
                                  {test.status === 'Upcoming'
                                    ? 'Upcoming'
                                    : 'View Details'}
                                </Button>
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="py-3 text-center text-dark-text-muted">
                        No coding tests submitted or graded yet.
                      </p>
                    )}
                  </TabsContent>
                  <TabsContent value="assignments">
                    {course.assessments.filter((a) => a.type === 'assignment')
                      .length > 0 ? (
                      <ul className="space-y-3">
                        {course.assessments
                          .filter((a) => a.type === 'assignment')
                          .map((assign) => (
                            <li
                              key={assign.id}
                              className="flex items-center justify-between rounded-md border border-border_Col bg-dark-bg-secondary2 p-3"
                            >
                              <div>
                                <p className="text-sm font-semibold text-dark-text-color">
                                  {assign.title}
                                </p>
                                <p className="text-xs text-dark-text-muted">
                                  Date:{' '}
                                  {new Date(assign.date).toLocaleDateString()} |
                                  Status:{' '}
                                  <span
                                    className={`${
                                      assign.status === 'Graded'
                                        ? 'text-green-400'
                                        : 'text-yellow-400'
                                    }`}
                                  >
                                    {assign.status}
                                  </span>
                                </p>
                              </div>
                              {assign.status === 'Graded' &&
                              assign.score !== null ? (
                                <span
                                  className={`text-lg font-bold ${
                                    assign.score >= 70
                                      ? 'text-green-400'
                                      : 'text-red-400'
                                  }`}
                                >
                                  {assign.score}%
                                </span>
                              ) : (
                                <Button variant="ghost" size="sm" disabled>
                                  {assign.status === 'Upcoming'
                                    ? 'Upcoming'
                                    : 'View Submission'}
                                </Button>
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="py-3 text-center text-dark-text-muted">
                        No assignments submitted or graded yet.
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar: Progress, Live Class, Certificate */}
          <div className="space-y-6 md:space-y-8 lg:col-span-1">
            <Card>
              <CardHeader className="!pb-3">
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative mx-auto mb-3 h-32 w-32 sm:h-36 sm:w-36">
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    <path
                      className="text-dark-bg-secondary4"
                      strokeWidth="3"
                      fill="none"
                      stroke="currentColor"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-text_primary"
                      strokeWidth="3"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${course.overallProgress}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-general text-3xl text-text_primary">
                      {course.overallProgress}%
                    </span>
                  </div>
                </div>
                <p className="font-poppins text-sm text-dark-text-muted">
                  Completed
                </p>
                <Button
                  variant="primary"
                  className="mt-4 w-full"
                  iconLeft={<PlayCircle />}
                >
                  {course.overallProgress > 0 && course.overallProgress < 100
                    ? 'Resume Learning'
                    : course.overallProgress === 100
                    ? 'Review Course'
                    : 'Start Course'}
                </Button>
              </CardContent>
            </Card>

            {course.nextLiveClass && (
              <Card>
                <CardHeader className="!pb-3">
                  <CardTitle className="flex items-center">
                    <RadioTower className="mr-2 h-5 w-5 text-text_primary" />{' '}
                    Upcoming Live Class
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-1 font-semibold text-dark-text-color">
                    {course.nextLiveClass.topic}
                  </p>
                  <p className="flex items-center text-sm text-dark-text-muted">
                    <CalendarClock size={16} className="mr-1.5" />{' '}
                    {formatDateTime(course.nextLiveClass.dateTime)}
                  </p>
                  <Button variant="secondary" size="sm" className="mt-3 w-full">
                    Join Live Session
                  </Button>
                </CardContent>
              </Card>
            )}

            {course.certificateAvailable && course.overallProgress === 100 && (
              <Card>
                <CardHeader className="!pb-3">
                  <CardTitle className="flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-yellow-400" />{' '}
                    Certificate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-dark-text-muted">
                    Congratulations on completing the course! Your certificate
                    is ready.
                  </p>
                  <Button
                    variant="primary"
                    className="w-full"
                    iconLeft={<Download className="h-4 w-4" />}
                  >
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManageStudent;
