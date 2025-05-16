import React from "react";
import { useNavigate } from "react-router-dom";

const NoteEditorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdf9ed] flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-7xl h-[90vh] bg-[#fdf9ed] border border-black rounded-xl">

        {/* Sol menü ikonları */}
        <div className="absolute left-6 top-24 flex flex-col gap-6 items-center text-black text-2xl">
          <button
            onClick={() => navigate("/")}
            title="Kapat"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white"
          >
            <img src="/icons/1.svg" alt="Kapat" className="w-4 h-4" />
          </button>
          <img src="/icons/2.svg" alt="Yazı Tipi" className="w-6 h-6" title="Yazı Tipi" />
          <img src="/icons/3.svg" alt="Madde İşareti" className="w-6 h-6" title="Madde İşareti" />
          <img src="/icons/4.svg" alt="Çizim Aracı" className="w-6 h-6" title="Çizim Aracı" />
          <img src="/icons/5.svg" alt="Dosya Ekle" className="w-6 h-6" title="Dosya Ekle" />
        </div>

        {/* Sayfa başlığı ortada */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-white px-8 py-2 rounded-full text-black font-semibold text-lg shadow-sm">
            Not Defteri
          </div>
        </div>

        {/* Sağ üst köşe simgeler */}
        <div className="absolute top-6 right-16 flex items-center space-x-6 text-black text-xl">
          <img src="/icons/6.svg" alt="Paylaş" className="w-6 h-6" title="Paylaş" />
          <img src="/icons/7.svg" alt="Seçenekler" className="w-6 h-6" title="Seçenekler" />
        </div>

        {/* Sağ üst köşe yazısı */}
        <div className="absolute top-6 right-2 translate-x-10 text-black font-semibold text-md">
          Not Yazma Sayfası
        </div>

        {/* Not içerik boş alan */}
        <div className="w-full h-full pt-32 px-28">
          {/* Kullanıcı buraya yazı ekleyecek */}
        </div>
      </div>
    </div>
  );
};

export default NoteEditorPage;
