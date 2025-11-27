package com.nivea.portfolio_presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.nivea.portfolio_presentation.service.EmailService;

public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/contact/send")
    public ResponseEntity<String> sendContactForm(@RequestParam String email,
            @RequestParam String subject,
            @RequestParam String message) {
        emailService.sendEmail(email, subject, message);
        return ResponseEntity.ok("Email enviado com sucesso!");
    }

    
}
