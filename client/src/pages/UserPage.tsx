import { useEffect, useRef, useState } from 'react';
import './UserPage.css';
import { ProgressReport } from '../components/ProgressAssessment';
import { ProgressAssessment } from '../components/ProgressAssessment';
import { Modal } from '../components/Modal';
import { Filler } from 'chart.js';
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
  Legend,
  Filler
);

export type User = {
  userId?: number;
  userName: string;
};

export function UserPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [scoreHistory, setScoreHistory] = useState<ProgressReport[]>([]);

  const modal = useRef<HTMLDialogElement>(null);
  const bear = readToken();

  const { handleSignOut, user } = useUser();
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
        setScoreHistory(json);
      } catch (error) {
        console.error('Error fetching progress score:', error);
      }
    }
    if (user) {
      getData();
    }
  }, [bear, user]);

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

  const physical = scoreHistory.map((item) => item.typeOfPhysicalActivity);
  const dreamActivity = scoreHistory.map((item) => item.dreamActivity);
  const anxiety = scoreHistory.map((item) => item.panicAttacksIntensity);
  const chartScore = scoreHistory.map((item) => item.progressScore);
  const chartDate = scoreHistory.map((item) => {
    const date = new Date(item.date);
    return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`;
  });

  return (
    <>
      <>
        <div className="row-welcome">
          <h1 className="title">Welcome , Client</h1>
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
                      data: chartScore,
                      borderColor: 'rgb(0, 219, 219)',
                      backgroundColor: 'rgba(159, 183, 255, 0.25)',
                      fill: 'origin',
                      borderWidth: 0.8,
                      tension: 0.4,
                      yAxisID: 'y',
                      order: 1,
                    },
                    {
                      label: 'Anxiety Levels',
                      data: anxiety,
                      borderColor: 'rgba(6, 24, 187, 0.17)',
                      backgroundColor: 'rgba(41, 58, 249, 0.53)',
                      fill: '-1',
                      borderWidth: 1.2,
                      tension: 0.4,
                      order: 2,
                    },
                    {
                      label: 'Physical Activity',
                      data: physical,
                      borderColor: 'rgb(161, 1, 1)',
                      backgroundColor: 'rgba(255, 4, 4, 0.63)',
                      fill: 'origin',
                      tension: 0.4,
                      borderWidth: 1,
                      order: 3,
                    },
                    {
                      label: 'Dream Quality',
                      data: dreamActivity,
                      borderColor: 'rgb(255, 213, 0)',
                      backgroundColor: 'rgba(255, 183, 0, 0.96)',
                      fill: 'origin',
                      borderWidth: 1.2,
                      tension: 0.4,
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
                    filler: {
                      propagate: true,
                    },
                    legend: {
                      position: 'bottom',
                    },
                    tooltip: {
                      backgroundColor: 'rgb(5, 3, 29)',
                      borderWidth: 1,
                      cornerRadius: 6,
                      boxHeight: 5,
                      padding: 4,
                      caretSize: 4,
                      caretPadding: 2,
                      titleFont: {
                        size: 10,
                        family: 'Helvetica Neue',
                        weight: 'bold',
                      },
                      displayColors: false,
                      yAlign: 'bottom',
                      xAlign: 'left',
                      bodySpacing: 2,
                      titleSpacing: 2,
                      enabled: true,
                      mode: 'index',
                      axis: 'y',
                      intersect: false,
                      position: 'nearest',
                      bodyFont: {
                        size: 8,
                      },
                      callbacks: {
                        title: function (tooltipItems) {
                          return tooltipItems[0].label;
                        },
                        label: function (context) {
                          const dataIndex = context.dataIndex;
                          const details = scoreHistory[dataIndex];
                          if (
                            details === undefined ||
                            details.progressScore === undefined
                          ) {
                            return [];
                          } else {
                            [
                              `Dream: ${details.dreamActivity}`,
                              ` Depression: ${details.depressionLevel}`,
                              `Sleep: ${details.sleepQuality}`,
                              ` Activity: ${details.durationOfActivity}`,
                              ` Bedtime:${details.bedtime}`,
                            ];
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
        <div className="row">
          <div className="actions">
            <button className="my-butt" type="submit" onClick={openModal}>
              Assign report
            </button>
            {isOpen && (
              <Modal
                isOpen={isOpen}
                onClose={() => {
                  if (isOpen) setIsOpen(false);
                }}>
                <button className="my-butt" onClick={closeModal}>
                  Close
                </button>
                <ProgressAssessment
                  onSubmitSuccess={handleSuccess}
                  onClose={closeModal}
                />
              </Modal>
            )}
            <Link to="/calendar">
              <button className="my-butt">Calendar</button>
            </Link>
            <Link to="/locate">
              <button className="my-butt">Therapy Locator</button>
            </Link>

            <button
              className="my-butt"
              onClick={() => {
                handleSignOut();
                navigate('/');
              }}>
              Sign Out
            </button>
          </div>
        </div>
      </>
    </>
  );
}
