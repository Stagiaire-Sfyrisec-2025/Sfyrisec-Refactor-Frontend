import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
} from 'recharts';
import { Project } from '../types/project';

interface HistoryChartProps {
  data: Project[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
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

  const chartData = data
    .filter(p => p.improvement && p.improvement !== '')
    .map(project => ({
      name: project.name.length > 12 ? project.name.slice(0, 12) + '…' : project.name,
      improvement: parseFloat(project.improvement.replace(/[+%]/g, '')),
    }));

  const darkThemeColors = ['#2d5d8a', '#4a8a7a', '#a36d4a', '#8a4b6c', '#6d8a4b', '#4b6c8a'];
  const lightThemeColors = ['#A8DADC', '#F4A261', '#E76F51', '#2A9D8F', '#F4D35E', '#264653'];
  const colors = isDarkMode ? darkThemeColors : lightThemeColors;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const tickColor = isDarkMode ? '#c9d1d9' : '#555';
  const gridColor = isDarkMode ? '#30363d' : '#e0e0e0';

  return (
    <div className="bg-white dark:bg-dark-card-bg rounded-lg p-6 max-w-4xl mx-auto shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text-main mb-6 text-center">
        Progression & amélioration des projets
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 15, right: 30, left: 20, bottom: 60 }}
          barCategoryGap="40%"
          onMouseLeave={() => setActiveIndex(null)}
        >
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fill: tickColor, fontWeight: '600', fontSize: 13 }}
            angle={-40}
            textAnchor="end"
            interval={0}
            height={55}
            dy={10}
          />
          <YAxis
            tick={{ fill: tickColor, fontWeight: '600', fontSize: 13 }}
            tickFormatter={val => `${val}%`}
            domain={[0, 'dataMax + 15']}
          />

          <Tooltip
            cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }}
            contentStyle={{
              backgroundColor: isDarkMode ? '#161b22' : 'white',
              borderRadius: 6,
              border: `1px solid ${gridColor}`,
              color: tickColor,
              padding: '10px 14px',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
            formatter={(value: number) => `${value}%`}
          />

          <Bar
            dataKey="improvement"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            radius={[8, 8, 0, 0]}
            animationDuration={700}
            animationEasing="ease-in-out"
            barSize={50}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={activeIndex === index ? colors[index % colors.length] : `${colors[index % colors.length]}cc`}
                style={{
                  cursor: 'pointer',
                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
