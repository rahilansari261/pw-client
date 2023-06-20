import { Bar } from "react-chartjs-2";
import { convertCurrencyToIndian } from "../util/helper";
export const BarChart = ({ chartData }) => {
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
