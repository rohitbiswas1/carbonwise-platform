import { memo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type TooltipItem } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { CategoryEmissions } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  emissions: CategoryEmissions;
}

const PieChart = memo<Props>(({ emissions }) => {
  const data = {
    labels: ['Transport', 'Home Energy', 'Food Habits', 'Shopping & Life'],
    datasets: [{
      data: [emissions.transport, emissions.homeEnergy, emissions.food, emissions.shopping],
      backgroundColor: ['#10B981', '#065F46', '#34D399', '#A7F3D0'],
      borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      borderWidth: 2,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { padding: 20, font: { family: 'Inter', weight: 600 } },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const value = (context.raw as number) || 0;
            const total = context.dataset.data.reduce((a: unknown, b: unknown) => (a as number) + (b as number), 0) as number;
            return ` ${context.label}: ${value.toLocaleString()} kg (${Math.round((value / total) * 100)}%)`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
});

PieChart.displayName = 'PieChart';
export default PieChart;
