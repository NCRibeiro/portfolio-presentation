package com.nivea.portfolio_presentation.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    // ⚙️ Ideal: o destinatário pode vir de application.properties futuramente
    private static final String RECEIVER_EMAIL = "nc.chagasribeiro@gmail.com";

    public void sendEmail(String from, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(RECEIVER_EMAIL);
            message.setFrom(from != null && !from.isBlank() ? from : "noreply@nivearibeiro.com");
            message.setSubject(subject != null ? subject : "Mensagem sem assunto");
            message.setText("""
                            \ud83d\udce8 Mensagem recebida via portf\u00f3lio interativo:
                            
                            De: """ + from + "\n\n" +
                    "Conteúdo:\n" + text);

            mailSender.send(message);
            log.info("✅ Email enviado com sucesso de {} para {}", from, RECEIVER_EMAIL);

        } catch (MailException e) {
            log.error("❌ Erro ao enviar email: {}", e.getMessage(), e);
            throw e;
        }
    }
}