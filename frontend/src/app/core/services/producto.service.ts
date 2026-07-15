import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private readonly apiService: ApiService, private http: HttpClient) {}

  createProductoConImagen(formData: FormData): Observable<Producto> {
    return this.http.post<Producto>('http://localhost:8080/api/productos/con-imagen', formData);
  }

  getProductos(): Observable<Producto[]> {
    return this.apiService.get<Producto[]>('productos');
  }

  getProductoById(id: number): Observable<Producto> {
    return this.apiService.get<Producto>(`productos/${id}`);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.apiService.post<Producto>('productos', producto);
  }

  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.apiService.put<Producto>(`productos/${id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.apiService.delete(`productos/${id}`);
  }
}
