import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import AppChallenge from './APPChallenge/App.jsx';
import AppChallengeAt from './AppChallenge@/Layouts/AppLayout.jsx';
import AppCollaboration from './AppCollboration/Pages/LiveCode.jsx/CodeEnvironment.jsx';

import CollaborationLayout from './AppCollboration/Layouts/CollaborationLayout.jsx';
import AllGroups from './AppCollboration/Pages/AllGroups.jsx';
import TaskAssigned from './AppCollboration/Pages/AssignedTasks/TaskAssigned.jsx';
import TasksPage from './AppCollboration/Pages/AssignedTasks/TasksPage.jsx';
import LivePair from './AppCollboration/Pages/LiveCode.jsx/LivePair.jsx';
import MyGroups from './AppCollboration/Pages/MyGroups.jsx';
import Nopage from './assests/Componets/Nopage.jsx';
import Login from './Authentication/Login.jsx';
import Signup from './Authentication/SignUp.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';

import DashboardChallenge from './AppChallenge@/Pages/DashBoard/Dashboard.jsx';
import Group from './AppChallenge@/Pages/Groups/Group.jsx';
import ChallengeGroup from './AppChallenge@/Pages/Groups/Groups.jsx';
import ChallengeBoard from './AppChallenge@/Pages/LeaderBoard/ChallengeBoard.jsx';
import DisplayProblemList from './AppChallenge@/Pages/ProblemList/DisplayProblemList.jsx';
import Profile from './AppChallenge@/Pages/Profile/Profile.jsx';

import '..//src/index.css';
import AdminCreateTask from './AppCollboration/Pages/AssignedTasks/AdminCreateTask/AdminCreateTask.jsx';
import { RoleProvider } from './AppCourses/context/CoursesContext.jsx';
import InstructorCourses from './AppCourses/instructor/InstructorCourses.jsx';
import CourseManagementPage from './AppCourses/instructor/ManageInstructor.jsx';
import StudentCourseDetailPage from './AppCourses/student/ManageStudent.jsx';
import StudentCourses from './AppCourses/student/StudentCourses.jsx';
import CodeingEnvironment from './AppEditor/CodeingEnvironment.jsx';
import EditorLayout from './AppEditor/Layouts/EditorLayout.jsx';
import VirtualLearningInterface from './AppLiveClass/VirtualLearningInterface.jsx';
import ChangePassword from './Authentication/ChangePassword.jsx';
import ForgetPassword from './Authentication/ForgetPassword.jsx';
import OTP from './Authentication/OTP.jsx';
import { RightBarProvider } from './Dashboard/ContextApi/DisplayContextApi.jsx';

function App() {
  // const { user } = useContext(CollabContext);
  return (
    <RoleProvider>
      <RightBarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/appchallenge" element={<AppChallenge />} />

            <Route path="/appchallenge@" element={<AppChallengeAt />}>
              <Route index element={<Navigate to={'dashboard'} />} />
              <Route path="dashboard" element={<DashboardChallenge />} />
              <Route path="problemlist" element={<DisplayProblemList />} />
              <Route path="groups" element={<ChallengeGroup />} />
              <Route path="groups/:id" element={<Group />} />
              <Route path="leaderboard" element={<ChallengeBoard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Nopage />} />
            </Route>

            <Route path="/appcollaboration" element={<CollaborationLayout />}>
              <Route index element={<Navigate to="all-groups" replace />} />
              <Route path="all-groups" element={<AllGroups />} />
              <Route path="my-groups" element={<MyGroups />} />
              <Route path="assigned-tasks" element={<TaskAssigned />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="code/live" element={<LivePair />} />
              <Route path="AdminTask" element={<AdminCreateTask />} />
              <Route path="Live" element={<AppCollaboration />} />
              <Route path="*" element={<Nopage />} />
            </Route>
            <Route path="/appeditor" element={<EditorLayout />}>
              <Route index element={<Navigate to="editor" replace />} />
              <Route path="editor" element={<CodeingEnvironment />} />
              <Route path="*" element={<Nopage />} />
            </Route>

            <Route path="instructor-courses" element={<InstructorCourses />} />
            <Route path="student-courses" element={<StudentCourses />} />
            <Route
              path="instructor-manage"
              element={<CourseManagementPage />}
            />
            <Route
              path="student-manage"
              element={<StudentCourseDetailPage />}
            />
            <Route path="class-live" element={<VirtualLearningInterface />} />
            <Route path="edit-profile" element={<Profile />} />
          </Routes>
        </Router>
      </RightBarProvider>
    </RoleProvider>
  );
}
export default App;
