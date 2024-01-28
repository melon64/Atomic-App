import React, { useState } from 'react';
import './CreateGoal.css'; // Make sure this is the correct path to your CSS file

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

            <textarea
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="Describe your goal"
                className="goal-description-input"
            />

            <div className="priority-input">
                <button className="button high-priority" style={{color: '#D26060'}}>High Priority</button>
                <button className="button medium-priority" style={{color: '#CC861E'}}>Medium Priority</button>
                <button className="button low-priority" style={{color: '#7AA789'}}>Low Priority</button>
            </div>
            <div className="visibility-toggle">
                <label>
                    <input type="checkbox" />
                    Public
                </label>
                <label>
                    <input type="checkbox" />
                    Private
                </label>
            </div>
            <div className="image-upload-section" style={{
                    display: 'flex',         // Enables flexbox
                    flexDirection: 'column', // Stack children vertically
                    alignItems: 'center',    // Centers children horizontally in the flex container
                    justifyContent: 'center' // Centers children vertically in the flex container
                    }}>
                <div>Drag & Drop or choose image to upload</div>
                <input type="file"/>
            </div>
            <div className="form-actions">
                <button className="button cancel">Cancel</button>
                <button className="button upload">Upload</button>
            </div>
        </div>
    );
}

export default CreateGoal;