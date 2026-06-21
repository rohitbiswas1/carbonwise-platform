import { memo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, type TooltipItem } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { CountryComparison } from '../../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  userKg: number;
  countries: CountryComparison[];
}

const BarChart = memo<Props>(({ userKg, countries }) => {
  const labels = countries.map((c) => c.country);
  const values = countries.map((c) => c.averageKg);

  const data = {
    labels,
    datasets: [
      {
        label: 'Country Average (kg CO₂/yr)',
        data: values,
        backgroundColor: values.map((v) => (v > userKg ? '#F59E0B' : '#10B981')),
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#F3F4F6' },
        ticks: { font: { family: 'Inter' } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', weight: 600 } },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const val = context.raw as number;
            return ` ${context.label}: ${val.toLocaleString()} kg CO₂/yr`;
          },
          afterLabel: (context: TooltipItem<'bar'>) => {
            const val = context.raw as number;
            const diff = Math.abs(val - userKg);
            if (val > userKg) return ` You are ${diff.toLocaleString()} kg below this average ✓`;
            if (val < userKg) return ` You are ${diff.toLocaleString()} kg above this average ⚠`;
            return '';
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
});

BarChart.displayName = 'BarChart';
export default BarChart;
