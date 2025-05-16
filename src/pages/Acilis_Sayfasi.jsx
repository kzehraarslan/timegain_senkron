import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Acilis_Sayfasi() {
  const navigate = useNavigate();

  const handleContinueWithoutSignup = () => {
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <p style={styles.subtitle}>FROM SENKRON</p>
      <h1 style={styles.title}>TIMEGAIN</h1>

      <div style={styles.buttonGroup}>
        <Link to="/login" style={styles.button}>Giriş Yap</Link>
        <Link to="/signin" style={styles.button}>Kaydol</Link>
      </div>

      <p style={styles.continueText} onClick={handleContinueWithoutSignup}>
        Kaydolmadan devam et
      </p>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#fdf9ed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '20px',
    color: '#003da5',
    fontWeight: '600',
    marginBottom: '10px',
    letterSpacing: '1px',
  },
  title: {
    fontSize: '64px',
    color: '#003da5',
    fontWeight: '800',
    margin: '0 0 40px 0',
  },
  buttonGroup: {
    display: 'flex',
    gap: '30px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#003da5',
    color: '#fff',
    padding: '14px 36px',
    borderRadius: '50px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  continueText: {
    fontSize: '16px',
    color: '#003da5',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
};

export default Acilis_Sayfasi;
