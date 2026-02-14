"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

interface StatistikItem {
  desaId: string;
  desaNama: string;
  jenjangId: string;
  jenjangNama: string;
  total: number;
}

interface Props {
  data: StatistikItem[] | undefined;
  loading?: boolean;
}

const StatistikGenerusDaerah = ({ data, loading }: Props) => {
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

  // Labels X (Jenjang)
  const jenjangLabels = [...new Set(data.map((d) => d.jenjangNama))];

  // Dataset (Kelompok)
  const kelompokList = [...new Set(data.map((d) => d.desaNama))];

  const colors = [
    "rgba(99,102,241,0.8)",
    "rgba(16,185,129,0.8)",
    "rgba(234,179,8,0.8)",
    "rgba(239,68,68,0.8)",
  ];

  const datasets = kelompokList.map((kelompok, i) => ({
    label: kelompok,
    data: jenjangLabels.map(
      (jenjang) =>
        data.find(
          (d) =>
            d.desaNama === kelompok && d.jenjangNama === jenjang
        )?.total ?? 0
    ),
    backgroundColor: colors[i % colors.length],
    borderRadius: 8,
    barThickness: isMobile ? 14 : 22,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      {/* <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Statistik Generus per Jenjang
      </h3> */}

      <Bar
        data={{ labels: jenjangLabels, datasets }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: isMobile ? "bottom" : "top",
              labels: {
                boxWidth: 12,
                font: { size: 11 },
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
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

export default StatistikGenerusDaerah;
