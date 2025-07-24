import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode, faArrowUp, faBug, faChartLine, faClock } from '@fortawesome/free-solid-svg-icons';
import { faJs, faPython, faJava, faPhp } from '@fortawesome/free-brands-svg-icons';
import Chart from 'chart.js/auto';
import ProjectCard from './ProjectCard';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { useColorScheme } from '@mui/joy/styles';

const Dashboard = () => {
  const { mode } = useColorScheme();
  const refactorChartRef = useRef(null);
  const languageChartRef = useRef(null);
  const refactorChartInstance = useRef(null);
  const languageChartInstance = useRef(null);

  useEffect(() => {
    const isDark = mode === 'dark';
    const textColor = isDark ? '#e1e4e8' : '#374151';
    const gridColor = isDark ? 'rgba(68, 75, 84, 0.5)' : 'rgba(209, 213, 219, 0.5)';

    if (refactorChartInstance.current) refactorChartInstance.current.destroy();
    if (languageChartInstance.current) languageChartInstance.current.destroy();

    if (refactorChartRef.current) {
      const refactorCtx = refactorChartRef.current.getContext('2d');
      if (refactorCtx) {
        refactorChartInstance.current = new Chart(refactorCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
              label: 'Projets refactorisés',
              data: [12, 19, 15, 22, 18, 24, 27],
              borderColor: isDark ? '#58a6ff' : '#3b82f6',
              backgroundColor: isDark ? 'rgba(88, 166, 255, 0.2)' : 'rgba(59, 130, 246, 0.2)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#fff',
              pointBorderColor: isDark ? '#58a6ff' : '#3b82f6',
              pointRadius: 5,
              pointHoverRadius: 7,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  color: textColor,
                  font: {
                    size: 14,
                  },
                },
              },
              tooltip: {
                backgroundColor: isDark ? '#161b22' : '#fff',
                titleColor: isDark ? '#e1e4e8' : '#000',
                bodyColor: isDark ? '#c9d1d9' : '#545454',
                borderColor: isDark ? '#30363d' : '#ccc',
                borderWidth: 1,
                 hoverOffset: 30,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: gridColor,
                },
                ticks: {
                  color: textColor,
                },
              },
              x: {
                grid: {
                  color: gridColor,
                },
                ticks: {
                  color: textColor,
                },
              },
            },
            animation: {
              duration: 1000,
              easing: 'easeInOutQuart',
            },
          },
        });
      }
    }

    if (languageChartRef.current) {
      const languageCtx = languageChartRef.current.getContext('2d');
      if (languageCtx) {
        languageChartInstance.current = new Chart(languageCtx, {
          type: 'doughnut',
          data: {
            labels: ['JavaScript', 'Python', 'Java', 'PHP', 'C#'],
            datasets: [{
              data: [35, 25, 20, 15, 5],
              backgroundColor: [
                '#3f89c56e',
                '#483fc56e',
                '#f3a812b4',
                '#a8dadcc4',
                '#e6394785'
              ],
              borderColor: [
                '#3f89c5ff',
                '#483fc5ff',
                '#f3a812ff',
                '#a8dadcff',
                '#e63947ff'
              ],
              borderWidth: 1,
              hoverOffset: 30,
            }]

          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  color: textColor,
                  font: {
                    size: 14,
                  },
                },
              },
              tooltip: {
                backgroundColor: isDark ? '#161b22' : '#fff',
                titleColor: isDark ? '#e1e4e8' : '#000',
                bodyColor: isDark ? '#c9d1d9' : '#545454',
                borderColor: isDark ? '#30363d' : '#ccc',
                borderWidth: 1,
              },
            },
            cutout: '70%',
            animation: {
              duration: 1000,
              easing: 'easeInOutQuart',
            },
          },
        });
      }
    }

    return () => {
      if (refactorChartInstance.current) refactorChartInstance.current.destroy();
      if (languageChartInstance.current) languageChartInstance.current.destroy();
    };
  }, [mode]);

  const recentProjectsData = [
    { id: 1, name: 'Projet API JavaScript', langIcon: faJs, langColor: 'text-yellow-400', time: 'il y a 2 heures', status: 'Terminé', statusColor: 'bg-green-100 dark:bg-gray-700 text-green-800 dark:text-green-400', iconBg: 'bg-yellow-100 dark:bg-gray-800' },
    { id: 2, name: 'Script Python', langIcon: faPython, langColor: 'text-blue-400', time: 'il y a 1 jour', status: 'Terminé', statusColor: 'bg-green-100 dark:bg-gray-700 text-green-800 dark:text-green-400', iconBg: 'bg-blue-100 dark:bg-gray-800' },
    { id: 3, name: 'Application Java', langIcon: faJava, langColor: 'text-red-400', time: 'il y a 3 jours', status: 'Terminé', statusColor: 'bg-green-100 dark:bg-gray-700 text-green-800 dark:text-green-400', iconBg: 'bg-red-100 dark:bg-gray-800' },
    { id: 4, name: 'Site Web PHP', langIcon: faPhp, langColor: 'text-purple-400', time: 'il y a 1 semaine', status: 'Terminé', statusColor: 'bg-green-100 dark:bg-gray-700 text-green-800 dark:text-green-400', iconBg: 'bg-purple-100 dark:bg-gray-800' },
    { id: 5, name: 'Projet C#', langIcon: faFileCode, langColor: 'text-green-400', time: 'il y a 2 semaines', status: 'Terminé', statusColor: 'bg-green-100 dark:bg-gray-700 text-green-800 dark:text-green-400', iconBg: 'bg-green-100 dark:bg-gray-800' },
  ];

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: 'background.body', backgroundColor: mode === 'dark' ? '#0d1117' : '#f6f8fa' }}>
      <Box className="max-w-7xl mx-auto">
        <Box sx={{ px: { xs: 0, sm: 2 }, py: 2 }}>
          <Typography level="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: mode === 'dark' ? '#e1e4e8' : '#1b1f23' }}>
            Tableau de bord
          </Typography>

          <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[
              { title: 'Projets refactorisés', value: '24', change: '+12%', icon: faFileCode, color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.2)' },
              { title: 'Problèmes résolus', value: '142', change: '+8%', icon: faBug, color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.2)' },
              { title: 'Complexité réduite', value: '32%', change: '+5%', icon: faChartLine, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.2)' },
              { title: 'Temps économisé', value: '42h', change: '+18%', icon: faClock, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.2)' },
            ].map((stat, index) => (
              <Sheet key={index} variant="outlined" sx={{ borderRadius: 'lg', overflow: 'hidden', bgcolor: 'background.surface', backgroundColor: mode === 'dark' ? '#161b22' : '' }}>
                <Box sx={{ p: 2.5 }}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-md p-3" style={{ backgroundColor: mode === 'dark' ? stat.bgColor : stat.bgColor }}>
                      <FontAwesomeIcon icon={stat.icon} style={{ color: mode === 'dark' ? stat.color : stat.color }} />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <Typography component="dt" className="text-sm font-medium" sx={{ color: mode === 'dark' ? '#c9d1d9' : '#57606a' }}>
                          {stat.title}
                        </Typography>
                        <dd className="flex items-baseline">
                          <Typography component="div" className="text-2xl font-semibold" sx={{ color: mode === 'dark' ? '#e1e4e8' : '#1b1f23' }}>
                            {stat.value}
                          </Typography>
                          <div className="ml-2 flex items-baseline text-sm font-semibold" style={{ color: mode === 'dark' ? '#3fb950' : stat.color }}>
                            <FontAwesomeIcon icon={faArrowUp} className="text-xs self-center" />
                            <span className="sr-only">Increased by</span>
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </Box>
              </Sheet>
            ))}
          </Box>

          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Sheet variant="outlined" sx={{ p: 3, borderRadius: 'lg', bgcolor: 'background.surface', backgroundColor: mode === 'dark' ? '#161b22' : '' }}>
              <Typography level="h4" component="h3" sx={{ color: mode === 'dark' ? '#e1e4e8' : '#1b1f23' }}>
                Évolution des refactorisations
              </Typography>
              <div className="h-64">
                <canvas ref={refactorChartRef} id="refactorChart" className="w-full h-full"></canvas>
              </div>
            </Sheet>
            <Sheet variant="outlined" sx={{ p: 3, borderRadius: 'lg', bgcolor: 'background.surface', backgroundColor: mode === 'dark' ? '#161b22' : '' }}>
              <Typography level="h4" component="h3" sx={{ color: mode === 'dark' ? '#e1e4e8' : '#1b1f23' }}>
                Répartition par langage
              </Typography>
               <div style={{ position: 'relative', height: '300px', width: '350px', margin: '0 auto' }}>
                <canvas ref={languageChartRef} id="languageChart" className="w-full h-full"></canvas>
              </div>
            </Sheet>
          </Box>

          <Sheet variant="outlined" sx={{ borderRadius: 'lg', overflow: 'hidden', bgcolor: 'background.surface', backgroundColor: mode === 'dark' ? '#161b22' : '' }}>
            <Box sx={{ px: 2.5, py: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography level="h4" component="h3" sx={{ color: mode === 'dark' ? '#e1e4e8' : '#1b1f23' }}>
                Projets récents
              </Typography>
              <Typography sx={{ color: mode === 'dark' ? '#c9d1d9' : '#57606a' }}>
                Vos 5 derniers projets refactorisés
              </Typography>
            </Box>
            <Box>
              <ul className="divide-y" style={{ borderColor: mode === 'dark' ? '#30363d' : '#eaecef' }}>
                {recentProjectsData.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </ul>
            </Box>
          </Sheet>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
