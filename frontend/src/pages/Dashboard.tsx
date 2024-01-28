import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { setupAxios } from '../services/apiService';
import CalendarComponent from '../components/CalendarComponent';

import TaskList from '../components/TaskList';

import './Dashboard.css';
interface Event {
    day: number;
    end_time: string;
    start_time: string;
    task_name: string;
  }
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
    
    const [events, setEvents] = useState<Event[]>([])
    useEffect(() => {
        const fetchEvents = async () => {
            const result = await apiService.getTasks()
            setEvents(result)
        }
        fetchEvents()
    }, []) 

    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>
            <div className="panel">
                <div className="calendar-half">
                    <p>Progress</p>
                    <CalendarComponent events={events} viewType='week'/>
                </div>
                <div className="task-list-half">
                    <TaskList tasks={tasks}></TaskList>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

