import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Tooltip,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Visibility, AddCircle } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setEmpresa } from "../../../redux/slices/EmpresaReducer";

import EmpresaService from "../../../services/EmpresaService";
import Column from "../../../types/Column";
import Empresa from "../../../types/Empresa";
import { Link } from "react-router-dom";
import { toggleModal } from "../../../redux/slices/ModalReducer";
import { handleSearch, onDelete } from "../../../utils/utils";
import SearchBar from "../../ui/common/SearchBar/SearchBar";
import TableComponent from "../../ui/Table/Table";
import ModalEmpresa from "../../ui/Modals/ModalEmpresa";
import styles from "./Empresa.module.css";

const EmpresaComponent = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const empresaService = new EmpresaService();
  const globalEmpresas = useAppSelector((state) => state.empresa.data);

  const [filteredData, setFilteredData] = useState<Empresa[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [empresaEditar, setEmpresaEditar] = useState<Empresa>();

  const fetchEmpresas = async () => {
    try {
      const empresas = await empresaService.getAll(url + "/empresa");
      dispatch(setEmpresa(empresas));
      setFilteredData(empresas);
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, [dispatch]);

  const onSearch = (query: string) => {
    handleSearch(query, globalEmpresas, "nombre", setFilteredData);
  };

  const onDeleteEmpresa = async (empresa: Empresa) => {
    try {
      await onDelete(
        empresa,
        async (empresaToDelete: Empresa) => {
          await empresaService.delete(
            url + "/empresa",
            empresaToDelete.id.toString()
          );
        },
        fetchEmpresas,
        () => {},
        (error: any) => {
          console.error("Error al eliminar empresa:", error);
        }
      );
    } catch (error) {
      console.error("Error al eliminar empresa:", error);
    }
  };

  const handleEdit = (empresa: Empresa) => {
    setIsEditing(true);
    setEmpresaEditar(empresa);
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const handleAddEmpresa = () => {
    setIsEditing(false);
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const columns: Column[] = [
    {
      id: "nombre",
      label: "Nombre",
      renderCell: (empresa) => <>{empresa.nombre}</>,
    },
    {
      id: "razonSocial",
      label: "Razón Social",
      renderCell: (empresa) => <>{empresa.razonSocial}</>,
    },
    { id: "cuil", label: "CUIL", renderCell: (empresa) => <>{empresa.cuil}</> },
    {
      id: "sucursales",
      label: "Sucursales",
      renderCell: (empresa) => (
        <>
          <Tooltip title="Ver Sucursales">
            <IconButton
              component={Link}
              to={`/empresas/${empresa.id}`}
              aria-label="Ver Sucursales"
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Agregar Sucursal">
            <IconButton
              component={Link}
              to={`/agregar-sucursal/${empresa.id}`}
              aria-label="Agregar Sucursal"
            >
              <AddCircle />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, my: 10 }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 3,
            }}
          >
            <Button
              onClick={handleAddEmpresa}
              sx={{
                bgcolor: "#E66200",
                "&:hover": {
                  bgcolor: "#494948",
                },
                padding: 3,
              }}
              variant="contained"
              startIcon={<Add />}
            >
              Empresa
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <SearchBar onSearch={onSearch} />
          </Box>
          <div className={styles.containerPinricpalList}>
            {/* Contenedor de la lista de héroes */}
            <div className={styles.conatainerList}>
              {/* Mapeo de la lista de héroes para mostrar cada héroe usando el componente CardHero */}
              {filteredData.map((empre: Empresa) => (
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6a1U6f_BPXg-0_QqXFaT3MHgBQZWsqHZU1uBfb_Mqg&s"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {empre.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {empre.razonSocial}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Tooltip title="Ver Sucursales">
                      <IconButton
                        component={Link}
                        to={`/empresas/${empre.id}`}
                        aria-label="Ver Sucursales"
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver Sucursales">
                      <IconButton
                        onClick={handleAddEmpresa}
                        aria-label="Ver Sucursales"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver Sucursales">
                      <IconButton>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
          <ModalEmpresa
            modalName="modal"
            initialValues={
              empresaEditar || {
                id: 0,
                nombre: "",
                razonSocial: "",
                cuil: 0,
                sucursales: [],
              }
            }
            isEditMode={isEditing}
            getEmpresas={fetchEmpresas}
          />
        </Container>
      </Box>
    </>
  );
};

export default EmpresaComponent;
