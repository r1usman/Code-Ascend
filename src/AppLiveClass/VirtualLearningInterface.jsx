import { useState } from 'react';
import NotificationCenter from './common/NotificationCenter';
import Navbar from './layout/Navbar';
import InstructorView from './views/InstructorView.jsx';
import StudentView from './views/StudentView.jsx';

export default function VirtualLearningInterface() {
  const [view, setView] = useState('student'); // 'student' or 'instructor'
  const [showNotifications, setShowNotifications] = useState(false);
  const [layout, setLayout] = useState('default'); // 'default', 'split', 'pip'

  const toggleView = () => {
    setView(view === 'student' ? 'instructor' : 'student');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const changeLayout = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg-primary to-dark-bg-secondary2 font-robert-regular text-dark-text-color transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <Navbar
          view={view}
          toggleView={toggleView}
          theme={'dark'}
          toggleNotifications={toggleNotifications}
          layout={layout}
          changeLayout={changeLayout}
        />

        {/* Main content */}
        <div className="relative mb-6">
          {view === 'student' ? (
            <StudentView layout={layout} />
          ) : (
            <InstructorView layout={layout} />
          )}
        </div>

        {/* Notification overlay */}
        {showNotifications && (
          <div className="absolute right-4 top-16 z-50">
            <NotificationCenter onClose={() => setShowNotifications(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
