import React from 'react';
import './GoalList.css';

interface Task {
    day: number;
    start_time: string;
    end_time: string;
    task_name: string;
}

interface Goal {
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

interface GoalListProps {
    goals: Goal[];
}

function GoalList({ goals = [] }: GoalListProps) {
    const handleAddGoal = () => {
        window.location.href = '/user/goals/create';
    };

    const handleGoalClick = (id: string) => {
        window.location.href = `/user/goals/${id}`;
    };

    const calculateDaysRemaining = (goalStartDate: string, goalDuration: string) => {
        const startDate = new Date(goalStartDate);
        const durationInDays = parseInt(goalDuration);
        const endDate = new Date(startDate.getTime() + durationInDays * 24 * 60 * 60 * 1000);
        const today = new Date();
        const timeDiff = endDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysRemaining > 0 ? daysRemaining : 0;
    };

    return (
        <div className="GoalList">
            <div className="goal-card" onClick={handleAddGoal}>
                <h2>Add New Goal</h2>
                <p>Click here to upload a new goal</p>
            </div>
            {goals.map((goal, index) => (
                <div key={index} className="goal-card" style={{ backgroundImage: `url(${goal.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleGoalClick(goal.id)}>
                    <h2>{goal.goal_name}</h2>
                    <p>Days Duration: {goal.goal_duration}</p>
                    <p>Days Remaining: {calculateDaysRemaining(goal.goal_start_date, goal.goal_duration)}</p>
                </div>
            ))}
        </div>
    );

}

export default GoalList;