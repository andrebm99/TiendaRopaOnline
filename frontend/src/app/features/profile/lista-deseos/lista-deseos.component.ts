import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { Producto } from '../../../core/models/producto.model';

@Component({
  selector: 'app-lista-deseos',
  standalone: false,
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.scss']
})
export class ListaDeseosComponent implements OnInit {
  wishlistItems: Producto[] = [
    {
      id: 101,
      nombre: 'TOP ASIMÉTRICO NOIR',
      descripcion: 'Top asimétrico elegante color negro profundo.',
      precio: 89.00,
      stock: 12,
      imagenUrl: '/img/img1.jpeg',
      categoria: 'Tops'
    },
    {
      id: 102,
      nombre: 'PANTALÓN CARGO ROSE',
      descripcion: 'Pantalón estilo cargo en color rosa pastel premium.',
      precio: 120.00,
      stock: 6,
      imagenUrl: '/img/img2.jpeg',
      categoria: 'Pantalones'
    },
    {
      id: 103,
      nombre: 'BOLSO MINIMALISTA',
      descripcion: 'Bolso de cuero con líneas puras y herrajes negros.',
      precio: 95.00,
      stock: 8,
      imagenUrl: '/img/img3.jpg',
      categoria: 'Accesorios'
    },
    {
      id: 104,
      nombre: 'BLAZER ESTRUCTURAL',
      descripcion: 'Blazer de corte moderno y hombreras marcadas.',
      precio: 180.00,
      stock: 4,
      imagenUrl: '/img/img4.jpg',
      categoria: 'Sacos'
    }
  ];

  mensajeAgregado: string | null = null;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  // Quitar un producto de la lista de deseos
  removerItem(id: number | undefined): void {
    if (!id) return;
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
  }

  // Agregar el producto al carrito global y mostrar feedback temporal
  agregarAlCarrito(producto: Producto): void {
    this.cartService.addToCart(producto, 1);
    this.mensajeAgregado = `¡${producto.nombre} AÑADIDO A LA BOLSA!`;
    
    // Auto-ocultar el mensaje después de 2.5 segundos
    setTimeout(() => {
      this.mensajeAgregado = null;
    }, 2500);
  }

  // Redirigir a la tienda
  irALaTienda(): void {
    this.router.navigate(['/catalogo']);
  }
}
