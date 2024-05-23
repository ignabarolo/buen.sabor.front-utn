import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BaseNavbar from "../components/ui/common/Navbar/BaseNavbar";
import BasicSidebar from "../components/ui/common/Sidebar/BasicSidebar";
import "./routes.css";
import Inicio from "../components/screens/Inicio/Inicio";
import EmpresaComponent from "../components/screens/Empresa/EmpresaComponent";
import SucursalComponent from "../components/screens/Sucursal/SucursalComponent";
import Producto from "../components/screens/Producto/Producto";
import Insumo from "../components/screens/Insumo/Insumo";
import Categoria from "../components/screens/Categoria/Categoria";

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
          <Route path="/empresas" element={<EmpresaComponent />} />
          <Route path="/empresas/:empresaId" element={<SucursalComponent />} />
          <Route path="/productos" element={<Producto />} />
          <Route path="/insumos" element={<Insumo />} />
          {/* <Route path="/promociones" element={<Promocion />} /> */}
          <Route path="/categorias" element={<Categoria />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
