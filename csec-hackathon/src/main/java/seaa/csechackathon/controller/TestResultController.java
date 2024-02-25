package seaa.csechackathon.controller;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import seaa.csechackathon.dto.TestResultCreateRequest;
import seaa.csechackathon.dto.TestResultDto;
import seaa.csechackathon.enums.Role;
import seaa.csechackathon.service.JwtService;
import seaa.csechackathon.service.TestResultService;

import java.util.List;

@RestController
@RequestMapping(path="/api/test-result")
public class TestResultController {
    @Autowired
    TestResultService testResultService;

    @Autowired
    JwtService jwtService;

    @GetMapping("/all")
    public ResponseEntity<List<TestResultDto>> getAllTestResults(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {

        String role = jwtService.extractClaim(token.substring(7), (Claims c) -> c.get("Role")).toString();

        return ResponseEntity.ok(testResultService.getAllTestResults(Role.valueOf(role)));
    }

    @PreAuthorize("hasRole('LAB_TECHNICIAN')")
    @PostMapping
    public ResponseEntity<TestResultDto> createTestResult(@Valid @RequestBody TestResultCreateRequest testResultCreateRequest) {
        return ResponseEntity.ok(testResultService.createTestResult(testResultCreateRequest));
    }
}
