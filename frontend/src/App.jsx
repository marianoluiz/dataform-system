import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home.jsx";
import AdminDashboard from "./views/Admin/AdminDashboard.jsx";
import Login from "./views/Auth/Login.jsx";
import AdminManagement from "./views/Admin/AdminManagement.jsx";
import PrivateRoute from "./components/PrivateRoute";
import { SidebarProvider } from "./context/SidebarContext";
import FormRenderer from "./views/Form/FormRenderer.jsx";
import './styles/main.scss';

import { useEffect } from "react";
import { useModal } from "./context/ModalContext.jsx";

// modal
import Modal from "./views/Modal/Modal.jsx";

const App = () => {

  // open modal once and not when it is opened
  const { openModal, modalOpened} = useModal();
  useEffect(() => {
    if (import.meta.env.VITE_NODE_ENV === "production" && !modalOpened) {
      setTimeout(() => {
        openModal();
      }, 3000);
    }
  }, []);

  return (
    <SidebarProvider>
      <Modal />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<FormRenderer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage"
          element={
            <PrivateRoute>
              <AdminManagement />
            </PrivateRoute>
          }
        />
      </Routes>
    </SidebarProvider>
  );
};

export default App;
