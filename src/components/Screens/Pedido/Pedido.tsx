import { useEffect, useState } from "react";
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { handleSearch } from "../../../utils/utils";
import Row from "../../../types/Row";
import Column from "../../../types/Column";
import SearchBar from "../../ui/common/SearchBar/SearchBar";
import TableComponent from "../../ui/Tables/Table/TableComponent";
import PedidoService from "../../../services/PedidoService";
import { setPedido } from "../../../redux/slices/PedidoReducer";

const Pedido = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const pedidoservice = new PedidoService();
  const globalPedidos = useAppSelector((state) => state.producto.data);

  const [filteredData, setFilteredData] = useState<Row[]>([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [productoEditar, setProductoEditar] = useState<IProducto | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPedidos = async () => {
    try {
      const pedidos = await pedidoservice.getAll(url + "/pedido");
      dispatch(setPedido(pedidos));
      setFilteredData(pedidos);
    } catch (error) {
      console.error("Error al obtener los Pedidos:", error);
    } finally {
      setIsLoading(false); // Indicamos que la carga de datos ha terminado
    }
  };

  const onSearch = (query: string) => {
    handleSearch(query, globalPedidos, "descripcion", setFilteredData);
  };

  useEffect(() => {
    fetchPedidos();
  }, [dispatch]);

//   const onDeleteProducto = async (producto: IProducto) => {
//     try {
//       await onDelete(
//         producto,
//         async (productoToDelete: IProducto) => {
//           await pedidoservice.delete(url + "/pedido", productoToDelete.id);
//         },
//         fetchPedidos,
//         () => {},
//         (error: any) => {
//           console.error("Error al eliminar producto:", error);
//         }
//       );
//     } catch (error) {
//       console.error("Error al eliminar producto:", error);
//     }
//   };

//   const handleEdit = (producto: IProducto) => {
//     setIsEditing(true);
//     setProductoEditar(producto);
//     dispatch(toggleModal({ modalName: "modalProducto" }));
//   };

//   const handleAddProducto = () => {
//     setIsEditing(false);
//     setProductoEditar(undefined);
//     dispatch(toggleModal({ modalName: "modalProducto" }));
//   };

  const columns: Column[] = [
    {
      id: "Pedido",
      label: "",
      renderCell: (pedido) => (
        <Typography variant="h6" fontWeight="bold">
          Pedido
        </Typography>
      ),
    },
    { id: "descripcion", label: "Tiempo estimado", renderCell: (pedido) => <>{pedido.horaEstimadaFinalizacion}</> },
    { id: "precioVenta", label: "Estado", renderCell: (pedido) => <>{pedido.estado}</> },
    { id: "preparacion", label: "Envio:", renderCell: (pedido) => <>{pedido.tipoEnvio}</> },
    { id: "unidadMedida", label: "Forma de pago:", renderCell: (pedido) => <>{pedido.formaPago}</> },
    {
      id: "tiempoEstimadoMinutos",
      label: "Total:",
      renderCell: (pedido) => <>${pedido.total}</>,
    },
  ];

  return (
    <Box component="main" sx={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column", mt: 8 }}>
      <Container sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
          <Typography variant="h4" gutterBottom>
            Pedidos
          </Typography>
          {/* <Button
            onClick={handleAddProducto}
            variant="contained"
            startIcon={<Add />}
            sx={{
              bgcolor: "#E66200",
              "&:hover": {
                bgcolor: "grey",
              },
              padding: "10px 20px",
              fontSize: "1.0rem",
            }}
          >
            Producto
          </Button> */}
        </Box>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <CircularProgress sx={{ color: '#fb6376' }} />
          </Box>
        ) : (
          <>
            <Box sx={{ mt: 2 }}>
              <SearchBar onSearch={onSearch} />
            </Box>
            <Box sx={{ flexGrow: 1, overflow: "auto", mt: 2 }}>
              <TableComponent data={filteredData} columns={columns} />
            </Box>
          </>
        )}
        {/* <ModalProducto
          modalName="modalProducto"
          initialValues={{
            id: 0,
            descripcion: "",
            tiempoEstimadoMinutos: 0,
            preparacion: "",
            precioVenta: 0,
            unidadMedida: 0,
            idsArticuloManufacturadoDetalles: [],
          }}
          isEditMode={isEditing}
          getPedidos={fetchPedidos}
          productoAEditar={productoEditar}
        /> */}
      </Container>
    </Box>
  );
};

export default Pedido;
