import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AppConstants } from '../utils/app-constants';
import { VentaService } from '../services/venta.service';
import { Venta } from '../models/venta';
import { OperationUtils } from '../utils/operation-utils';
@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.css'],
})
export class SellProductsComponent implements OnInit {
  public product: Product = new Product();
  public updating: boolean = false;
  public totalSell: number = 0;
  public filteredProducts: any[] = [];
  public products: Product[] = [];
  public productsForSearching: Product[] = [];
  // public cantidad: number = 0;
  // public subTotal:number = 0;
  msgsValidationInputs: Message[];
  public venta:Venta = new Venta();
  private operationUtils:OperationUtils = new OperationUtils();
  // models = [
  //   {fieldString: "Value",fieldNumber:3, fieldDate:'2021-07-21'},
  //   {fieldString: "Value 4",fieldNumber:4, fieldDate:'2021-07-21'},
  //   {fieldString: "Value 5",fieldNumber:5, fieldDate:'2021-07-21'},
  // ]

  constructor(private productService: ProductService, private router: Router,
    private ventaService:VentaService,
    private messageService:MessageService) {
    this.productService
      .findAll()
      .subscribe((m) => {
        this.productsForSearching = m._embedded.products;
        this.productsForSearching.forEach(p => {
          p.cantidad = 1;
        })
      });
  }

  ngOnInit(): void {
    // this.productService
    //   .findAll()
    //   .subscribe((m) => (this.productsForSearching = m._embedded.products));

  }

  delete(id: number) {
    this.products = this.products.filter((m) => m.id != id);
    console.log(this.products);
    this.recalculate();
  }

  show(): void {
    this.router.navigate(['/products/form']);
  }

  searchProduct(): void {
    this.productService
      .findByParamRestRsrc(this.product.codigo, 'codigo')
      .subscribe(
        p => {
          this.product = p;
          this.product.cantidad = 1;
          this.addProduct();
          console.log(this.product);
        },
        err => {
          this.messageService.add({severity:'error', summary:'No se ha encontrado el producto', detail:"error"});
          // this.operationUtils.throwErrorMessageServicePrimeNg("Elemento no encontrado");
        }
      );
  }

  searchProductByName(): void {


    this.productService
      .findByParamRestRsrc(this.product.nombre, 'name')
      .subscribe((p) => {
        this.product = p;
        this.product.cantidad = 1;
      });
  }

  onKeyPressEvent(event: any) {

    let isAutoCompleteInput = false;

  

    let classesInElement = event.srcElement.classList;

    for(let classes of classesInElement){
      console.log(classes);

      if(classes === "p-autocomplete-input"){
        isAutoCompleteInput = true;
      }
    }

    console.log(isAutoCompleteInput);
    

    if (event.key === 'Enter') {
      console.log(this.product);
      console.log(event.key);

      if(isAutoCompleteInput){
        this.searchProductByName();
      }else{
        this.searchProduct();
        
        // this.addProduct();
      }

    }
  }

  addProduct(): void {

   
    let isAlreadyInTheProducts = false;

    this.products.forEach( p => {
      if(this.product.id === p.id){
        isAlreadyInTheProducts = true;
        p.cantidad += this.product.cantidad;
      }
    })

    if(isAlreadyInTheProducts){

    }else{
      this.products.push(this.product);
    }


    this.products.forEach((p) => {
      this.totalSell += p.precio * p.cantidad;
    });

    this.product = new Product();
  }

  recalculate(): void {
    console.log('hola');

    this.totalSell = 0;
    this.products.forEach((p) => {
      this.totalSell += p.precio * p.cantidad;
    });
  }

  filterProduct(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    console.log(query);
    // for (let i = 0; i < this.productsForSearching.length; i++) {
    //   let product = this.productsForSearching[i];
    //   if (product.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //     filtered.push(product);
    //   }
    // }

    // console.log(filtered);

    // this.filteredProducts = filtered;

    this.filteredProducts = this.productsForSearching.filter( p => {
      return p.nombre.toLowerCase().includes(query.toLowerCase());
    })
  }


  constructArrayProducts(products:Product[]):string[]{

    let arrayStringProducts = [];

    products.forEach(p => {
      arrayStringProducts.push(`${AppConstants.BASE_URL_DEV}/producto/${p.id}`);
    })

    return arrayStringProducts;
  }

  pagar(){
    let arrayStringProducts = this.constructArrayProducts(this.products);
    
    this.venta.products = arrayStringProducts;
    this.venta.total = this.totalSell;
    this.ventaService.save(this.venta).subscribe(v => {
      console.log(v);
    })
  }
}
