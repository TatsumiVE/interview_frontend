import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";

export const BarChart = () => {
  const [labels, setLabels] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("http://localhost:8000/api/dev-languages")
          .then(({ data }) => {
         
            setLanguages(data.data);
          });
      } catch (error) {
        console.log("Error fetching languages data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/candidate-barchart"
        );
        const candidates = response.data.data;

        const candidateCounts = languages.map((language) => {
          const count = candidates.reduce(
            (acc, candidate) =>
              candidate.devlanguage_id === language.id
                ? acc + candidate.count
                : acc,
            0
          );
          return count;
        });
        setDatasets([
          {
            label: "Candidate",
            data: candidateCounts,
    
            backgroundColor: "#19376D",
            borderColor: "#19376D",
          },
        ]);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [languages]);

  useEffect(() => {
    if (languages.length > 0) {
      setLabels(languages.map((item) => item.name));
    }
  }, [languages]);

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 5,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
      <div className="bar-chart">
        <Bar data={data} options={options}/>
      </div>
  );
};
