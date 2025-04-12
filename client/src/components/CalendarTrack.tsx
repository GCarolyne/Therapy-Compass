import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import './CalendarTrack.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventForm } from './EventForm';
import { useCallback, useEffect, useState } from 'react';
import { readToken } from '../lib';

const localizer = momentLocalizer(moment);

export type Event = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  notes: string;
  notesId?: number;
};

export type DBEvent = {
  title: string;
  notes: string;
  date: Date;
  userId: number;
  notesId: number;
};

export function CalendarTrack() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventToEdit, setEventToEdit] = useState<Event>();
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo>();

  const bear = readToken();

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('/api/calendar', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bear}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = (await response.json()) as DBEvent[];
        const events: Event[] = json.map((eventData: DBEvent) => {
          const event: Event = {
            title: eventData.title || 'untitled event',
            start: eventData.date,
            end: eventData.date,
            allDay: true,
            notes: eventData.notes || '',
            notesId: eventData.notesId,
          };

          return event;
        });

        setEvents(events);
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    }
    getData();
  }, [bear]);

  function handleSuccess(eventData: DBEvent) {
    const event: Event = {
      title: eventData.title || 'untitled event',
      start: eventData.date,
      end: eventData.date,
      allDay: true,
      notes: eventData.notes || '',
      notesId: eventData.notesId,
    };
    setEvents([...events, event]);
    setIsOpen(false);
  }

  function handleUpdateEvent(eventData: Event) {
    setSelectedSlot(undefined);
    setIsOpen(true);
    setEventToEdit(eventData);
  }

  function handleEditEvent(eventData: DBEvent) {
    const objDataBase: Event = {
      title: eventData.title,
      notes: eventData.notes,
      start: eventData.date,
      end: eventData.date,
      notesId: eventData.notesId,
    };

    const update = events.map((item) =>
      item.notesId === eventData.notesId ? objDataBase : item
    );
    setEvents(update);
    setIsOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      setSelectedSlot(undefined);
      setEventToEdit(undefined);
      function openModal() {
        if (selectedSlot) {
          setEventToEdit(undefined);
        }
        setIsOpen(true);
      }
      setTimeout(() => {
        setSelectedSlot(slotInfo);
        openModal();
      }, 10);
    },
    [selectedSlot]
  );

  return (
    <>
      <div className="parent">
        <div className="row-calendar">
          <h3 className="h3-style">
            Keep track of your progress and share notes with your Therapist!
          </h3>
        </div>
      </div>
      <div className="parent">
        <div className="row-calendar">
          <div className="calendar-container">
            <Calendar
              defaultDate={new Date()}
              startAccessor="start"
              endAccessor="end"
              localizer={localizer}
              style={{ height: 800 }}
              popup={true}
              showAllEvents={true}
              views={['month', 'day']}
              selectable={true}
              events={events}
              onSelectSlot={onSelectSlot}
              onSelectEvent={handleUpdateEvent}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <EventForm
          onClose={closeModal}
          onSuccess={handleSuccess}
          onEdit={handleEditEvent}
          slotInfo={selectedSlot}
          editEvent={eventToEdit}
        />
      )}
    </>
  );
}
