import React, { useEffect, useRef, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode, faArrowUp, faBug, faChartLine, faClock } from '@fortawesome/free-solid-svg-icons';
import { faJs, faPython, faJava, faPhp } from '@fortawesome/free-brands-svg-icons';
import Chart from 'chart.js/auto';
import ProjectCard from '../../components/ProjectCard';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { useColorScheme } from '@mui/joy/styles';
import { RefactoringHistoryContext } from '@/context/RefactoringHistoryContext';

const DashboardPage = () => {
  const { mode } = useColorScheme();
  const { history } = useContext(RefactoringHistoryContext);
  const [dashboardStats, setDashboardStats] = useState({
    projectsRefactored: 0,
    problemsSolved: 0,
    complexityReduced: 0,
    timeSaved: 0, // Placeholder
  });
  const refactorChartRef = useRef<HTMLCanvasElement | null>(null);
  const languageChartRef = useRef<HTMLCanvasElement | null>(null);
  const refactorChartInstance = useRef<Chart | null>(null);
  const languageChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const isDark = mode === 'dark';
    const textColor = isDark ? '#e1e4e8' : '#374151';
    const gridColor = isDark ? 'rgba(68, 75, 84, 0.5)' : 'rgba(209, 213, 219, 0.5)';

    if (refactorChartInstance.current) refactorChartInstance.current.destroy();
    if (languageChartInstance.current) languageChartInstance.current.destroy();

    if (refactorChartRef.current) {
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

      const refactorCtx = refactorChartRef.current.getContext('2d');
      if (refactorCtx) {
        refactorChartInstance.current = new Chart(refactorCtx, {
          type: 'line',
          data: {
            labels: last7Days,
            datasets: [{
              label: 'Projets refactorisés (7 derniers jours)',
              data: chartData,
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
      const projectsByLanguage = history.reduce((acc, entry) => {
        const lang = entry.options.mainLanguage || 'Unknown';
        acc[lang] = (acc[lang] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      const languageCtx = languageChartRef.current.getContext('2d');
      if (languageCtx) {
        languageChartInstance.current = new Chart(languageCtx, {
          type: 'doughnut',
          data: {
            labels: Object.keys(projectsByLanguage),
            datasets: [{
              data: Object.values(projectsByLanguage),
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
  }, [mode, history]);

  useEffect(() => {
    if (history.length > 0) {
      const projectsRefactored = history.length;
      let problemsSolved = 0;
      let complexityReduced = 0;

      history.forEach(entry => {
        const initial = entry.initialAnalysis.summary;
        const refactored = entry.refactoredAnalysis.summary;

        problemsSolved += (initial.deadCode - refactored.deadCode);
        problemsSolved += (initial.redundancy - refactored.redundancy);
        problemsSolved += (initial.conventionIssues - refactored.conventionIssues);
        complexityReduced += (initial.cyclomaticComplexity - refactored.cyclomaticComplexity);
      });

      setDashboardStats({
        projectsRefactored,
        problemsSolved,
        complexityReduced,
        timeSaved: Math.round(complexityReduced * 0.5) // Placeholder logic
      });
    }
  }, [history]);

  const recentProjectsData = history.slice(-5).map(entry => ({
    id: entry.id,
    name: entry.projectName,
    langIcon: faPython, // Assuming python for now
    langColor: 'text-blue-400',
    time: entry.timestamp.toLocaleDateString(),
    status: 'Terminé',
    statusColor: 'bg-green-100 dark:bg-gray-700 text-green-800 dark:text-green-400',
    iconBg: 'bg-blue-100 dark:bg-gray-800',
  })).reverse();

  const statsCards = [
    { title: 'Projets refactorisés', value: dashboardStats.projectsRefactored, change: '', icon: faFileCode, color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.2)' },
    { title: 'Problèmes résolus', value: dashboardStats.problemsSolved, change: '', icon: faBug, color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.2)' },
    { title: 'Complexité réduite', value: dashboardStats.complexityReduced, change: '', icon: faChartLine, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.2)' },
    { title: 'Temps économisé', value: `${dashboardStats.timeSaved}h`, change: '', icon: faClock, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.2)' },
  ];

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: 'background.body', backgroundColor: mode === 'dark' ? '#0d1117' : '#f6f8fa' }}>
      <Box className="max-w-7xl mx-auto">
        <Box sx={{ px: { xs: 0, sm: 2 }, py: 2 }}>
          <Typography level="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: mode === 'dark' ? '#e1e4e8' : '#1b1f23' }}>
            Tableau de bord
          </Typography>

          <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {statsCards.map((stat, index) => (
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
                          {stat.change && (
                            <div className="ml-2 flex items-baseline text-sm font-semibold" style={{ color: mode === 'dark' ? '#3fb950' : stat.color }}>
                              <FontAwesomeIcon icon={faArrowUp} className="text-xs self-center" />
                              <span className="sr-only">Increased by</span>
                              {stat.change}
                            </div>
                          )}
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

export default DashboardPage;
