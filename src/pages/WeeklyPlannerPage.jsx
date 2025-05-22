import React, { useState, useEffect } from "react";
import "./WeeklyPlannerPage.css";

const daysOfWeek = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
  "Notlarım",
];

const WeeklyPlannerPage = () => {
  const [notes, setNotes] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const savedNotes = localStorage.getItem("weeklyPlannerNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleNoteChange = (day, value) => {
    setNotes((prevNotes) => {
      const updated = { ...prevNotes, [day]: value };
      localStorage.setItem("weeklyPlannerNotes", JSON.stringify(updated));
      return updated;
    });
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getMonthName = (monthIndex) => {
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
    return months[monthIndex];
  };

  return (
    <div className="weekly-planner-container">
      <div className="top-section">
        <div className="calendar-section">
          <h1 className="month-title">{getMonthName(month)}</h1>
          <h2 className="sub-title">Haftalık Planlayıcı</h2>
          <table className="calendar">
            <thead>
              <tr>
                <th>Pzt</th>
                <th>Salı</th>
                <th>Çrş</th>
                <th>Prş</th>
                <th>Cuma</th>
                <th>Cmt</th>
                <th>Pzr</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 7 }).map((_, colIndex) => {
                    const dayNumber =
                      rowIndex * 7 + colIndex - ((firstDay + 6) % 7) + 1;
                    return (
                      <td key={colIndex}>
                        {dayNumber > 0 && dayNumber <= daysInMonth ? (
                          dayNumber === today ? (
                            <div className="circle">{dayNumber}</div>
                          ) : (
                            dayNumber
                          )
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="image-box">
          <img src="/whale.jpg" alt="Whale" />
          <div className="year-tag">{year}</div>
        </div>
      </div>

      <div className="notes-section">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-block">
            <h3>{day}</h3>
            <textarea
              className="lined-textarea"
              value={notes[day] || ""}
              onChange={(e) => handleNoteChange(day, e.target.value)}
            />
            <button
              className="save-btn"
              onClick={() => handleNoteChange(day, notes[day])}
            >
              Kaydet
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPlannerPage;
