import React from 'react';
import * as Yup from 'yup';
import GenericModal from './GenericModal'; 
import TextFieldValue from '../TextFieldValue/TextFieldValue'; 
import SucursalService from '../../../services/SucursalService';
import Sucursal from '../../../types/Sucursal';

// Define las props del componente de modal de sucursal
interface ModalSucursalProps {
  modalName: string; // Nombre del modal
  initialValues: Sucursal; // Valores iniciales del formulario
  isEditMode: boolean; // Indicador de modo de edición
  getSucursales: Function; // Función para obtener sucursales
  sucursalAEditar?: Sucursal; // Sucursal a editar
}

// Componente de modal de sucursal
const ModalSucursal: React.FC<ModalSucursalProps> = ({
  modalName,
  initialValues,
  isEditMode,
  getSucursales,
  sucursalAEditar,
}) => {

  const sucursalService = new SucursalService(); // Instancia del servicio de sucursal
  const URL = import.meta.env.VITE_API_URL; // URL de la API

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Campo requerido'), // Campo nombre requerido
    horarioApertura: Yup.string().required('Campo requerido'), // Campo horarioApertura requerido
    horarioCierre: Yup.string().required('Campo requerido'), // Campo horarioCierre requerido
    domicilio: Yup.string().required('Campo requerido'), // Campo domicilio requerido
    categorias: Yup.string().required('Campo requerido'), // Campo categorias requerido
  });



  // Función para manejar el envío del formulario
  const handleSubmit = async (values: Sucursal) => {
    try {
      if (isEditMode) {
        await sucursalService.put(`${URL}/sucursales`, values.id.toString(), values); // Actualiza la sucursal si está en modo de edición
      } else {
        await sucursalService.post(`${URL}/sucursales`, values); // Agrega una nueva sucursal si no está en modo de edición
      }
      getSucursales(); // Actualiza la lista de sucursales
    } catch (error) {
      console.error('Error al enviar los datos:', error); // Manejo de errores
    }
  };

  // Si no está en modo de edición, se limpian los valores iniciales
  /*if (!isEditMode) {
    initialValues = {
      id: 0,
      nombre: '',
      horarioApertura: '',
      horarioCierre: '',
      domicilio: ,
      categorias: [],
    };
  }*/

  // Renderiza el componente de modal genérico
  return (
    <GenericModal
      modalName={modalName}
      title={isEditMode ? 'Editar Sucursal' : 'Añadir Sucursal'}
      initialValues={sucursalAEditar || initialValues} // Usa la sucursal a editar si está disponible, de lo contrario, usa los valores iniciales
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      isEditMode={isEditMode}
    >
      {/* Campos del formulario */}
      <TextFieldValue label="Nombre" name="nombre" type="text" placeholder="Nombre" />
      <TextFieldValue label="Horario de apertura" name="horarioApertura" type="text" placeholder="Horario de apertura" />
      <TextFieldValue label="Horario de cierre" name="horarioCierre" type="text" placeholder="Horario de cierre" />
      <TextFieldValue label="Domicilio" name="domicilio" type="text" placeholder="Domicilio" />
      <TextFieldValue label="Categoria" name="categoria" type="text" placeholder="Categoria" />
    </GenericModal>
  );
};

export default ModalSucursal; // Exporta el componente ModalEmpresa