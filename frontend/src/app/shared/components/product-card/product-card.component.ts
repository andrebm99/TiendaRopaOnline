import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../core/models/producto.model';
import { CurrencyPenPipe } from '../../pipes/currency-pen.pipe';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPenPipe, ButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() producto!: Producto;
  
  @Output() readonly addToCart = new EventEmitter<Producto>();
  @Output() readonly viewDetails = new EventEmitter<Producto>();

  // Manejar el clic en "Agregar a la Bolsa" sin propagar al detalle de la tarjeta
  onAddToCart(event: MouseEvent): void {
    event.stopPropagation();
    this.addToCart.emit(this.producto);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.producto);
  }
}
