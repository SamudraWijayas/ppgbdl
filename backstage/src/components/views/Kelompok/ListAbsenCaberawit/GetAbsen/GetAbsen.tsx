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
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

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

type PickerStep = "none" | "year" | "month";

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  status: "HADIR" | "IZIN" | "ALPHA";
}

const GetAbsen = () => {
  const router = useRouter();
  const now = new Date();
  const [tahun, setTahun] = useState<number>(now.getFullYear());
  const [currentDate, setCurrentDate] = useState<Date>(now);
  const [pickerStep, setPickerStep] = useState<PickerStep>("none");

  const { dataAbsen } = useGetAbsen(currentDate.getMonth() + 1, tahun);

  const events = useMemo<CalendarEvent[]>(() => {
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
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 p-1 rounded-lg bg-gray-100 text-sm text-gray-600 cursor-pointer
      hover:text-blue-600 transition"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() =>
                setPickerStep(pickerStep === "none" ? "year" : "none")
              }
              className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition-all duration-200`}
            >
              <span className="text-gray-500">
                {months[currentDate.getMonth()]}
              </span>
              <span className="text-gray-800">{tahun}</span>

              <ChevronDown
                className={`
      w-4 h-4 text-gray-500
      transition-transform duration-200
      ${pickerStep !== "none" ? "rotate-180" : ""}
    `}
              />
            </button>
          </div>

          {/* COMBINED MONTH + YEAR PICKER */}
          {pickerStep === "year" && (
            <div className="absolute left-2 w-72 top-14 bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4 z-20">
              <div className="text-sm font-semibold mb-3 text-gray-600">
                Pilih Tahun
              </div>

              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 12 }, (_, i) => tahun - 6 + i).map(
                  (y) => (
                    <button
                      key={y}
                      onClick={() => {
                        setTahun(y);
                        setCurrentDate(setYear(currentDate, y));
                        setPickerStep("month");
                      }}
                      className={`py-2 rounded-lg text-sm font-medium ${
                        y === tahun
                          ? "bg-blue-600 text-white"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      {y}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
          {pickerStep === "month" && (
            <div className="absolute left-2 w-72 top-14 bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4 z-20">
              <div className="text-sm font-semibold mb-3 text-gray-600">
                Pilih Bulan
              </div>

              <div className="grid grid-cols-3 gap-2">
                {months.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => {
                      setCurrentDate(setMonth(currentDate, i));
                      setPickerStep("none");
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
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <span className="font-semibold text-gray-700">
          {months[currentDate.getMonth()]}, {tahun}
        </span>
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
        toolbar={false}
      />
    </div>
  );
};

export default GetAbsen;
