import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCog,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineNoteAdd } from "react-icons/md";

function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [importantNotes, setImportantNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("monthlyNotes")) || {};
    const allStarredNotes = [];

    Object.entries(storedNotes).forEach(([monthIndex, notesObj]) => {
      Object.entries(notesObj).forEach(([day, note]) => {
        if (note.starred) {
          allStarredNotes.push({
            day,
            text: note.text,
            month: getMonthName(monthIndex),
          });
        }
      });
    });

    setImportantNotes(allStarredNotes);
  }, []);

  const handleNoteEditorPage = () => {
    navigate("/note-editor");
  };

  const handleCalendarClick = () => {
    navigate("/calendar-page");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleWorkspacesClick = () => {
    navigate("/workspaces");
  };

  const menuItems = [
    {
      icon: <FaHome style={styles.icon} title="Ana Sayfa" />,
      title: "Ana Sayfa",
    },
    {
      icon: (
        <MdOutlineNoteAdd
          style={styles.icon}
          onClick={handleNoteEditorPage}
          title="Not Ekle"
        />
      ),
      title: "Not Ekle",
    },
    {
      icon: (
        <FaCalendarAlt
          style={styles.icon}
          onClick={handleCalendarClick}
          title="Takvim"
        />
      ),
      title: "Takvim",
    },
    {
      icon: (
        <FaUsers
          style={styles.icon}
          onClick={handleWorkspacesClick}
          title="Çalışma Odaları"
        />
      ),
      title: "Çalışma Odaları",
    },

    {
      icon: (
        <FaUser
          style={styles.icon}
          title="Profil"
          onClick={handleProfileClick}
        />
      ),
      title: "Profil",
    },
    {
      icon: <FaCog style={styles.icon} title="Ayarlar" />,
      title: "Ayarlar",
    },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Sol menü */}
      <div style={styles.sidebar}>
        {filteredItems.map((item, index) => (
          <div key={index}>{item.icon}</div>
        ))}
      </div>

      {/* Ana içerik */}
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <input
            type="text"
            placeholder="Ara..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <p style={styles.pageTitle}>Ana Sayfa</p>
        </div>

        {/* ⭐ Önemli Notlar */}
        <div style={{ marginTop: "20px", paddingLeft: "10px" }}>
          <h3 style={{ fontWeight: "bold" }}>⭐ Önemli Notlar</h3>
          <ul>
            {importantNotes.length > 0 ? (
              importantNotes.map((note, i) => (
                <li key={i}>
                  {note.day} {note.month}: {note.text}
                </li>
              ))
            ) : (
              <li>Henüz önemli not bulunmuyor.</li>
            )}
          </ul>
        </div>

        <div style={styles.contentRow}>
          <div style={styles.leftColumn}>
            <div style={styles.calendarMini}></div>
            <div style={styles.noteArea}></div>
            <button style={styles.button}>Etkinlik Ekle</button>
          </div>
          <div style={styles.rightColumn}>
            <div style={styles.tasks}></div>
            <div style={styles.fullCalendar}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMonthName(index) {
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
  return months[parseInt(index)];
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#fdf9ed",
  },
  sidebar: {
    width: "80px",
    backgroundColor: "#2246b1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    gap: "30px",
  },
  icon: {
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
  },
  mainContent: {
    flex: 1,
    padding: "20px 40px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    width: "300px",
    height: "40px",
    padding: "0 15px",
    backgroundColor: "#dbe4fa",
    border: "none",
    borderRadius: "20px",
    outline: "none",
    fontSize: "14px",
    color: "#333",
  },
  pageTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#000",
  },
  contentRow: {
    display: "flex",
    marginTop: "30px",
  },
  leftColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
  },
  calendarMini: {
    width: "200px",
    height: "200px",
    backgroundColor: "#e1e1e1",
    borderRadius: "10px",
  },
  noteArea: {
    width: "200px",
    height: "200px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#2246b1",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  rightColumn: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginLeft: "40px",
  },
  tasks: {
    height: "150px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  fullCalendar: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
};

export default Dashboard;
