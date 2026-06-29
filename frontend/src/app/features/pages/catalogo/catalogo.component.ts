import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductoService } from '../../../core/services/producto.service';
import { CartService } from '../../../core/services/cart.service';
import { Producto } from '../../../core/models/producto.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private readonly productoService: ProductoService,
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  // Cargar las prendas desde el backend REST
  loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Hubo un error al cargar las prendas del catálogo.';
        this.loading = false;
      }
    });
  }

  // Agregar directamente a la bolsa de compras
  onAddToCart(producto: Producto, event: MouseEvent): void {
    event.stopPropagation();
    this.cartService.addToCart(producto, 1);
  }

  // Visualizar detalles: agregamos y llevamos a la bolsa
  onViewDetails(producto: Producto): void {
    this.cartService.addToCart(producto, 1);
    this.router.navigate(['/bolsa']);
  }
}
