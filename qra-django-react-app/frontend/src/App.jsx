import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ClientFormPage from "./pages/ClientFormPage";
import TariffsList from "./pages/TariffsList";
import TariffForm from "./pages/TariffForm";
import ClientDetails from "./pages/ClientDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import TariffDetails from "./pages/TariffDetails";
import TariffEdit from "./pages/TariffEdit";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/tariffs/:id/edit" element={<TariffEdit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/client-form" element={<ClientFormPage />} />
        <Route path="/clients/:id" element={<ClientDetails />} />
        <Route path="/tariffs/:id" element={<TariffDetails />} />
        <Route path="/tariffs-list" element={<TariffsList />} />
        <Route path="/tariff-form" element={<TariffForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App