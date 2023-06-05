// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import axios from 'axios';
// import { useAuth } from "../../store/AuthContext";

// const PieChart = () => {
//   const [data, setData] = useState({});
//   const [stages,setStage]= useState([]);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios
//           .get("http://localhost:8000/api/interview-stages", config)
//           .then(({ data }) => {
//             setStage(data.data);
//           });
//       } catch (error) {
//         console.log("Error fetching stages data:", error);
//       }
//     };
//     fetchData();
//   }, []);

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
//         const candidates = response.data.data;

//         if (candidates && candidates.length > 0) {
//           const stagesData = candidates.map((item) => ({
//             stageId: item.interview_stage_id,
//             count: item.count,
//           }));

//           const chartData = {
//             labels: stages.map((stage) => `Candidate In Interview Stage ${stage.stage_name}`),
//             datasets: [
//               {
//                 data: stagesData.map((stage) => stage.count),
//                 backgroundColor: [
//                   '#FF6384',
//                   '#36A2EB',
//                   '#FFCE56',
//                 ],
//               },
//             ],
//           };

//           setData(chartData);
//         }
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [token]);

//   return (   
//      <> {Object.keys(data).length > 0 && <Pie data={data} />}   </>
//   );
// };

// export default PieChart;


// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import axios from 'axios';
// import { useAuth } from "../../store/AuthContext";

// const PieChart = () => {
//   const [data, setData] = useState({});
//   const [stages, setStages] = useState([]);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const stagesResponse = await axios.get("http://localhost:8000/api/interview-stages", config);
//         const stagesData = stagesResponse.data.data;
//         setStages(stagesData);
        
//         const response = await axios.get("http://localhost:8000/api/candidate-piechart", config);
//         const candidates = response.data.data;

//         if (candidates && candidates.length > 0) {
//           const stagesData = candidates.map((item) => ({
//             stageId: item.interview_stage_id,
//             count: item.count,
//           }));

//           // const chartData = {
//           //   labels: stagesData.map((stage) => {
//           //     const matchedStage = stages.find((s) => s.stage_id === stage.stageId);
//           //     return matchedStage ? `Candidate In Interview Stage ${matchedStage.stage_name}` : "";
//           //   }),
//           stagesData.map((stage) => {
//             const matchedStage = stages.find((s) => s.stage_id === stage.stageId);});
//           const chartData = {
//             labels:` Candidate In Interview Stage ${stages.stage_name}`,           
//             datasets: [
//               {
//                 data: stagesData.map((stage) => stage.count),
//                 backgroundColor: [
//                   '#FF6384',
//                   '#36A2EB',
//                   '#FFCE56',
//                   '#9de39a',
//                 ],
//               },
//             ],
//           };

//           setData(chartData);
//         }
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [token]);

//   return (   
//     <> 
//       {Object.keys(data).length > 0 && <Pie data={data} />}   
//     </>
//   );
// };

// export default PieChart;


import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useAuth } from "../../store/AuthContext";

const PieChart = () => {
  const [data, setData] = useState({});
  const [stages, setStages] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const stagesResponse = await axios.get("http://localhost:8000/api/interview-stages", config);
        const stagesData = stagesResponse.data.data;
        setStages(stagesData);
        
        const response = await axios.get("http://localhost:8000/api/candidate-piechart", config);
        const candidates = response.data.data;

        if (candidates && candidates.length > 0) {
          const stagesData = candidates.map((item) => ({
            stageId: item.interview_stage_id,
            count: item.count,
          }));

          const chartData = {
            labels: stagesData.map((stage) => {
              const matchedStage = stages.find((s) => s.stage_id === stage.stageId);
              return matchedStage ? `Candidate In Interview Stage ${matchedStage.stage_name}` : "";
            }),
            datasets: [
              {
                data: stagesData.map((stage) => stage.count),
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#9de39a',
                ],
              },
            ],
          };

          setData(chartData);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (   
    <> 
      {Object.keys(data).length > 0 && <Pie data={data} />}   
    </>
  );
};

export default PieChart;
