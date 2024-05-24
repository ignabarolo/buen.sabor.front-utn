import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BaseNavbar from "../components/ui/common/Navbar/BaseNavbar";
import BasicSidebar from "../components/ui/common/Sidebar/BasicSidebar";
import "./routes.css";
import Inicio from "../components/Screens/Inicio/Inicio";
import Empresa from "../components/Screens/Empresa/Empresa";
import Producto from "../components/Screens/Producto/Producto";
import Insumo from "../components/Screens/Insumo/Insumo";

import Categoria from "../components/Screens/Categoria/Categoria";
import Promocion from "../components/Screens/Promocion/Promocion";
import Sucursal from "../components/Screens/Sucursal/Sucursal";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div className="navbar">
        <BaseNavbar />
      </div>
      <div className="sidebar">
        <BasicSidebar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/empresas" element={<Empresa />} />
          <Route path="/empresas/:empresaId" element={<Sucursal />} />
          <Route path="/productos" element={<Producto />} />
          <Route path="/insumos" element={<Insumo />} />
          <Route path="/promociones" element={<Promocion />} />
          <Route path="/categorias" element={<Categoria />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
