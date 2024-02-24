package seaa.csechackathon.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import seaa.csechackathon.dto.TestResultDto;
import seaa.csechackathon.service.TestResultService;

import java.util.List;

@RestController
@RequestMapping(path="/api/test-result")
public class TestResultController {
    @Autowired
    TestResultService testResultService;

    @PreAuthorize("hasRole('DOCTOR')")
    @GetMapping("/all")
    public ResponseEntity<List<TestResultDto>> getAllTestResults() {
        return ResponseEntity.ok(testResultService.getAllTestResults());
    }
}
