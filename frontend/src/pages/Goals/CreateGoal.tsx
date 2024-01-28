import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import { setupAxios } from '../../services/apiService';
import './CreateGoal.css';

interface Task {
    goal: string;
    task_name: string;
    start_time: string;
    end_time: string;
    day: number;
}

interface Goal {
    user: string;
    goal_name: string;
    goal_description: string;
    goal_creation_date: string;
    image_url: string;
    goal_start_date: string;
    goal_duration: number;
    goal_status: string;
    goal_priority: string;
    isPrivate: string;
    comments: string[];
    tasks: Task[]; 
}

function CreateGoal() {
    const navigate = useNavigate();
  
    useEffect(() => {
      setupAxios();
      const token = localStorage.getItem('authToken');
      if (!token || token === 'undefined') {
        navigate('/');
      }
    }, [navigate]);

    const [goalName, setGoalName] = useState('');
    const [goalDescription, setGoalDescription] = useState('');
    const [goalStartDate, setGoalStartDate] = useState('');
    const [goalDuration, setGoalDuration] = useState(0);
    const [goalPriority, setGoalPriority] = useState('');
    const [isPrivate, setIsPrivate] = useState('');
    const [image, setImage] = useState<File | null>(null);

    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('goal_name', goalName);
        formData.append('goal_description', goalDescription);
        formData.append('goal_start_date', goalStartDate);
        formData.append('goal_duration', goalDuration.toString());
        formData.append('goal_status', 'Active');
        formData.append('goal_priority', goalPriority);
        formData.append('isPrivate', isPrivate);
        if (image) {
            formData.append('image', image);
        }
        try {
            const response = await apiService.addGoal(formData);
            console.log('Goal submitted:', response.data);
            navigate('/user/goals');
        } catch (error) {
            console.error('Error submitting goal:', error);
        }
    };

    return (
        <form className="CreateGoal" onSubmit={handleSubmit}>
            <input
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="Name of the goal here"
                className="goal-name-input"
            />

            <textarea
                value={goalDescription}
                onChange={(e) => setGoalDescription(e.target.value)}
                placeholder="Describe your goal"
                className="goal-description-input"
            />

            <input
                type="number"
                value={goalDuration}
                onChange={(e) => setGoalDuration(parseInt(e.target.value))}
                placeholder="Duration of the goal in days"
                className="goal-description-input"
            />

            <textarea
                value={goalStartDate}
                onChange={(e) => setGoalStartDate(e.target.value)}
                placeholder="YYYY-MM-DD"
                className="goal-description-input"
            />

            <div className="priority-input">
                <button 
                    className="button high-priority" 
                    style={{color: '#D26060'}}
                    onClick={() => setGoalPriority('High')}
                >
                    High Priority
                </button>
                <button 
                    className="button medium-priority" 
                    style={{color: '#CC861E'}}
                    onClick={() => setGoalPriority('Medium')}
                >
                    Medium Priority
                </button>
                <button 
                    className="button low-priority" 
                    style={{color: '#7AA789'}}
                    onClick={() => setGoalPriority('Low')}
                >
                    Low Priority
                </button>
            </div>

            <p>Priority: {goalPriority}</p>

            <div className="visibility-toggle">
                <label>
                    <input 
                        type="checkbox" 
                        onChange={() => setIsPrivate('False')} 
                        checked={isPrivate === 'False'}
                    />
                    Public
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        onChange={() => setIsPrivate('True')} 
                        checked={isPrivate === 'True'}
                    />
                    Private
                </label>
            </div>

            <p>Visibility: {isPrivate === 'True' ? 'Private' : 'Public'}</p>

            <div className="image-upload-section" style={{
                display: 'flex',         
                flexDirection: 'column', 
                alignItems: 'center',   
                justifyContent: 'center'
            }}>
                <div>Drag & Drop or choose image to upload</div>
                <input 
                    type="file" 
                    onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                            setImage(event.target.files[0]);
                        }
                    }}
                />
            </div>
            
            <button type="submit" className="sbutton upload">Submit</button>
        </form>
    );
}


export default CreateGoal;