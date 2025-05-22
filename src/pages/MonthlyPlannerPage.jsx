// src/pages/MonthlyPlannerPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./MonthlyPlannerPage.css";
import { NoteContext } from "../context/NoteContext";

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const MonthlyPlannerPage = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [notes, setNotes] = useState({});
  const { addStarredNote } = useContext(NoteContext); // Not: Bu fonksiyon context'te tanımlanmalı

  const daysInMonth = new Date(
    today.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();
  const firstDay = new Date(today.getFullYear(), currentMonth, 1).getDay();
  const shiftedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  const handleAddNote = (day) => {
    const text = prompt(`${day} için not girin:`);
    if (text) {
      const starred = window.confirm(
        "Bu notu önemli (yıldızlı) olarak işaretlemek ister misin?"
      );
      const newNote = { text, starred, day, month: currentMonth };
      setNotes((prev) => ({ ...prev, [day]: newNote }));

      if (starred) {
        addStarredNote({ ...newNote, date: `${day} ${months[currentMonth]}` });
      }
    }
  };

  const renderCalendar = () => {
    const cells = [];
    const totalCells = shiftedFirstDay + daysInMonth;

    for (let i = 0; i < totalCells; i++) {
      if (i < shiftedFirstDay) {
        cells.push(<td key={i}></td>);
      } else {
        const day = i - shiftedFirstDay + 1;
        const note = notes[day];
        cells.push(
          <td key={i} onClick={() => handleAddNote(day)}>
            {day}
            {note && (
              <div className={note.starred ? "starred-note" : "note"}>
                {note.text}
              </div>
            )}
          </td>
        );
      }
    }

    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(<tr key={i}>{cells.slice(i, i + 7)}</tr>);
    }

    return rows;
  };

  const handleMonthChange = (i) => {
    setCurrentMonth(i);
    setNotes({});
  };

  const importantNotes = Object.values(notes)
    .filter((note) => note.starred)
    .map((note, index) => (
      <li key={index}>
        ⭐ {note.day}: {note.text}
      </li>
    ));

  return (
    <div className="monthly-wrapper">
      <h1 className="monthly-logo">
        aylık
        <br />
        planlayıcı
      </h1>

      <div className="month-tabs">
        {months.map((month, i) => (
          <button
            key={i}
            className={i === currentMonth ? "active" : ""}
            onClick={() => handleMonthChange(i)}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="notes-box">
        <div className="notes-header">
          <span>ÖNEMLİ NOTLAR</span>
          <span>☆ ☆ ☆</span>
        </div>
        <ul>
          {importantNotes.length ? (
            importantNotes
          ) : (
            <li>Henüz önemli not yok.</li>
          )}
        </ul>
      </div>

      <div className="calendar-table">
        <table>
          <thead>
            <tr>
              <th>PAZARTESİ</th>
              <th>SALI</th>
              <th>ÇARŞAMBA</th>
              <th>PERŞEMBE</th>
              <th>CUMA</th>
              <th>CUMARTESİ</th>
              <th>PAZAR</th>
            </tr>
          </thead>
          <tbody>{renderCalendar()}</tbody>
        </table>
      </div>

      <div className="monthly-buttons">
        <button className="save-btn">💾</button>
        <button className="close-btn" onClick={() => navigate("/")}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default MonthlyPlannerPage;
