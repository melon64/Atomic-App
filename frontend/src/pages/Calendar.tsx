import { useEffect, useState } from 'react';
import './Calendar.css'
import CalendarComponent from "./CalendarComponent"
import { useNavigate } from 'react-router';
import apiService, { setupAxios } from '../services/apiService';

interface Event {
    day: number;
    end_time: string;
    start_time: string;
    task_name: string;
  }


function Calendar() {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
      setupAxios();
      const token = localStorage.getItem('authToken');
      if (!token || token === 'undefined') {
        navigate('/');
      }
    }, [navigate]);

    useEffect(() => {
        const fetchEvents = async () => {
            const result = await apiService.getTasks()
            setEvents(result)
        }
        fetchEvents()
    }, []) 

    return (
        <div className="Calendar">
            <CalendarComponent events={events}/>
            
        </div>
    );
}

export default Calendar;

