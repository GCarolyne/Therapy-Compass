import { TherapyAssessment } from '../components/TherapyAssessment';

import './FindTherapist.css';

export function FindTherapist() {
  return (
    <div className="row-with-map">
      <div className="column-one">
        <div className="card">
          <TherapyAssessment />
        </div>
      </div>
    </div>
  );
}
