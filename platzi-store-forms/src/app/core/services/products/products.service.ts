import { Injectable } from '@angular/core';
//HttpErrorResponse Tipado para los errores de Http
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Product } from './../../models/product.model';

import { environment } from './../../../../environments/environment';
//Observables
import { Observable, throwError } from 'rxjs';
//Operadores
import { map, catchError } from 'rxjs/operators'

interface User {
  email: string;
  gender:string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products`, product)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getRandomUser(): Observable<User[]> {
    return this.http.get('https://randomuser.me/api/?results=2')
    .pipe(
      catchError(this.handleError
        /*error => {
        return throwError('Ups algo salio mal');
      }*/
      ),
      map((response: any) => response.results as User[])
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Ups algo salio mal');
  }
}
