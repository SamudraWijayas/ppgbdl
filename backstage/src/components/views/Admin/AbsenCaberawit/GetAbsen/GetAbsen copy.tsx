"use client";
import React, { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  setMonth,
  setYear,
} from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useGetAbsen from "./useGetAbsen";
import { IAbsenByGenerus } from "@/types/Absen";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  status: "HADIR" | "IZIN" | "ALPHA";
}

const GetAbsen = () => {
  const now = new Date();
  const [tahun, setTahun] = useState(now.getFullYear());
  const [currentDate, setCurrentDate] = useState(now);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const { dataAbsen } = useGetAbsen(currentDate.getMonth() + 1, tahun);

  const events = useMemo(() => {
    if (!dataAbsen) return [];

    return dataAbsen.map((absen: IAbsenByGenerus) => {
      const date = new Date(absen.tanggal);
      return {
        title: absen.status,
        start: date,
        end: date,
        allDay: true,
        status: absen.status,
      };
    });
  }, [dataAbsen]);

  const getEventStyle = (event: CalendarEvent) => ({
    style: {
      backgroundColor:
        event.status === "HADIR"
          ? "#22c55e"
          : event.status === "IZIN"
          ? "#eab308"
          : "#ef4444",
      borderRadius: "8px",
      color: "white",
      border: "none",
      padding: "2px 6px",
      fontSize: "12px",
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex gap-2">
          {/* BULAN */}
          <button
            onClick={() => {
              setShowMonthPicker(!showMonthPicker);
              setShowYearPicker(false);
            }}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
          >
            {months[currentDate.getMonth()]}
          </button>

          {/* TAHUN */}
          <button
            onClick={() => {
              setShowYearPicker(!showYearPicker);
              setShowMonthPicker(false);
            }}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
          >
            {tahun}
          </button>

          {/* MONTH PICKER */}
          {showMonthPicker && (
            <div className="absolute left-2 w-72 top-14 bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4 z-20">
              <div className="grid grid-cols-3 gap-2 p-2">
                {months.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => {
                      setCurrentDate(setMonth(currentDate, i));
                      setShowMonthPicker(false);
                    }}
                    className={`py-2 rounded-lg text-sm font-medium ${
                      currentDate.getMonth() === i
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-100"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* YEAR PICKER */}
          {showYearPicker && (
            <div className="absolute left-2 w-72 top-14 bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4 z-20">
              <div className="grid grid-cols-3 gap-2 p-2">
                {Array.from({ length: 12 }, (_, i) => tahun - 6 + i).map(
                  (y) => (
                    <button
                      key={y}
                      onClick={() => {
                        setTahun(y);
                        setCurrentDate(setYear(currentDate, y));
                        setShowYearPicker(false);
                      }}
                      className={`py-2 rounded-lg text-sm font-medium ${
                        y === tahun
                          ? "bg-blue-600 text-white"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      {y}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CALENDAR */}
      <Calendar
        localizer={localizer}
        events={events}
        date={currentDate}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        style={{ height: 600 }}
        eventPropGetter={getEventStyle}
      />
    </div>
  );
};

export default GetAbsen;
