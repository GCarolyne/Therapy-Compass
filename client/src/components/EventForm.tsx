import { FormEvent } from 'react';
import './EventForm.css';
import { useNavigate } from 'react-router-dom';
import { SlotInfo } from 'react-big-calendar';
import { readToken } from '../lib';
import { DBEvent, Event } from './CalendarTrack';

type Props = {
  onClose: () => void;
  onSuccess: (EventData: DBEvent) => void;
  slotInfo: SlotInfo;
};

export function EventForm({ onClose, onSuccess, slotInfo }: Props) {
  const navigate = useNavigate();
  const bear = readToken();

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const eventData: Event = {
      title: formData.get('title') as string,
      notes: formData.get('notes') as string,
      start: slotInfo.start,
      end: slotInfo.end,
    };

    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bear}`,
        },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        alert(`Thank you for being diligent about your notes!`);
        const json = await response.json();
        console.log(json);
        onSuccess(json);
        setTimeout(() => {
          navigate('/calendar');
        }, 1000);
        onClose();
      } else {
        alert('Error submitting progress report');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  return (
    <div className="modal-popup">
      <form className="modal-form" onSubmit={handleSave}>
        <label className="label-title">
          Title:
          <input
            type="text"
            name="title"
            className="space-input"
            defaultValue=""></input>
        </label>
        <label>
          Notes:
          <textarea name="notes" className="progress-notes"></textarea>
        </label>
        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-button"></button>
        </div>
      </form>
    </div>
  );
}
