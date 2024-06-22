import { PedidoGet } from '../../types/PedidoGet';
import { createGenericSlice } from './GenericReducer';

const pedidoSlice = createGenericSlice<PedidoGet[]>('pedidoState', { data: [] });

export const { setData: setPedido, resetData: resetPedido } = pedidoSlice.actions;

export default pedidoSlice.reducer;