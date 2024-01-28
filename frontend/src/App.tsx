import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import CreateGoal from './pages/Goals/CreateGoal';
import Goal from './pages/Goals/Goal';
import UserGoals from './pages/Goals/UserGoals';
import CreateTask from './pages/CreateTask';
import Calendar from './pages/Calendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/goals" element={<UserGoals />} />
        <Route path="/user/goals/create" element={<CreateGoal />} />
        <Route path="/user/goals/:id" element={<Goal />} />
        <Route path="/user/tasks/" element={<CreateTask />} />
        <Route path="/user/calendar/" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;