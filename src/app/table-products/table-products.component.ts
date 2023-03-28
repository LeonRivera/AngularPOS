import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit {

  products: Product[];

  productsFinal: Product[];

  codigo:string;
  nombre:string;
  
  // models = [
  //   {fieldString: "Value",fieldNumber:3, fieldDate:'2021-07-21'},
  //   {fieldString: "Value 4",fieldNumber:4, fieldDate:'2021-07-21'},
  //   {fieldString: "Value 5",fieldNumber:5, fieldDate:'2021-07-21'},
  // ]

  constructor(private productService: ProductService,
    private router:Router,
    private categoriaService:CategoriaService) {
    this.productService.findAll().subscribe(m => {
      this.products = m._embedded.products
      this.productsFinal = this.products;

      //set category
     this.products = this.products.map(p => {
       p.categoriaObject = new Categoria();
        categoriaService.findAttributeById('product','categoria', p.id).subscribe( c => {
          console.log(c);
            if(c != undefined){
              p.categoriaObject.nombreCategoria = c.nombreCategoria;
            }else{
              p.categoriaObject.nombreCategoria = "no asignada";
            }
           
        });
        return p;
      });

      console.log(this.products);
    });
  }

  ngOnInit(): void {
    // this.productService.findAll().subscribe(m => {
    //   this.products = m._embedded.products
    //   this.productsFinal = this.products;
    // });
  }

  delete(id: number) {
    this.productService.deleteById(id).subscribe();
    this.products = this.products.filter( m => m.id != id);
    console.log(this.products);
  }

  show():void{
    this.router.navigate(['/products/form']);
  }

  onKeyUpEvent(param:string):void{

    
    this.filterParam(param);
    
  }

  filterParam(param:string){
    switch (param) {
      case 'codigo':
        this.products = this.productsFinal.filter( p => {
          return p.codigo.includes(this.codigo);
        })
        break;
      case 'nombre':
        this.products = this.productsFinal.filter( p => {
          return p.nombre.includes(this.nombre);
        })
        break;
      default:
        break;
    }
  }

}
