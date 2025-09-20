package com.nivea.portfolio_presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nivea.portfolio_presentation.service.EmailService;

@Controller
public class ContactController {

    private final EmailService emailService;

    @Autowired
    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    /**
     * Exibe a página de contato.
     */
    @GetMapping("/contact")
    public String contact() {
        return "contact"; // carrega contact.html em templates
    }

    /**
     * Processa envio do formulário de contato.
     */
    @PostMapping("/contact/send")
    public String sendMessage(@RequestParam("name") String name,
                              @RequestParam("email") String email,
                              @RequestParam("message") String message,
                              RedirectAttributes redirectAttrs) {

        String subject = "New Contact from " + name;
        String text = String.format("Email: %s%n%nMessage:%n%s", email, message);

        try {
            emailService.sendEmail(email, subject, text);
            redirectAttrs.addFlashAttribute("success", "✅ Message sent successfully!");
        } catch (Exception e) {
            redirectAttrs.addFlashAttribute("error", "❌ Failed to send message. Please try again.");
        }

        return "redirect:/contact";
    }
}
