import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './CalendarTrack.css';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventForm } from './EventForm';

const localizer = momentLocalizer(moment);

export function CalendarTrack() {
  return (
    <>
      <div className="row-calendar">
        <div className="fill-in">
          <h3>Keep track in the form of writing notes!</h3>
        </div>
      </div>
      <div className="parent">
        <div className="row-calendar">
          <Calendar
            defaultDate={new Date(2025, 3, 1)}
            localizer={localizer}
            style={{ height: 800 }}
            selectable
            popup={true}
          />
          <button>Submit</button>
          <EventForm />
        </div>
      </div>
    </>
  );
}
