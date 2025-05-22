import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    age: "",
    school: "",
    about: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(formData));
    localStorage.setItem("profileImage", image);
    alert("Profil bilgileri kaydedildi!");
  };

  // Sayfa yüklendiğinde localStorage’dan verileri yükle
  React.useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("profileData"));
    const savedImage = localStorage.getItem("profileImage");
    if (savedData) setFormData(savedData);
    if (savedImage) setImage(savedImage);
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-title"></h1>
      <div className="profile-content">
        {/* Sol Profil Kartı */}
        <div className="profile-left">
          {image ? (
            <img src={image} alt="Profil" className="profile-image" />
          ) : (
            <div className="profile-placeholder">Fotoğraf Yok</div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="imageUpload"
            style={{ display: "none" }}
          />
          <label htmlFor="imageUpload" className="profile-upload-button">
            Fotoğraf Yükle
          </label>

          <input
            className="profile-input"
            type="text"
            name="name"
            placeholder="Ad Soyad"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="profile-input"
            type="text"
            name="department"
            placeholder="Bölüm/Alan"
            value={formData.department}
            onChange={handleChange}
          />
          <input
            className="profile-input"
            type="number"
            name="age"
            placeholder="Yaş"
            value={formData.age}
            onChange={handleChange}
          />
          <input
            className="profile-input"
            type="text"
            name="school"
            placeholder="Okul"
            value={formData.school}
            onChange={handleChange}
          />
          <textarea
            className="profile-textarea"
            name="about"
            placeholder="Hakkında"
            value={formData.about}
            onChange={handleChange}
          />

          <button className="profile-save-button" onClick={handleSave}>
            Kaydet
          </button>
        </div>

        {/* Sağ Butonlar */}
        <div className="profile-right">
          {[
            "Notlarım",
            "Takip Edilenler",
            "Takipçiler",
            "Anasayfa",
            "",
            "",
          ].map((text, index) => (
            <div className="profile-button" key={index}>
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
