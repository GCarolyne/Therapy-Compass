import { useEffect, useRef, useState } from 'react';
import './UserPage.css';
import { ProgressReport } from '../components/ProgressAssessment';
import { ProgressAssessment } from '../components/ProgressAssessment';
import { Modal } from '../components/Modal';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Link, useNavigate } from 'react-router-dom';
import { readToken } from '../lib';
import { useUser } from '../components/useUser';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function UserPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [scoreHistory, setScoreHistory] = useState<ProgressReport[]>([]);
  const modal = useRef<HTMLDialogElement>(null);
  const bear = readToken();
  const { handleSignOut } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('/api/progressassessment', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bear}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = (await response.json()) as ProgressReport[];
        console.log('data', json);
        setScoreHistory(json);
      } catch (error) {
        console.error('Error fetching progress score:', error);
      }
    }
    getData();
  }, [bear]);

  function handleSuccess(responseData: ProgressReport) {
    setScoreHistory([...scoreHistory, responseData]);
    setIsOpen(false);
  }

  function openModal() {
    modal.current?.showModal();
    setIsOpen(true);
  }

  function closeModal() {
    modal.current?.close();
    setIsOpen(false);
  }
  const sleep = scoreHistory.map((item) => item.sleepQuality);
  const anxiety = scoreHistory.map((item) => item.panicAttacksIntensity);
  const chartScore = scoreHistory.map((item) => item.progressScore);
  const chartDate = scoreHistory.map((item) => {
    const date = new Date(item.date);
    return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`;
  });
  console.log('chartscore', chartScore);
  console.log('chartDate', chartDate);
  return (
    <>
      <div className="row">
        <div className="column-two">
          <Link to="/">
            <button>back</button>
          </Link>
          <Link to="/locate">
            <button>Therapy Locator</button>
          </Link>

          <p>Welcome,</p>
          <div>
            <button
              onClick={() => {
                handleSignOut();
                navigate('/');
              }}>
              Sign Out
            </button>
          </div>
          <div className="row">
            <div className="chart-container">
              <div className="chart-inner">
                <h3 className="chart-title">Therapy Progress Report</h3>
                <Line
                  data={{
                    labels: chartDate,
                    datasets: [
                      {
                        label: 'Full Report',
                        data: [
                          '10',
                          '20',
                          '30',
                          '40',
                          '50',
                          '60',
                          ' 70',
                          ' 80',
                          '90',
                          '100',
                        ],
                        borderColor: 'rgb(75, 192, 192)',
                        yAxisID: 'y',
                        order: 1,
                      },
                      {
                        label: 'Anxiety Levels',
                        data: anxiety,
                        borderColor: 'rgb(93, 0, 144)',

                        order: 2,
                      },
                      {
                        label: 'Sleep Quality',
                        data: sleep,
                        borderColor: 'rgb(0,0,0)',

                        order: 3,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: 'Progress',
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: {
                        backgroundColor: 'rgb(122, 115, 209)',
                        borderWidth: 1,
                        cornerRadius: 6,
                        boxHeight: 5,
                        padding: 4,
                        caretSize: 4,
                        caretPadding: 2,
                        titleFont: {
                          size: 12,
                          family: 'Helvetica Neue',
                          weight: 'bold',
                        },
                        callbacks: {
                          label: function (context) {
                            console.log('context', context);
                            const dataIndex = context.dataIndex;
                            const details = scoreHistory[dataIndex];
                            if (details) {
                              switch (context.datasetIndex) {
                                case 0:
                                  return [
                                    `Dream: ${details.dreamActivity},
                                    Depression: ${details.depressionLevel},
                                    Sleep: ${details.sleepQuality},
                                    Activity: ${details.durationOfActivity},
                                    Bedtime:${details.bedtime},
                                    Coping Strategy:${details.copingStrategy},
                                    Stress Management:${details.copingStrategyManageStress},
                                    `,
                                  ];
                                case 1:
                                  return [
                                    `Anxiety: ${details.panicAttacks},
                                    ${details.anxietyLevel}`,
                                  ];
                                case 2:
                                  return [
                                    `Sleep: ${details.sleepQuality},${details.bedtime},${details.dreamActivity}`,
                                  ];
                              }
                            }
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <button type="submit" onClick={openModal}>
            Assign report
          </button>
          {isOpen && (
            <Modal
              isOpen={isOpen}
              onClose={() => {
                if (isOpen) setIsOpen(false);
              }}>
              <ProgressAssessment
                onSubmitSuccess={handleSuccess}
                onClose={closeModal}
              />
              <button onClick={closeModal}>Close</button>
            </Modal>
          )}
          <Link to="/calendar">
            <button>Calendar</button>
          </Link>
        </div>
      </div>
    </>
  );
}
