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
  allDay?: boolean;
  notes: string;
};

export function CalendarTrack() {
  const [isOpen, setIsOpen] = useState(false);

  const [isEvent, setIsEvent] = useState<Event[]>([]);

  const [selectedSlot, setSelectedSlot] = useState<SlotInfo>();

  const eventPropGetter: EventPropGetter<Event> = useCallback(
    (event: Event, start: Date, _end: Date, isSelected: boolean) => ({
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

  const start = moment().startOf('month').startOf('week').format('YYYY/MM/DD');
  const end = moment().endOf('month').endOf('week').format('YYYY/MM/DD');

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
        const dateRange = {
          start: moment(start, 'YYYY/MM/DD').toDate(),
          end: moment(end, 'YYYY/MM/DD').toDate(),
        };
        const events: Event[] = json.map((item: Event) => {
          const event: Event = {
            title: item.title ? item.title : 'untitled event',
            start: dateRange.start ? dateRange.start : new Date(),
            end: dateRange.end ? dateRange.end : new Date(),
            notes: item.notes ? item.notes : '',
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
  }, [start, end]);

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
              events={isEvent}
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
