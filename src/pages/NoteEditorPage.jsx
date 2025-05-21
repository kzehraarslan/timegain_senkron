import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NoteEditorPage.module.css';

const NoteEditorPage = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [showCanvas, setShowCanvas] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const fileInputRef = useRef(null);
  const isDrawing = useRef(false);

  const handleSave = () => {
    console.log('Not kaydedildi:', note);
    alert("Not kaydedildi (konsola yazdırıldı).");
  };

  const handleAddBullet = () => {
    setNote(prev => prev + '\n• ');
  };

  const handleFontSizeChange = () => {
    setFontSize(prev => (prev === 16 ? 20 : 16));
  };

  const handleDrawTool = () => {
    setShowCanvas(prev => !prev);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`"${file.name}" dosyası seçildi.`);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(note)
      .then(() => alert("Not panoya kopyalandı!"))
      .catch(() => alert("Kopyalanamadı."));
  };

  const handleOptions = () => {
    alert("Seçenekler henüz eklenmedi.");
  };

  // Çizim başlat
  useEffect(() => {
    if (showCanvas) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctxRef.current = ctx;
    }
  }, [showCanvas]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    isDrawing.current = true;
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing.current) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const endDrawing = () => {
    isDrawing.current = false;
    ctxRef.current.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "cizim.png";
    link.click();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.editorContainer}>

        {/* Sol menü ikonları */}
        <div className={styles.leftIcons}>
          <button onClick={() => navigate("/")} className={styles.iconButton} title="Kapat">
            <img src="/icons/1.svg" alt="Kapat" className={styles.icon} />
          </button>

          <button onClick={handleFontSizeChange} className={styles.iconButton} title="Yazı Tipi">
            <img src="/icons/2.svg" alt="Yazı Tipi" className={styles.icon} />
          </button>

          <button onClick={handleAddBullet} className={styles.iconButton} title="Madde İşareti">
            <img src="/icons/3.svg" alt="Madde İşareti" className={styles.icon} />
          </button>

          <button onClick={handleDrawTool} className={styles.iconButton} title="Çizim Aracı">
            <img src="/icons/4.svg" alt="Çizim Aracı" className={styles.icon} />
          </button>

          <button onClick={() => fileInputRef.current.click()} className={styles.iconButton} title="Dosya Ekle">
            <img src="/icons/5.svg" alt="Dosya Ekle" className={styles.icon} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>

        {/* Başlık */}
        <div className={styles.titleBar}>Not Defteri</div>

        {/* Sağ üst ikonlar */}
        <div className={styles.topRightIcons}>
          <button onClick={handleShare} className={styles.iconButton} title="Paylaş">
            <img src="/icons/6.svg" alt="Paylaş" className={styles.icon} />
          </button>

          <button onClick={handleOptions} className={styles.iconButton} title="Seçenekler">
            <img src="/icons/7.svg" alt="Seçenekler" className={styles.icon} />
          </button>
        </div>

        {/* İçerik alanı */}
        <div className={styles.contentArea}>
          <textarea
            className={styles.textArea}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ fontSize: `${fontSize}px` }}
            placeholder="Notunuzu buraya yazın..."
          />
          <button className={styles.saveButton} onClick={handleSave}>Kaydet</button>

          {showCanvas && (
            <div style={{ marginTop: '20px' }}>
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  cursor: 'crosshair'
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={clearCanvas}
                  className={styles.saveButton}
                  style={{ backgroundColor: '#e53935', marginTop: '10px' }}
                >
                  Temizle
                </button>
                <button
                  onClick={saveCanvasAsImage}
                  className={styles.saveButton}
                  style={{ backgroundColor: '#2196f3', marginTop: '10px' }}
                >
                  Kaydet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteEditorPage;