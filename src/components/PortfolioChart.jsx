import React from 'react';
import {Pie} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {useCrypto} from "../context/crypto-contex";


ChartJS.register(ArcElement, Tooltip, Legend);
const AssetsTable = () => {
  const {assets} = useCrypto();

  const data = {
    labels: assets.map(asset => asset.name),
    datasets: [
      {
        label: '$',
        data: assets.map(asset => asset.totalAmount),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        height: 400,
        display: "flex",
        marginBottom: "1rem",
        justifyContent: "center",
      }}>
      <Pie data={data}/>
    </div>
  );
};

export default AssetsTable;