package com.store.spring.app.Repositories;

import com.store.spring.app.Models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}
