import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AppChallenge from './APPChallenge/App.jsx';
import AppChallengeAt from './AppChallenge@/App.jsx';
import AppCollaboration from './AppCollboration/App.jsx';
import AppEditor from './AppEditor/App.jsx';
import AppShowCase from './AppShowCase/App.jsx';
import AppVirtualLab from './AppVirtualLab/App.jsx';
import Dashboard from './Dashboard/App.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appchallenge" element={<AppChallenge />} />
        <Route path="/appchallenge@" element={<AppChallengeAt />} />
        <Route path="/appcollaboration" element={<AppCollaboration />} />
        <Route path="/appeditor" element={<AppEditor />} />
        <Route path="/appshowcase" element={<AppShowCase />} />
        <Route path="/appvirtuallab" element={<AppVirtualLab />} />
      </Routes>
    </Router>
  );
}
export default App;
