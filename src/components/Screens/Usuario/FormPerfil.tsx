import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { User, useAuth0 } from "@auth0/auth0-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaisService from "../../../services/PaisService";
import ProvinciaService from "../../../services/ProvinciaService";
import SelectList from "../../ui/SelectList/SelectList";
import IPais from "../../../types/IPais";
import IProvincia from "../../../types/IProvincia";
import LocalidadService from "../../../services/LocalidadService";
import ILocalidad from "../../../types/ILocalidad";

const FormPerfil: React.FC = () => {{
    const URL: string = import.meta.env.VITE_API_URL as string;

    const paisService = new PaisService();
    const provinciaService = new ProvinciaService();
    const localidadService = new LocalidadService();

    const [paises, setPaises] = useState<any[]>([]);
    const [provincias, setProvincias] = useState<any[]>([]);
    const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
    const [selectedPais, setSelectedPais] = useState<string>('');
    const [selectedProvincia, setSelectedProvincia] = useState<string>('');
    const [provinciaNombre, setProvinciaNombre] = useState<string>('');
    const [localidadNombre, setLocalidadNombre] = useState<string>('');

    const [selectedLocalidad, setSelectedLocalidad] = useState<string>('');



    const fetchPaises = async () => {
        try {
            const paises = await paisService.getAll(`${URL}/pais`);
            setPaises(paises);
        } catch (error) {
            console.error('Error al obtener los países:', error);
        }
    }

    const handlePaisChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const paisNombre = event.target.value;
        const paisSeleccionado = paises.find((pais) => pais.nombre === paisNombre);
        if (paisSeleccionado) {
            setSelectedPais(paisSeleccionado.id);
            console.log(selectedPais);
            setSelectedProvincia('');
            setSelectedLocalidad('');
        }
    };

    const fetchProvincias = async () => {
            try {
                const provincias = await provinciaService.getAll(`${URL}/provincia/findByPais/1`);
                setProvincias(provincias);
            } catch (error) {
                console.error('Error al obtener las provincias:', error);
            }
    };

    // Función para manejar el cambio de provincia
    const handleProvinciaChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const provNombre = event.target.value;
        const provSeleccionada = provincias.find((provincia) => provincia.nombre === provNombre);
        if (provSeleccionada) {
            setSelectedProvincia(provSeleccionada.id);
            setSelectedLocalidad('');
            fetchLocalidades(provSeleccionada.id);
            setProvinciaNombre(provSeleccionada.nombre); // Actualizar el nombre de la provincia seleccionada
        }
    };

    const fetchLocalidades = async (idProvincia = 1) => {
        try {
            const localidades = await localidadService.getAll(`${URL}/localidad/findByProvincia/${idProvincia}`) 
            setLocalidades(localidades);
        } catch (error) {
            console.error('Error al obtener las localidades:', error);
        }
    };

    const handleLocalidadChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const localidadNombre = event.target.value;
    // Buscar la localidad por su nombre en el array de localidades
    const localidadSeleccionada = localidades.find(localidad => localidad.nombre === localidadNombre);
    if (localidadSeleccionada) {
      // Asignar el ID de la localidad seleccionada
      setSelectedLocalidad(localidadSeleccionada.id.toString());
      setLocalidadNombre(localidadSeleccionada.nombre); // Actualizar el nombre de la localidad seleccionada
    }
  };

    const { user } = useAuth0();

    const navigate = useNavigate();
    
    const validationSchema = Yup.object({
        // formaPago: Yup.string().required("Campo requerido"),
        // tipoEnvio: Yup.string().required("Campo requerido"),
    })

    useEffect(() => {
        fetchPaises();
        fetchProvincias();
        fetchLocalidades();

    }, []);

    const handleCancel = () => {
        navigate("/Perfil");
    }
    
    const initialValues: User = {
        blocked: false,
        email_verified: user?.email_verified,
        email: user?.email,
        phone_number: user?.phone_number,
        phone_verified:  user?.phone_number_verified,
        // user_metadata:  user?.,
        app_metadata:  null,
        given_name:  user?.given_name,
        family_name:  user?.family_name,
        name:  user?.name,
        nickname:  user?.nickname,
        picture:  user?.picture,
        verify_email:  user?.email_verified,
        verify_phone_number:  user?.phone_number_verified,
        // password:  user?.password,
        // connection:  user?.connection,
        // client_id:  user?.client_id,
        username:  user?.name,
    }

    const [userProfile, setUserProfile] = useState<User>(initialValues);

    return (
        <div className="container" style={{marginTop: '100px'}}>
            <h3 className="text-center mb-5">Datos del perfil</h3>
            <Formik
                validationSchema={ validationSchema }
                initialValues={ initialValues }
                enableReinitialize={ true }
                onSubmit={async () => {
                    console.log(userProfile);
                }}
            >
                {() => (
                    <Form autoComplete="off">
                        <div className="d-flex justify-content-center">
                                <FormControl fullWidth style={{maxWidth: "50%", marginRight: "5rem"}} required>
                                        <TextField
                                            id="demo-simple-select"
                                            label="Nombre"
                                            onChange={(e) => {
                                                const updatedUserProfile = { ...userProfile };
                                                updatedUserProfile.given_name = e.target.value;
                                                setUserProfile(updatedUserProfile);
                                            }}
                                            value={userProfile.given_name}
                                        >
                                        </TextField>
                                        <FormHelperText>Required</FormHelperText>
                                </FormControl>

                                <FormControl fullWidth style={{maxWidth: "50%", marginRight: "5rem"}} required>
                                        <TextField
                                            id="demo-simple-select"
                                            label="Email"
                                            onChange={(e) => {
                                                const updatedUserProfile = { ...userProfile };
                                                updatedUserProfile.email = e.target.value;
                                                setUserProfile(updatedUserProfile);
                                            }}
                                            value={userProfile.email}
                                        >
                                        </TextField>
                                        <FormHelperText>Required</FormHelperText>
                                </FormControl>
                        </div>
                        <div className="mt-4 d-flex justify-content-center">
                            <FormControl fullWidth style={{maxWidth: "50%", marginRight: "5rem"}} required>
                                <TextField
                                    id="demo-simple-select"
                                    label="Apellido"
                                    onChange={(e) => {
                                        const updatedUserProfile = { ...userProfile };
                                        updatedUserProfile.family_name = e.target.value;
                                        setUserProfile(updatedUserProfile);
                                    }}
                                    value={userProfile.family_name}
                                >
                                </TextField>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth style={{maxWidth: "50%", marginRight: "5rem"}} required>
                                <TextField
                                    type="number"
                                    id="demo-simple-select"
                                    label="Telefono"
                                    onChange={(e) => {
                                        const updatedUserProfile = { ...userProfile };
                                        updatedUserProfile.phone_number = e.target.value;
                                        setUserProfile(updatedUserProfile);
                                    }}
                                    value={userProfile.phone_number}
                                >
                                </TextField>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </div>

                        <div className="mt-4 d-flex justify-content-center">
                            <FormControl fullWidth style={{maxWidth: "30%", marginRight: "5rem"}} required>
                                <SelectList
                                    title="Países"
                                    items={paises.map((pais: IPais) => pais.nombre)}
                                    handleChange={handlePaisChange}
                                    selectedValue={selectedPais}
                                    disabled={false}
                                />
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth style={{maxWidth: "30%", marginRight: "5rem"}} required>
                                    <SelectList
                                        title="Provincias"
                                        items={provincias.map((provincia: IProvincia) => provincia.nombre)}
                                        handleChange={handleProvinciaChange}
                                        selectedValue={provinciaNombre}
                                    />
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth style={{maxWidth: "30%", marginRight: "5rem"}} required>
                                <SelectList
                                    title="Localidades"
                                    items={localidades.map((localidad: ILocalidad) => localidad.nombre)}
                                    handleChange={handleLocalidadChange}
                                    selectedValue={localidadNombre}
                                />
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </div>

                        <div className="mt-4 d-flex justify-content-center">
                            <FormControl fullWidth style={{maxWidth: "30%", marginRight: "5rem"}} required>
                                <TextField
                                    type="text"
                                    id="calle"
                                    label="Calle"
                                    // onChange={(e) => {
                                        // const updatedUserProfile = { ...userProfile };
                                        // updatedUserProfile.phone_number = e.target.value;
                                        // setUserProfile(updatedUserProfile);
                                    // }}
                                >
                                </TextField>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth style={{maxWidth: "10%", marginRight: "2rem"}} required>
                                <TextField
                                    type="number"
                                    id="nro"
                                    label="Nro"
                                    // onChange={(e) => {
                                        // const updatedUserProfile = { ...userProfile };
                                        // updatedUserProfile.phone_number = e.target.value;
                                        // setUserProfile(updatedUserProfile);
                                    // }}
                                >
                                </TextField>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth style={{maxWidth: "10%", marginRight: "2rem"}} required>
                                <TextField
                                    type="number"
                                    id="cp"
                                    label="Codigo postal"
                                    // onChange={(e) => {
                                        // const updatedUserProfile = { ...userProfile };
                                        // updatedUserProfile.phone_number = e.target.value;
                                        // setUserProfile(updatedUserProfile);
                                    // }}
                                >
                                </TextField>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth style={{maxWidth: "10%", marginRight: "2rem"}}>
                                <TextField
                                    type="number"
                                    id="piso"
                                    label="Piso"
                                    // onChange={(e) => {
                                        // const updatedUserProfile = { ...userProfile };
                                        // updatedUserProfile.phone_number = e.target.value;
                                        // setUserProfile(updatedUserProfile);
                                    // }}
                                >
                                </TextField>
                            </FormControl>

                            <FormControl fullWidth style={{maxWidth: "10%", marginRight: "2rem"}}>
                                <TextField
                                    type="number"
                                    id="nroDepto"
                                    label="Número Depto"
                                    // onChange={(e) => {
                                        // const updatedUserProfile = { ...userProfile };
                                        // updatedUserProfile.phone_number = e.target.value;
                                        // setUserProfile(updatedUserProfile);
                                    // }}
                                >
                                </TextField>
                            </FormControl>
                        </div>


                        <div className="d-flex justify-content-center mt-5" style={{width: "100%"}}>
                                <Button 
                                    variant="contained"
                                    color="error"
                                    style={{width: "14rem", marginRight: "2rem"}} 
                                    onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button 
                                    variant="contained"
                                    color="primary"
                                    style={{width: "14rem"}} 
                                    type="submit">
                                    Guardar cambios
                                </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
            
}};

export default FormPerfil;