import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Divider from '@mui/material/Divider';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link } from 'react-router-dom';
import "../../../../Styles/Variables.css";
import { NavItem } from 'react-bootstrap';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useAppSelector } from '../../../../hooks/redux';
import { useDispatch } from 'react-redux';
import { getTotals } from '../../../../redux/slices/CartReducer';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

export default function PrimarySearchAppBar() {
  const { user, isAuthenticated } = useAuth0();
  
  const { loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cartReducer);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement | null | any);
  };


  // NO BORRAR YA QUE DE ESTA FORMA SE OBTIENE EL TOKEN DEL USUARIO
  const callApi = async () => {
    //   ------OBTENER EL TOKEN DEL USUARIO-------

    // let token = await getAccessTokenSilently({
    //   authorizationParams : {
    //     audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    //   }
    // });
  }
  
  React.useEffect(() => 
    {
      callApi();
    }, [cart, dispatch(getTotals())]
  );
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/Perfil"} style={{ textDecoration: "none", color: "inherit" }}>
          <div>
            <Person2OutlinedIcon sx={{mr: 1, color: '#E66200'}}/>
          Perfil
          </div>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}><div><SettingsOutlinedIcon sx={{mr: 1, color:'#E66200}'}}/></div>Ajustes</MenuItem>
      <Divider/>
      <MenuItem onClick={handleMenuClose}>
        <div>
          <LoginOutlinedIcon sx={{mr: 1, color: '#E66200'}}/>
        </div>
        <Button onClick={() => logout()} style={{ textDecoration: "none", color: "inherit" }}>
          Cerrar Sesion
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background: "#E66200"}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ justifyContent: 'center' }}
          >
           <NavItem style={{ textDecoration: "none", color: "inherit" }}><span className="material-symbols-outlined" style={{padding:3}}>fastfood</span>El Buen Sabor</NavItem>

          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {
          (isAuthenticated) ?
            <div className='d-flex justify-content-center align-items-center'>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                className='col'
              >
                <AccountCircle />
              </IconButton>
              <div className='fs-6 ms-2'>{user?.name}</div>
            </div>
            :
            <Button onClick={() => loginWithRedirect()} style={{ textDecoration: "none", color: "inherit" }}>Iniciar sesión</Button>
          }
          <Link to={"/Cart"} style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="cart of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <ShoppingBagIcon />
              {
                (cart.cartTotalQuantity > 0)
                ?
                <span className="bag-quantity">
                  <span className='fs-5'>{cart.cartTotalQuantity}</span>
                </span>
                :
                <></> 
              }
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}