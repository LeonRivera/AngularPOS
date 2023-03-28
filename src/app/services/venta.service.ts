import { Injectable } from '@angular/core';
import { Model } from '../models/model';
import { AbstractRepository } from './abstract-repository';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends AbstractRepository<Venta>{
  constructor(httpClient: HttpClient,router: Router) { 
    super(httpClient, router, "venta");
  }
}
