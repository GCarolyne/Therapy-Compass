import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './CalendarTrack.css';
import { useMemo } from 'react';
const localizer = momentLocalizer(moment);

export function CalendarTrack() {
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(2025, 3, 1),
    }),
    []
  );
  return (
    <div className="row-calendar">
      <Calendar
        defaultDate={defaultDate}
        localizer={localizer}
        style={{ height: 100 }}
      />
    </div>
  );
}
