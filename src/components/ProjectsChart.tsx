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

const ProjectsChart = () => {
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

  const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Projets',
        data: [3, 5, 8, 6, 7, 9, 11],
        borderColor: isDarkMode ? '#58a6ff' : 'rgb(53, 162, 235)',
        backgroundColor: isDarkMode ? 'rgba(88, 166, 255, 0.5)' : 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ProjectsChart;
