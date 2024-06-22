import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const InicioSesionExitoso = () => {
    let navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: `Bienvenido!`,
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) navigate("/CardsProducto");
            else navigate("/CardsProducto");
        });
        
    }, []);

    return (
        <></>
    )
        
}

export default InicioSesionExitoso;