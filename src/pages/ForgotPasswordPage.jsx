import React, { useState } from "react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada backend'e e-posta gönderme işlemi olurdu
    setSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Şifremi Unuttum</h2>
      {submitted ? (
        <p style={styles.message}>
          Eğer bu e-posta adresi sistemimizde varsa, şifre sıfırlama bağlantısı
          gönderildi.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>E-Posta Adresi:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Sıfırlama Linki Gönder
          </button>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fdf9ed",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px",
  },
  title: {
    fontSize: "32px",
    color: "#003da5",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#003da5",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    fontSize: "16px",
    color: "#003da5",
    textAlign: "center",
    maxWidth: "350px",
  },
};

export default ForgotPasswordPage;


