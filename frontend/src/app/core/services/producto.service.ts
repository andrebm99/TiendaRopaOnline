import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private readonly apiService: ApiService) {}

  // Listar todos los productos del catálogo
  getProductos(): Observable<Producto[]> {
    return this.apiService.get<Producto[]>('productos');
  }

  // Buscar un producto específico por su identificador
  getProductoById(id: number): Observable<Producto> {
    return this.apiService.get<Producto>(`productos/${id}`);
  }

  // Crear un producto nuevo (para vista administrador en un futuro)
  createProducto(producto: Producto): Observable<Producto> {
    return this.apiService.post<Producto>('productos', producto);
  }

  // Actualizar datos de un producto
  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.apiService.put<Producto>(`productos/${id}`, producto);
  }

  // Eliminar un producto
  deleteProducto(id: number): Observable<any> {
    return this.apiService.delete(`productos/${id}`);
  }
}
