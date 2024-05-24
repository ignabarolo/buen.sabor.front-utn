import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Visibility } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Column from "../../../types/Column";
import Sucursal from "../../../types/Sucursal";
import EmpresaService from "../../../services/EmpresaService";
import { toggleModal } from "../../../redux/slices/ModalReducer";
import { handleSearch } from "../../../utils/utils";
import SearchBar from "../../ui/common/SearchBar/SearchBar";
import TableComponent from "../../ui/Table/Table";
import { setSucursal } from "../../../redux/slices/SucursalReducer";
import ModalSucursal from "../../ui/Modals/ModalSucursal";
import SucursalService from "../../../services/SucursalService";
import styles from "../Empresa/Empresa.module.css";

const SucursalesEmpresa: React.FC = () => {
  const { empresaId } = useParams<{ empresaId: string }>();
  const [filteredData, setFilteredData] = useState<Sucursal[]>([]);
  const [nombreEmpresa, setNombreEmpresa] = useState<string>("");
  const dispatch = useAppDispatch();
  const empresaService = new EmpresaService();
  const sucursalService = new SucursalService();
  const url = import.meta.env.VITE_API_URL;

  const sucursalesEmpresa = useAppSelector((state) => state.sucursal.data);

  const [isEditing, setIsEditing] = useState(false);
  const [sucursalaEditar, setSucursalaEditar] = useState<Sucursal>();

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        if (empresaId) {
          const empresa = await empresaService.get(
            `${url}/empresa/sucursales`,
            empresaId
          );
          if (empresa) {
            setNombreEmpresa(empresa.nombre);
            //Asignamos las sucursales de la empresa al estado global de redux --> importante para el buscador
            dispatch(setSucursal(empresa.sucursales));
            setFilteredData(empresa.sucursales); // Actualiza las sucursales directamente desde la información de la empresa
          } else {
            setNombreEmpresa("");
            setFilteredData([]); // Limpia las sucursales si no se encuentra la empresa
          }
        }
      } catch (error) {
        console.error("Error al obtener la empresa:", error);
      }
    };

    fetchEmpresa();
  }, [empresaId, url]);

  // Función para obtener las sucursales
  const fetchSucursales = async () => {
    try {
      const sucursales = await sucursalService.getAll(url + "/sucursales");
      dispatch(setSucursal(sucursales));
      setFilteredData(sucursales);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchSucursales();
  }, [dispatch]);

  // Llama a la función handleSearch cuando se realiza una búsqueda
  const onSearch = (query: string) => {
    handleSearch(query, sucursalesEmpresa, "nombre", setFilteredData);
  };

  const onDelete = async (index: number) => {
    const sucursalId = filteredData[index].id;
    console.log("Eliminar sucursal con ID:", sucursalId);
  };

  const handleEdit = (index: number) => {
    const sucursalId = filteredData[index].id;
    console.log("Editar sucursal con ID:", sucursalId);
  };
  const handleAddSucursal = () => {
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const columns: Column[] = [
    {
      id: "nombre",
      label: "Nombre",
      renderCell: (sucursal) => <>{sucursal.nombre}</>,
    },
    {
      id: "calle",
      label: "Calle",
      renderCell: (sucursal) => <>{sucursal.domicilio.calle}</>,
    },
    {
      id: "numero",
      label: "Número",
      renderCell: (sucursal) => <>{sucursal.domicilio.numero}</>,
    },
    {
      id: "localidad",
      label: "Localidad",
      renderCell: (sucursal) => <>{sucursal.domicilio.localidad.nombre}</>,
    },
    {
      id: "provincia",
      label: "Provincia",
      renderCell: (sucursal) => (
        <>{sucursal.domicilio.localidad.provincia.nombre}</>
      ),
    },
    {
      id: "pais",
      label: "País",
      renderCell: (sucursal) => (
        <>{sucursal.domicilio.localidad.provincia.pais.nombre}</>
      ),
    },
  ];

  return (
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
            onClick={handleAddSucursal}
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
            Sucursal
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <SearchBar onSearch={onSearch} />
        </Box>
        <div className={styles.containerPinricpalList}>
          {/* Contenedor de la lista de héroes */}
          <div className={styles.conatainerList}>
            {/* Mapeo de la lista de héroes para mostrar cada héroe usando el componente CardHero */}
            {filteredData.map((sucu: Sucursal) => (
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsLhctfz5BIbUPSGl3iSfl9bHaNui1-t2BdnOBSYvrBg&s"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {sucu.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hora de apertura:
                    {sucu.horarioApertura}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hora de cierre:
                    {sucu.horarioCierre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ¿Es casa matriz?
                  </Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title="Ver Sucursales">
                    <IconButton
                      component={Link}
                      to={`/empresas/${sucu.id}`}
                      aria-label="Ver Sucursales"
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Ver Sucursales">
                    <IconButton aria-label="Ver Sucursales">
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
        {/*
        <ModalSucursal
          modalName="modal"
          initialValues={{
            id: sucursalaEditar ? sucursalaEditar.id : 0,
            nombre: sucursalaEditar ? sucursalaEditar.nombre : "",
            horarioApertura: sucursalaEditar
              ? sucursalaEditar.horarioApertura
              : "",
            horarioCierre: sucursalaEditar ? sucursalaEditar.horarioCierre : "",
            domicilio: sucursalaEditar
              ? sucursalaEditar.domicilio
              : {
                  id: 0,
                  calle: "",
                  numero: 0,
                  cp: 0,
                  piso: 0,
                  nroDpto: 0,
                  localidad: {
                    id: 0,
                    nombre: "",
                    provincia: {
                      id: 0,
                      nombre: "",
                      pais: { id: 0, nombre: "" },
                    },
                  },
                },
            categorias: sucursalaEditar
              ? sucursalaEditar.categorias
              : [
                  {
                    id: 0,
                    denominacion: "",
                    articulos: [],
                    subCategorias: [
                      {
                        id: 0,
                        denominacion: "",
                        articulos: [],
                        subCategorias: [],
                      },
                    ],
                  },
                ],
          }}
          isEditMode={isEditing}
          getSucursales={fetchSucursales}
        />
        */}
      </Container>
    </Box>
  );
};

export default SucursalesEmpresa;
