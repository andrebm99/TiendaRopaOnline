package com.store.spring.app.Controllers;

import com.store.spring.app.Interface.ProductoInterface;
import com.store.spring.app.Models.Producto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@Tag(name = "Productos", description = "gestión de productos de la tienda.")
@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoInterface productoInterface;

    public ProductoController(ProductoInterface productoInterface) {
        this.productoInterface = productoInterface;
    }

    @PostMapping
    @Operation(summary = "Registrar Producto", description = "Crea un nuevo producto en el catálogo.")
    public ResponseEntity<Producto> create(@RequestBody Producto producto) {
        try {
            Producto newProduct = productoInterface.crearProducto(producto);
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @Operation(summary = "Listar Productos", description = "Obtiene todos los productos disponibles.")
    public ResponseEntity<List<Producto>> getAll() {
        try {
            List<Producto> productos = productoInterface.obtenerTodos();
            return new ResponseEntity<>(productos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar Producto", description = "Elimina un producto del catálogo por su ID.")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {
        try {
            boolean isDeleted = productoInterface.eliminarProducto(id);
            if (!isDeleted) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar Producto", description = "Modifica los datos de un producto existente.")
    public ResponseEntity<Producto> update(@PathVariable("id") Integer id, @RequestBody Producto producto) {
        try {
            Producto updatedProduct = productoInterface.actualizarProducto(id, producto);
            if (updatedProduct == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
