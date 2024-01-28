import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../Goal.css";
import apiService from "../../services/apiService";

function Goal() {
    let { id } = useParams();
    const [goal, setGoal] = useState();

    useEffect(() => {
        const getProfile = async () => {
            try {
                const profile = await apiService.getProfile()
                const goal = await apiService.GetGoal(profile['goals'][0])
                setGoal(goal)
            } catch (error) {
                console.error('Error: ', error)
            }
        }

        getProfile()
    }, [])

    return (
        <div className="container">
            <h1 className="">Goal {id}</h1>
        </div>
    );
}

export default Goal;
