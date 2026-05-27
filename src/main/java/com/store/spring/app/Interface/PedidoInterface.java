package com.store.spring.app.Interface;

import com.store.spring.app.DTO.PedidoRequestDTO;
import com.store.spring.app.Models.Pedido;
import java.util.List;

public interface PedidoInterface {
    Pedido crearPedido(PedidoRequestDTO dto);
    List<Pedido> obtenerTodos();
    Pedido obtenerPorId(Integer id);
    Pedido actualizarPedido(Integer id, Pedido pedido);
    boolean eliminarPedido(Integer id);
}
