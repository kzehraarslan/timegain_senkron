import React, { useState } from "react";
import styles from "./CalendarPage.module.css";
import { useNavigate } from "react-router-dom";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const renderHeader = () => (
    <div className={styles.header}>
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
        {"<"}
      </button>
      <div className={styles.monthLabel}>
        {format(currentMonth, "MMMM yyyy")}
      </div>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        {">"}
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={styles.day} key={i}>
          {format(addDays(startDate, i), "EEEE")}
        </div>
      );
    }
    return <div className={styles.daysRow}>{days}</div>;
  };

  const renderCells = () => {
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
        days.push(
          <div
            className={`${styles.cell} ${
              !isSameMonth(day, monthStart) ? styles.disabled : ""
            } ${isSameDay(day, selectedDate) ? styles.selected : ""}`}
            key={day}
            onClick={() => handleDateClick(cloneDay)}
          >
            <span>{format(day, "d")}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className={styles.row} key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className={styles.body}>{rows}</div>;
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    navigate(`/calendar/day/${format(day, "yyyy-MM-dd")}`);
  };

  return (
    <div className={styles.container}>
      {/* Sol panel: butonlar */}
      <div className={styles.sidebar}>
        <button
          className={styles.sideButton}
          onClick={() => navigate("/monthly-planner")}
        >
          Aylık Planlayıcı
        </button>
        <button
          className={styles.sideButton}
          onClick={() => navigate("/weekly-planner")}
        >
          Haftalık Planlayıcı
        </button>
        <button
          className={styles.sideButton}
          onClick={() => navigate("/daily-planner")}
        >
          Günlük Planlayıcı
        </button>
      </div>

      {/* Sağ panel: takvim */}
      <div className={styles.calendarWrapper}>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default CalendarPage;
