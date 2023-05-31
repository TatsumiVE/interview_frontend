import { BarChart } from "./chart/barchart";
import PieChart from "./chart/piechart";

export const Dashboard = () => {
  return (
    <>
      Dashboard
      <div className="chart">
        <div className="chart__bar-chart">
          <BarChart />
        </div>
        <div className="chart__pie-chart">
          <PieChart />
        </div>
      </div>
    </>

  );
};
