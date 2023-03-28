import { Injectable } from '@angular/core';
import { AbstractRepository } from './abstract-repository';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractRepository<Product>{
  constructor(httpClient: HttpClient,router: Router) { 
    super(httpClient, router, "product");
  }
}