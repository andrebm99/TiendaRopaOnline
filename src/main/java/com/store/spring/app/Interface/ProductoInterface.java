package com.store.spring.app.Interface;

import com.store.spring.app.Models.Producto;
import java.util.List;

public interface ProductoInterface {
    Producto crearProducto(Producto producto);

    List<Producto> obtenerTodos();

    boolean eliminarProducto(Integer id);

    Producto actualizarProducto(Integer id, Producto producto);
}
