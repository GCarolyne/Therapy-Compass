import { TherapyAssessment } from '../components/TherapyAssessment';

import './FindTherapist.css';

export function FindTherapist() {
  return (
    <div className="find-therapist-container">
      <header className="page-header">
        <h1>Find Your Therapist</h1>
        <p className="subtitle">
          Take our assessment to match with the right therapist for your needs
        </p>
      </header>
      <div className="main-content">
        <div className="row">
          <div className="column-one">
            <div className="card">
              <TherapyAssessment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
