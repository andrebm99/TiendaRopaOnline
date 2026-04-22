package com.store.spring.app.Repositories;

import com.store.spring.app.Models.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
}
