import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  progressive: number;
  conservative: number;
}

export function Chart({ progressive, conservative }: ChartProps) {
  const data = {
    labels: ['보수', '진보'],
    datasets: [
      {
        label: '정치성향',
        data: [conservative, progressive],
        backgroundColor: ['rgb(245, 29, 29)', 'rgb(20, 161, 255)'],
      },
    ],
  };

  return (
    <div style={{ width: '50%', margin: '20px auto' }}>
      <Doughnut
        style={{ width: '100%', height: '100%' }}
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
