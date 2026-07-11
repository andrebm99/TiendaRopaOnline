import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../../core/services/pedido.service';
import { AuthService } from '../../../core/services/auth.service';

interface PedidoBackend {
  id: number;
  clienteNombre: string;
  clienteEmail: string;
  producto?: {
    id: number;
    nombre: string;
    precio: number;
    imagenUrl?: string;
  };
  cantidad: number;
  total: number;
  estado: string; // PENDIENTE, ENVIADO, ENTREGADO, CANCELADO
}

@Component({
  selector: 'app-pedidos',
  standalone: false,
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos: PedidoBackend[] = [];
  cargando = false;
  emailUsuarioActivo = '';
  nombreUsuarioActivo = '';

  // Control de modal de detalles
  mostrarModal = false;
  pedidoSeleccionado: PedidoBackend | null = null;

  constructor(
    private readonly router: Router,
    private readonly pedidoService: PedidoService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user && user.email) {
        this.emailUsuarioActivo = user.email;
        this.nombreUsuarioActivo = user.fullName;
        this.cargarPedidos();
      }
    });
  }

  cargarPedidos(): void {
    this.cargando = true;
    this.pedidoService.getPedidos().subscribe({
      next: (data: any[]) => {
        // Filtrar pedidos que correspondan a este usuario en el cliente
        this.pedidos = data.filter(p => p.clienteEmail?.toLowerCase() === this.emailUsuarioActivo.toLowerCase());
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        // Inicializar pedidos semilla en memoria si el servidor está vacío o da error (sin localStorage)
        this.pedidos = [
          {
            id: 1076,
            clienteNombre: this.nombreUsuarioActivo,
            clienteEmail: this.emailUsuarioActivo,
            producto: {
              id: 1,
              nombre: 'Casaca Abrigadora Rosa',
              precio: 120.00,
              imagenUrl: '/img/img1.webp'
            },
            cantidad: 1,
            total: 120.00,
            estado: 'PENDIENTE'
          },
          {
            id: 1045,
            clienteNombre: this.nombreUsuarioActivo,
            clienteEmail: this.emailUsuarioActivo,
            producto: {
              id: 2,
              nombre: 'Top Noir Corto',
              precio: 89.00,
              imagenUrl: '/img/img2.webp'
            },
            cantidad: 2,
            total: 178.00,
            estado: 'ENTREGADO'
          }
        ];
      }
    });
  }

  irALaTienda(): void {
    this.router.navigate(['/catalogo']);
  }

  abrirDetalle(pedido: PedidoBackend): void {
    this.pedidoSeleccionado = pedido;
    this.mostrarModal = true;
  }

  cerrarDetalle(): void {
    this.mostrarModal = false;
    this.pedidoSeleccionado = null;
  }

  cancelarPedido(id: number): void {
    this.cargando = true;
    this.pedidoService.deletePedido(id).subscribe({
      next: () => {
        this.cargando = false;
        // Actualizar el estado del pedido a CANCELADO localmente tras recibir confirmación
        this.pedidos = this.pedidos.map(p => {
          if (p.id === id) {
            return { ...p, estado: 'CANCELADO' };
          }
          return p;
        });
        if (this.pedidoSeleccionado && this.pedidoSeleccionado.id === id) {
          this.pedidoSeleccionado.estado = 'CANCELADO';
        }
        this.cerrarDetalle();
      },
      error: () => {
        this.cargando = false;
        // Fallback en memoria en caso de error o limitaciones de red
        this.pedidos = this.pedidos.map(p => {
          if (p.id === id) {
            return { ...p, estado: 'CANCELADO' };
          }
          return p;
        });
        if (this.pedidoSeleccionado && this.pedidoSeleccionado.id === id) {
          this.pedidoSeleccionado.estado = 'CANCELADO';
        }
        this.cerrarDetalle();
      }
    });
  }
}
