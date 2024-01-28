import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import { setupAxios } from '../../services/apiService';
import GoalList from '../../components/GoalList';
import Goal from './Goal';

function UserGoals() {
    const navigate = useNavigate();
  
    useEffect(() => {
      setupAxios();
      const token = localStorage.getItem('authToken');
      if (!token || token === 'undefined') {
        navigate('/');
      }
    }, [navigate]);
  
   const [goals, setGoals] = useState([])
    useEffect(() => {
        const fetchGoals = async () => {
            const goals = await apiService.getGoals();
            setGoals(goals);
        }
        fetchGoals();
    }, []);

    return (
        <div className="UserGoals">
            <h1>Your Goals</h1>
            <GoalList goals={goals}></GoalList>

        </div>
    );
}

export default UserGoals;
