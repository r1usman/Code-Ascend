import { BookOpen, PlusCircle, Settings } from 'lucide-react';
import { useRole } from '../context/CoursesContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isStudent, toggleView } = useRole(); // Assuming this is used to check if the user is a student or instructor

  return (
    <div className="sticky top-0 z-40 border-b border-text_primary bg-dark-bg-secondary2 px-4 py-5 font-poppins text-2xl font-medium text-white  ">
      <Link to={'/dashboard'}>Code Ascend</Link>
    </div>
  );
};
export default Header;
