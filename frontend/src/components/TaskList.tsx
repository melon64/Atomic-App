import React, { useState } from 'react';
import './TaskList.css';

interface TaskItem {
    day: number;
    end_time: string;
    start_time: string;
    task_name: string;
    completed: boolean; // Add a 'completed' property to TaskItem interface
}

interface Task {
    goal_name: string;
    goal_tasks: TaskItem[];
}

interface TaskListProps {
    tasks: Task[];
}

function TaskList({ tasks = [] }: TaskListProps) {
    const [completedTasks, setCompletedTasks] = useState<number[]>([]); // Track completed task indices

    //filter the tasks by day to only keep the tasks for the current day
    const currentDay = new Date().getDay();
    console.log(currentDay);
    const filteredTasks = tasks.map(task => {
        const filteredGoalTasks = task.goal_tasks.filter(taskItem => taskItem.day === currentDay);
        return { ...task, goal_tasks: filteredGoalTasks };
    });
    tasks = filteredTasks;



    return (
        <div className="TaskList">
            {tasks.map((task, index) => (
                <div key={index} className="task-container">
                    <h2>{task.goal_name}</h2>
                    <ul>
                        {task.goal_tasks.map((taskItem, taskIndex) => {
                            const taskItemKey = `${index}-${taskIndex}`;
                            return (
                                <li key={taskItemKey}>
                                    <div className="task-item-header">
                                        <p className="times">Start Time: {taskItem.start_time}</p>
                                        <p className="times">End Time: {taskItem.end_time}</p>
                                    </div>
                                    <div className="task-item-header">
                                        <p className="task-name">Task: {taskItem.task_name}</p>
                                        <input
                                            type="checkbox"
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default TaskList;