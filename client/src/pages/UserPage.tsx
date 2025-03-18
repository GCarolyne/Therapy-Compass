import { useRef, useState } from 'react';
import './UserPage.css';
import { Modal } from '../components/Modal';
import { ProgressAssessment } from '../components/ProgressAssessment';

export function UserPage() {
  const [isOpen, setIsOpen] = useState(true);
  const modal = useRef<HTMLDialogElement>(null);

  function openModal() {
    modal.current?.showModal();
    setIsOpen(true);
  }

  return (
    <>
      <div className="body-row">
        <div className="column-two">
          <p>Welcome, User name</p>
          <div className="placeholder-chart"></div>
          <button type="submit" onClick={openModal}>
            Assign report
          </button>
          <Modal
            isOpen={isOpen}
            onClose={() => {
              if (isOpen) setIsOpen(false);
            }}>
            <ProgressAssessment />
          </Modal>
        </div>
      </div>
    </>
  );
}
