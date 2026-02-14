"use client";

import React from "react";
import useDashboard from "./useDashboard";
import { MapPin, Home, Users, ArrowUpRight, User, Group } from "lucide-react";
import StatistikGenerusDesaByJenjang from "@/components/ui/Charts/StatistikGenerusDesaByJenjang";
import DashboardBox from "@/components/ui/DashboardBox/DashboardBox";
import { Skeleton } from "@heroui/react";
import StatistikGenerusKelompok from "@/components/ui/Charts/StatistikGenerusKelompok";

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
              count={totalMumi}
              loading={isLoadingTotalMumi}
              colors={["#16325B", "#4066B8"]}
              icon={<User size={36} />}
            />

            <DashboardBox
              title="Total Caberawit"
              count={totalCaberawit}
              loading={isLoadingTotalMumi}
              colors={["#E1AE3E", "#F6CD46"]}
              icon={<User size={36} />}
            />

            <DashboardBox
              title="Total Kelompok"
              count={totalKelompok}
              loading={isLoadingTotalMumi}
              colors={["#E14862", "#F34F7D"]}
              icon={<Group size={36} />}
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 w-full flex">
          <div className="w-full flex-1">
            <StatistikGenerusKelompok
              data={dataStatistikByDesa}
              loading={isLoadingStatistikByDesa}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
