import { useEffect, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ProductoService from "../../../services/ProductoService";
import { setProducto } from "../../../redux/slices/ProductoReducer";
import { handleSearch, onDelete } from "../../../utils/utils";
import Row from "../../../types/Row";
import Column from "../../../types/Column";
import SearchBar from "../../ui/common/SearchBar/SearchBar";
import TableComponent from "../../ui/Table/Table";
import ModalProducto from "../../ui/Modals/ModalProducto";
import IArticuloManufacturado from "../../../types/ArticuloManufacturado";
import { toggleModal } from "../../../redux/slices/ModalReducer";

const Producto = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const productoService = new ProductoService();
  // Estado global de Redux
  const globalProducto = useAppSelector((state) => state.producto.data);

  const [isEditing, setIsEditing] = useState(false);
  const [productoaEditar, setProductoaEditar] =
    useState<IArticuloManufacturado>();

  const [filteredData, setFilteredData] = useState<Row[]>([]);

  // Función para obtener los productos
  const fetchProductos = async () => {
    try {
      const productos = await productoService.getAll(
        url + "/ArticuloManufacturado"
      );
      dispatch(setProducto(productos));
      setFilteredData(productos);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [dispatch]);

  // Llama a la función handleSearch cuando se realiza una búsqueda
  const onSearch = (query: string) => {
    handleSearch(query, globalProducto, "denominacion", setFilteredData);
  };

  // Función para eliminar un producto
  const onDeleteProducto = async (producto: Row) => {
    try {
      await onDelete(
        producto,
        async (productoToDelete: Row) => {
          await productoService.delete(
            url + "/articulosManufacturados",
            productoToDelete.id.toString()
          );
        },
        fetchProductos,
        () => {},
        (error: any) => {
          console.error("Error al eliminar producto:", error);
        }
      );
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // Función para editar
  const handleEdit = (index: number) => {
    console.log("Editar producto en el índice", index);
  };

  const handleAddProducto = () => {
    setIsEditing(false);
    dispatch(toggleModal({ modalName: "modal" }));
  };

  // Definición de las columnas para la tabla de artículos manufacturados
  const columns: Column[] = [
    {
      id: "imagen",
      label: "Imagen",
      renderCell: (rowData) => (
        <img
          src={rowData.imagenes.length > 0 ? rowData.imagenes[0].url : ""}
          alt="Imagen"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      id: "denominacion",
      label: "Nombre",
      renderCell: (rowData) => <>{rowData.denominacion}</>,
    },
    {
      id: "precioVenta",
      label: "Precio",
      renderCell: (rowData) => <>{rowData.precioVenta}</>,
    },
    {
      id: "descripcion",
      label: "Descripción",
      renderCell: (rowData) => <>{rowData.descripcion}</>,
    },
    {
      id: "tiempoEstimadoMinutos",
      label: "Tiempo estimado en minutos",
      renderCell: (rowData) => <>{rowData.tiempoEstimadoMinutos}</>,
    },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 10 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Productos
          </Typography>
          <Button
            onClick={handleAddProducto}
            sx={{
              bgcolor: "#E66200",
              "&:hover": {
                bgcolor: "#494948",
              },
            }}
            variant="contained"
            startIcon={<Add />}
          >
            Producto
          </Button>
        </Box>
        {/* Barra de búsqueda */}
        <Box sx={{ mt: 2 }}>
          <SearchBar onSearch={onSearch} />
        </Box>
        {/* Componente de tabla para mostrar los artículos manufacturados */}
        <TableComponent
          data={filteredData}
          columns={columns}
          onDelete={onDeleteProducto}
          onEdit={handleEdit}
        />
        <ModalProducto
          modalName="modal"
          initialValues={{
            id: productoaEditar ? productoaEditar.id : 0,
            denominacion: productoaEditar ? productoaEditar.denominacion : "",
            precioVenta: productoaEditar ? productoaEditar.precioVenta : 0,
            imagenes: productoaEditar
              ? [
                  {
                    id: 0,
                    url:
                      productoaEditar.imagenes.length > 0
                        ? productoaEditar.imagenes[0].url
                        : "",
                  },
                ]
              : [{ id: 0, url: "" }],
            unidadMedida: productoaEditar
              ? productoaEditar.unidadMedida
              : { id: 0, denominacion: "" },
            descripcion: productoaEditar ? productoaEditar.denominacion : "",
            tiempoEstimadoMinutos: productoaEditar
              ? productoaEditar.tiempoEstimadoMinutos
              : 0,
            preparacion: productoaEditar ? productoaEditar.preparacion : "",
            articuloManufacturadoDetalles: productoaEditar
              ? productoaEditar.articuloManufacturadoDetalles
              : [
                  {
                    id: 0,
                    cantidad: 0,
                    articuloInsumo: {
                      id: 0,
                      denominacion: "",
                      precioVenta: 0,
                      imagenes: [{ id: 0, url: "" }],
                      unidadMedida: { id: 0, denominacion: "" },
                      precioCompra: 0,
                      stockActual: 0,
                      stockMaximo: 0,
                      stockMinimo: 0,
                      esParaElaborar: true,
                    },
                  },
                ],
          }}
          isEditMode={isEditing}
          getProductos={fetchProductos}
        />
      </Container>
    </Box>
  );
};

export default Producto;
