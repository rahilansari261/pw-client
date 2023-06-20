import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
  console.log(chartData);
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
            },
            legend: {
              display: true,
            },
          },
          responsive: true,
          // aspectRatio: 1 | 3,
          // maintainAspectRatio: true,
        }}
      />
    </div>
  );
};
