import React from "react";
import ReactDOM from "react-dom/client";

import "@/assets/css/global.css";

import { AppointmentPage } from "@/pages/appointment";
import { DashboardPage } from "@/pages/dashboard";
import { EstatePage } from "@/pages/estate/estate";
import { EstateInformationPage } from "@/pages/estate/estate-information";
import { EstateInsertPage } from "./pages/estate/estate-insert";
import { LandingPage } from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserInformationPage } from "./pages/user/user-information";
import { UserAppointmentPage } from "./pages/user/user-appointment";
import { OwnerInformationPage } from "./pages/owner/owner-information";
import { OwnerEstatePage } from "./pages/owner/owner-estate";
import { OwnerReportPage } from "./pages/owner/owner-report";
import { OwnerAppointmentPage } from "./pages/owner/owner-appointment";
import { Navbar } from "./components/navbar";
import { UserRegisterPage } from "./pages/user/user-register";
import { OwnerRegisterPage } from "./pages/owner/owner-register";
import { OwnerAgentPage } from "./pages/owner/owner-agent";
import { AgentInformationPage } from "./pages/agent/agent-information";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/estate" element={<EstatePage />} />
          <Route path="/estate/:estateID" element={<EstateInformationPage />} />
          <Route path="/estate/insert" element={<EstateInsertPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/user" element={<UserInformationPage />} />
          <Route path="/user/appointment" element={<UserAppointmentPage />} />
          <Route path="/agent" element={<AgentInformationPage />} />
          <Route path="/owner" element={<OwnerInformationPage />} />
          <Route path="/owner/register" element={<OwnerRegisterPage/>} />
          <Route path="/owner/agent" element={<OwnerAgentPage/>} />
          <Route path="/owner/estate" element={<OwnerEstatePage />} />
          <Route path="/owner/report" element={<OwnerReportPage />} />
          <Route path="/owner/appointment" element={<OwnerAppointmentPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
