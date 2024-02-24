package seaa.csechackathon.dto;

import seaa.csechackathon.model.TestResult;

public class TestResultTargetDto extends TestResultDto{

    private Integer diseaseCategory;

    public TestResultTargetDto(TestResult testResult, Integer diseaseCategory) {
        super(testResult);
        this.diseaseCategory = diseaseCategory;
    }

    public TestResultTargetDto(TestResult testResult) {
        super(testResult);
        this.diseaseCategory = testResult.getDiseaseCategory();
    }

    public TestResultTargetDto() {
    }

    public Integer getDiseaseCategory() {
        return diseaseCategory;
    }

    public void setDiseaseCategory(Integer diseaseCategory) {
        this.diseaseCategory = diseaseCategory;
    }
}
