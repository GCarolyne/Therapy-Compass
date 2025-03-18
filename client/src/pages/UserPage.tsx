import { useRef, useState } from 'react';
import './UserPage.css';

import { ProgressAssessment } from '../components/ProgressAssessment';
import { Modal } from '../components/Modal';

export function UserPage() {
  const [isOpen, setIsOpen] = useState(true);
  const modal = useRef<HTMLDialogElement>(null);

  // useEffect(() => {
  //   async function loadScore(progressScore: number){

  //   }
  // });
  function openModal() {
    modal.current?.showModal();
    setIsOpen(true);
  }
  function closeModal() {
    modal.current?.close();
    setIsOpen(false);
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
          {isOpen && (
            <Modal
              isOpen={isOpen}
              onClose={() => {
                if (isOpen) setIsOpen(false);
              }}>
              <ProgressAssessment onClose={closeModal} />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
