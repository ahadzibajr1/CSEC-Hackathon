package seaa.csechackathon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import seaa.csechackathon.dao.TestResultRepository;
import seaa.csechackathon.dto.TestResultDto;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestResultService {

    @Autowired
    private TestResultRepository testResultRepository;


    public List<TestResultDto> getAllTestResults() {
        return testResultRepository
                .findAll()
                .stream()
                .map(tr -> new TestResultDto(tr))
                .collect(Collectors.toList());
    }
}
