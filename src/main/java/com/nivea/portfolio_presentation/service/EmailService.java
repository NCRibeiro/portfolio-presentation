package com.nivea.portfolio_presentation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String from, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();

            // Email que receberá as mensagens (o seu)
            message.setTo("nc.chagasribeiro@gmail.com");

            // Assunto do email
            message.setSubject(subject);

            // Corpo do email
            message.setText("From: " + from + "\n\n" + text);

            // Envia
            mailSender.send(message);

            System.out.println("Email enviado com sucesso para " + message.getTo()[0]);
        } catch (MailException e) {
            System.err.println("Erro ao enviar email: " + e.getMessage());
            throw e;
        }
    }
}

