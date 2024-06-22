import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useAppSelector } from "../../../hooks/redux";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { PedidoPost } from "../../../types/post/PedidoPost";

type FormTypesProps = {
    handleSubmit:(pedido: PedidoPost) => void;
    handleBackCart:() => void;
};

const FormPedido: React.FC<FormTypesProps> = ({ handleSubmit, handleBackCart }) => {{
    const cart = useAppSelector((state) => state.cartReducer);
    const [formaPago, setFormaPago] = useState("");
    const [tipoEnvio, setTipoEnvio] = useState("");

    

    const validationSchema = Yup.object({
        // formaPago: Yup.string().required("Campo requerido"),
        // tipoEnvio: Yup.string().required("Campo requerido"),
    })
    

    const initialValues: PedidoPost = {
        cartTotalQuantity: cart.cartTotalQuantity,
        cartTotalAmount: cart.cartTotalAmount,
        detallePedido: cart.detallePedido,
        estado: "PREPARACION",
        totalCosto: 0,
        formaPago: formaPago,
        total: 0,
        // horaEstimadaFinalizacion: "2000-12-12",
        idSucursal: "",
        tipoEnvio: tipoEnvio,
    }

    return (
        <Formik
            validationSchema={ validationSchema }
            initialValues={ initialValues }
            enableReinitialize={ true }
            onSubmit={async (values) => {
                values.formaPago = formaPago;
                values.tipoEnvio = tipoEnvio;
                handleSubmit(values);
            }}
        >
            {(props) => (
                <Form autoComplete="off">
                    <div className="d-flex justify-content-center">
                            <FormControl fullWidth style={{maxWidth: "20%", marginRight: "5rem"}} required>
                                <InputLabel id="demo-simple-select-label">Pago</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Pago"
                                        onChange={(e) => setFormaPago(e.target.value)}
                                        value={formaPago}
                                    >
                                        <MenuItem selected value={"EFECTIVO"}>Efectivo</MenuItem>
                                        <MenuItem value={"MERCADO_PAGO"}>Mercado pago</MenuItem>
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth style={{maxWidth: "20%"}} required>
                                <InputLabel id="demo-simple-select-label">Envio</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Envio"
                                    onChange={(e) => setTipoEnvio(e.target.value)}
                                    value={tipoEnvio}
                                >
                                    <MenuItem value={"DELIVERY"}>A domicilio</MenuItem>
                                    <MenuItem value={"TAKE_AWAY"}>Retiro por local</MenuItem>
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                    </div>

                    <div className="container text-center mt-5" style={{width: "15rem"}}>
                        <div className="d-flex justify-content-between align-items-baseline">
                            <span className="fs-5 fw-bold">Total:</span>
                            <span className="fs-5 fw-bold">${cart.cartTotalAmount}</span>
                        </div>

                        <div>
                            <Button 

                                variant="contained"
                                color="primary"
                                style={{width: "14rem"}} 
                                type="submit">
                                Generar pedido
                            </Button>
                        </div>  

                        <div className="mt-3">
                            <Button 
                                variant="contained"
                                style={{backgroundColor: "gray", width: "14rem"}} 
                                startIcon={<ArrowBackIcon />}
                                onClick={handleBackCart}
                                >
                                Volver al carrito
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
            
}};

export default FormPedido;