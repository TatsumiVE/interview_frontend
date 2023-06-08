import { BarChart } from "./chart/barchart";

export const Dashboard = () => {
  return (
    <>
      <div className="chart">
        <h1 className="dashboard">Dashboard</h1>
        <div className="chart__bar-chart">
          <BarChart />
        </div>
      </div>
    </>
  );
};
