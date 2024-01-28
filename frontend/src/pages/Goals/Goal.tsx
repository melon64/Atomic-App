import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Goal.css";
import apiService from '../../services/apiService';
import { setupAxios } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import Comments from '../../components/Comments';

interface Task {
    day: number;
    start_time: string;
    end_time: string;
    task_name: string;
}

interface Comment {
    goal: string;
    user: string;
    text: string;
    image_url: string;
    creation_date: string;
}

interface GoalInterface {
    comments: Comment[];
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

    console.log(goal);

    const [commentText, setCommentText] = useState('');

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value);
    };

    const [commentImage, setCommentImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setCommentImage(event.target.files[0]);
        }
    };

    const [comments, setComments] = useState<Comment[]>([]);
    useEffect(() => {
        const fetchComments = async () => {
            const comments = await apiService.getComments(params.id);
            setComments(comments);
        }
        fetchComments();
    }, []);

    const handleCommentSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('text', commentText);
            if (commentImage) {
                formData.append('image', commentImage);
            }
            await apiService.addComment(params.id, formData);    

            setCommentText('');
            setCommentImage(null);
            
            window.location.reload();
        } catch (error) {
            console.error("Error submitting comment: ", error)
        }
    };

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

            <input type="text" value={commentText} onChange={handleCommentChange} placeholder="Enter your comment" />
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleCommentSubmit}>Submit Comment</button>

            <Comments comments={comments} />

        </div>
    );
}

export default Goal;

