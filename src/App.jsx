// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Acilis_Sayfasi from "./pages/Acilis_Sayfasi";
import Log_in_Page from "./pages/Log_in_Page";
import Sign_in_Page from "./pages/Sign_in_Page";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Dashboard from "./pages/Dashboard";
import NoteEditorPage from "./pages/NoteEditorPage";
import CalendarPage from "./pages/CalendarPage";
import DayDetailPage from "./pages/DayDetailPage";
import MonthlyPlannerPage from "./pages/MonthlyPlannerPage";
import { NoteProvider } from "./context/NoteContext";
import WeeklyPlannerPage from "./pages/WeeklyPlannerPage";
import DailyPlanner from "./pages/DailyPlanner";
import Profile from "./pages/Profile";
import WorkSpacePage from "./pages/WorkSpacePage";
import UserProfilePage from "./pages/UserProfilePage";
function App() {
  return (
    <NoteProvider>
      <Routes>
        <Route path="/" element={<Acilis_Sayfasi />} />
        <Route path="/login" element={<Log_in_Page />} />
        <Route path="/signin" element={<Sign_in_Page />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/note-editor" element={<NoteEditorPage />} />
        <Route path="/calendar-page" element={<CalendarPage />} />
        <Route path="/calendar/day/:date" element={<DayDetailPage />} />
        <Route path="/monthly-planner" element={<MonthlyPlannerPage />} />
        <Route path="/weekly-planner" element={<WeeklyPlannerPage />} />
        <Route path="/daily-planner" element={<DailyPlanner />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workspaces" element={<WorkSpacePage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
      </Routes>
    </NoteProvider>
  );
}

export default App;
