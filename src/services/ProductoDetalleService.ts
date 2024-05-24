import IArticuloManufacturadoDetalle from "../types/ArticuloManufacturadoDetalle";
import ProductoDetallePost from "../types/post/ProductoDetallePost";
import  BackendClient  from "./BackendClient";


export default class ProductoDetalleService extends BackendClient<IArticuloManufacturadoDetalle | ProductoDetallePost> {}