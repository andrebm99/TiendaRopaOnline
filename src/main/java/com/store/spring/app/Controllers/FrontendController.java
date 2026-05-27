package com.store.spring.app.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping("/")
    public String index() {
        return "Home";
    }

    @GetMapping("/envios")
    public String shipping() {
        return "envios";
    }

    @GetMapping("/como-comprar")
    public String showComoComprar() {
        return "como_comprar";
    }

    @GetMapping("/catalogo")
    public String showCatalogo() {
        return "catalogo";
    }

    @GetMapping("/bolsa")
    public String showBolsa() {
        return "bolsa";
    }
}
