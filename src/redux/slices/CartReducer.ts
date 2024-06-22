import { createSlice } from "@reduxjs/toolkit";
import { DetallePedido } from "../../types/DetallePedido";

interface IInitialState {
    detallePedido: DetallePedido[],
    cartTotalQuantity: number,
    cartTotalAmount: number,
    total: number,

    horaEstimadaFinalizacion: string;
    estado: string;
    tipoEnvio: string;
    formaPago: string;
    fechaPedido: string;
    idSucursal: number;
}

const initialState: IInitialState = {
  detallePedido: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  total: 0,
  horaEstimadaFinalizacion: "",
  estado: "",
  tipoEnvio: "",
  formaPago: "",
  fechaPedido: "",
  idSucursal: 0
};

const CartReducer = createSlice({
  name: "CartReducer",
  initialState,
  reducers: {
   addToCart(state, action) {
      const existingIndex = state.detallePedido.findIndex(
        (item) => item.articulo.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.detallePedido[existingIndex] = {
          ...state.detallePedido[existingIndex],
          cantidad: state.detallePedido[existingIndex].cantidad + 1,
          subTotal: state.detallePedido[existingIndex].cantidad * state.detallePedido[existingIndex].articulo.precioVenta,
        };
        state.cartTotalQuantity = state.detallePedido[existingIndex].cantidad + 1;
      } else {
        let tempProductItem = { 
          ...action.payload,
          cantidad: 1,
          articulo: action.payload,
        };
        state.detallePedido.push(tempProductItem);
      }
      localStorage.setItem("detallePedido", JSON.stringify(state.detallePedido));
    },
    decreaseCart(state, action) {
      const itemIndex = state.detallePedido.findIndex(
        (item) => item.articulo.id === action.payload.id
      );

      if (state.detallePedido[itemIndex].cantidad > 1) {
        state.detallePedido[itemIndex].cantidad -= 1;
      } else if (state.detallePedido[itemIndex].cantidad === 1) {
        const nextdetallePedido = state.detallePedido.filter(
          (item) => item.articulo.id !== action.payload.id
        );

        state.detallePedido = nextdetallePedido;
      }

      localStorage.setItem("detallePedido", JSON.stringify(state.detallePedido));
    },
    removeFromCart(state, action) {
      state.detallePedido.map((cartItem) => {
        if (cartItem.articulo.id === action.payload.id) {
          const nextdetallePedido = state.detallePedido.filter(
            (item) => item.articulo.id !== cartItem.articulo.id
          );

          state.detallePedido = nextdetallePedido;
        }
        localStorage.setItem("detallePedido", JSON.stringify(state.detallePedido));
        return state;
      });
    },
    getTotals(state) {
      let { total, quantity } = state.detallePedido.reduce(
        (cartTotal, cartItem, cartTotalCost) => {
          const { cantidad } = cartItem;
          const precioVenta = cartItem.articulo.precioVenta;
          const itemTotal = precioVenta * cantidad;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cantidad;
          cartTotalCost

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
      state.total = total;
    },
    clearCart(state) {
      state.detallePedido = [];
      localStorage.setItem("detallePedido", JSON.stringify(state.detallePedido));
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  CartReducer.actions;

export default CartReducer.reducer;
