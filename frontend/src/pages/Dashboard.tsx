import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import TaskList from '../components/TaskList';

import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();

    const token = localStorage.getItem('authToken');
    if (!token || token === 'undefined') {
        navigate('/');
    }

    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>
            <div className="panel">
                <div className="calendar-half">
                    <p>Progress</p>
                    {/* Calendar component */}
                </div>
                <div className="task-list-half">
                    <TaskList></TaskList>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

