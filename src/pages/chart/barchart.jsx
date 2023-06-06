import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";
import { useAuth } from "../../store/AuthContext";
export const BarChart = () => {
  const [labels, setLabels] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const { token } = useAuth();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("http://localhost:8000/api/dev-languages", config)
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
          "http://localhost:8000/api/candidate-barchart",
          config
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
            hoverBackgroundColor: "#192345",
            hoverBorderColor: "#192345",
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
    <>
      <Bar data={data} options={options} />
      <h2 className="txt-primary barchart">Candidates List By Languages</h2>
    </>
  );
};
