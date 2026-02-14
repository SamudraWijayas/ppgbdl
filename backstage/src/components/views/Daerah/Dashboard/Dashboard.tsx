"use client";

import React from "react";
import useDashboard from "./useDashboard";
import { User, Group } from "lucide-react";
import DashboardBox from "@/components/ui/DashboardBox/DashboardBox";
import { Skeleton } from "@heroui/react";
import StatistikGenerusDaerah from "@/components/ui/Charts/StatistikGenerusDaerah";
import CountStatistikGenerusDaerah from "@/components/ui/Charts/CountStatistikGenerusDaerah";

const Dashboard = () => {
  const {
    dataTotalMumi,
    isLoadingTotalMumi,
    dataTotalCaberawit,
    isLoadingTotalCaberawit,
    dataTotalDesa,
    isLoadingTotalDesa,
    dataTotalKelompok,
    isLoadingTotalKelompok,

    dataStatistikByDaerah,
    isLoadingStatistikByDaerah,

    dataStatistikByDesa,
    isLoadingStatistikByDesa,
  } = useDashboard();

  const totalDesa = dataTotalDesa?.total ?? 0;
  const totalKelompok = dataTotalKelompok?.total ?? 0;
  const totalMumi = dataTotalMumi?.total ?? 0;
  const totalCaberawit = dataTotalCaberawit?.total ?? 0;

  return (
    <div className="min-h-screen py-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-stretch">
        {/* Left Content */}
        <div className="md:w-2/3 w-full flex">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full flex-1">
            <DashboardBox
              title="Jumlah Muda-Mudi"
              count={totalMumi}
              loading={isLoadingTotalMumi}
              colors={["#16325B", "#4066B8"]}
              icon={<User size={36} />}
            />
            <DashboardBox
              title="Jumlah Caberawit"
              count={totalCaberawit}
              loading={isLoadingTotalCaberawit}
              colors={["#E1AE3E", "#F6CD46"]}
              icon={<User size={36} />}
            />
            <DashboardBox
              title="Jumlah Desa"
              count={totalDesa}
              loading={isLoadingTotalDesa}
              colors={["#E14862", "#F34F7D"]}
              icon={<User size={36} />}
            />

            <DashboardBox
              title="Jumlah Kelompok"
              count={totalKelompok}
              loading={isLoadingTotalKelompok}
              colors={["#23A66D", "#01DBB9"]}
              icon={<Group size={36} />}
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="md:w-1/3 w-full flex">
          <div className="w-full flex-1">
            <CountStatistikGenerusDaerah
              data={dataStatistikByDesa}
              loading={isLoadingStatistikByDesa}
            />
          </div>
        </div>
      </div>
      <StatistikGenerusDaerah
        data={dataStatistikByDaerah}
        loading={isLoadingStatistikByDaerah}
      />
    </div>
  );
};

export default Dashboard;
