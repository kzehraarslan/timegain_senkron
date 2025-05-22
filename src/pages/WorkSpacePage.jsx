// src/pages/WorkSpacePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./WorkSpacePage.css";

const WorkSpacePage = () => {
  const navigate = useNavigate();

  const people = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: "Zehra Arslan",
    department: "Bilgisayar Mühendisliği",
    age: "22",
    school: "Mersin Üniversitesi",
    about: "Yazılım geliştirici",
    sharedNotes: ["Not 1", "Not 2", "Not 3"],
  }));

  const handleCardClick = (person) => {
    navigate("/user-profile", { state: { user: person } });
  };

  return (
    <div className="workspace-wrapper">
      <div className="workspace-header">
        <h2>WORKSPACE</h2>
        <h3>Çalışma Odaları Sayfası</h3>
      </div>

      <div className="workspace-grid">
        {people.map((person) => (
          <div
            className="card"
            key={person.id}
            onClick={() => handleCardClick(person)}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/icons/placeholder.jpg"
              alt="profile"
              className="avatar"
            />
            <p>
              <strong>{person.name}</strong>
            </p>
            <p>{person.department}</p>
            <p>{person.age} yaşında</p>
            <p>{person.school}</p>
            <p>{person.about}</p>
          </div>
        ))}
      </div>

      <div className="workspace-footer">
        <span>Kişi Sayısı: {people.length}</span>
        <button className="close-btn" onClick={() => navigate("/")}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default WorkSpacePage;
