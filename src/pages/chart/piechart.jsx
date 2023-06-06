// import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import axios from "axios";
// import { useAuth } from "../../store/AuthContext";

// const PieChart = () => {
//   const [data, setData] = useState({});
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         const response = await axios.get(
//           "http://localhost:8000/api/candidate-piechart",
//           config
//         );

//         const candidatesCount = response.data.data;

//         const chartData = {
//           labels: ["Stage 1", "Stage 2", "Stage 3"],
//           datasets: [
//             {
//               data: [
//                 candidatesCount.stage1_count,
//                 candidatesCount.stage2_count,
//                 candidatesCount.stage3_count,
//               ],
//               backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//               hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//             },
//           ],
//         };

//         setData(chartData);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [token]);

//   return (
//     <>
//       {Object.keys(data).length > 0 && <Pie data={data} />}
//       <h2 className="txt-primary piechart">Candidates List By Stages</h2>
//     </>
//   );
// };

// export default PieChart;
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";

const PieChart = () => {
  const [data, setData] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8000/api/candidate-piechart",
          config
        );

        const candidatesCount = response.data.data;

        const chartData = {
          labels: ["Stage 1", "Stage 2", "Stage 3"],
          datasets: [
            {
              data: [
                candidatesCount.stage1_count,
                candidatesCount.stage2_count,
                candidatesCount.stage3_count,
              ],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        };

        setData(chartData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      {Object.keys(data).length > 0 && <Pie data={data} />}
      <h2 className="txt-primary piechart">Candidates List By Stages</h2>
    </>
  );
};

export default PieChart;
