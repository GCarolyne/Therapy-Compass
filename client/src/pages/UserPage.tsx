// import { useRef, useState } from 'react';
// import './UserPage.css';
// import { ProgressReport } from '../components/ProgressAssessment';
// import { ProgressAssessment } from '../components/ProgressAssessment';
// import { Modal } from '../components/Modal';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // type T = {
// //   anxietyLevel: string;
// //   depressionLevel: string;
// //   irritabilityLevel: string;
// //   panicAttacks: string;
// //   panicAttacksIntensity: string;
// //   typeStress: string;
// //   intensityStress: string;
// //   copingStrategy: string;
// //   copingStrategyManageStress: string;
// //   typeOfPhysicalActivity: string;
// //   durationOfActivity: string;
// //   intensityOfActivity: string;
// //   enjoymentLevel: string;
// //   moodBeforeActivity: string;
// //   moodAfterActivity: string;
// //   bedtime: string;
// //   wakeTime: string;
// //   totalSleep: string;
// //   sleepQuality: string;
// //   dreamActivity: string;
// //   morningMood: string;
// //   progressScore: string;
// // };

// export function UserPage() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [progress, setProgress] = useState<string>();
//   const [scoreHistory, setScoreHistory] = useState<ProgressReport[]>([]);
//   const modal = useRef<HTMLDialogElement>(null);

//   function handleSuccess(responseData: ProgressReport) {
//     const progressScore = responseData.progressScore;

//     setProgress(progressScore);
//     const newWeek = scoreHistory.length + 1;

//     setScoreHistory();

//     const responseArray = [
//       { key: 'progressScore', value: responseData.progressScore },
//       { key: 'anxietyLevel', value: responseData.anxietyLevel },
//       { key: 'depressionLevel', value: responseData.depressionLevel },
//       { key: 'morningMood', value: responseData.morningMood },
//       { key: 'totalSleep', value: responseData.totalSleep },
//     ];
//     return responseArray;
//   }

//   function openModal() {
//     modal.current?.showModal();
//     setIsOpen(true);
//   }

//   function closeModal() {
//     modal.current?.close();
//     setIsOpen(false);
//   }

//   return (
//     <>
//       <div className="body-row">
//         <div className="column-two">
//           <p>Welcome, User name</p>
//           <div className="placeholder-chart">
//             <Line
//               data={{
//                 labels: responseData.map((item) => item.key),
//                 datasets: [
//                   {
//                     label: 'WellBeing Score',
//                     data: { progressScore },
//                   },
//                 ],
//               }}
//             />
//           </div>
//           <button type="submit" onClick={openModal}>
//             Assign report
//           </button>
//           {isOpen && (
//             <Modal
//               isOpen={isOpen}
//               onClose={() => {
//                 if (isOpen) setIsOpen(false);
//               }}>
//               <ProgressAssessment
//                 onClose={closeModal}
//                 onSubmitSuccess={handleSuccess}
//               />
//             </Modal>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
