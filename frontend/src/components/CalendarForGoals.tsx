import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "./CalendarComponent.scss";

const localizer = momentLocalizer(moment);
interface MyProps{
    startTime: string
    duration: number

}
function CustomCalendar({ startTime, duration }: MyProps) {
  // Create an event that represents the block on the calendar
  const event = {
    title: 'Your Goal',
    start: moment(startTime).toDate(),
    end: moment(startTime).add(duration - 1, 'days').toDate(), // Calculate the end date
  };

  // Set up the events array with the block event
  const events = [event];

  return (
    <div className="CalendarComponent">
      <div className="myCustomHeight">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}

export default CustomCalendar;
