import React, { memo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HistoryEntry } from '../types';
import { Trash2 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface Props {
  history: HistoryEntry[];
  onClear: () => void;
}

const HistoryTracker: React.FC<Props> = memo(({ history, onClear }) => {
  if (history.length < 1) return null;

  const data = {
    labels: history.map((h) => new Date(h.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Total CO₂ (kg)',
        data: history.map((h) => h.emissions.total),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16,185,129,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10B981',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: { beginAtZero: true, grid: { color: '#f3f4f6' }, ticks: { font: { family: 'Inter' } } },
      x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 } } },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">📊 Your History</h3>
        <button onClick={onClear} className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center space-x-1" aria-label="Clear history">
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>
      <div className="h-48">
        <Line data={data} options={options} />
      </div>
    </div>
  );
});

HistoryTracker.displayName = 'HistoryTracker';
export default HistoryTracker;
