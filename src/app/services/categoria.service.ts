import { Injectable } from '@angular/core';
import { Model } from '../models/model';
import { AbstractRepository } from './abstract-repository';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends AbstractRepository<Categoria>{
  constructor(httpClient: HttpClient,router: Router) { 
    super(httpClient, router, "categoria");
  }
}
