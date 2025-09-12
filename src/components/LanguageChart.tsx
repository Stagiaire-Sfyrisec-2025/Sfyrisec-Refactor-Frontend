import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LanguageChartProps {
  history: any[]; // A more specific type should be used here
}

const LanguageChart: React.FC<LanguageChartProps> = ({ history }) => {
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

  const projectsByLanguage = history.reduce((acc, entry) => {
    const lang = entry.options.mainLanguage || 'Unknown';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const data = {
    labels: Object.keys(projectsByLanguage),
    datasets: [
      {
        label: 'Répartition par langage',
        data: Object.values(projectsByLanguage),
        backgroundColor: isDarkMode
          ? ['#3f88c5', '#f3a712', '#a8dadc', '#e63946']
          : ['rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: isDarkMode
          ? ['#1d3557', '#f3a712', '#a8dadc', '#e63946']
          : ['rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#c9d1d9' : '#374151',
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default LanguageChart;
