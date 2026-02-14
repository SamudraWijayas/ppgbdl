"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatistikItem {
  jenjangId: string;
  jenjangNama: string;
  total: number;
}

interface Props {
  data: StatistikItem[] | undefined;
  loading?: boolean;
}

const CountStatistikGenerusDaerah = ({ data, loading }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 640);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse space-y-3">
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-40 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-4 text-gray-400 text-sm">
        Data statistik belum tersedia
      </div>
    );
  }

  const labels = data.map((d) => d.jenjangNama);
  const values = data.map((d) => d.total);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 h-full flex flex-col">
      <div className="flex justify-center flex-1">
        <div className="w-45 h-45 sm:w-60 sm:h-60">
          <Pie
            data={{
              labels,
              datasets: [
                {
                  data: values,
                  backgroundColor: [
                    "#6366F1",
                    "#22C55E",
                    "#F59E0B",
                    "#EF4444",
                    "#06B6D4",
                    "#A855F7",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom", // 👈 selalu bawah
                  labels: {
                    font: { size: 11 },
                    boxWidth: 10,
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.label}: ${ctx.raw} generus`,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CountStatistikGenerusDaerah;
