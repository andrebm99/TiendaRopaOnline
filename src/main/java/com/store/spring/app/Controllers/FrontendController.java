package com.store.spring.app.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping("/")
    public String index() {
        return "inicio";
    }

    @GetMapping("/envios")
    public String shipping() {
        return "envios";
    }

    @GetMapping("/como-comprar")
    public String howToBuy() {
        return "como_comprar";
    }
}
