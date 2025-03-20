// import { useEffect, useState } from 'react';
// import { TherapyAssessment } from '../components/TherapyAssessment';
// import { Map } from '@vis.gl/react-google-maps';
// import './FindTherapist.css';

// type Therapy = {
//   onType: string;
// };

// export function FindTherapist({ onType }: Therapy) {
//   const [therapist, setTherapist] = useState<Therapy>();
//   const [map, setMap] = useState<google.maps.Map>();

//   useEffect(() => {
//     async function getData() {
//       try {
//         const response = await fetch('/api/therapyassessment');
//         if (!response.ok) {
//           throw new Error(`Response status: ${response.status}`);
//         }
//         const therapyTypeJson = (await response.json()) as Therapy;
//         setTherapist(therapyTypeJson);
//       } catch (error) {
//         console.error('Error fetching therapy type:', error);
//       }
//     }

//     getData();
//   }, []);

//   function handleSubmit() {
//     // TODO: Implement submit handling logic
//     console.log('Assessment submitted');
//     // Store data in app state
//     // Navigate to next page
//   }

//   return (
//     <div className="find-therapist-container">
//       <header className="page-header">
//         <h1>Find Your Therapist</h1>
//         <p className="subtitle">
//           Take our assessment to match with the right therapist for your needs
//         </p>
//       </header>
//       <div className="main-content">
//         <div className="row">
//           <div className="column-one">
//             <div className="card">
//               <TherapyAssessment />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
