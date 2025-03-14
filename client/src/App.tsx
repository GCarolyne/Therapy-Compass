import './App.css';
import { ProgressAssessment } from './components/ProgressAssessment.tsx';
import { TherapyAssessment } from './components/TherapyAssessment.tsx';

export default function App() {
  return (
    <>
      <TherapyAssessment />
      <ProgressAssessment />
    </>
  );
}
