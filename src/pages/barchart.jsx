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
            console.log(data.data);
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
        const response = await axios.get("http://localhost:8000/api/candidate");
        const candidates = response.data.data;
        //   .then(({data})=>{
        //     setDatasets(data.data);
        // })
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
            backgroundColor: "rgb(226, 152, 14)",
            borderColor: "rgb(226, 152, 14)",
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

  return (
    <div className="bar-chart">
      {labels.length > 0 && datasets.length > 0 && <Bar data={data} />}
    </div>
  );
};
