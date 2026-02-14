"use client";

import React from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import useDashboard from "./useDashboard";
import { MapPin, Home, Users } from "lucide-react";
import useDashboardLayout from "@/components/layouts/DashboardLayout/useDashboardLayout";

const Dashboard = () => {
  const { dataTotalDaerah, dataTotalDesa, dataTotalKelompok } = useDashboard();
  const { dataProfile } = useDashboardLayout();

  const totalDaerah = dataTotalDaerah?.total ?? 0;
  const totalDesa = dataTotalDesa?.total ?? 0;
  const totalKelompok = dataTotalKelompok?.total ?? 0;

  const chartData = [
    { day: "01", thisMonth: 6, lastMonth: 7 },
    { day: "02", thisMonth: 8, lastMonth: 6 },
    { day: "03", thisMonth: 7, lastMonth: 6 },
    { day: "04", thisMonth: 9, lastMonth: 7 },
    { day: "05", thisMonth: 10, lastMonth: 8 },
    { day: "06", thisMonth: 9, lastMonth: 9 },
    { day: "07", thisMonth: 11, lastMonth: 10 },
  ];

  return (
    <div className="min-h-screen py-5">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Hello, {dataProfile?.fullName}
          </h1>
          <p className="text-gray-500">
            Track team progress here. You almost reach a goal!
          </p>
        </div>
        <div className="text-gray-500">{new Date().toDateString()}</div>
      </div>
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Total Daerah */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-5 flex items-center justify-between transition hover:shadow-md">
          <div>
            <p className="text-gray-500 text-sm">Total Daerah</p>
            <h2 className="text-2xl font-semibold text-gray-800">
              {totalDaerah}
            </h2>
          </div>
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <MapPin size={24} />
          </div>
        </div>

        {/* Total Desa */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-5 flex items-center justify-between transition hover:shadow-md">
          <div>
            <p className="text-gray-500 text-sm">Total Desa</p>
            <h2 className="text-2xl font-semibold text-gray-800">
              {totalDesa}
            </h2>
          </div>
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Home size={24} />
          </div>
        </div>

        {/* Total Kelompok */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-5 flex items-center justify-between transition hover:shadow-md">
          <div>
            <p className="text-gray-500 text-sm">Total Kelompok</p>
            <h2 className="text-2xl font-semibold text-gray-800">
              {totalKelompok}
            </h2>
          </div>
          <div className="bg-purple-100 p-3 rounded-full text-purple-600">
            <Users size={24} />
          </div>
        </div>
      </div>
      {/* Performance Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Performance</h2>
          <select className="border rounded-lg text-sm p-2">
            <option>01–07 May</option>
            <option>08–14 May</option>
            <option>15–21 May</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="thisMonth"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="lastMonth"
              stroke="#94a3b8"
              strokeDasharray="4 4"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Current Tasks */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Current Tasks</h2>
          <span className="text-gray-500 text-sm">Done 30%</span>
        </div>
        <div className="divide-y">
          {[
            {
              title: "Product Review for U18 Market",
              status: "In progress",
              time: "4h",
              color: "text-orange-500",
            },
            {
              title: "UX Research for Product",
              status: "On hold",
              time: "8h",
              color: "text-blue-500",
            },
            {
              title: "App design and development",
              status: "Done",
              time: "32h",
              color: "text-green-500",
            },
          ].map((task, i) => (
            <div key={i} className="flex justify-between py-3">
              <div>
                <p className="font-medium">{task.title}</p>
                <p className={`text-sm ${task.color}`}>{task.status}</p>
              </div>
              <span className="text-gray-500 text-sm">{task.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
