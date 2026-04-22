package com.store.spring.app.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String clienteNombre;

    @Column(nullable = false)
    private String clienteEmail;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(nullable = false)
    private Double total;

    @Column(nullable = false)
    private String estado; // PENDIENTE, ENVIADO, ENTREGADO, CANCELADO

    public Pedido() {}

    public Pedido(String clienteNombre, String clienteEmail, Producto producto, Integer cantidad, Double total, String estado) {
        this.clienteNombre = clienteNombre;
        this.clienteEmail = clienteEmail;
        this.producto = producto;
        this.cantidad = cantidad;
        this.total = total;
        this.estado = estado;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getClienteNombre() { return clienteNombre; }
    public void setClienteNombre(String clienteNombre) { this.clienteNombre = clienteNombre; }

    public String getClienteEmail() { return clienteEmail; }
    public void setClienteEmail(String clienteEmail) { this.clienteEmail = clienteEmail; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
