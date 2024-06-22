import { useAuth0 } from "@auth0/auth0-react";
import { CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PerfilUsuario = () => {
    let { user } = useAuth0();
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate("/EditarPerfil");
    }

    useEffect(() => {
    }, []);

    return (
        <div className="container" style={{marginTop: '150px', maxWidth: '250px'}}>
            <Card >
                <CardMedia
                    component="img"
                    alt="imagen_perfil"
                    height="140"
                    image={user?.picture}
                    style={{objectFit: 'fill'}}
                />
                <CardContent>
                    {(user?.name?.includes("@"))
                        ? 
                        <Typography gutterBottom variant="h5" component="div">
                            {user?.nickname}
                        </Typography>
                        :
                        <Typography gutterBottom variant="h5" component="div">
                            {user?.name} 
                        </Typography>
                    }
                    <Typography variant="body2" color="text.secondary">
                        {user?.email}
                    </Typography>
                </CardContent>
                <CardActions className="justify-content-center">
                    <Button onClick={handleEditProfile}>Editar</Button>
                </CardActions>
            </Card>
        </div>
  );
        
}

export default PerfilUsuario;