import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../core/services/producto.service';
import { Producto } from '../core/models/producto.model';

@Component({
  selector: 'app-admin-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-producto.component.html',
  styleUrls: ['./admin-producto.component.scss']
})
export class AdminProductoComponent implements OnInit {
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

  // Nuevas variables para la tabla y edición
  productos: Producto[] = [];
  modoEdicion: boolean = false;
  productoEnEdicionId?: number;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  // --- MÉTODOS DE LECTURA Y ELIMINACIÓN ---

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  eliminarProducto(id?: number): void {
    if (!id) return;

    if (confirm('¿Estás seguro de que deseas eliminar este producto permanentemente?')) {
      this.productoService.deleteProducto(id).subscribe({
        next: () => {
          this.mensaje = 'Producto eliminado correctamente.';
          this.cargarProductos(); // Recargamos la tabla
        },
        error: (err) => {
          console.error(err);
          this.mensaje = 'Error al eliminar el producto.';
        }
      });
    }
  }

  // --- MÉTODOS DE EDICIÓN ---

  editarProducto(producto: Producto): void {
    this.modoEdicion = true;
    this.productoEnEdicionId = producto.id;

    // Clonamos el producto para que los cambios en el input no afecten la tabla hasta guardar
    this.nuevoProducto = { ...producto };
    this.imagenPreview = producto.imagenUrl || null;
    this.archivoSeleccionado = null;

    // Hacemos scroll hacia arriba para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.productoEnEdicionId = undefined;
    this.limpiarFormulario();
  }

  // --- MÉTODOS DE GUARDADO (CREAR / ACTUALIZAR) ---

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
      const reader = new FileReader();
      reader.onload = () => this.imagenPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.nuevoProducto.nombre || this.nuevoProducto.precio <= 0) {
      this.mensaje = 'Por favor, llena los campos obligatorios correctamente.';
      return;
    }

    if (this.modoEdicion && this.productoEnEdicionId) {
      // LÓGICA DE ACTUALIZACIÓN (Envía JSON clásico)
      this.productoService.updateProducto(this.productoEnEdicionId, this.nuevoProducto).subscribe({
        next: () => {
          this.mensaje = '¡Producto actualizado con éxito!';
          this.cancelarEdicion();
          this.cargarProductos();
        },
        error: (err) => {
          console.error(err);
          this.mensaje = 'Error al actualizar el producto.';
        }
      });

    } else {
      // LÓGICA DE CREACIÓN (Envía FormData con Imagen)
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
        next: () => {
          this.mensaje = '¡Producto e imagen registrados con éxito!';
          this.limpiarFormulario();
          this.cargarProductos(); // Recargamos la tabla
        },
        error: (err) => {
          console.error(err);
          this.mensaje = 'Error al registrar el producto. Revisa la consola.';
        }
      });
    }
  }

  limpiarFormulario(): void {
    this.nuevoProducto = { nombre: '', descripcion: '', precio: 0, stock: 0, imagenUrl: '', categoria: '' };
    this.archivoSeleccionado = null;
    this.imagenPreview = null;
  }
}
