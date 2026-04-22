package com.store.spring.app.Services;

import com.store.spring.app.Interface.PedidoInterface;
import com.store.spring.app.Models.Pedido;
import com.store.spring.app.Repositories.PedidoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PedidoService implements PedidoInterface {

    private final PedidoRepository repository;

    public PedidoService(PedidoRepository repository) {
        this.repository = repository;
    }

    @Override
    public Pedido crearPedido(Pedido pedido) {
        return repository.save(pedido);
    }

    @Override
    public List<Pedido> obtenerTodos() {
        return repository.findAll();
    }

    @Override
    public Pedido obtenerPorId(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Pedido actualizarPedido(Integer id, Pedido pedido) {
        return repository.findById(id).map(p -> {
            p.setClienteNombre(pedido.getClienteNombre());
            p.setClienteEmail(pedido.getClienteEmail());
            p.setProducto(pedido.getProducto());
            p.setCantidad(pedido.getCantidad());
            p.setTotal(pedido.getTotal());
            p.setEstado(pedido.getEstado());
            return repository.save(p);
        }).orElse(null);
    }

    @Override
    public boolean eliminarPedido(Integer id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
