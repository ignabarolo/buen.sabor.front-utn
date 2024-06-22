import { DetallePedido } from "../DetallePedido";

export interface PedidoPost {
    detallePedido: DetallePedido[],
    cartTotalQuantity: number,
    cartTotalAmount: number,
    totalCosto: number;
    total: number;

    // horaEstimadaFinalizacion: string;
    estado: string;
    formaPago: string;
    tipoEnvio: string;
    idSucursal: string | null;
}
