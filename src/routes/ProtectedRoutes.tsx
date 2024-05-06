import { Route, Routes } from "react-router-dom";
import Categoria from "../components/Screens/Categoria/Categoria";
import Empresa from "../components/Screens/Empresa/Empresa";
import Inicio from "../components/Screens/Inicio/Inicio";
import Insumo from "../components/Screens/Insumo/Insumo";
import Producto from "../components/Screens/Producto/Producto";
import Promocion from "../components/Screens/Promocion/Promocion";

export const ProtectedRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/empresas" element={<Empresa />} />
        <Route path="/productos" element={<Producto />} />
        <Route path="/categorias" element={<Categoria />} />
        <Route path="/insumos" element={<Insumo />} />
        <Route path="/promociones" element={<Promocion />} />
      </Routes>
    </>
  );
};
