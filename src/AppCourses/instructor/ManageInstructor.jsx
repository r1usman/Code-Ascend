import React, { useState } from 'react';
// Importing icons from lucide-react
import {
  BookOpen,
  Settings,
  PlusCircle,
  ChevronDown,
  Users,
  CalendarDays,
  PlayCircle,
  CheckCircle,
  XCircle,
  ListChecks,
  BarChart2,
  Edit3,
  Eye,
  AlertTriangle,
  Clock,
  FilePlus2,
} from 'lucide-react';
import Header from '../components/Header';

// Dummy Data (replace with actual data fetching)
const courseDetailsData = {
  id: 'cs101',
  title: 'Advanced Algorithms & Data Structures',
  description:
    'Dive deep into complex algorithms, data structures, and problem-solving techniques. This course features hands-on coding challenges, weekly assignments, and interactive live sessions designed to prepare students for technical interviews and advanced software engineering roles.',
  imageUrl:
    'https://assets.leetcode.com/users/images/942e9e91-7f81-4513-8544-c462980a5d3a_1738741032.3553998.png',
  instructor: 'Dr. Evelyn Reed', // This would be the current instructor
  totalStudents: 1250,
  nextLiveClass: {
    date: '2025-05-24',
    time: '14:00 PKT',
    topic: 'Dynamic Programming Masterclass',
  },
};

const studentRequestsData = [
  {
    id: 'stud001',
    name: 'Alice Wonderland',
    avatarUrl: 'https://placehold.co/40x40/EA580C/FFFFFF?text=AW',
    requestDate: '2025-05-16',
  },
  {
    id: 'stud002',
    name: 'Bob The Builder',
    avatarUrl: 'https://placehold.co/40x40/303030/FFFFFF?text=BB',
    requestDate: '2025-05-15',
  },
  {
    id: 'stud003',
    name: 'Charlie Brown',
    avatarUrl: 'https://placehold.co/40x40/1A1A1A/FFFFFF?text=CB',
    requestDate: '2025-05-14',
  },
];

const assessmentHistoryData = [
  {
    id: 'test001',
    type: 'test',
    title: 'Midterm Exam: Sorting & Searching',
    date: '2025-04-30',
    averageScore: 78,
    submissions: 1200,
  },
  {
    id: 'assign001',
    type: 'assignment',
    title: 'Assignment 3: Graph Traversal',
    date: '2025-04-15',
    averageScore: 85,
    submissions: 1220,
  },
  {
    id: 'test002',
    type: 'test',
    title: 'Quiz 2: Heaps and Priority Queues',
    date: '2025-04-01',
    averageScore: 90,
    submissions: 1230,
  },
  {
    id: 'assign002',
    type: 'assignment',
    title: 'Assignment 2: Dynamic Arrays',
    date: '2025-03-20',
    averageScore: 82,
    submissions: 1240,
  },
];

// Reusable Header (similar to previous)

// Reusable Footer (similar to previous)
const Footer = () => (
  <footer className="border-t border-border_Col bg-dark-bg-primary py-10 text-dark-text-muted">
    <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
      <p className="font-poppins text-sm">
        &copy; {new Date().getFullYear()} CourseCraft. All rights reserved.
      </p>
    </div>
  </footer>
);

// Shadcn-UI like Card Component (Conceptual)
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
const CardFooter = ({ children, className = '' }) => (
  <div className={`border-t border-border_Col p-5 sm:p-6 ${className}`}>
    {children}
  </div>
);

