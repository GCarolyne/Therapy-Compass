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
  const [isOpen, setIsOpen] = useState(true);
  // const [progress, setProgress] = useState<string>();
  const [scoreHistory, setScoreHistory] = useState<ProgressReport[]>([]);
  const modal = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('/api/progressassessment');
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = (await response.json()) as ProgressReport[];
        setScoreHistory(json);
      } catch (error) {
        console.error('Error fetching progress score:', error);
      }
    }
    getData();
  }, []);

  function handleSuccess(responseData: ProgressReport) {
    setScoreHistory([...scoreHistory, responseData]);
  }

  function openModal() {
    modal.current?.showModal();
    setIsOpen(true);
  }

  function closeModal() {
    modal.current?.close();
    setIsOpen(false);
  }

  // const chartScore = scoreHistory.map((item) => item.progressScore);
  // const chartDate = scoreHistory.map((item) => item.date);

  const chartScore = Array.isArray(scoreHistory)
    ? scoreHistory.map((item) => item.progressScore)
    : [];
  const chartDate = Array.isArray(scoreHistory)
    ? scoreHistory.map((item) => item.date)
    : [];
  return (
    <>
      <div className="body-row">
        <div className="column-two">
          <p>Welcome, User name</p>
          <div className="placeholder-chart">
            <Line
              data={{
                labels: chartDate,
                datasets: [
                  {
                    label: 'WellBeing Score',
                    data: chartScore,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgb(75, 192, 192)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
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
                      boxWidth: 10,
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
                  },
                },
              }}
              height={300}
            />
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
                onClose={closeModal}
                onSubmitSuccess={handleSuccess}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
