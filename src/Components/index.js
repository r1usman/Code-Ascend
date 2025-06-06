import {
  Activity,
  BookOpen,
  Braces,
  Code,
  Code2,
  FlaskConical,
  GraduationCap,
  LogOut,
  MessageSquare,
  Settings,
  Terminal,
  User,
  Users,
} from 'lucide-react';
import { FaChalkboardTeacher } from 'react-icons/fa';

export const notifications = [
  {
    id: 1,
    title: 'New Python Challenge Available',
    time: '2m ago',
    type: 'challenge',
  },
  {
    id: 2,
    title: 'Sarah commented on your solution',
    time: '1h ago',
    type: 'message',
  },
  {
    id: 3,
    title: "You earned the 'Code Ninja' badge!",
    time: '2h ago',
    type: 'achievement',
  },
];

export const achievements = [
  { id: 1, name: 'Algorithm Master', progress: 80, total: 100 },
  { id: 2, name: 'Bug Crusher', progress: 45, total: 50 },
  { id: 3, name: 'Code Reviewer', progress: 28, total: 30 },
];

export const recentActivities = [
  {
    id: 1,
    title: "Completed 'Binary Search' challenge",
    time: 'Today, 10:30 AM',
    type: 'challenge',
  },
  {
    id: 2,
    title: "Earned 'Early Bird' badge",
    time: 'Yesterday',
    type: 'badge',
  },
  {
    id: 3,
    title: "Started 'Advanced React' course",
    time: '2 days ago',
    type: 'course',
  },
];

export const navItems = [
  { to: '/Dashboard', label: 'Dashboard', Icon: Activity },
  { to: '/appchallenge@', label: 'Challenges', Icon: Terminal },
  { to: '/appcollaboration', label: 'Collaborations', Icon: Users },
  { to: '/appvirtuallab', label: 'Virtual Lab', Icon: FlaskConical },
  { to: '/appeditor', label: 'Editor', Icon: Code },

  { to: '/instructor-courses', label: 'Teaching', Icon: FaChalkboardTeacher },

  { to: '/student-courses', label: 'Learning', Icon: GraduationCap },
];

export const setting = [

  {
    to: '/Logout',
    label: 'Logout',
    Icon: LogOut,
  },
];