// Shadcn-UI like Button Component (Conceptual)
const Button = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
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
  } else if (variant === 'destructive') {
    variantStyle = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400';
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
      : 'px-4 py-2 text-sm';
  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Shadcn-UI like Tabs (Conceptual)
const Tabs = ({ children, defaultValue, className }) => {
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
    <div className={`mt-4 ${className}`}>{children}</div>
  ) : null;

// Shadcn-UI like Avatar (Conceptual)
const Avatar = ({ children, className = '' }) => (
  <div className={`overflow-hidden rounded-full ${className}`}>{children}</div>
);
const AvatarImage = ({ src, alt, className = '' }) => (
  <img
    src={src}
    alt={alt}
    className={`h-full w-full object-cover ${className}`}
  />
);
const AvatarFallback = ({ children, className = '' }) => (
  <div
    className={`flex h-full w-full items-center justify-center bg-dark-bg-secondary4 font-semibold text-dark-text-muted ${className}`}
  >
    {children}
  </div>
);

// Main Course Management Page Component
const ManageInstructor = () => {
  const [course, setCourse] = useState(courseDetailsData);
  const [studentRequests, setStudentRequests] = useState(studentRequestsData);
  const [assessments, setAssessments] = useState(assessmentHistoryData);

  const handleAcceptStudent = (studentId) => {
    setStudentRequests((prev) => prev.filter((req) => req.id !== studentId));
    // Add logic to actually accept student
    console.log(`Accepted student ${studentId}`);
  };

  const handleRejectStudent = (studentId) => {
    setStudentRequests((prev) => prev.filter((req) => req.id !== studentId));
    // Add logic to actually reject student
    console.log(`Rejected student ${studentId}`);
  };

  const isLiveClassTime = () => {
    // Dummy logic: For demonstration, assume class can always be started if scheduled
    return course.nextLiveClass;
  };

  const handleScheduleNewTest = () => {
    // Logic to open a modal or navigate to a new page for scheduling a test
    console.log("Open 'Schedule New Test' form/modal.");
  };

  const handleScheduleNewAssignment = () => {
    // Logic to open a modal or navigate to a new page for scheduling an assignment
    console.log("Open 'Schedule New Assignment' form/modal.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-dark-bg-primary font-poppins text-dark-text-color">
      <Header />

      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        {/* Course Banner Section */}
        <Card className="mb-8 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 xl:w-1/4">
              <img
                src={course.imageUrl}
                alt={`Course: ${course.title}`}
                className="h-64 w-full object-cover md:h-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x400/1A1A1A/999999?text=Course+Image`;
                }}
              />
            </div>
            <div className="md:w-2/3 xl:w-3/4">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl">
                  {course.title}
                </CardTitle>
                <CardDescription className="mt-2 text-base leading-relaxed">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-dark-text-muted">Instructor:</p>
                    <p className="font-semibold">{course.instructor}</p>
                  </div>
                  <div>
                    <p className="text-dark-text-muted">Total Enrolled:</p>
                    <p className="font-semibold">
                      {course.totalStudents.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {/* Left Column / Main Content Area */}
          <div className="space-y-8 lg:col-span-2">
            {/* Student Enrollment Requests Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Student Enrollment Requests</CardTitle>
                  {studentRequests.length > 0 && (
                    <span className="rounded-full bg-text_primary px-2 py-0.5 text-xs font-bold text-dark-bg-primary">
                      {studentRequests.length}
                    </span>
                  )}
                </div>
                <CardDescription>
                  Review and approve new students for this course.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {studentRequests.length > 0 ? (
                  <ul className="space-y-4">
                    {studentRequests.map((req) => (
                      <li
                        key={req.id}
                        className="flex items-center justify-between rounded-md border border-border_Col bg-dark-bg-secondary2 p-3"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={req.avatarUrl}
                              alt={req.name}
                              onError={(e) => {
                                e.target.style.display =
                                  'none'; /* Hide img, fallback will show */
                              }}
                            />
                            <AvatarFallback className="text-sm">
                              {req.name.substring(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-dark-text-color">
                              {req.name}
                            </p>
                            <p className="text-xs text-dark-text-muted">
                              Requested:{' '}
                              {new Date(req.requestDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleAcceptStudent(req.id)}
                            aria-label={`Accept ${req.name}`}
                          >
                            <CheckCircle className="mr-1.5 h-4 w-4" /> Accept
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRejectStudent(req.id)}
                            aria-label={`Reject ${req.name}`}
                          >
                            <XCircle className="mr-1.5 h-4 w-4" /> Reject
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-4 text-center font-poppins text-dark-text-muted">
                    No pending student requests.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Assessment History Section */}
            <Card>
              <CardHeader className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle>Assessment History</CardTitle>
                  <CardDescription>
                    Track performance and schedule new assessments.
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleScheduleNewTest}
                  >
                    <FilePlus2 className="mr-1.5 h-4 w-4" /> Schedule New Test
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleScheduleNewAssignment}
                  >
                    <FilePlus2 className="mr-1.5 h-4 w-4" /> Schedule New
                    Assignment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tests">
                  <TabsList className="mb-4">
                    <TabsTrigger value="tests">Coding Tests</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tests">
                    <ul className="space-y-3">
                      {assessments
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
                                Date: {new Date(test.date).toLocaleDateString()}{' '}
                                | Avg. Score: {test.averageScore}%
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                /* Navigate to student performance page */
                              }}
                            >
                              <BarChart2 className="mr-1.5 h-4 w-4" /> View
                              Performance
                            </Button>
                          </li>
                        ))}
                      {assessments.filter((a) => a.type === 'test').length ===
                        0 && (
                        <p className="py-3 text-center text-dark-text-muted">
                          No coding tests found.
                        </p>
                      )}
                    </ul>
                  </TabsContent>
                  <TabsContent value="assignments">
                    <ul className="space-y-3">
                      {assessments
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
                                Submissions: {assign.submissions}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                /* Navigate to student performance page */
                              }}
                            >
                              <BarChart2 className="mr-1.5 h-4 w-4" /> View
                              Performance
                            </Button>
                          </li>
                        ))}
                      {assessments.filter((a) => a.type === 'assignment')
                        .length === 0 && (
                        <p className="py-3 text-center text-dark-text-muted">
                          No assignments found.
                        </p>
                      )}
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar / Actions Column */}
          <div className="space-y-6 md:space-y-8 lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Live Class Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.nextLiveClass ? (
                  <div className="rounded-lg border border-text_primary/30 bg-dark-bg-secondary2 p-4">
                    <p className="flex items-center font-semibold text-text_primary">
                      <Clock size={16} className="mr-2" />
                      Next Live Class:
                    </p>
                    <p className="mt-1 text-dark-text-color">
                      {course.nextLiveClass.topic}
                    </p>
                    <p className="text-sm text-dark-text-muted">
                      {new Date(course.nextLiveClass.date).toLocaleDateString(
                        'en-US',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}{' '}
                      at {course.nextLiveClass.time}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-border_Col bg-dark-bg-secondary2 p-4 text-center">
                    <AlertTriangle
                      size={24}
                      className="mx-auto mb-2 text-yellow-500"
                    />
                    <p className="font-poppins text-sm text-dark-text-muted">
                      No live class scheduled.
                    </p>
                  </div>
                )}
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    /* Open schedule modal */
                  }}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />{' '}
                  {course.nextLiveClass
                    ? 'Reschedule Live Class'
                    : 'Schedule Live Class'}
                </Button>
                <Button
                  variant="secondary"
                  className={`w-full ${
                    !isLiveClassTime() ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  onClick={() => {
                    /* Navigate to live class page */
                  }}
                  disabled={!isLiveClassTime()}
                  title={
                    !isLiveClassTime()
                      ? 'No live class scheduled or not time yet'
                      : 'Start the scheduled live class'
                  }
                >
                  <PlayCircle className="mr-2 h-4 w-4" /> Start Live Class
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="secondary" className="w-full">
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Course Content
                </Button>
                <Button variant="secondary" className="w-full">
                  <Users className="mr-2 h-4 w-4" /> Manage Enrolled Students
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-red-500 hover:bg-red-500/10 hover:text-red-400"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" /> Archive Course
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManageInstructor;
