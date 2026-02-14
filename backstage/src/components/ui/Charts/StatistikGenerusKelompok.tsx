"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);

interface StatistikItem {
  jenjangId: string;
  jenjangNama: string;
  total: number;
}

interface Props {
  data: StatistikItem[] | undefined;
  loading?: boolean;
}

const StatistikGenerusKelompok = ({ data, loading }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 640);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse space-y-4">
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-48 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 text-gray-400 text-sm">
        Data statistik belum tersedia
      </div>
    );
  }

  const labels = data.map((d) => d.jenjangNama);
  const values = data.map((d) => d.total);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Jumlah Generus",
              data: values,
              borderColor: "rgba(99,102,241,1)",
              backgroundColor: "rgba(99,102,241,0.2)",
              tension: 0.4, // garis melengkung
              pointRadius: isMobile ? 3 : 5,
              pointHoverRadius: 6,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.raw} generus`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                font: { size: 11 },
              },
              grid: {
                color: "rgba(0,0,0,0.05)",
              },
            },
            x: {
              ticks: {
                font: { size: 11 },
                maxRotation: isMobile ? 45 : 0,
              },
              grid: { display: false },
            },
          },
        }}
      />
    </div>
  );
};

export default StatistikGenerusKelompok;
