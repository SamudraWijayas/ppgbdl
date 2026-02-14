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
  Legend
);

interface StatistikItem {
  kelompokId: string;
  kelompokNama: string;
  jenjangId: string;
  jenjangNama: string;
  total: number;
}

interface Props {
  data: StatistikItem[] | undefined;
  loading?: boolean;
}

const StatistikGenerusDesaByJenjang = ({ data, loading }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 640);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border p-6 animate-pulse space-y-4">
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-48 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border p-6 text-gray-400 text-sm">
        Data statistik belum tersedia
      </div>
    );
  }

  // Label X (Jenjang)
  const jenjangLabels = [...new Set(data.map((d) => d.jenjangNama))];

  // Dataset (Kelompok)
  const kelompokList = [...new Set(data.map((d) => d.kelompokNama))];

  const colors = [
    "rgb(99,102,241)", // indigo
    "rgb(16,185,129)", // emerald
    "rgb(234,179,8)",  // amber
    "rgb(239,68,68)",  // red
  ];

  const datasets = kelompokList.map((kelompok, i) => {
    const color = colors[i % colors.length];

    return {
      label: kelompok,
      data: jenjangLabels.map(
        (jenjang) =>
          data.find(
            (d) =>
              d.kelompokNama === kelompok &&
              d.jenjangNama === jenjang
          )?.total ?? 0
      ),
      borderColor: color,
      backgroundColor: color
        .replace("rgb", "rgba")
        .replace(")", ",0.25)"),
      tension: 0.4,
      fill: true,                 // ⭐ arsir aktif
      pointRadius: isMobile ? 3 : 4,
      pointHoverRadius: 6,
    };
  });

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Statistik Generus per Jenjang
      </h3>

      <Line
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

export default StatistikGenerusDesaByJenjang;


// "use client";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { useEffect, useState } from "react";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
//   Filler
// );

// interface StatistikItem {
//   kelompokId: string;
//   kelompokNama: string;
//   jenjangId: string;
//   jenjangNama: string;
//   total: number;
// }

// interface Props {
//   data: StatistikItem[] | undefined;
//   loading?: boolean;
// }

// const StatistikGenerusDesaByJenjang = ({ data, loading }: Props) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const resize = () => setIsMobile(window.innerWidth < 640);
//     resize();
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
//   }, []);

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl border p-6 animate-pulse space-y-4">
//         <div className="h-4 w-1/3 bg-gray-200 rounded" />
//         <div className="h-48 bg-gray-200 rounded-xl" />
//       </div>
//     );
//   }

//   if (!data || data.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl border p-6 text-gray-400 text-sm">
//         Data statistik belum tersedia
//       </div>
//     );
//   }

//   const jenjangLabels = [...new Set(data.map((d) => d.jenjangNama))];
//   const kelompokList = [...new Set(data.map((d) => d.kelompokNama))];

//   const colors = [
//     ["rgba(99,102,241,1)", "rgba(99,102,241,0.15)"],
//     ["rgba(16,185,129,1)", "rgba(16,185,129,0.15)"],
//     ["rgba(234,179,8,1)", "rgba(234,179,8,0.15)"],
//     ["rgba(239,68,68,1)", "rgba(239,68,68,0.15)"],
//   ];

//   const datasets = kelompokList.map((kelompok, i) => ({
//     label: kelompok,
//     data: jenjangLabels.map(
//       (jenjang) =>
//         data.find(
//           (d) => d.kelompokNama === kelompok && d.jenjangNama === jenjang
//         )?.total ?? 0
//     ),
//     borderColor: colors[i % colors.length][0],
//     backgroundColor: colors[i % colors.length][1],
//     fill: true,
//     tension: 0.4,
//     pointRadius: isMobile ? 3 : 5,
//   }));

//   return (
//     <div className="bg-white rounded-2xl border shadow-sm p-6">
//       <h3 className="text-sm font-semibold text-gray-700 mb-4">
//         Statistik Generus per Jenjang
//       </h3>

//       <Line
//         data={{ labels: jenjangLabels, datasets }}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: {
//               position: isMobile ? "bottom" : "top",
//               labels: {
//                 boxWidth: 12,
//                 font: { size: 11 },
//               },
//             },
//             tooltip: {
//               mode: "index",
//               intersect: false,
//             },
//           },
//           scales: {
//             y: {
//               beginAtZero: true,
//               ticks: { stepSize: 1 },
//               grid: { color: "rgba(0,0,0,0.05)" },
//             },
//             x: {
//               ticks: {
//                 display: !isMobile,
//                 font: { size: 11 },
//               },
//               grid: { display: false },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default StatistikGenerusDesaByJenjang;
