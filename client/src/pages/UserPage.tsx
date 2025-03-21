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
import { Link } from 'react-router-dom';
import { readToken } from '../lib';

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
  const [progress, setProgress] = useState<ProgressReport[]>([]);
  const [scoreHistory, setScoreHistory] = useState<ProgressReport[]>([]);
  const modal = useRef<HTMLDialogElement>(null);
  const bear = readToken();
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
  function handleDetails(responseData: ProgressReport) {
    setProgress([...progress, responseData]);
  }
  function openModal() {
    modal.current?.showModal();
    setIsOpen(true);
  }

  function closeModal() {
    modal.current?.close();
    setIsOpen(false);
  }
  const anxiety = progress.map((item) => item.anxietyLevel);
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
      <div className="body-row">
        <div className="column-two">
          <Link to="/">
            <button>back</button>
          </Link>
          <Link to="/locate">
            <button>Therapy Locator</button>
          </Link>
          <p>Welcome, User name</p>
          <div className="chart-container">
            <div className="chart-inner">
              <h3 className="chart-title">Therapy Progress Report</h3>
              <div className="chart-wrapper">
                <Line
                  data={{
                    labels: chartDate,
                    datasets: [
                      {
                        fill: 'origin',
                        label: 'Full Report',
                        data: chartScore,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        pointStyle: 'circle',
                        pointBackgroundColor: 'rgb(93, 0, 144)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        order: 1,
                        yAxisID: 'y',
                      },
                      {
                        label: 'Anxiety Levels',
                        data: anxiety,
                        borderColor: 'rgb(93, 0, 144)',
                        yAxisID: 'y1',
                      },
                    ],
                  }}
                  options={{
                    onClick: (_event, elements) => {
                      if (elements.length > 0) {
                        const index = elements[0].index;
                        const reportData = scoreHistory[index];
                        handleDetails(reportData);
                      }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 4,
                    layout: {
                      padding: {
                        left: 0,
                        right: 0,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.1)',
                        },
                        ticks: {
                          font: {
                            size: 12,
                          },
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                        },
                        ticks: {
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: {
                          boxWidth: 20,
                          font: {
                            size: 14,
                          },
                        },
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        padding: 10,
                        titleFont: {
                          size: 14,
                        },
                        bodyFont: {
                          size: 14,
                        },
                        callbacks: {
                          label: function (context) {
                            const dataIndex = context.dataIndex;
                            const details = scoreHistory[dataIndex];
                            if (details) {
                              return [
                                `Anxiety: ${details.anxietyLevel}`,
                                `Depression:${details.depressionLevel}`,
                                `Irritability: ${details.irritabilityLevel}`,
                                `Panic: ${details.panicAttacksIntensity}`,
                                `Sleep: ${details.sleepQuality}`,
                              ];
                            }
                          },
                        },
                      },
                    },
                  }}
                  height={300}
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
        </div>
      </div>
    </>
  );
}
