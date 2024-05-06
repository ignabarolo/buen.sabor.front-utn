import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import IArticuloInsumo from '../../types/ArticuloInsumo';
import ArticuloManufacturado from '../../types/ArticuloManufacturado';
import Promocion from '../../types/Promocion';

//Hay que hacer un slice GENÉRICO para que sea uno solo en vez de varios
interface T: {IArticuloInsumo | ArticuloManufacturado | Promocion};

interface IInitialState {
  element: T[];
}

const initialState: IInitialState = {
  element: [],
}

export const tableData = createSlice({
  name: 'tableData',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<T[]>) => {
      state.element = action.payload;
    },
    reset: (state) => {
      state.element = [];
    }
  },
})

export const { set, reset } = tableData.actions;

export default tableData.reducer;
