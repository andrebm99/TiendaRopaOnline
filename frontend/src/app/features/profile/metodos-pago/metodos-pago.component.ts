import { Component, OnInit } from '@angular/core';

interface Tarjeta {
  id: number;
  tipo: 'VISA' | 'MASTERCARD';
  numeroEnmascarado: string;
  nombreTitular: string;
  expiracion: string;
  predeterminado: boolean;
}

interface MonederoDigital {
  id: number;
  tipo: 'YAPE' | 'PLIN';
  telefonoEnmascarado: string;
  titular: string;
}

@Component({
  selector: 'app-metodos-pago',
  standalone: false,
  templateUrl: './metodos-pago.component.html',
  styleUrls: ['./metodos-pago.component.scss']
})
export class MetodosPagoComponent implements OnInit {
  tarjetas: Tarjeta[] = [
    {
      id: 1,
      tipo: 'VISA',
      numeroEnmascarado: '•••• 1234',
      nombreTitular: 'ALEXA VALENCIAGA',
      expiracion: '08 / 26',
      predeterminado: true
    }
  ];

  monederos: MonederoDigital[] = [
    {
      id: 1,
      tipo: 'YAPE',
      telefonoEnmascarado: '+51 987 ••• 321',
      titular: 'Alexa Valenciaga'
    }
  ];

  mostrarModal = false;
  tipoNuevoMetodo: 'TARJETA' | 'MONEDERO' = 'TARJETA';
  
  // Campos formulario manual
  tarjetaTipo: 'VISA' | 'MASTERCARD' = 'VISA';
  tarjetaNumero = '';
  tarjetaTitular = '';
  tarjetaExpiracion = '';

  monederoTipo: 'YAPE' | 'PLIN' = 'YAPE';
  monederoTelefono = '';
  monederoTitular = '';

  constructor() {}

  ngOnInit(): void {}

  abrirModal(): void {
    this.mostrarModal = true;
    this.tarjetaNumero = '';
    this.tarjetaTitular = '';
    this.tarjetaExpiracion = '';
    this.monederoTelefono = '';
    this.monederoTitular = '';
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarMetodo(): void {
    if (this.tipoNuevoMetodo === 'TARJETA') {
      if (!this.tarjetaNumero || !this.tarjetaTitular || !this.tarjetaExpiracion) return;
      const mask = '•••• ' + this.tarjetaNumero.slice(-4);
      this.tarjetas.push({
        id: Date.now(),
        tipo: this.tarjetaTipo,
        numeroEnmascarado: mask,
        nombreTitular: this.tarjetaTitular.toUpperCase(),
        expiracion: this.tarjetaExpiracion,
        predeterminado: this.tarjetas.length === 0
      });
    } else {
      if (!this.monederoTelefono || !this.monederoTitular) return;
      const mask = this.monederoTelefono.slice(0, 4) + ' ••• ' + this.monederoTelefono.slice(-3);
      this.monederos.push({
        id: Date.now(),
        tipo: this.monederoTipo,
        telefonoEnmascarado: mask,
        titular: this.monederoTitular
      });
    }
    this.cerrarModal();
  }

  eliminarTarjeta(id: number): void {
    this.tarjetas = this.tarjetas.filter(t => t.id !== id);
    if (this.tarjetas.length > 0 && !this.tarjetas.some(t => t.predeterminado)) {
      this.tarjetas[0].predeterminado = true;
    }
  }

  eliminarMonedero(id: number): void {
    this.monederos = this.monederos.filter(m => m.id !== id);
  }

  establecerPredeterminado(id: number): void {
    this.tarjetas.forEach(t => t.predeterminado = t.id === id);
  }
}
