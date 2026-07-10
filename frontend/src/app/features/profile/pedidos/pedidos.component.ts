import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface ItemPedido {
  nombrePrenda: string;
  imagenUrl: string;
}

interface PedidoSimulado {
  id: string;
  fecha: string;
  estado: 'En Camino' | 'Entregado' | 'Cancelado';
  precioTotal: number;
  items: ItemPedido[];
}

@Component({
  selector: 'app-pedidos',
  standalone: false,
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  tienePedidos = true; // Flag para alternar los dos estados (*ngIf)

  pedidos: PedidoSimulado[] = [
    {
      id: '#1768-1205',
      fecha: '25 Oct, 2026',
      estado: 'En Camino',
      precioTotal: 354.00,
      items: [
        { nombrePrenda: 'Casaca Abrigadora', imagenUrl: '/img/img1.webp' }
      ]
    },
    {
      id: '#1548-0952',
      fecha: '12 Oct, 2026',
      estado: 'Entregado',
      precioTotal: 89.00,
      items: [
        { nombrePrenda: 'Top Noir', imagenUrl: '/img/img2.webp' }
      ]
    },
    {
      id: '#1154-0812',
      fecha: '28 Sep, 2026',
      estado: 'Entregado',
      precioTotal: 120.00,
      items: [
        { nombrePrenda: 'Cargo Rose', imagenUrl: '/img/img3.webp' }
      ]
    }
  ];

  constructor(private readonly router: Router) { }

  ngOnInit(): void { }

  // Cambiar de estado con fines de demostración
  alternarEstado(): void {
    this.tienePedidos = !this.tienePedidos;
  }

  // Redireccionar al catálogo
  irALaTienda(): void {
    this.router.navigate(['/catalogo']);
  }

  // Simulación de ver detalles
  verDetalles(id: string): void {
    alert(`Visualizando detalles del pedido: ${id}\n(Simulación de flujo completo)`);
  }
}
