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

    // Destinatário configurado. Pode migrar para application.properties futuramente.
    private static final String RECEIVER_EMAIL = "nc.chagasribeiro@gmail.com";

    public void sendEmail(String from, String subject, String text) {
        try {
            String normalizedFrom = from != null ? from.trim() : "";
            String fromAddress = !normalizedFrom.isBlank() ? normalizedFrom : "noreply@nivearibeiro.com";

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(RECEIVER_EMAIL);
            message.setFrom(fromAddress);
            if (!normalizedFrom.isBlank()) {
                message.setReplyTo(normalizedFrom);
            }

            String effectiveSubject = (subject != null && !subject.isBlank()) ? subject : "Mensagem sem assunto";
            message.setSubject(effectiveSubject);

            String body = "Mensagem recebida via portfólio:\n\n" +
                    "De: " + (!normalizedFrom.isBlank() ? normalizedFrom : "(não informado)") + "\n\n" +
                    "Mensagem:\n" + (text != null ? text : "");
            message.setText(body);

            mailSender.send(message);
            log.info("Email enviado com sucesso de {} para {}", fromAddress, RECEIVER_EMAIL);

        } catch (MailException e) {
            log.error("Erro ao enviar email: {}", e.getMessage(), e);
            throw e;
        }
    }
}
