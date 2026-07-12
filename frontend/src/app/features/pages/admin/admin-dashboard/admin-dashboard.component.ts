import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  // Datos de prueba para simular el dashboard
  kpis = [
    { title: 'VENTAS DEL DÍA', value: 'S/ 2,450.00' },
    { title: 'NUEVOS PEDIDOS', value: '18' },
    { title: 'PRODUCTOS ACTIVOS', value: '142' }
  ];

  recentOrders = [
    { id: '#1045', customer: 'María López', status: 'PENDIENTE', total: 'S/ 120.00' },
    { id: '#1046', customer: 'Carlos Ruiz', status: 'ENVIADO', total: 'S/ 340.00' },
    { id: '#1047', customer: 'Ana Soto', status: 'COMPLETADO', total: 'S/ 89.00' }
  ];
}