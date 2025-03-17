import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProgressAssessment } from './components/ProgressAssessment.tsx';
import { TherapyAssessment } from './components/TherapyAssessment.tsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<TherapyAssessment />} />
        <Route path="progress" element={<ProgressAssessment />} />
      </Routes>
    </>
  );
}
