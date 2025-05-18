import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AppChallenge from './APPChallenge/App.jsx';
import AppChallengeAt from './AppChallenge@/Layouts/AppLayout.jsx';
import AppCollaboration from './AppCollboration/Pages/LiveCode.jsx/CodeEnvironment.jsx';

import AppShowCase from './AppShowCase/App.jsx';
import AppVirtualLab from './AppVirtualLab/App.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Front from './Front.jsx';
import Login from './Authentication/Login.jsx';
import Signup from './Authentication/SignUp.jsx';
import Collboration from './AppCollboration/Collboration.jsx';
import MyGroups from "./AppCollboration/Pages/MyGroups.jsx"
import AllGroups from './AppCollboration/Pages/AllGroups.jsx';
import CollaborationLayout from './AppCollboration/Layouts/CollaborationLayout.jsx';
import TaskAssigned from './AppCollboration/Pages/AssignedTasks/TaskAssigned.jsx';
import Nopage from './assests/Componets/Nopage.jsx';
import TasksPage from './AppCollboration/Pages/AssignedTasks/TasksPage.jsx';
import LivePair from './AppCollboration/Pages/LiveCode.jsx/LivePair.jsx';
import DefaultPage from './AppChallenge@/DefaultPage.jsx';

import DashboardChallenge  from "./AppChallenge@/Pages/DashBoard/Dashboard.jsx"
import DisplayProblemList from './AppChallenge@/Pages/ProblemList/DisplayProblemList.jsx';
import ChallengeGroup from "./AppChallenge@/Pages/Groups/Groups.jsx"
import Group from './AppChallenge@/Pages/Groups/Group.jsx';
import ChallengeBoard from './AppChallenge@/Pages/LeaderBoard/ChallengeBoard.jsx';
import Profile from './AppChallenge@/Pages/Profile/Profile.jsx';
import EditorLayout from './AppEditor/Layouts/EditorLayout.jsx';

import CodeingEnvironment from './AppEditor/CodeingEnvironment.jsx';
import AdminCreateTask from './AppCollboration/Pages/AssignedTasks/AdminCreateTask/AdminCreateTask.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/SignUp' element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appchallenge" element={<AppChallenge />} />

        <Route path="/appchallenge@" element={<AppChallengeAt />} >
          <Route index element={<Navigate to={"dashboard"}/>}/>
          <Route path="dashboard" element={<DashboardChallenge/>} />
          <Route path="problemlist" element={<DisplayProblemList/>} />
          <Route path="groups" element={<ChallengeGroup/>} />
          <Route path="groups/:id" element={<Group/>} />
          <Route path="leaderboard" element={<ChallengeBoard/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="*" element={<Nopage/>} />

        </Route>


        <Route path="/appcollaboration" element={<CollaborationLayout />}>
          <Route index element={<Navigate to="all-groups" replace />} />
          <Route path="all-groups" element={<AllGroups/>} />
          <Route path="my-groups" element={<MyGroups />} />
          <Route path="assigned-tasks" element={<TaskAssigned />}/ >
          <Route path="tasks" element={<TasksPage/>} />
          <Route path="code/live" element={<LivePair/>} />
          <Route path="AdminTask" element={<AdminCreateTask/>} />
          <Route path="Live" element={<AppCollaboration/>} />
          <Route path="*" element={<Nopage />} />
        </Route>
        <Route path="/appeditor" element={<EditorLayout />} >
          <Route index element={<Navigate to='editor' replace />}/>
          <Route path='editor' element={<CodeingEnvironment/>}/>
          <Route path="*" element={<Nopage />} />
        </Route>
        <Route path="/appshowcase" element={<AppShowCase />} />
        <Route path="/appvirtuallab" element={<AppVirtualLab />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Router>
  );
}
export default App;
