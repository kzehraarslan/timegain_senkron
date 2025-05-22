import React, { useState } from "react";
import "./DailyPlanner.css";

const DailyPlanner = () => {
  const hours = Array.from({ length: 18 }, (_, i) => `${6 + i}:00`);
  const moods = ["😊", "🥰", "🙂", "😐", "😕", "😢"];

  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [todos, setTodos] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [hourlyNotes, setHourlyNotes] = useState(Array(18).fill(""));

  const handleHourlyNoteChange = (index, value) => {
    const updated = [...hourlyNotes];
    updated[index] = value;
    setHourlyNotes(updated);
  };

  return (
    <div className="daily-planner">
      <h1 className="title">GÜNLÜK PLANLAYICI</h1>

      <div className="inputs">
        <input
          type="text"
          placeholder="GÜN:"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <input
          type="text"
          placeholder="TARİH:"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="main-content">
        {/* SAAT VE NOTLAR */}
        <div className="time-column">
          {hours.map((hour, i) => (
            <div key={i} className="time-slot-with-note">
              <div className="time-label">{hour}</div>
              <input
                type="text"
                placeholder="Not..."
                value={hourlyNotes[i]}
                onChange={(e) => handleHourlyNoteChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* YAPILACAKLAR VE NOTLAR */}
        <div className="boxes">
          <div className="box small-box">
            <h2>YAPILACAKLAR</h2>
            <textarea
              value={todos}
              onChange={(e) => setTodos(e.target.value)}
              placeholder="Bugün yapılacaklar..."
            />
          </div>

          <div className="box small-box">
            <h2>NOTLAR</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Günün notları..."
            />

            <div className="bottom-section">
              <div className="weather">
                <label>HAVA DURUMU</label>
                <input
                  type="text"
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  placeholder="Örn: Güneşli"
                />
              </div>

              <div className="mood">
                <label>MOD</label>
                <div className="mood-icons">
                  {moods.map((mood, idx) => (
                    <span
                      key={idx}
                      className={`mood-icon ${
                        selectedMood === idx ? "active" : ""
                      }`}
                      onClick={() => setSelectedMood(idx)}
                    >
                      {mood}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;
