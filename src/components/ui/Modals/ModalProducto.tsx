import React, { useEffect } from 'react';
import * as Yup from 'yup';
import GenericModal from './GenericModal'; 
import TextFieldValue from '../TextFieldValue/TextFieldValue'; 
import IArticuloManufacturado from '../../../types/ArticuloManufacturado';
import ProductoService from '../../../services/ProductoService';
import UnidadesMedidasService from '../../../services/UnidadesMedidasService';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setUnidadMedida } from '../../../redux/slices/UnidadMedidaReducer';
import { Field } from 'formik';

// Define las props del componente de modal de producto
interface ModalProductoProps {
  modalName: string; // Nombre del modal
  initialValues: IArticuloManufacturado; // Valores iniciales del formulario
  isEditMode: boolean; // Indicador de modo de edición
  getProductos: Function; // Función para obtener productos
  productosAEditar?: IArticuloManufacturado; // Producto a agregar
}

// Componente de modal de empresa
const ModalProducto: React.FC<ModalProductoProps> = ({
  modalName,
  initialValues,
  isEditMode,
  getProductos,
  productosAEditar,
}) => {

  const productoService = new ProductoService(); // Instancia del servicio de producto
  const URL = import.meta.env.VITE_API_URL; // URL de la API
  
  const dispatch = useAppDispatch();
  const unidadMedidaService = new UnidadesMedidasService();
    const globalUnidadMedida = useAppSelector(
        (state) => state.unidadMedida.data
    );

    useEffect(() => {
        const fetchUnidadesMedida = async () => {
            try {
                const um = await unidadMedidaService.getAll(
                    `${URL}/unidadesMedidas`
                );
                dispatch(setUnidadMedida(um));
            } catch (error) {
                console.error('Error al obtener las unidades de medida:', error);
            }
        };

        fetchUnidadesMedida();
    }, [dispatch]);

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    denominacion: Yup.string().required('Campo requerido'), // Campo denominacion requerido
    precioVenta: Yup.number().required('Campo requerido'),
    imagenes: Yup.string().required('Campo requerido'),
    unidadMedida: Yup.string().required('Campo requerido'), // Campo precio requerido
    descripcion: Yup.string().required('Campo requerido'), // Campo descripcion requerido
    tiempoEstiamdoMinutos: Yup.number().required('Campo requerido'),
    preparacion: Yup.string().required('Campo requerido'),
    articuloManufacturadoDetalles: Yup.string().required('Campo requerido'), // Campo tiempo requerido
  });



  // Función para manejar el envío del formulario
  const handleSubmit = async (values: IArticuloManufacturado) => {
    try {
      if (isEditMode) {
        await productoService.put(`${URL}/productos`, values.id.toString(), values); // Actualiza la empresa si está en modo de edición
      } else {
        await productoService.post(`${URL}/productos`, values); // Agrega una nueva empresa si no está en modo de edición
      }
      getProductos(); // Actualiza la lista de empresas
    } catch (error) {
      console.error('Error al enviar los datos:', error); // Manejo de errores
    }
  };

  // Si no está en modo de edición, se limpian los valores iniciales
  /*if (!isEditMode) {
    initialValues = {
      id: 0,
      denominacion: '',
      precioVenta: 0,
      imagenes: [],
      unidadMedida: '',
      descripcion: '',
      tiempoEstimadoMinutos: 0,
      preparacion: '',
      articuloManufacturadoDetalles: [],
    };
  }*/

  // Renderiza el componente de modal genérico
  return (
    <GenericModal
      modalName={modalName}
      title={isEditMode ? 'Editar Producto' : 'Añadir Producto'}
      initialValues={productosAEditar || initialValues} // Usa la empresa a editar si está disponible, de lo contrario, usa los valores iniciales
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      isEditMode={isEditMode}
    >
      {/* Campos del formulario */}
      <TextFieldValue label="Denominacion" name="denominacion" type="text" placeholder="Denominacion" />
      <TextFieldValue label="Precio de venta" name="precioVenta" type="number" placeholder="Precio de venta" />
      <TextFieldValue label="URL de la image" name="imagenes[0].url" type="text" placeholder="URL de la imagen" />
      <div>
                <label htmlFor="unidadMedida" style={{ marginRight: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    Unidad de Medida:
                </label>
                <Field
                    as="select"
                    name="unidadMedida.denominacion"
                    id="unidadMedida"
                    style={{ padding: '6px', paddingRight: '208px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '1rem' }}
                >
                    <option value="">Seleccione una unidad de medida</option>
                    {globalUnidadMedida.map((unidadMedida) => (
                        <option key={unidadMedida.id} value={unidadMedida.denominacion}>
                            {unidadMedida.denominacion}
                        </option>
                    ))}
                </Field>
            </div>
            <TextFieldValue label="Descripcion" name="descripcion" type="text" placeholder="Descripcion" />
            <TextFieldValue label="Tiempo estiamdo en minutos" name="tiempoEstimadoMinutos" type="number" placeholder="Tiempo estiamdo en minutos" />
            <TextFieldValue label="Preparacion" name="preparacion" type="text" placeholder="Preparacino" />
    </GenericModal>
  );
};

export default ModalProducto; // Exporta el componente ModalEmpresa