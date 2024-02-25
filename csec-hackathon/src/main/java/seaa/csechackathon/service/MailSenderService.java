package seaa.csechackathon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSenderService {
    @Autowired
    JavaMailSender mailSender;
    @Autowired
    private Environment environment;

    public void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(toEmail);
        simpleMailMessage.setFrom(environment.getProperty("mail.from"));
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(body);

        mailSender.send(simpleMailMessage);
    }

    public void constructResetTokenEmail( String token, String email) {
        String url = environment.getProperty("reset_password.url") + token;
        String body = "Dear user, \n you received this e-mail because you requested a password reset. \n" +
                "\n" +
                "Click on the following link to reset your password:\n" +
                "\n" +
                url + "\n" +
                "\n" +
                "If this wasn't you, someone might be trying to access your account.\n" +
                "\n" +
                "Warning: Link expires in an hour.\n" +
                "\n" +
                "\n" +
                "Best regards,\n" +
                "SEAA Team";
        String subject = "Password Reset - SEAA";

        sendEmail(email, subject, body);
    }
}
