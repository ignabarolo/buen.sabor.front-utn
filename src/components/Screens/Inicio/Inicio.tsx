import { Box, Grid, Container, Typography } from "@mui/material";
import ChartCard from "../../ui/Cards/ChartCard/ChartCard";
import BaseBar from "../../ui/Charts/BaseBar";
import BasePie from "../../ui/Charts/BasePie";
import InicioCard from "../../ui/Cards/InicioCard/InicioCard";
import { useParams } from "react-router-dom";


// Contenido para las tarjetas de inicio
const productosContent = {
    url: "https://th.bing.com/th/id/OIP.BBfUDWMDYaLU2zBpcvDxfQHaE7?rs=1&pid=ImgDetMain",
    title: "Productos",
    content:
      "Agrega productos novedosos, edita los precios y ten contentos a tus clientes.",
  };

  const promocionesContent = {
    url: "https://d2vr64fd62ajh5.cloudfront.net/img/blog/1xq-plantillas-2x1-dos-por-uno-ofertas-editable-online.jpg",
    title: "Promociones",
    content:
      "Genera promociones para tus distintas sucursales y atrae a nuevos clientes.",
  };

const insumosContent = {
    url: 'https://th.bing.com/th/id/OIP.eTpdhsggPLvbFK1WKCWOfwHaE8?rs=1&pid=ImgDetMain',
    title: 'Insumos',
    content: 'Agrega, actualiza o elimina los insumos de tu sucursal'
};


// Estilo para las tarjetas
const cardStyle = {
    width: "100%",
    height: "100%",
};

//Renderización del componente
const Inicio: React.FC = () => {
    const { sucursalId } = useParams<{ sucursalId: string }>();
    localStorage.setItem("sucursalId", JSON.stringify(sucursalId));
    const id = sucursalId || '';
    return (
        <Box component="main" sx={{ flexGrow: 1, pt: 10}}>
            <Container>
                <Typography component="h1" variant="h5" color="initial" >¡Bienvenidos!</Typography>
                        
                <Grid container spacing={3} sx={{ alignContent: 'center' , justifyContent: 'center'}}>
                    <Grid item xs={12} md={4}>
                        <Box sx={cardStyle}>
                            <InicioCard content={productosContent}  sucursalId={id} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={cardStyle}>
                            <InicioCard content={promocionesContent}  sucursalId={id}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={cardStyle}>
                            <InicioCard content={insumosContent}  sucursalId={id} />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ py: 2, alignContent: 'center' , justifyContent: 'center' }}>
                    <Grid item xs={12} md={6}>
                        <ChartCard title="Gráfico de Pastel">
                            <BasePie />
                        </ChartCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ChartCard title="Gráfico de Barras">
                            <BaseBar />
                        </ChartCard>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Inicio;
