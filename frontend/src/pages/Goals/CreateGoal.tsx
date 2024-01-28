import React, { useState } from 'react';
import './CreateGoal.css';

function CreateGoal() {
    const [goalName, setGoalName] = useState('');

    return (
        <div className="CreateGoal">
            <input
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="Name of the goal here"
                className="goal-name-input"
            />
            <input
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="Start typing and select the priority"
            />
            <div>
                <button>High Priority</button>
                <button>Medium Priority</button>
                <button>Low Priority</button>
            </div>
            <div>
                <label>
                    <input type="checkbox" />
                    Public
                </label>
                <label>
                    <input type="checkbox" />
                    Private
                </label>
            </div>
            <div>
                <button>+</button>
            </div>
            <div>
                <div>Drag & Drop or choose file to upload</div>
                <input type="file" />
            </div>
            <div>
                <button>Cancel</button>
                <button>Upload</button>
            </div>
        </div>
    );
}

export default CreateGoal;