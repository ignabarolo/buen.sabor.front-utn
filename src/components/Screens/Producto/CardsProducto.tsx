import { useEffect, useState } from "react";
import { Box, Typography, Button, Container, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setProducto } from "../../../redux/slices/ProductoReducer";
import ProductoService from "../../../services/ProductoService";
import { handleSearch } from "../../../utils/utils";
import Row from "../../../types/Row";
import Column from "../../../types/Column";
import SearchBar from "../../ui/common/SearchBar/SearchBar";
import TableComponent from "../../ui/Tables/Table/TableComponent";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addToCart } from "../../../redux/slices/CartReducer";

const CardsProducto = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const productoService = new ProductoService();
  const globalProductos = useAppSelector((state) => state.producto.data);

  const [filteredData, setFilteredData] = useState<Row[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductos = async () => {
    try {
      const productos = await productoService.getAll(url + "/ArticuloManufacturado");
      dispatch(setProducto(productos));
      setFilteredData(productos);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (query: string) => {
    handleSearch(query, globalProductos, "descripcion", setFilteredData);
  };

  useEffect(() => {
    fetchProductos();
  }, [dispatch]);


  const handleAddProducto = (producto: Row) => {
    dispatch(addToCart(producto))
  };

  const columns: Column[] = [
    {
      id: "denominacion",
      label: "",
      renderCell: (producto) => (
        <Typography variant="h6" fontWeight="bold">
          {producto.denominacion}
        </Typography>
      ),
    },
    { id: "descripcion", label: "", renderCell: () => 
      <img 
        src="https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/4e4293857c03d819e4ae51de1e86d66a.jpg"
        alt="Imagen producto" 
        style={{maxWidth:'300px', marginBottom: '1rem'}}
      />
    },
    { id: "descripcion", label: "", renderCell: (producto) => <>{producto.descripcion}</> },
    { id: "precioVenta", label: "Precio: $", renderCell: (producto) => <>{producto.precioVenta}</> },
    {
      id: "tiempoEstimadoMinutos",
      label: "Tiempo estimado:",
      renderCell: (producto) => <>{producto.tiempoEstimadoMinutos} min</>,
    },
    { id: "add-cart", label: "", renderCell: (producto) => 
      <Button
        className="mt-4"
        variant="contained"
        color="secondary"
        startIcon={<AddShoppingCartIcon />}
        sx={{
            backgroundColor: '#E66200',
            "&:hover": {
                bgcolor: "#E37E32",
            },
        }}
        onClick={() => handleAddProducto(producto)}
      >
        Añadir al carrito
      </Button> },
  ];

  return (
    <Box component="main" sx={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column", mt: 8 }}>
      <Container sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
          <Typography variant="h4" gutterBottom>
            Productos
          </Typography>
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
              <TableComponent 
                data={filteredData} 
                columns={columns} 
              />
            </Box>
          </>
        )}
        
      </Container>
    </Box>
  );
};

export default CardsProducto;
