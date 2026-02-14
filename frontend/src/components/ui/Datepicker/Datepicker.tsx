"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  setMonth,
  setYear,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { id } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

const daysShort = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const months = Array.from({ length: 12 }, (_, i) =>
  format(new Date(2025, i, 1), "MMM", { locale: id })
);

type ViewMode = "date" | "month" | "year";

interface DatepickerProps {
  selectedDate?: Date;
  onChange?: (date: Date) => void;
}

export default function Datepicker({
  selectedDate: propSelectedDate = new Date(),
  onChange,
}: DatepickerProps) {
  const [selectedDate, setSelectedDate] = useState(propSelectedDate);
  const [currentMonth, setCurrentMonth] = useState(propSelectedDate);
  const [viewMode, setViewMode] = useState<ViewMode>("date");

  const handleDateClick = (day: Date) => {
    const normalized = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      12
    );

    setSelectedDate(normalized);
    setCurrentMonth(normalized);
    onChange?.(normalized);
  };

  /* ================= HEADER ================= */
  const renderHeader = () => (
    <div className="flex justify-between items-center mb-2 px-4 py-2">
      <button className="hover:bg-blue-100 p-1 rounded-lg" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
        <ChevronLeft className="text-gray-500" size={20} />
      </button>

      <div className="text-lg font-semibold space-x-1">
        <button
          className="hover:underline"
          onClick={() => setViewMode("month")}
        >
          {format(currentMonth, "LLLL", { locale: id })}, {""}
        </button>
        <button
          className="hover:underline text-gray-500"
          onClick={() => setViewMode("year")}
        >
          {format(currentMonth, "yyyy")}
        </button>
      </div>

      <button className="hover:bg-blue-100 p-1 rounded-lg" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        <ChevronRight className="text-gray-500" size={20} />
      </button>
    </div>
  );

  /* ================= DATE VIEW ================= */
  const renderDates = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isSelected = isSameDay(day, selectedDate);

        days.push(
          <div
            key={day.toString()}
            onClick={() => handleDateClick(cloneDay)}
            className={`p-2 text-center rounded cursor-pointer text-sm ${
              !isSameMonth(day, monthStart) ? "text-gray-400" : ""
            } ${isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 " key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return (
      <>
        <div className="grid grid-cols-7 text-center font-medium mb-1 text-sm">
          {daysShort.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        {rows}
      </>
    );
  };

  /* ================= MONTH VIEW ================= */
  const renderMonths = () => (
    <div className="grid grid-cols-3 gap-2 p-2">
      {months.map((m, i) => (
        <button
          key={m}
          className="p-2 rounded hover:bg-blue-100"
          onClick={() => {
            setCurrentMonth(setMonth(currentMonth, i));
            setViewMode("date");
          }}
        >
          {m}
        </button>
      ))}
    </div>
  );

  /* ================= YEAR VIEW ================= */
  const renderYears = () => {
    const startYear = currentMonth.getFullYear() - 6;
    return (
      <div className="grid grid-cols-3 gap-2 p-2">
        {Array.from({ length: 12 }, (_, i) => startYear + i).map((y) => (
          <button
            key={y}
            className="p-2 rounded hover:bg-blue-100"
            onClick={() => {
              setCurrentMonth(setYear(currentMonth, y));
              setViewMode("month");
            }}
          >
            {y}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute right-2 w-72 bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4">
      {/* <div className="mb-2 text-sm text-gray-600">
        {format(selectedDate, "EEEE, d LLLL yyyy", { locale: id })}
      </div> */}

      {renderHeader()}

      {viewMode === "date" && renderDates()}
      {viewMode === "month" && renderMonths()}
      {viewMode === "year" && renderYears()}
    </div>
  );
}
