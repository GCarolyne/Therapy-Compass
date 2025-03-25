import './EventForm.css';

export function EventForm() {
  return (
    <div className="modal-popup">
      <form className="modal-form">
        <label>
          Title:
          <input type="text" name="title"></input>
        </label>
        <label>
          Notes:
          <textarea name="progress-notes"></textarea>
        </label>
        <div className="form-buttons">
          <button type="button" className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
