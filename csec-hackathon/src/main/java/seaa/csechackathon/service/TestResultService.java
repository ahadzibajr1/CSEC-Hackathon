package seaa.csechackathon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import seaa.csechackathon.dao.TestResultRepository;
import seaa.csechackathon.dto.TestResultDto;
import seaa.csechackathon.dto.TestResultTargetDto;
import seaa.csechackathon.enums.Role;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestResultService {

    @Autowired
    private TestResultRepository testResultRepository;


    public List<TestResultDto> getAllTestResults(Role role) {
        var testResultsStream =  testResultRepository.findAll().stream();

        if(role.equals(Role.DOCTOR)) {
            return testResultsStream.map(tr -> new TestResultTargetDto(tr))
                    .collect(Collectors.toList());

        } else {
            return testResultsStream.map(tr -> new TestResultDto(tr))
                    .collect(Collectors.toList());
        }
    }
}
