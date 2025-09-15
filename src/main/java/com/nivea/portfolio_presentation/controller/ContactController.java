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

    @Autowired
    private EmailService emailService;

    // Página de contato
    @GetMapping("/contact")
    public String contact() {
        return "contact";
    }

    // Recebe dados do formulário
    @PostMapping("/contact/send")
    public String sendMessage(@RequestParam String name,
                              @RequestParam String email,
                              @RequestParam String message,
                              RedirectAttributes redirectAttrs) {

        String subject = "New Contact from " + name;
        String text = "Email: " + email + "\n\nMessage:\n" + message;

        try {
            emailService.sendEmail(email, subject, text);
            redirectAttrs.addFlashAttribute("success", "✅ Message sent successfully!");
        } catch (Exception e) {
            redirectAttrs.addFlashAttribute("error", "❌ Failed to send message. Please try again.");
        }

        return "redirect:/contact";
    }
}
