import { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      ticks: {
        beginAtZero: true,
      }
    }
  },
  plugins: {
    legend: {
      display: false,
      position: 'right',
    },
    title: {
      display: true,
      text: 'Votes per band',
    },
  },
};

const parseData = (data) => {
  const labels = data.map(band => band.name);
  const votes = data.map(band => band.votes);
  return {
    labels,
    datasets: [
      {
        label: 'Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
      },
    ],
  };
};
const BarChart = () => {
  const { socket } = useContext(SocketContext)

  const [data, setData] = useState(null)

  useEffect(() => {
    if (socket) {
      console.log("on on current bands")
      socket.on("current-bands", (data) => {
        setData(parseData(data))
      })
    }
    return () => {
      socket.off("current-bands")
    }
  }, [socket]);

  return (
    <>
      {
        data &&
        <Bar options={options} data={data} />
      }
    </>
  )
};

export default BarChart;
