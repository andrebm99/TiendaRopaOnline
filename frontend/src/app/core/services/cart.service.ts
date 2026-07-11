import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto.model';
import { AuthService } from './auth.service';

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Estado reactivo global de la bolsa de compras, recuperado de localStorage al iniciar
  private readonly cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  public readonly cartItems$ = this.cartItemsSubject.asObservable();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  // Agregar un producto a la bolsa o incrementar cantidad si ya existe
  addToCart(producto: Producto, cantidad: number = 1): void {
    if (!this.authService.isAuthenticated()) {
      // Redirigir al inicio de sesión si no hay una cuenta activa
      this.router.navigate(['/auth/login']);
      return;
    }
    const current = this.cartItemsSubject.value;
    const existingIndex = current.findIndex(item => item.producto.id === producto.id);
    
    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = current.map((item, index) => 
        index === existingIndex 
          ? { ...item, cantidad: item.cantidad + cantidad } 
          : item
      );
    } else {
      updated = [...current, { producto, cantidad }];
    }
    
    this.cartItemsSubject.next(updated);
    this.saveCartToStorage(updated);
  }

  // Quitar un producto por completo de la bolsa
  removeFromCart(productId: number): void {
    const current = this.cartItemsSubject.value;
    const updated = current.filter(item => item.producto.id !== productId);
    this.cartItemsSubject.next(updated);
    this.saveCartToStorage(updated);
  }

  // Actualizar la cantidad de unidades pedidas de un producto
  updateQuantity(productId: number, cantidad: number): void {
    if (cantidad <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const current = this.cartItemsSubject.value;
    const updated = current.map(item => 
      item.producto.id === productId ? { ...item, cantidad } : item
    );
    this.cartItemsSubject.next(updated);
    this.saveCartToStorage(updated);
  }

  // Vaciar por completo la bolsa de compras
  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }

  // Calcular el precio total de la bolsa de compras
  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
  }

  // Calcular el número total de artículos en la bolsa
  getTotalItemsCount(): number {
    return this.cartItemsSubject.value.reduce((acc, item) => acc + item.cantidad, 0);
  }

  // Persistir la bolsa de compras en localStorage
  private saveCartToStorage(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  // Cargar la bolsa desde localStorage al inicializar
  private loadCartFromStorage(): CartItem[] {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  }
}
