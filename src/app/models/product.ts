import { Categoria } from "./categoria";

export class Product {
    id:number;
    codigo:string;
    nombre:string;
    precio:number;
    cantidad:number;
    fechaCreado:Date;
    categoriaObject:Categoria;
    categoria:string;
}
