package com.store.spring.app.Services;

import com.store.spring.app.Interface.ProductoInterface;
import com.store.spring.app.Models.Producto;
import com.store.spring.app.Repositories.ProductoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductoService implements ProductoInterface {

    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    @Override
    public Producto crearProducto(Producto producto) {
        return repository.save(producto);
    }

    @Override
    public List<Producto> obtenerTodos() {
        return repository.findAll();
    }

    @Override
    public boolean eliminarProducto(Integer id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }

    @Override
    public Producto actualizarProducto(Integer id, Producto producto) {
        return repository.findById(id).map(p -> {
            p.setNombre(producto.getNombre());
            p.setDescripcion(producto.getDescripcion());
            p.setPrecio(producto.getPrecio());
            p.setStock(producto.getStock());
            return repository.save(p);
        }).orElse(null);
    }
}
