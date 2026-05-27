package com.store.spring.app.Services;

import com.store.spring.app.DTO.PedidoRequestDTO;
import com.store.spring.app.Interface.PedidoInterface;
import com.store.spring.app.Models.Pedido;
import com.store.spring.app.Models.Producto;
import com.store.spring.app.Repositories.PedidoRepository;
import com.store.spring.app.Repositories.ProductoRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PedidoService implements PedidoInterface {

    private final PedidoRepository repository;
    private final ProductoRepository productoRepository; 

    public PedidoService(PedidoRepository repository, ProductoRepository productoRepository) {
        this.repository = repository;
        this.productoRepository = productoRepository; 
    }

    @Override
    public Pedido crearPedido(PedidoRequestDTO dto) {

        Producto producto = productoRepository.findById(dto.getProductoId())
            .orElseThrow(() -> new RuntimeException("Producto no encontrado")); 

        Pedido pedido = new Pedido();
        pedido.setClienteNombre(dto.getClienteNombre());
        pedido.setClienteEmail(dto.getClienteEmail());
        pedido.setProducto(producto);
        pedido.setCantidad(dto.getCantidad());

        Double totalCalculado = producto.getPrecio() * dto.getCantidad();
        pedido.setTotal(totalCalculado);
        pedido.setEstado("PENDIENTE");

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
            
            if(pedido.getClienteNombre() != null){
                p.setClienteNombre(pedido.getClienteNombre());
            }

            if(pedido.getClienteEmail() != null){
                p.setClienteEmail(pedido.getClienteEmail());    
            }

            if(pedido.getProducto() != null){
                p.setProducto(pedido.getProducto());
            }
            
            if(pedido.getCantidad() != null){
                 p.setCantidad(pedido.getCantidad());
            }
            
            if(pedido.getTotal() != null){
                p.setTotal(pedido.getTotal());
            }
           
            if(pedido.getEstado() != null){
                p.setEstado(pedido.getEstado());
            }

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
