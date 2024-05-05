import { Box, Grid, Container, Typography } from "@mui/material";
import InicioCard from "../Common/InicioCard";
import ChartCard from "./ChartCard";
import Barra from "./Barra";
import Pie from "./Pie";

const productosContent = {
    url: 'https://w6h5a5r4.rocketcdn.me/wp-content/uploads/2019/06/pizza-con-chorizo-jamon-y-queso-1080x671.jpg',
    title: 'Productos',
    content: 'Añade nuevos platos o actualiza los precios para mejorar la experiencia de tus clientes.',
};

const empresasContent = {
    url: 'http://www.aikonerp.com.ar/blog/wp-content/uploads/2016/10/empresa-y-sucursal-750x410.png',
    title: 'Empresas',
    content: 'Agrega, actualiza o elimina información sobre tus empresas asociadas.'
};

const promocionesContent = {
    url: 'https://www.grandespymes.com.ar/wp-content/uploads/2020/07/promociones.jpg',
    title: 'Promociones',
    content: 'Personaliza tus ofertas y haz que destaquen para que tus clientes no puedan resistirse.',
};

const cardStyle = {
    width: "100%",
    height: "100%",
};


const Inicio: React.FC = () => {
    return (
        <Box component="main" sx={{ flexGrow: 1, pl: 9, pt: 4}}>
            <Container>
                <Typography component="h1" variant="h5" color="initial" >Bienvenidos</Typography>
                        
                <Grid container spacing={3} sx={{ py: 2, alignContent: 'center' , justifyContent: 'center' }}>
                    <Grid item xs={12} md={6}>
                        <ChartCard title="Gráfico de Pastel">
                            <Pie />
                        </ChartCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ChartCard title="Gráfico de Barras">
                            <Barra />
                        </ChartCard>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ alignContent: 'center' , justifyContent: 'center'}}>
                    <Grid item xs={12} md={4}>
                        <Box sx={cardStyle}>
                            <InicioCard content={empresasContent} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={cardStyle}>
                            <InicioCard content={productosContent} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={cardStyle}>
                            <InicioCard content={promocionesContent} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Inicio;
