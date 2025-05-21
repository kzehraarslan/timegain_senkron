// src/pages/DayDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DayDetailPage = () => {
  const { date } = useParams(); // URL'den tarih al
  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNote = localStorage.getItem(date);
    if (savedNote) {
      setNote(savedNote);
    }
  }, [date]);

  const handleSave = () => {
    localStorage.setItem(date, note);
    alert("Not kaydedildi!");
  };

  return (
    <div style={styles.container}>
      <h2>{date} için not</h2>
      <textarea
        style={styles.textarea}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Bugün için görev, not, etkinlik yaz..."
      />
      <button style={styles.button} onClick={handleSave}>
        Kaydet
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#fdf9ed",
    height: "100vh",
  },
  textarea: {
    width: "100%",
    height: "300px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#003da5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default DayDetailPage;
