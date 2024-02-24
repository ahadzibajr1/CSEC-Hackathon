package seaa.csechackathon.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seaa.csechackathon.dao.UserRepository;
import seaa.csechackathon.dto.AuthCredentials;
import seaa.csechackathon.dto.AuthResponse;
import seaa.csechackathon.service.AuthenticationService;
import seaa.csechackathon.service.JwtService;

import java.io.IOException;
    @RestController
    @RequestMapping(path="/api/auth")
    public class AuthController {

        private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
        private final AuthenticationService authenticationService;

        @Autowired
        private JwtService jwtService;

        @Autowired
        private UserRepository userRepository;


        public AuthController(AuthenticationService authenticationService) {
            this.authenticationService = authenticationService;
        }



        @PostMapping("/login")
        public ResponseEntity<AuthResponse> login(@RequestBody AuthCredentials credentials) {

            return ResponseEntity.ok(authenticationService.authenticate(credentials));

        }

        @PostMapping("/refresh-token")
        public ResponseEntity<AuthResponse> refresh(HttpServletRequest request, HttpServletResponse response) {
            try {
                return ResponseEntity.ok(authenticationService.refreshToken(request,response));
            } catch (IOException e) {
                logger.error("Failed to refresh token");
                return (ResponseEntity<AuthResponse>) ResponseEntity.badRequest();
            }
        }

        @GetMapping("/validate-token")
        public ResponseEntity<String> validateToken(@RequestParam String token) {
            if(jwtService.validateToken(token)) {
                return ResponseEntity.ok("Token valid");
            } else {
                return (ResponseEntity<String>) ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Invalid token.");
            }
        }





}
