import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../../../redux/slices/CartReducer";
import IProducto from "../../../types/IProducto";
const TOKEN_MP = import.meta.env.VITE_TOKEN_MP;
import "./CartModule.css";
import { Button, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FormPedido from "../Pedido/FormPedido";
import CartService from "../../../services/CartService";
import { PedidoPost } from "../../../types/post/PedidoPost";
import Swal from "sweetalert2";

const Cart = () => {
//   const [idPreference, setIdPreference] = useState<string>('');
    let sucursalIdJSON = localStorage.getItem("sucursalId");
    let sucursalId =  sucursalIdJSON ? JSON.parse(sucursalIdJSON) : '';

    const cartService = new CartService();
    const URL = import.meta.env.VITE_API_URL;
    const [isGenerarPedido, setIsGenerarPedido] = useState<boolean>(false);

    const cart = useAppSelector((state) => state.cartReducer);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);


    const handleSubmit = async (pedido: PedidoPost) => {
        pedido.total = cart.total;
        pedido.idSucursal = sucursalId;
        await cartService.post(`${URL}/pedido/Create`, pedido) as PedidoPost;
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Pedido generado con éxito!',
        });
        dispatch(clearCart());
        navigate("/Pedidos");
    };

    const handleBackCart = () => {
        setIsGenerarPedido(false);
    };

    const handleAddToCart = (product: IProducto) => {
        dispatch(addToCart(product));
    };

    const handleDecreaseCart = (product: IProducto) => {
        dispatch(decreaseCart(product));
    };

    const handleRemoveFromCart = (product: IProducto) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <>
            {
                (!isGenerarPedido)
                ?
                <div className="cart-container mt-5">
                    <h2>Carrito de compras</h2>
                    {cart.detallePedido.length === 0 ? (
                        <div className="cart-empty">
                        <p>Carrito vacio. Agrega un producto para poder realizar la compra!</p>
                        <div className="start-shopping">
                            <Link to="/CardsProducto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-arrow-left"
                                viewBox="0 0 16 16"
                            >
                                <path
                                fillRule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                />
                            </svg>
                            <span>Empezar a comprar</span>
                            </Link>
                        </div>
                        </div>
                    ) : (
                        <div>
                        <div className="titles">
                            <h3 className="product-title">articulo</h3>
                            <h3 className="price">Precio</h3>
                            <h3 className="quantity" style={{marginLeft: "1.7rem"}}>Cantidad</h3>
                            <h3 className="total">Total</h3>
                        </div>
                        <div className="cart-items">
                            {cart.detallePedido &&
                            cart.detallePedido.map((cartItem) => (
                                <div className="cart-item" 
                                // key={cartItem.id}
                                >
                                <div className="cart-product">
                                    {/* <img src={cartItem.imagen.length <= 10 ? `/src/assets/img/${cartItem.imagen}` : cartItem.imagen} alt={cartItem.instrumento} /> */}
                                    <div>
                                    <h3>{cartItem.articulo.denominacion}</h3>
                                    <p>{cartItem.articulo.descripcion}</p>
                                    <button onClick={() => handleRemoveFromCart(cartItem.articulo)}>
                                        Remover
                                    </button>
                                    </div>
                                </div>
                                <div className="cart-product-price">${cartItem.articulo.precioVenta}</div>
                                <div className="cart-product-quantity">
                                    {/* <Button variant="outlined" color="error" onClick={() => handleDecreaseCart(cartItem.producto)}>
                                    -
                                    </Button> */}
                                    <IconButton onClick={() => handleDecreaseCart(cartItem.articulo)} color="error" aria-label="remove of shopping cart">
                                        <RemoveIcon />
                                    </IconButton>
                                    <div className="count">{cartItem.cantidad}</div>
                                    {/* <Button variant="outlined" color="success" onClick={() => handleAddToCart(cartItem.producto)}>
                                        +
                                    </Button> */}
                                    <IconButton onClick={() => handleAddToCart(cartItem.articulo)} color="primary" aria-label="add to shopping cart">
                                        <AddIcon />
                                    </IconButton>
                                </div>
                                <div className="cart-product-total-price">
                                    ${cartItem.articulo.precioVenta * cartItem.cantidad}
                                </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary">
                            <button className="clear-btn" onClick={() => handleClearCart()}>
                            Limpiar
                            </button>
                            <div className="cart-checkout">
                            <div className="subtotal">
                                <span>Subtotal</span>
                                <span className="amount">${cart.cartTotalAmount}</span>
                            </div>
                            {/* { (usuarioLogeado) 
                                ?
                                <button onClick={getPreferenceMP}>Generar pedido</button>
                                : 
                                <Link to="/login">
                                <button >Generar pedido</button>
                                </Link>
                            } */}
                            {/* <button onClick={() => setIsGenerarPedido(true)}>Finalizar compra</button> */}
                            <Button 
                                onClick={() => setIsGenerarPedido(true)}
                                variant="contained"
                                color="primary"
                                style={{width: "17rem"}} 
                                type="submit">
                                Finalizar compra
                            </Button>
                            <div className="continue-shopping">
                                <Link to="/CardsProducto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-arrow-left"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                    fillRule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                    />
                                </svg>
                                <span>Continuar comprando</span>
                                </Link>
                                {/* <div className={idPreference ? 'visible' : 'invisible'}>
                                <Wallet initialization={{ preferenceId: idPreference, redirectMode:"blank" }} customization={{  texts:{ valueProp: 'smart_option'}}} />
                                </div> */}
                            </div>
                            </div>
                        </div>
                        </div>
                    )}
                </div>
                :
                <div className="cart-container mt-5">
                    <h2>Pedido</h2>
                    {cart.detallePedido.length === 0 ? (
                        <div className="cart-empty">
                        <p>Carrito vacio. Agrega un producto para poder realizar la compra!</p>
                        <div className="start-shopping">
                            <Link to="/CardsProducto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-arrow-left"
                                viewBox="0 0 16 16"
                            >
                                <path
                                fillRule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                />
                            </svg>
                            <span>Empezar a comprar</span>
                            </Link>
                        </div>
                        </div>
                    ) : (
                        <div>
                            <div className="titles">
                                <h3 className="product-title">Producto</h3>
                                <h3 className="price">Precio</h3>
                                <h3 className="quantity">Cantidad</h3>
                                <h3 className="total">Total</h3>
                            </div>
                            <div className="cart-items">
                                {cart.detallePedido &&
                                cart.detallePedido.map((cartItem) => (
                                    <div className="cart-item" 
                                    >
                                    <div className="cart-product">
                                        {/* <img src={cartItem.imagen.length <= 10 ? `/src/assets/img/${cartItem.imagen}` : cartItem.imagen} alt={cartItem.instrumento} /> */}
                                        <div>
                                            <h3>{cartItem.articulo.denominacion}</h3>
                                            <p>{cartItem.articulo.descripcion}</p>
                                        </div>
                                    </div>
                                    <div className="cart-product-price">${cartItem.articulo.precioVenta}</div>
                                    <div className="count" style={{marginLeft: "1.7rem"}}>{cartItem.cantidad}</div>
                                    <div className="cart-product-total-price">
                                        ${cartItem.articulo.precioVenta * cartItem.cantidad}
                                    </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-summary-pedido">
                            <FormPedido
                                handleSubmit={handleSubmit}
                                handleBackCart={handleBackCart}
                            />
                                {/* <div className="cart-checkout">
                                    <div className="subtotal">
                                        <span>Subtotal</span>
                                        <span className="amount">${cart.cartTotalAmount}</span>
                                    </div>
                                    { (usuarioLogeado) 
                                        ?
                                        <button onClick={getPreferenceMP}>Generar pedido</button>
                                        : 
                                        <Link to="/login">
                                        <button >Generar pedido</button>
                                        </Link>
                                    }
                                    <button>Finalizar compra</button>
                                    <div className="continue-shopping">
                                        <Button 
                                            variant="contained"
                                            color="error"
                                            style={{backgroundColor: "gray"}} 
                                            startIcon={<ArrowBackIcon />}
                                            onClick={() => setIsGenerarPedido(false)}
                                            >
                                            Volver al carrito
                                        </Button>
                                        <span onClick={() => setIsGenerarPedido(false)}>Volver al carrito</span>
                                        <div className={idPreference ? 'visible' : 'invisible'}>
                                        <Wallet initialization={{ preferenceId: idPreference, redirectMode:"blank" }} customization={{  texts:{ valueProp: 'smart_option'}}} />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    )}
                </div>
            }
            
        </>
    );
};

export default Cart;
