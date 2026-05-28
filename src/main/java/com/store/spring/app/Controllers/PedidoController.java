package com.store.spring.app.Controllers;

import com.store.spring.app.DTO.PedidoRequestDTO;
import com.store.spring.app.Interface.PedidoInterface;
import com.store.spring.app.Models.Pedido;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@Tag(name = "Pedidos", description = "Gestión de pedidos de la tienda.")
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoInterface pedidoInterface;

    public PedidoController(PedidoInterface pedidoInterface) {
        this.pedidoInterface = pedidoInterface;
    }

    @PostMapping
    @Operation(summary = "CREAR PEDIDO", description = "Registra un nuevo pedido.")
    public ResponseEntity<Pedido> create(@RequestBody PedidoRequestDTO pedidoDTO) {
        try {
            Pedido newPedido = pedidoInterface.crearPedido(pedidoDTO);
            return new ResponseEntity<>(newPedido, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @Operation(summary = "LISTAR TODOS LOS PEDIDOS", description = "Obtiene todos los pedidos registrados.")
    public ResponseEntity<List<Pedido>> getAll() {
        try {
            List<Pedido> pedidos = pedidoInterface.obtenerTodos();
            return new ResponseEntity<>(pedidos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "BUSCAR PEDIDO", description = "Obtiene un pedido por su ID.")
    public ResponseEntity<Pedido> getById(@PathVariable("id") Integer id) {
        try {
            Pedido pedido = pedidoInterface.obtenerPorId(id);
            if (pedido == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(pedido, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "ACTUALIZAR PEDIDO", description = "Modifica los datos de un pedido existente.")
    public ResponseEntity<Pedido> update(@PathVariable("id") Integer id, @RequestBody Pedido pedido) {
        try {
            Pedido updatedPedido = pedidoInterface.actualizarPedido(id, pedido);
            if (updatedPedido == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(updatedPedido, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "ELIMINAR PEDIDO", description = "Elimina un pedido por su ID.")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {
        try {
            boolean isDeleted = pedidoInterface.eliminarPedido(id);
            if (!isDeleted) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
