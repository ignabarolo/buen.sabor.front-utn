import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Column from '../../../types/Column';
import Sucursal from '../../../types/Sucursal';
import EmpresaService from '../../../services/EmpresaService';
import { toggleModal } from '../../../redux/slices/ModalReducer';
import { handleSearch } from '../../../utils/utils';
import SearchBar from '../../ui/common/SearchBar/SearchBar';
import TableComponent from '../../ui/Table/Table';
import { setSucursal } from '../../../redux/slices/SucursalReducer';
import ModalSucursal from '../../ui/Modals/ModalSucursal';
import SucursalService from '../../../services/SucursalService';




const SucursalesEmpresa: React.FC = () => {
  const { empresaId } = useParams<{ empresaId: string }>();
  const [filteredData, setFilteredData] = useState<Sucursal[]>([]);
  const [nombreEmpresa, setNombreEmpresa] = useState<string>('');
  const dispatch = useAppDispatch();
  const empresaService = new EmpresaService(); 
  const sucursalService = new SucursalService();
  const url = import.meta.env.VITE_API_URL;


  const sucursalesEmpresa =  useAppSelector(
    (state) => state.sucursal.data
  );

  const [isEditing, setIsEditing] = useState(false);
  const [sucursalaEditar, setSucursalaEditar] = useState<Sucursal>();


  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        if (empresaId) {
          const empresa = await empresaService.get(`${url}/empresas`, empresaId);
          if (empresa) {
            setNombreEmpresa(empresa.nombre);
            //Asignamos las sucursales de la empresa al estado global de redux --> importante para el buscador
            dispatch(setSucursal(empresa.sucursales));
            setFilteredData(empresa.sucursales); // Actualiza las sucursales directamente desde la información de la empresa
          } else {
            setNombreEmpresa('');
            setFilteredData([]); // Limpia las sucursales si no se encuentra la empresa
          }
        }
      } catch (error) {
        console.error('Error al obtener la empresa:', error);
      }
    };
  
    fetchEmpresa();
  }, [empresaId, url]);

  // Función para obtener las sucursales
  const fetchSucursales = async () => {
    try {
      const sucursales = await sucursalService.getAll(url + '/sucursales');
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
    handleSearch(query, sucursalesEmpresa, 'nombre', setFilteredData);
  };

  const onDelete = async (index: number) => {
    const sucursalId = filteredData[index].id;
    console.log('Eliminar sucursal con ID:', sucursalId);
  };

  const handleEdit = (index: number) => {
    const sucursalId = filteredData[index].id;
    console.log('Editar sucursal con ID:', sucursalId);
  };
  const handleAddSucursal = () => {
    dispatch(toggleModal({ modalName: "modal" }));
  };
  
  const columns: Column[] = [
    { id: 'nombre', label: 'Nombre', renderCell: (sucursal) => <>{sucursal.nombre}</> },
    { id: 'calle', label: 'Calle', renderCell: (sucursal) => <>{sucursal.domicilio.calle}</> },
    { id: 'numero', label: 'Número', renderCell: (sucursal) => <>{sucursal.domicilio.numero}</> },
    { id: 'localidad', label: 'Localidad', renderCell: (sucursal) => <>{sucursal.domicilio.localidad.nombre}</> },
    { id: 'provincia', label: 'Provincia', renderCell: (sucursal) => <>{sucursal.domicilio.localidad.provincia.nombre}</> },
    { id: 'pais', label: 'País', renderCell: (sucursal) => <>{sucursal.domicilio.localidad.provincia.pais.nombre}</> },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 10}}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
           Sucursales de {nombreEmpresa}
          </Typography>
          <Button
          onClick={handleAddSucursal}
            sx={{
              bgcolor: "#E66200",
              "&:hover": {
                bgcolor: "#494948",
              },
            }}
            variant="contained"
            startIcon={<Add />}
          >
            Sucursales
          </Button>
        </Box>
        <Box sx={{mt:2 }}>
          <SearchBar onSearch={onSearch} />
        </Box>
        <TableComponent data={filteredData} columns={columns} onDelete={onDelete} onEdit={handleEdit} />
        <ModalSucursal 
        modalName="modal" 
        initialValues={{
        id: sucursalaEditar ? sucursalaEditar.id: 0,
        nombre: sucursalaEditar ? sucursalaEditar.nombre:'',
        horarioApertura: sucursalaEditar ? sucursalaEditar.horarioApertura: '',
        horarioCierre: sucursalaEditar ? sucursalaEditar.horarioCierre: '',
        domicilio: sucursalaEditar ? sucursalaEditar.domicilio: {id:0, calle:'', numero:0, cp: 0, piso: 0, nroDpto:0, localidad: {id:0, nombre:'', provincia: {id:0, nombre:'', pais: {id:0, nombre:''}}}},
        categorias: sucursalaEditar ? sucursalaEditar.categorias: [{id:0, denominacion: '', articulos: [],subCategorias: [{id:0, denominacion:'', articulos:[], subCategorias:[]}]}],
        }}
        isEditMode={isEditing} 
        getSucursales={fetchSucursales} />
      </Container>
    </Box>
  );
};

export default SucursalesEmpresa;
