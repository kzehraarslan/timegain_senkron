import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext"; // EKLENDİ
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NoteProvider>
        {" "}
        {/* NOTE CONTEXT BURADA */}
        <App />
      </NoteProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
