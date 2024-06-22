import ISucursal from "./ISucursal"

export interface PedidoGet {
  id: number
  horaEstimadaFinalizacion: string
  total: number
  totalCosto: number
  estado: string
  tipoEnvio: string
  formaPago: string
  fechaPedido: string
  sucursal: ISucursal
}