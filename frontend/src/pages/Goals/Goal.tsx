import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../../Goal.css";
import apiService from '../../services/apiService';

function Goal() {
    let params = useParams() as { id: string }
    const [goal, setGoal] = useState();

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



    return (
        <div className="title">
            <h1>Goal {params.id}</h1>
            <div>{ goal }</div>
        </div>
    );
}

export default Goal;

