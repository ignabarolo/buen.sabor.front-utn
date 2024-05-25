import { PieChart } from '@mui/x-charts/PieChart';

export default function BasePie() {
  return (
    <PieChart
      colors={['#B97603', '#F3A631', '#E66200']}
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}
