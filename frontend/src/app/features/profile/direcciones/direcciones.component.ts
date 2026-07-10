import { Component, OnInit } from '@angular/core';

interface Direccion {
  id: number;
  tipo: 'ENVIO' | 'FACTURACION';
  destinatario: string;
  calle: string;
  ubigeo: string; // Codigo postal / Distrito
  ciudadPais: string;
  telefono: string;
  predeterminada: boolean;
}

@Component({
  selector: 'app-direcciones',
  standalone: false,
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss']
})
export class DireccionesComponent implements OnInit {
  direcciones: Direccion[] = [
    {
      id: 1,
      tipo: 'ENVIO',
      destinatario: 'ALEXA VALENCIAGA',
      calle: 'Calle de los Rosales, 125, 4° Izquierda',
      ubigeo: '28021, Villa de Alcorcón',
      ciudadPais: 'Madrid, España',
      telefono: '+34 600 000 000',
      predeterminada: true
    },
    {
      id: 2,
      tipo: 'FACTURACION',
      destinatario: 'ALEXA VALENCIAGA',
      calle: 'Gran Vía, Planta 12',
      ubigeo: '28013',
      ciudadPais: 'Madrid, España',
      telefono: '+34 600 000 000',
      predeterminada: false
    }
  ];

  mostrarModal = false;
  modoEdicion = false;
  idDireccionEdicion: number | null = null;

  // Campos de formulario
  tipo: 'ENVIO' | 'FACTURACION' = 'ENVIO';
  destinatario = '';
  calle = '';
  ubigeo = '';
  ciudadPais = '';
  telefono = '';

  constructor() {}

  ngOnInit(): void {}

  abrirModalNuevo(): void {
    this.modoEdicion = false;
    this.idDireccionEdicion = null;
    this.tipo = 'ENVIO';
    this.destinatario = 'ALEXA VALENCIAGA';
    this.calle = '';
    this.ubigeo = '';
    this.ciudadPais = 'Lima, Perú';
    this.telefono = '';
    this.mostrarModal = true;
  }

  abrirModalEditar(d: Direccion): void {
    this.modoEdicion = true;
    this.idDireccionEdicion = d.id;
    this.tipo = d.tipo;
    this.destinatario = d.destinatario;
    this.calle = d.calle;
    this.ubigeo = d.ubigeo;
    this.ciudadPais = d.ciudadPais;
    this.telefono = d.telefono;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarDireccion(): void {
    if (!this.destinatario || !this.calle || !this.ubigeo || !this.ciudadPais) return;

    if (this.modoEdicion && this.idDireccionEdicion !== null) {
      // Editar
      const idx = this.direcciones.findIndex(d => d.id === this.idDireccionEdicion);
      if (idx !== -1) {
        this.direcciones[idx] = {
          ...this.direcciones[idx],
          tipo: this.tipo,
          destinatario: this.destinatario.toUpperCase(),
          calle: this.calle,
          ubigeo: this.ubigeo,
          ciudadPais: this.ciudadPais,
          telefono: this.telefono
        };
      }
    } else {
      // Crear
      this.direcciones.push({
        id: Date.now(),
        tipo: this.tipo,
        destinatario: this.destinatario.toUpperCase(),
        calle: this.calle,
        ubigeo: this.ubigeo,
        ciudadPais: this.ciudadPais,
        telefono: this.telefono,
        predeterminada: this.direcciones.length === 0
      });
    }
    this.cerrarModal();
  }

  eliminarDireccion(id: number): void {
    this.direcciones = this.direcciones.filter(d => d.id !== id);
    if (this.direcciones.length > 0 && !this.direcciones.some(d => d.predeterminada)) {
      this.direcciones[0].predeterminada = true;
    }
  }

  establecerPredeterminada(id: number): void {
    this.direcciones.forEach(d => d.predeterminada = d.id === id);
  }
}
