import { BarChart } from "./chart/barchart";
import PieChart from "./chart/piechart";

export const Dashboard = () => {
  return (
    <>
      <div className="chart">
        <h1 className="dashboard">Dashboard</h1>
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
