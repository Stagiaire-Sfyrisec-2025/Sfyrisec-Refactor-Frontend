import React, { useState, useEffect } from 'react';
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

interface ProjectsChartProps {
  history: any[]; // A more specific type should be used here
}

const ProjectsChart: React.FC<ProjectsChartProps> = ({ history }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString();
  }).reverse();

  const projectsByDate = history.reduce((acc, entry) => {
    const date = entry.timestamp.toLocaleDateString();
    if (last7Days.includes(date)) {
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  const chartData = last7Days.map(date => projectsByDate[date] || 0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#c9d1d9' : '#374151',
        },
      },
      title: {
        display: true,
        text: 'Projets par mois',
        color: isDarkMode ? '#c9d1d9' : '#374151',
      },
    },
    scales: {
      y: {
        grid: {
          color: isDarkMode ? '#30363d' : '#e0e0e0',
        },
        ticks: {
          color: isDarkMode ? '#c9d1d9' : '#374151',
        },
      },
      x: {
        grid: {
          color: isDarkMode ? '#30363d' : '#e0e0e0',
        },
        ticks: {
          color: isDarkMode ? '#c9d1d9' : '#374151',
        },
      },
    },
  };

  const data = {
    labels: last7Days,
    datasets: [
      {
        label: 'Projets',
        data: chartData,
        borderColor: isDarkMode ? '#58a6ff' : 'rgb(53, 162, 235)',
        backgroundColor: isDarkMode ? 'rgba(88, 166, 255, 0.5)' : 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ProjectsChart;
