import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Title,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  Title,
  Legend,
  CategoryScale,
  LinearScale
);

const BarGraph = ({ barData }) => {
  const data = {
    labels: ["Malaria", "HIV", "Tuberculosis"],
    datasets: [
      {
        label: "Program Count",
        data: [
          barData.programData[0].malaria_count,
          barData.programData[0].hiv_count,
          barData.programData[0].tb_count,
        ],
        backgroundColor: [
          "rgba(0, 128, 0, 0.2)",
          "rgba(0, 255, 0, 0.2)",
          "rgba(34, 139, 34, 0.2)",
        ],
        borderColor: [
          "rgba(0, 128, 0, 1)",
          "rgba(0, 255, 0, 1)",
          "rgba(34, 139, 34, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Program Statistics by Disease",
        font: {
          size: 20,
          weight: "bold",
        },
        color: "#4CAF50",
      },
      legend: {
        position: "top",
        labels: {
          color: "#4CAF50",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#4CAF50",
        },
      },
      x: {
        ticks: {
          color: "#4CAF50",
        },
      },
    },
  };

  return (
    <div className="bar-graph-container">
      <div className="bar-info">
        <h4>HIV programs: {barData.programData[0].hiv_count}</h4>
        <h4>Malaria programs: {barData.programData[0].malaria_count}</h4>
        <h4>Tuberculosis programs: {barData.programData[0].tb_count}</h4>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
