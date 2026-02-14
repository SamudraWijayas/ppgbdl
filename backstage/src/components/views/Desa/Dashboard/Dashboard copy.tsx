"use client";

import React from "react";
import useDashboard from "./useDashboard";
import { MapPin, Home, Users, ArrowUpRight, User } from "lucide-react";
import StatistikGenerusDesaByJenjang from "@/components/ui/Charts/StatistikGenerusDesaByJenjang";
import DashboardBox from "@/components/ui/DashboardBox/DashboardBox";
import { Skeleton } from "@heroui/react";

const Dashboard = () => {
  const {
    dataTotalCaberawit,
    dataTotalKelompok,
    dataStatistikByDesa,
    isLoadingStatistikByDesa,
    dataTotalMumi,
    isLoadingTotalMumi,
  } = useDashboard();
  console.log("statistik", dataStatistikByDesa);

  const totalMumi = dataTotalMumi?.total ?? 0;
  const totalCaberawit = dataTotalCaberawit?.total ?? 0;
  const totalKelompok = dataTotalKelompok?.total ?? 0;

  return (
    <div className="min-h-screen py-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
        {/* Left Content */}
        <div className="md:w-1/2 w-full">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Total Daerah */}
            <div className="rounded-2xl bg-[#FFF4E5] p-5 shadow-sm relative">
              <ArrowUpRight
                className="absolute top-4 right-4 text-gray-400"
                size={18}
              />
              <p className="text-gray-500 text-sm mb-2">Total Muda-Mudi</p>
              <h2 className="text-3xl font-bold text-gray-800">{totalMumi}</h2>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} />
                <span>Data wilayah</span>
              </div>
            </div>

            {/* Total Desa */}
            <div className="rounded-2xl bg-[#EAF7EC] p-5 shadow-sm relative">
              <ArrowUpRight
                className="absolute top-4 right-4 text-gray-400"
                size={18}
              />
              <p className="text-gray-500 text-sm mb-2">Total Caberawit</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {totalCaberawit}
              </h2>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <Home size={16} />
                <span>Data desa</span>
              </div>
            </div>

            {/* Total Kelompok */}
            <div className="rounded-2xl bg-[#EEF2FF] p-5 shadow-sm relative">
              <ArrowUpRight
                className="absolute top-4 right-4 text-gray-400"
                size={18}
              />
              <p className="text-gray-500 text-sm mb-2">Total Kelompok</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {totalKelompok}
              </h2>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <Users size={16} />
                <span>Data kelompok</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 w-full">
          {/* {new Date().toDateString()} */}
          <StatistikGenerusDesaByJenjang
            data={dataStatistikByDesa}
            loading={isLoadingStatistikByDesa}
          />
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Total Daerah */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-5 flex items-center justify-between transition hover:shadow-md">
          <div>
            <p className="text-gray-500 text-sm">Total Daerah</p>
            <h2 className="text-2xl font-semibold text-gray-800">
              {totalMumi}
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
              {totalCaberawit}
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
