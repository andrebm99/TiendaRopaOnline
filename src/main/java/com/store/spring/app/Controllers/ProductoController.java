package com.store.spring.app.Controllers;

import com.store.spring.app.Interface.ProductoInterface;
import com.store.spring.app.Models.Producto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

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
    @Operation(summary = "CREAR|REGISTRAR PRODUCTO", description = "Crea un nuevo producto en el catálogo.")
    public ResponseEntity<Producto> create(@RequestBody Producto producto) {
        try {
            Producto newProduct = productoInterface.crearProducto(producto);
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/con-imagen")
    @Operation(summary = "CREAR PRODUCTO CON IMAGEN", description = "Crea un producto subiendo un archivo de imagen local.")
    public ResponseEntity<Producto> createWithImage(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            @RequestParam("stock") Integer stock,
            @RequestParam(value = "categoria", required = false) String categoria,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen) {

        String imageUrl = "";

        if (imagen != null && !imagen.isEmpty()) {
            try {
                // Directorio local de subidas
                String uploadDir = "uploads/";
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // Guardar el archivo físicamente
                String fileName = System.currentTimeMillis() + "_" + imagen.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(imagen.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                // TODO: Para entornos productivos, reemplazar esta ruta local por la subida a un bucket de S3 servido por CloudFront.
                imageUrl = "http://localhost:8080/uploads/" + fileName;

            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        try {
            Producto producto = new Producto(nombre, descripcion, precio, stock, imageUrl, categoria);
            Producto newProduct = productoInterface.crearProducto(producto);
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @Operation(summary = "LISTAR TODOS LOS PRODUCTOS", description = "Obtiene todos los productos disponibles.")
    public ResponseEntity<List<Producto>> getAll() {
        try {
            List<Producto> productos = productoInterface.obtenerTodos();
            return new ResponseEntity<>(productos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "ELIMINAR PRODUCTO", description = "Elimina un producto del catálogo por su ID.")
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
    @Operation(summary = "ACTUALIZAR PRODUCTO", description = "Modifica los datos de un producto existente.")
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
