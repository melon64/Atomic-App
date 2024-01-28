import React from 'react'
import { useParams } from 'react-router-dom'
import "../../Goal.css";

function Goal() {
    let { id } = useParams();
    return (
        <div className="title">
            <h1>Goal {id}</h1>
        </div>
    );
}

export default Goal;

