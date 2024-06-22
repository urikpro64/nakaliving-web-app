import React from "react";
import ReactDOM from "react-dom/client";

import "@/assets/css/global.css";

import { AppointmentPage } from "@/pages/appointment";
import { DashboardPage } from "@/pages/dashboard";
import { EstatePage } from "@/pages/estate/estate";
import { EstateAppointmentPage } from "@/pages/estate/estate-appointment";
import { EstateInformationPage } from "@/pages/estate/estate-information";
import { EstateInsertPage } from "./pages/estate/estate-insert";
import { LandingPage } from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserInformationPage } from "./pages/user/user-information";
import { UserEstatePage } from "./pages/user/user-estate";
import { UserAppointmentPage } from "./pages/user/user-appointment";
import { UserReportPage } from "./pages/user/user-report";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/estate" element={<EstatePage />} />
        <Route path="/estate/:estateId" element={<EstateInformationPage />} />
        <Route path="/estate/insert" element={<EstateInsertPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/estate/:estateId/appointment" element={<EstateAppointmentPage />}/>
        <Route path="/user/:userId" element={<UserInformationPage />} />
        <Route path="/user/:userId/estate" element={<UserEstatePage />} />
        <Route path="/user/:userId/report" element={<UserReportPage />} />
        <Route path="/user/:userId/appointment" element={<UserAppointmentPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);