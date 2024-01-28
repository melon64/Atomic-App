import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { setupAxios } from '../services/apiService';

import TaskList from '../components/TaskList';

import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
  
    useEffect(() => {
      setupAxios();
      const token = localStorage.getItem('authToken');
      if (!token || token === 'undefined') {
        navigate('/');
      }
    }, [navigate]);
  
   const [tasks, setTasks] = useState([])
    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await apiService.GetTaskList();
            setTasks(tasks);
        }
        fetchTasks();
    }, []);
    console.log(tasks);

    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>
            <div className="panel">
                <div className="calendar-half">
                    <p>Progress</p>
                    {/* Calendar component */}
                </div>
                <div className="task-list-half">
                    <TaskList tasks={tasks}></TaskList>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

