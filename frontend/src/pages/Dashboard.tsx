import React from 'react';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>
            <div className="panel">
                <div className="calendar-half">
                    <p>Progress</p>
                    {/* Calendar component */}
                </div>
                <div className="task-list-half">
                    <p>Tasks</p>
                    {/* New Task List component */}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

