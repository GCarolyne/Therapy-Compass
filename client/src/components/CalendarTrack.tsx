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
};

export type DBEvent = {
  title: string;
  notes: string;
  date: Date;
  userId: number;
};

export function CalendarTrack() {
  const [isOpen, setIsOpen] = useState(false);

  const [isEvent, setIsEvent] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
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
        const events: Event[] = json.map((EventData: DBEvent) => {
          const event: Event = {
            title: EventData.title || 'untitled event',
            start: EventData.date,
            end: EventData.date,
            allDay: true,
            notes: EventData.notes || '',
          };
          console.log(event);
          return event;
        });

        setIsEvent(events);
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    }
    getData();
  }, [bear]);

  function handleSuccess(EventData: DBEvent) {
    if (selectedEvent) {
      const updatedEvents = isEvent.map((event) => {
        if (event === selectedEvent) {
          return {
            ...event,
            title: EventData.title || 'untiled event',
            notes: EventData.notes || '',
          };
        }
        return event;
      });
      setIsEvent(updatedEvents);
    } else {
      const event: Event = {
        title: EventData.title || 'untitled event',
        start: EventData.date,
        end: EventData.date,
        allDay: true,
        notes: EventData.notes || '',
      };
      setIsEvent([...isEvent, event]);

      setIsOpen(false);
      setSelectedEvent(undefined);
      console.log('handle success was called.');
    }
  }

  //*REMEMBER TO UPDATE THE ISEVENT ARRAY WHEN THE NOTES AND TITLE GET MODIFIED.
  function closeModal() {
    console.log('test');
    setIsOpen(false);
  }

  function openModal() {
    console.log('openModal');
    setIsOpen(true);
  }

  const handleEventSelection = useCallback((e: Event) => {
    setSelectedEvent(e);
    openModal();
  }, []);

  const onSelectSlot = useCallback((slotInfo: SlotInfo) => {
    console.log(onSelectSlot);
    setSelectedSlot(slotInfo);
    openModal();
  }, []);

  console.log('is Event', isEvent);
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
              defaultDate={new Date()}
              startAccessor="start"
              endAccessor="end"
              localizer={localizer}
              style={{ height: 800 }}
              popup={true}
              showAllEvents={true}
              views={['month', 'day']}
              selectable={true}
              events={isEvent}
              onSelectSlot={onSelectSlot}
              onSelectEvent={handleEventSelection}
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
