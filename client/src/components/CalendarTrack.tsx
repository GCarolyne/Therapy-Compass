import {
  Calendar,
  momentLocalizer,
  EventPropGetter,
  SlotInfo,
} from 'react-big-calendar';
import moment from 'moment';
import './CalendarTrack.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventForm } from './EventForm';
import { useCallback, useEffect, useState } from 'react';

const localizer = momentLocalizer(moment);

type Event = {
  title: string;
  start: Date;
  end: Date;
  allDay?: false;
  notes: string;
};

export function CalendarTrack() {
  const [isOpen, setIsOpen] = useState(false);

  const [isEvent, setIsEvent] = useState<Event[]>([]);

  const [selectedSlot, setSelectedSlot] = useState<SlotInfo>();

  const eventPropGetter: EventPropGetter<Event> = useCallback(
    (event: Event, start: Date, end: Date, isSelected: boolean) => ({
      ...(isSelected && {
        style: {
          backgroundColor: '#000',
        },
      }),
      ...(moment(start).hour() < 12 && {
        className: 'powderBlue',
      }),
      ...(event.title.includes('Notes') && {
        className: 'darkGreen',
      }),
    }),
    []
  );

  // const start = moment().startOf('month').startOf('week').format('YYYY/MM/DD');
  // const end = moment().endOf('month').endOf('week').format('YYYY/MM/DD');

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('/api/calendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = (await response.json()) as Event[];
        setIsEvent(json);
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    }
    getData();
  }, []);

  function handleSuccess(EventData: Event) {
    setIsEvent([...isEvent, EventData]);
    setIsOpen(false);
    console.log('handle success was called.');
  }

  function closeModal() {
    console.log('test');
    setIsOpen(false);
  }

  function openModal() {
    console.log('openModal');
    setIsOpen(true);
  }

  const onSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
    openModal();
  }, []);

  const events = [
    {
      title: 'Meeting with Team',
      start: new Date(2025, 3, 10, 10, 0), // April 10, 2025, 10:00 AM
      end: new Date(2025, 3, 10, 11, 30), // April 10, 2025, 11:30 AM
      notes: 'Discuss project timeline',
    },
    {
      title: 'Doctor Appointment',
      start: new Date(2025, 3, 15, 14, 0), // April 15, 2025, 2:00 PM
      end: new Date(2025, 3, 15, 15, 0), // April 15, 2025, 3:00 PM
      notes: 'Annual checkup',
    },
  ];
  // on select slot is a event handler and it will be the calendar library will call this function when  slot is clicked and pass the information
  // it will pass the slot info object that will have all the information

  return (
    <>
      <div className="row-calendar">
        <div className="row">
          <h3>Keep track in the form of writing notes!</h3>
        </div>
      </div>
      <div className="parent">
        <div className="row-calendar">
          <div className="calendar-container">
            <Calendar
              defaultDate={new Date(2025, 3, 1)}
              localizer={localizer}
              style={{ height: 800 }}
              popup={true}
              showAllEvents={true}
              views={['month', 'day', 'agenda']}
              eventPropGetter={eventPropGetter}
              selectable={true}
              events={events}
              onSelectSlot={onSelectSlot}
            />
          </div>
        </div>
      </div>
      {isOpen && selectedSlot && (
        <EventForm
          onClose={closeModal}
          onSuccess={handleSuccess}
          slotInfo={selectedSlot}
        />
      )}
    </>
  );
}
