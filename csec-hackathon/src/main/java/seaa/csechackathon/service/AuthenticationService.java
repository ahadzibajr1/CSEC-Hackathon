package seaa.csechackathon.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import seaa.csechackathon.dao.TokenRepository;
import seaa.csechackathon.dao.UserRepository;
import seaa.csechackathon.dto.AuthCredentials;
import seaa.csechackathon.dto.AuthResponse;
import seaa.csechackathon.enums.TokenType;
import seaa.csechackathon.model.Token;
import seaa.csechackathon.model.User;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {
    private UserRepository userRepository;
    private TokenRepository tokenRepository;

    private PasswordEncoder passwordEncoder;

    private AuthenticationManager authenticationManager;


    JwtService jwtService;

    public AuthenticationService(UserRepository userRepository, TokenRepository tokenRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public User getUserByEmail(String email) {
        var user = userRepository.findByEmail(email);

        if(user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }



    private void saveToken(User savedUser, String jwtToken) {
        var token = new Token(jwtToken, TokenType.BEARER,false,false, savedUser);
        tokenRepository.save(token);
    }

    public AuthResponse authenticate(AuthCredentials authRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(),
                authRequest.getPassword()));
        var user = userRepository.findByEmail(authRequest.getEmail()).orElseThrow();
        var role = user.getRole();
        Map<String,Object> roleMap= new HashMap<>();
        roleMap.put("Role",role.getName());
        var jwtToken = jwtService.generateToken(roleMap,user);

        revokeAllUserTokens(user);
        saveToken(user, jwtToken);
        return  new AuthResponse(jwtToken,user);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if(validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }


    public boolean compareHash(String providedPassword, String email) {
        UserDetails userDetails = userRepository.findByEmail(email).orElseThrow();


        return passwordEncoder.matches(providedPassword,userDetails.getPassword());
    }

    public String getHash(String password) {
        return passwordEncoder.encode(password);
    }

    public void changePassword(String email, String newPassword) {
        var user = userRepository.findByEmail(email).orElseThrow();
        user.setPassword(getHash(newPassword));
        userRepository.save(user);
    }
}
