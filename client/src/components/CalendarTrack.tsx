import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './CalendarTrack.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventForm } from './EventForm';
import { useEffect, useRef, useState } from 'react';
// import { Modal } from './Modal';

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
  // const [isEvent, setIsEvent] = useState<Event[]>([]);
  const modal = useRef<HTMLDialogElement>(null);

  function openModal() {
    modal.current?.showModal();
    setIsOpen(true);
  }

  function closeModal() {
    modal.current?.close();
    setIsOpen(false);
  }

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
        console.log('json', json);
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    }
    getData();
  }, []);

  // const events = [
  //   {
  //     title:
  //     start: new Date(),
  //     end: new Date(),
  //     allDay: false,
  //     notes: JSON.title,
  //   },
  // ];

  return (
    <>
      <div className="row-calendar">
        <div className="row">
          <h3>Keep track in the form of writing notes!</h3>
        </div>
      </div>
      <div className="parent">
        <div className="row-calendar">
          <div className="calendar-container" onClick={openModal}>
            <Calendar
              defaultDate={new Date(2025, 3, 1)}
              localizer={localizer}
              style={{ height: 800 }}
              selectable={'ignoreEvents'}
              popup={true}
              showAllEvents={true}
              views={['month', 'day', 'agenda']}
            />

            {isOpen && <EventForm onClose={closeModal} />}
          </div>
        </div>
      </div>
    </>
  );
}
