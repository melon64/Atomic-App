import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Goal.css";
import apiService from '../../services/apiService';
import { setupAxios } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

interface Task {
    day: number;
    start_time: string;
    end_time: string;
    task_name: string;
}

interface GoalInterface {
    comments: any[];
    goal_creation_date: string;
    goal_description: string;
    goal_duration: string;
    goal_name: string;
    goal_priority: string;
    goal_start_date: string;
    goal_status: string;
    id: string;
    image_url: string;
    isPrivate: string;
    tasks: Task[];
    user: string;
}

function Goal() {
    const navigate = useNavigate();
    useEffect(() => {
        setupAxios();
        const token = localStorage.getItem('authToken');
        if (!token || token === 'undefined') {
            navigate('/');
        }
    }, [navigate]);

    let params = useParams() as { id: string }
    const [goal, setGoal] = useState<GoalInterface | null>(null);
    useEffect(() => {
        const getGoal = async () => {
            try {
                const response = await apiService.getGoal(params.id)
                setGoal(response)
            } catch (error) {
                console.error("Error: ", error)
            }
        }
        getGoal()
    }, [])
    

    console.log(goal)

    return (
        <div className="GoalBox">
            <h1>{goal?.goal_name}</h1>
            <div>
                <span>Status: {goal?.goal_status}</span>
                <span>Priority: {goal?.goal_priority}</span>
                <span>Privacy: {goal?.isPrivate === 'true' ? 'Private' : 'Public'}</span>
            </div>
            <p>{goal?.goal_description}</p>
            {/* Calendar Component */}
            <p>Total number of tasks: {goal?.tasks.length}</p>
            <p>Day started: {goal?.goal_creation_date.split(' ')[0]}</p>
            
        </div>
    );
}

export default Goal;

