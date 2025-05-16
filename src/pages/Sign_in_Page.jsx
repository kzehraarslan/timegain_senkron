import React from 'react';
import { Link } from 'react-router-dom';

function Sign_in_Page() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Kayıt Ol</h2>
      <form style={styles.form}>
        <label>Ad Soyad:</label>
        <input type="text" required style={styles.input} />
        <label>E-Posta:</label>
        <input type="email" required style={styles.input} />
        <label>Şifre:</label>
        <input type="password" required style={styles.input} />
        <button style={styles.button}>Kaydol</button>
      </form>
      <Link to="/login" style={styles.link}>Zaten hesabınız var mı? Giriş yapın</Link>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#fdf9ed',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '300px',
  },
  title: {
    color: '#003da5',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#003da5',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  link: {
    marginTop: '15px',
    color: '#003da5',
    textDecoration: 'underline',
    fontSize: '14px',
  },
};

export default Sign_in_Page;
