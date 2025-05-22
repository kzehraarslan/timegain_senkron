import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const { state } = useLocation();
  const user = state?.user || {
    name: "Zehra Arslan",
    department: "Bilgisayar Mühendisliği",
    age: "22",
    school: "Örnek Üniversitesi",
    about: "Yazılım geliştirme tutkunu",
    sharedNotes: ["React notları", "Veritabanı ödevi", "Proje sunumu"],
  };

  const [isFollowing, setIsFollowing] = useState(false);
  const [unfollowedText, setUnfollowedText] = useState("");

  const handleFollowToggle = () => {
    if (isFollowing) {
      // Takipten çık
      setUnfollowedText("Takipten çıkıldı");
      setTimeout(() => {
        setIsFollowing(false);
        setUnfollowedText("");
      }, 1500);
    } else {
      // Takip et
      setIsFollowing(true);
    }
  };

  return (
    <div className="user-profile-wrapper">
      {/* Sol Kart */}
      <div className="user-card-minimal">
        <img src="/icons/placeholder.jpg" alt="profile" className="avatar" />
        <p>
          <strong>{user.name}</strong>
        </p>
        <p>{user.department}</p>
        <p>{user.age}</p>
        <p>{user.school}</p>
        <p>{user.about}</p>

        {unfollowedText ? (
          <div className="unfollow-msg">{unfollowedText}</div>
        ) : (
          <button
            className={isFollowing ? "followed-btn" : "follow-btn"}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "✓ Takip Edildi" : "➕ Takip Et"}
          </button>
        )}
      </div>

      {/* Notlar */}
      <div className="note-box">
        <h3>{user.name.split(" ")[0]}'nın paylaşılan notları</h3>
        <ul>
          {user.sharedNotes?.length > 0 ? (
            user.sharedNotes.map((note, i) => <li key={i}>📝 {note}</li>)
          ) : (
            <li>Not bulunamadı.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserProfilePage;
