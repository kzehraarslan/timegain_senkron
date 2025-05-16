import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Log_in_Page() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Giriş işlemi başarılıysa:
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Giriş Yap</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>E-Posta:</label>
        <input type="email" required style={styles.input} />
        <label>Şifre:</label>
        <input type="password" required style={styles.input} />
        <button type="submit" style={styles.button}>Giriş Yap</button>
      </form>

      <div style={styles.links}>
        <Link to="/signin" style={styles.link}>Hesabınız yoksa kaydolun</Link>
        <Link to="/forgot-password" style={styles.link}>Şifremi unuttum</Link>
      </div>
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
  title: {
    color: '#003da5',
    marginBottom: '20px',
    fontSize: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '300px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#003da5',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  links: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  link: {
    color: '#003da5',
    textDecoration: 'underline',
    fontSize: '14px',
  },
};

export default Log_in_Page;
