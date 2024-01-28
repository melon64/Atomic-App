import moment from "moment"
import { Calendar, momentLocalizer } from "react-big-calendar"
import './CalendarComponent.scss'

function CalendarComponent() {
  const localizer = momentLocalizer(moment);

  const events = [
    {
      title: "Event 1",
      start: new Date(2024, 0, 28, 14),
      end: new Date(2024, 0, 28, 15),
    },
    {
      title: "Event 2",
      start: new Date(2024, 0, 5),
      end: new Date(2024, 0, 6),
    },
  ]

  return (
    <div className="CalendarComponent">
      <div className="myCustomHeight">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
        />
      </div>
    </div>
  );
}

export default CalendarComponent;
