import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "./CalendarComponent.scss";

interface Event {
  day: number
  end_time: string
  start_time: string
  task_name: string
}

interface eventListProps {
  events: Event[]
  viewType: 'month' | 'week'
}

interface ParsedEvent {
  title: string
  start: Date
  end: Date
}

interface viewType {
  view: string
}

function CalendarComponent({ events, viewType }: eventListProps) {
  // function CalendarComponent() {
  const localizer = momentLocalizer(moment);
  // Function to convert events for all occurrences of a particular day in a month
  const convertEvents = (events: Event[]): ParsedEvent[] => {
    let convertedEvents: ParsedEvent[] = [];
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');

    events.forEach(event => {
      let dayOfMonth = startOfMonth.clone();

      while (dayOfMonth.isSameOrBefore(endOfMonth)) {
        if (dayOfMonth.day() === event.day) {
          const startDateTime = dayOfMonth.clone().set({
            hour: parseInt(event.start_time.split(":")[0]),
            minute: parseInt(event.start_time.split(":")[1])
          });

          const endDateTime = dayOfMonth.clone().set({
            hour: parseInt(event.end_time.split(":")[0]),
            minute: parseInt(event.end_time.split(":")[1])
          });

          convertedEvents.push({
            title: event.task_name,
            start: startDateTime.toDate(),
            end: endDateTime.toDate()
          });
        }

        dayOfMonth.add(1, 'day');
      }
    });

    return convertedEvents;
  };

  // Convert your events before passing them to the Calendar
  const calendarEvents = convertEvents(events);

  return (
    <div className="CalendarComponent">
      <div className="myCustomHeight">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView={ viewType }
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}

export default CalendarComponent;
