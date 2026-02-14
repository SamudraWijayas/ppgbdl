"use client";

import React from "react";
import useDashboard from "./useDashboard";
import { User, Group } from "lucide-react";
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
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-stretch">
        {/* Left Content */}
        <div className="md:w-1/2 w-full flex">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full flex-1">
            <DashboardBox
              title="Total Muda-Mudi"
              count={
                isLoadingTotalMumi ? (
                  <Skeleton className="h-6 w-20 rounded-md" />
                ) : (
                  totalMumi
                )
              }
              colors={["#16325B", "#4066B8"]}
              icon={<User size={36} />}
            />

            <DashboardBox
              title="Total Caberawit"
              count={
                isLoadingTotalMumi ? (
                  <Skeleton className="h-6 w-20 rounded-md" />
                ) : (
                  totalCaberawit
                )
              }
              colors={["#E1AE3E", "#F6CD46"]}
              icon={<User size={36} />}
            />

            <DashboardBox
              title="Total Kelompok"
              count={
                isLoadingTotalMumi ? (
                  <Skeleton className="h-6 w-20 rounded-md" />
                ) : (
                  totalKelompok
                )
              }
              colors={["#E14862", "#F34F7D"]}
              icon={<Group size={36} />}
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 w-full flex">
          <div className="w-full flex-1">
            <StatistikGenerusDesaByJenjang
              data={dataStatistikByDesa}
              loading={isLoadingStatistikByDesa}
            />
          </div>
        </div>
      </div>

      {/* Top Stats */}

      {/* Current Tasks */}
      {/* <div className="bg-white border rounded-xl p-6">
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
      </div> */}
    </div>
  );
};

export default Dashboard;
