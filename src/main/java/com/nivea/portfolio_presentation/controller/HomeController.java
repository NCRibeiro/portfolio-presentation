package com.nivea.portfolio_presentation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    /**
     * Página inicial do portfólio.
     * Mapeia a raiz ("/") para o template index.html.
     */
    @GetMapping({"/", "/home"})
    public String home() {
        return "index"; // carrega index.html em templates
    }
}
