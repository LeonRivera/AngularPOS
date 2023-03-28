import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AppConstants } from '../utils/app-constants';
import { OperationUtils } from '../utils/operation-utils';
import { MessageService } from 'primeng/api';

export abstract class AbstractRepository<T> {

    
//   private httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  private baseUrl: string = "";
  private operationUtils:OperationUtils = new OperationUtils();

  
  constructor(protected httpClient: HttpClient,protected router: Router,protected modelUrl: string,
    private messageService:MessageService = new MessageService()){

    if(AppConstants.ENV === AppConstants.ENV_DEV){
      this.baseUrl = AppConstants.BASE_URL_DEV + `${modelUrl}`;
    }else{
      this.baseUrl = AppConstants.BASE_URL_PROD + `${modelUrl}`;
    }

  } 

  findAll():Observable<any>{
    return this.httpClient.get<T>(this.baseUrl)
  }

  findById(id:number):Observable<any>{  
    console.log(`${this.baseUrl}/${id}`);
    return this.httpClient.get<T>(`${this.baseUrl}/${id}`)
    .pipe(
      catchError(e => {
        this.operationUtils.throwErrorMessageServicePrimeNg(e);
        return throwError(e);
      })
    )
  }

  
  findByParam(param:any, paramOfSearch:string):Observable<T>{
    return this.httpClient.get<T>(`${this.baseUrl}/${paramOfSearch}/${param}`)
    .pipe(
      catchError(e => {
        
        if(e != null && e != undefined){
          this.operationUtils.throwErrorMessageServicePrimeNg(e);
        }
        return throwError(e);
      })
    )
  }

  findByParamRestRsrc(param:string, paramOfSearch:string):Observable<T>{
    return this.httpClient.get<T>(`${this.baseUrl}/search/${paramOfSearch}?${paramOfSearch}=${param}`)
    .pipe(
      catchError(e => {

        if(e.status == '404'){

          console.log("no se encontro el elemento");
          this.operationUtils.throwErrorMessageServicePrimeNg("Elemento no encontrado");
          this.messageService.add({severity:'error', summary:'Ha ocurrido un error', detail:e.error.message});
        }

        return throwError(() => new Error('test'));
      })
    )

    // .pipe(
    //   catchError(e => {
        
    //     if(e != null && e != undefined){
    //       this.operationUtils.throwErrorMessageServicePrimeNg(e);
    //     }else{
    //       this.operationUtils.throwErrorMessageServicePrimeNg("No se encuentra el elemento");

    //     }
    //     return throwError(() => new Error('test'));
    //   })
    // )
  }

  findAttributeById(attributeFather ,attributeChild:string, id:number){
    return this.httpClient.get<T>(`${AppConstants.BASE_URL_DEV}${attributeFather}/${id}/${attributeChild}`)
    .pipe(
      catchError(e => {
        // this.operationUtils.throwErrorMessageServicePrimeNg(e);
        return throwError(e);
      })
    )
  }

  save(type:T):Observable<any>{  
    return this.httpClient.post<T>(this.baseUrl, type)
    .pipe(
      catchError(e => {

        if(e != null && e != undefined){
          this.operationUtils.throwErrorMessageServicePrimeNg(e);
        }
        return throwError(e);
      })
    )
  }

  update(type:any):Observable<any>{  
    console.log("updating" + type.id);
    return this.httpClient.put<T>(`${this.baseUrl}/${type.id}`, type)
    .pipe(
      catchError(e => {
        if(e != null && e != undefined){
          this.operationUtils.throwErrorMessageServicePrimeNg(e);
        }
        return throwError(e);
      })
    )
  }

  deleteByType(type:T):Observable<any>{  
    return this.httpClient.request<any>('delete', this.baseUrl, {body: type})
    .pipe(
      catchError(e => {
        if(e != null && e != undefined){
          this.operationUtils.throwErrorMessageServicePrimeNg(e);
        }
        return throwError(e);
      })
    )
  }

  deleteById(id:number):Observable<any>{  
    console.log("Eliminando desde abstract repository con " + this.baseUrl);
    return this.httpClient.delete<T>(`${this.baseUrl}/${id}`)
    .pipe(
      catchError(e => {
        if(e != null && e != undefined){
          this.operationUtils.throwErrorMessageServicePrimeNg(e);
        }
        console.log("Ocurrio un error al eliminar un" + this.modelUrl);
        return throwError(e);
      })
    )
  }


}
