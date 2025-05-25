import React from "react";
import {
  User,
  Book,
  Moon,
  Sun,
  Bell,
  Layout,
  MonitorSmartphone,
  Split,
} from "lucide-react";



const Navbar = ({
  view,
  toggleView,
  toggleTheme,
  theme,
  toggleNotifications,
  layout,
  changeLayout,
}) => {
  return (
    <div className="font-poppins flex justify-between items-center mb-6 py-3 px-4 bg-dark-bg-secondary2/50 backdrop-blur-sm rounded-lg shadow-md border border-dark-gray-border">
      <div className="flex items-center gap-2">
        <Book size={24} className="text-text_primary" />
        <span className=" text-xl text-dark-text-color">
          VirtualClassroom
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex bg-dark-bg-secondary3 rounded-lg p-1">
          <button
            onClick={() => changeLayout("default")}
            className={`p-2 rounded transition-all ${
              layout === "default"
                ? "bg-text_primary text-dark-text-color"
                : "text-dark-text-muted hover:text-dark-text-color"
            }`}
            title="Default View"
          >
            <Layout size={18} />
          </button>
          <button
            onClick={() => changeLayout("split")}
            className={`p-2 rounded transition-all ${
              layout === "split"
                ? "bg-text_primary text-dark-text-color"
                : "text-dark-text-muted hover:text-dark-text-color"
            }`}
            title="Split View"
          >
            <Split size={18} />
          </button>
          <button
            onClick={() => changeLayout("pip")}
            className={`p-2 rounded transition-all ${
              layout === "pip"
                ? "bg-text_primary text-dark-text-color"
                : "text-dark-text-muted hover:text-dark-text-color"
            }`}
            title="Picture-in-Picture"
          >
            <MonitorSmartphone size={18} />
          </button>
        </div>

        <button
          onClick={toggleNotifications}
          className="p-2 bg-dark-bg-secondary3 hover:bg-dark-bg-secondary4 rounded-full transition-all"
          title="Notifications"
        >
          <Bell size={18} className="text-dark-text-color" />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 bg-dark-bg-secondary3 hover:bg-dark-bg-secondary4 rounded-full transition-all"
          title={
            theme === "dark" ? "Switch to Darker Theme" : "Switch to Dark Theme"
          }
        >
          {theme === "dark" ? (
            <Moon size={18} className="text-dark-text-color" />
          ) : (
            <Sun size={18} className="text-text_primary" />
          )}
        </button>

        <button
          onClick={toggleView}
          className="bg-text_primary hover:bg-text_primary/90 px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-text_primary/20 transition-all duration-300 text-dark-text-color "
        >
          <User size={16} />
          <span>{view === "student" ? "Instructor View" : "Student View"}</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
