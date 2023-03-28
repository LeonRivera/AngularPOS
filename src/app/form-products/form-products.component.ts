import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Message } from 'primeng/api';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {

  public product: Product = new Product();
  public updating: boolean = false;
  msgsValidationInputs: Message[];
  public categories: Categoria[] = [];
  public category: Categoria = new Categoria();
  public selectedCategory : Categoria = new Categoria();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.updating = this.loadIdParam();
    this.categoryService.findAll().subscribe( c => {
      this.categories = c._embedded.categorias;
      console.log(this.categories);
    })
    
    console.log(this.updating);
  }

  public loadIdParam(): boolean {
    let id = '';
    this.activatedRoute.params.subscribe((params) => {
      id = params['id'];
      if (id) {
        this.productService.findById(Number(id)).subscribe((product) => {
          product.fechaCreado = new Date();

          // Search category through product

          this.categoryService.findAttributeById('product', 'categoria', product.id).subscribe( c => {
            product.categoriaObject = c;
            console.log(c);
          })
          console.log(product.categoriaObject);
          this.selectedCategory = product.categoriaObject;
          return (this.product = product);
        });
      }
    });
    if (id === undefined) {
      return false;
    } else {
      return true;
    }
  }

  save(): void {
    this.product.fechaCreado = new Date();
    this.product.categoria = `http://localhost:8080/api/v1/categoria/${this.product.categoriaObject.id}`
    this.productService.save(this.product).subscribe();
    this.router.navigate(['/products']);
  }

  update(): void {
    //construct url for categoria
    this.product.categoria = `http://localhost:8080/api/v1/categoria/${this.product.categoriaObject.id}`
    console.log(this.product);

    this.productService.save(this.product).subscribe(
      c => console.log(c)
    );
    this.router.navigate(['/products']);
  }

}
