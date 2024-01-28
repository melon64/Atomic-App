import React from 'react'
import { useParams } from 'react-router-dom'

function Goal() {
    let { id } = useParams();
    return (
        <div className="Goal">
            <h1>Goal {id}</h1>
        </div>
    );
}

export default Goal;

