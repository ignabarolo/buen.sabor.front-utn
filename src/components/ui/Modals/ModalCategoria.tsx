import React from 'react';
import * as Yup from 'yup';
import GenericModal from './GenericModal'; 
import TextFieldValue from '../TextFieldValue/TextFieldValue'; 
import EmpresaService from '../../../services/EmpresaService'; 
import Empresa from '../../../types/Empresa'; 
import Categoria from '../../../types/Categoria';
import CategoriaService from '../../../services/CategoriaService';

// Define las props del componente de modal de categoria
interface ModalCategoriaProps {
  modalName: string; // Nombre del modal
  initialValues: Categoria; // Valores iniciales del formulario
  isEditMode: boolean; // Indicador de modo de edición
  getCategoria: Function; // Función para obtener categoria
  categoriaAEditar?: Categoria; // Empresa a editar
}

// Componente de modal de empresa
const ModalCategoria: React.FC<ModalCategoriaProps> = ({
  modalName,
  initialValues,
  isEditMode,
  getCategoria,
  categoriaAEditar,
}) => {

  const categoriaSerivce = new CategoriaService(); // Instancia del servicio de categoria
  const URL = import.meta.env.VITE_API_URL; // URL de la API

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    denominacion: Yup.string().required('Campo requerido'), // Campo denominacion requerido
    articulos: Yup.string().required('Campo requerido'), // Campo articulos requerido
    subCategorias: Yup.string().required('Campo requerido'), // Campo subCategoria requerido
  });



  // Función para manejar el envío del formulario
  const handleSubmit = async (values: Categoria) => {
    try {
      if (isEditMode) {
        await categoriaSerivce.put(`${URL}/categorias`, values.id.toString(), values); // Actualiza la categoria si está en modo de edición
      } else {
        await categoriaSerivce.post(`${URL}/categorias`, values); // Agrega una nueva categoria si no está en modo de edición
      }
      getCategoria(); // Actualiza la lista de categorias
    } catch (error) {
      console.error('Error al enviar los datos:', error); // Manejo de errores
    }
  };

  // Si no está en modo de edición, se limpian los valores iniciales
  if (!isEditMode) {
    initialValues = {
      id: 0,
      denominacion: '',
      articulos: [],
      subCategorias: [],
    };
  }

  // Renderiza el componente de modal genérico
  return (
    <GenericModal
      modalName={modalName}
      title={isEditMode ? 'Editar Categoria' : 'Añadir Categoria'}
      initialValues={categoriaAEditar || initialValues} // Usa la categoria a editar si está disponible, de lo contrario, usa los valores iniciales
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      isEditMode={isEditMode}
    >
      {/* Campos del formulario */}
      <TextFieldValue label="Denominacion" name="denominacion" type="text" placeholder="Denominacion" />
      <TextFieldValue label="Articulos" name="articulos" type="text" placeholder="Articulos" />
      <TextFieldValue label="SubCategorias" name="subCategorias" type="text" placeholder="SubCategorias" />
    </GenericModal>
  );
};

export default ModalCategoria; // Exporta el componente ModalCategoria