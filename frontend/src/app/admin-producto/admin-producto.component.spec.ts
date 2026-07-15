import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Producto} from '../core/models/producto.model';
import {ProductoService} from '../core/services/producto.service';

@Component({
  selector: 'app-admin-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-producto.component.html',
  styleUrls: ['./admin-producto.component.scss'] // O .css si no usas scss
})
export class AdminProductoComponent {
  nuevoProducto: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagenUrl: '',
    categoria: ''
  };

  archivoSeleccionado: File | null = null;
  imagenPreview: string | ArrayBuffer | null = null;
  mensaje: string = '';

  constructor(private productoService: ProductoService) {}

  // Captura el archivo y genera una vista previa
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;

      // FileReader para mostrar la imagen en el HTML antes de subirla
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.nuevoProducto.nombre || this.nuevoProducto.precio <= 0) {
      this.mensaje = 'Por favor, llena los campos obligatorios correctamente.';
      return;
    }

    // Empaquetamos los datos y el archivo en un FormData
    const formData = new FormData();
    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('descripcion', this.nuevoProducto.descripcion);
    formData.append('precio', this.nuevoProducto.precio.toString());
    formData.append('stock', this.nuevoProducto.stock.toString());
    formData.append('categoria', this.nuevoProducto.categoria || '');

    if (this.archivoSeleccionado) {
      formData.append('imagen', this.archivoSeleccionado);
    }

    this.productoService.createProductoConImagen(formData).subscribe({
      next: (res) => {
        this.mensaje = '¡Producto e imagen registrados con éxito!';
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al registrar el producto. Revisa la consola.';
      }
    });
  }

  limpiarFormulario(): void {
    this.nuevoProducto = { nombre: '', descripcion: '', precio: 0, stock: 0, imagenUrl: '', categoria: '' };
    this.archivoSeleccionado = null;
    this.imagenPreview = null;
  }
}
