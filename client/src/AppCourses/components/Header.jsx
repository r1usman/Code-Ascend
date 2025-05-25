import { BookOpen, PlusCircle, Settings } from 'lucide-react';
import { useRole } from '../context/CoursesContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isStudent, toggleView } = useRole(); // Assuming this is used to check if the user is a student or instructor

  return (
    <header className="sticky top-0 z-50 border-b border-border_Col bg-dark-bg-secondary2 text-dark-text-color shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <BookOpen className="mr-2 h-8 w-8 text-text_primary" />
          <h1 className="font-general text-3xl tracking-tight">
            Course<span className="text-text_primary">Craft</span>
          </h1>
        </div>
        <nav className="flex items-center space-x-4 sm:space-x-6">
          <Link
            to={`/${isStudent ? 'student' : 'instructor'}-courses`}
            onClick={toggleView}
            className="hidden font-poppins text-sm transition-colors duration-300 hover:text-text_primary sm:block"
          >
            {isStudent ? 'Instructor View' : 'Student View'}
          </Link>
          <button className="flex items-center rounded-lg bg-text_primary px-4 py-2 font-poppins text-xs font-semibold text-dark-text-color shadow-sm transition-all duration-300 hover:opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 sm:px-5 sm:py-2.5 sm:text-sm">
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
export default Header;
