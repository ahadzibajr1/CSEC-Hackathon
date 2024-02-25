package seaa.csechackathon.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seaa.csechackathon.dao.UserRepository;
import seaa.csechackathon.dto.*;
import seaa.csechackathon.service.AuthenticationService;
import seaa.csechackathon.service.JwtService;
import seaa.csechackathon.service.PasswordResetTokenService;

import java.io.IOException;
    @RestController
    @RequestMapping(path="/api/auth")
    public class AuthController {

        private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
        private final AuthenticationService authenticationService;

        @Autowired
        private PasswordResetTokenService passwordResetTokenService;

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


        @PostMapping("/reset-password/request")
        public ResponseEntity<String> resetPasswordRequest(@RequestBody ResetPasswordRequest request) {

            try {
                passwordResetTokenService.resetPassword(request.getEmail());
            } catch (Exception e) {
                return (ResponseEntity<String>) ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("User with this email does not exist!");
            }


            return (ResponseEntity<String>) ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Email with reset url sent");
        }

        @PostMapping("/reset-password")
        public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordWithTokenRequest request) {
            String email = passwordResetTokenService.validatePasswordResetToken(request.getToken());


            if(email!=null) {
                authenticationService.changePassword(email, request.getPassword());

                return (ResponseEntity<String>) ResponseEntity
                        .status(HttpStatus.OK)
                        .body("Password successfully changed!");
            } else {
                return (ResponseEntity<String>) ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Invalid or expired link.");
            }
        }


        @PutMapping(path="/change-password")
        public @ResponseBody
        ResponseEntity<String> changePassword(@Valid  @RequestBody ChangePasswordRequest request, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {

            var email = jwtService.extractUsername(token.substring(7));
            if(authenticationService.compareHash(request.getOldPassword(), email)) {
                authenticationService.changePassword(email,request.getNewPassword());
                return  ResponseEntity.ok("Successfully changed password");
            } else {
                return (ResponseEntity<String>) ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Incorrect password!");
            }
        }



}
