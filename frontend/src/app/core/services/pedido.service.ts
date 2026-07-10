import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  constructor(private readonly apiService: ApiService) {}

  // Enviar orden de compra al backend
  crearPedido(pedido: Pedido): Observable<Pedido> {
    return this.apiService.post<Pedido>('pedidos', pedido);
  }

  // Listar pedidos registrados (para vistas administrativas)
  getPedidos(): Observable<Pedido[]> {
    return this.apiService.get<Pedido[]>('pedidos');
  }

  // Eliminar / Cancelar un pedido
  deletePedido(id: number): Observable<any> {
    return this.apiService.delete<any>(`pedidos/${id}`);
  }
}
