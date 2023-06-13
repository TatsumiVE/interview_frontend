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
          "http://localhost:8000/api/candidates-detail/all",
          config
        );
        const data = response.data.data;

        // let totalCandidate = [];
        // let rejectCandidate = [];

        // console.log(data);
        // data.forEach(({ candidate }) => {
        //   if (candidate.status == 0) {
        //     totalCandidate = languages.map((language) => {
        //       const languageCount = candidate.specific_languages.reduce(
        //         (initial, lan) => {
        //           return (totalCandidate[language.id] =
        //             lan.devlanguage_id === language.id
        //               ? initial + (totalCandidate[language.id] ?? 1)
        //               : initial);
        //         },
        //         {}
        //       );

        //       return languageCount;
        //     });
        //   } else if (candidate.status == 1) {
        //     rejectCandidate = languages.map((language) => {
        //       const languageCount = candidate.specific_languages.reduce(
        //         (initial, lan) => {
        //           return (rejectCandidate[language.id] =
        //             lan.devlanguage_id === language.id
        //               ? initial + (rejectCandidate[language.id] ?? 1)
        //               : initial);
        //         },
        //         {}
        //       );
        //       return languageCount;
        //     });
        //   }
        // });

        // console.log(totalCandidate);
        // console.log(rejectCandidate);
        let totalCandidate = {};
        let rejectCandidate = {};

        console.log(data);
        data.forEach(({ candidate }) => {
          candidate.specific_languages.reduce((acc, lan) => {
            totalCandidate[lan.devlanguage_id] =
              (totalCandidate[lan.devlanguage_id] ?? 0) + 1;
            return acc;
          }, 0);
          if (candidate.status == 1) {
            candidate.specific_languages.reduce((acc, lan) => {
              rejectCandidate[lan.devlanguage_id] =
                (rejectCandidate[lan.devlanguage_id] ?? 0) + 1;
              return acc;
            }, 0);
          }
        });

        totalCandidate = Object.values(totalCandidate);
        rejectCandidate = Object.values(rejectCandidate);

        console.log(totalCandidate);
        console.log(rejectCandidate);

        setDatasets([
          {
            label: "Total Candidates",
            data: totalCandidate,
            backgroundColor: "#19376D",
            borderColor: "#19376D",
            hoverBackgroundColor: "#192345",
            hoverBorderColor: "#192345",
          },
          {
            label: "Reject Candidates",
            data: rejectCandidate,
            backgroundColor: "#ABCDEF",
            borderColor: "#ABCDEF",
            hoverBackgroundColor: "#CBAEDF",
            hoverBorderColor: "#CBAEDF",
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

  const reversedLabels = [...labels].reverse();

  const data = {
    labels: reversedLabels,
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
