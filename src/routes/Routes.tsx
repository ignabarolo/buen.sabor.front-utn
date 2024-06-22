import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BaseNavbar from "../components/ui/common/Navbar/BaseNavbar";
import SidebarLayout from "../components/ui/common/SideBarLayout/SideBarLayout";
import "./routes.css";
import EmpresaComponent from "../components/Screens/Empresa/EmpresaComponent";
import SucursalComponent from "../components/Screens/Sucursal/SucursalComponent";
import Inicio from "../components/Screens/Inicio/Inicio";
import SucursalesEmpresa from "../components/Screens/Sucursal/SucursalComponent";
import Producto from "../components/Screens/Producto/Producto";
import Categoria from "../components/Screens/Categoria/Categoria";
import Insumo from "../components/Screens/Insumo/Insumo";
import UnidadMedida from "../components/Screens/UnidadMedida/UnidadMedida";
import CardsProducto from "../components/Screens/Producto/CardsProducto";
import Cart from "../components/Screens/Cart/Cart";
import Pedido from "../components/Screens/Pedido/Pedido";
import InicioSesionExitoso from "../components/Screens/Usuario/InicioSesionExitoso";
import PerfilUsuario from "../components/Screens/Usuario/PerfilUsuario";
import FormPerfil from "../components/Screens/Usuario/FormPerfil";


const Rutas: React.FC = () => {
  return (
    <Router>
      <div className="navbar">
        <BaseNavbar />
      </div>
      <Routes>
        <Route path="/" element={<EmpresaComponent />} />
        <Route path="/empresa/:empresaId" element={<SucursalComponent />} />
        <Route path="/loginSuccess" element={<InicioSesionExitoso />} />
        <Route path="/Perfil" element={<PerfilUsuario />} />
        <Route path="/EditarPerfil" element={<FormPerfil />} />
        <Route element={<SidebarLayout />}>
          <Route path="dashboard/:sucursalId" element={<Inicio />} />
          <Route path="/empresa/:empresaId" element={<SucursalesEmpresa />} />
          <Route path="productos/:sucursalId" element={<Producto />} />
          <Route path="promociones/:sucursalId" element={<Producto />} />
          <Route path="categorias/:idSucursal" element={<Categoria />} />
          <Route path="insumos/:sucursalId" element={<Insumo />} />
          <Route path="/unidadMedida" element={<UnidadMedida />} />
          <Route path="/CardsProducto" element={<CardsProducto />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Pedidos" element={<Pedido />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Rutas;
