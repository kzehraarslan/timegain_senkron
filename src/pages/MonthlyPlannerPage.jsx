import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MonthlyPlannerPage.css";
import { useContext } from "react";
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
  const [notes, setNotes] = useState({}); // { "3": {text: "Not", starred: true}, ... }

  const daysInMonth = new Date(
    today.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();
  const firstDay = new Date(today.getFullYear(), currentMonth, 1).getDay(); // 0: Pazar
  const shiftedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Pazartesi=0

  const handleAddNote = (day) => {
    const text = prompt(`${day} için not girin:`);
    if (text) {
      const starred = window.confirm(
        "Bu notu önemli (yıldızlı) olarak işaretlemek ister misin?"
      );
      setNotes((prev) => ({
        ...prev,
        [day]: { text, starred },
      }));
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

    // satırları 7'şer gruplara böl
    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(<tr key={i}>{cells.slice(i, i + 7)}</tr>);
    }

    return rows;
  };

  const handleMonthChange = (index) => {
    setCurrentMonth(index);
    setNotes({});
  };

  const importantNotes = Object.entries(notes)
    .filter(([_, note]) => note.starred)
    .map(([day, note]) => (
      <li key={day}>
        ⭐ {day}: {note.text}
      </li>
    ));

  return (
    <div className="monthly-wrapper">
      <h1 className="monthly-logo">
        aylık
        <br />
        planlayıcı
      </h1>

      {/* Ay Seçimi */}
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

      {/* Önemli Notlar */}
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

      {/* Takvim */}
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

      {/* Kaydet/Kapat Butonları */}
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
