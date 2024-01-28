import { useEffect, useState } from 'react';
import './Calendar.css'
import CalendarComponent from "./CalendarComponent"
import { useNavigate } from 'react-router';
import apiService, { setupAxios } from '../services/apiService';


function Calendar() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([])

    useEffect(() => {
      setupAxios();
      const token = localStorage.getItem('authToken');
      if (!token || token === 'undefined') {
        navigate('/');
      }
    }, [navigate]);

    useEffect(() => {
        const fetchEvents = async () => {
            const result = await apiService.
        }
    })
    

    return (
        <div className="Calendar">
            <CalendarComponent />
            
        </div>
    );
}

export default Calendar;

