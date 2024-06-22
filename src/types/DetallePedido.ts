import IProducto from "./IProducto";

export interface DetallePedido {
    cantidad: number;
    subTotal: number;
    articulo: IProducto;
}