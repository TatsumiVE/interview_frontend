import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
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
        const candidates = response.data.data;

        if (candidates && candidates.length > 0) {
          const stagesData = candidates.map((item) => ({
            stageId: item.interview_stage_id,
            count: item.count,
          }));

          const chartData = {
            labels: stagesData.map((stage) => `Candidate In Interview Stage ${stage.stageId}`),
            datasets: [
              {
                data: stagesData.map((stage) => stage.count),
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
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
     <> {Object.keys(data).length > 0 && <Pie data={data} />}   </>
  );
};

export default PieChart;
