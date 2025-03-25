import { FormEvent } from 'react';
import './EventForm.css';

type Props = {
  onClose: () => void;
};

// type Event = {
//   id: number;
//   title: string;
//   start: Date;
//   end: Date;
//   allDay?: false;
//   notes: string;
// };

export function EventForm({ onClose }: Props) {
  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert(`Thank you for being diligent about your notes!`);
        const json = await response.json();
        console.log('test', json);
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
          <input type="text" name="title" className="space-input"></input>
        </label>
        <label>
          Notes:
          <textarea name="notes" className="progress-notes"></textarea>
        </label>
        <div className="form-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-button" onClick={onClose}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
