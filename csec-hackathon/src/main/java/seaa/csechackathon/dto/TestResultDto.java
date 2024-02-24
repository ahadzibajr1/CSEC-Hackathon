package seaa.csechackathon.dto;

import seaa.csechackathon.model.TestResult;

public class TestResultDto {
    private String code;

    private Boolean sex;

    private Integer diseaseCategory;

    private Double glucose;

    private Double urea;

    private Double creatinine;

    private Double potassium;

    private Double sodium;

    private Double crp;

    private Double ph;

    public TestResultDto(String code, Boolean sex, Integer diseaseCategory, Double glucose, Double urea, Double creatinine, Double potassium, Double sodium, Double crp, Double ph) {
        this.code = code;
        this.sex = sex;
        this.diseaseCategory = diseaseCategory;
        this.glucose = glucose;
        this.urea = urea;
        this.creatinine = creatinine;
        this.potassium = potassium;
        this.sodium = sodium;
        this.crp = crp;
        this.ph = ph;
    }

    public TestResultDto() {
    }

    public TestResultDto(TestResult testResult) {
        this.code = testResult.getCode();
        this.sex = testResult.getSex();
        this.diseaseCategory = testResult.getDiseaseCategory();
        this.ph = testResult.getPh();
        this.potassium = testResult.getPotassium();
        this.creatinine = testResult.getCreatinine();
        this.sodium = testResult.getSodium();
        this.crp = testResult.getCrp();
        this.glucose = testResult.getGlucose();
        this.urea = testResult.getUrea();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Boolean getSex() {
        return sex;
    }

    public void setSex(Boolean sex) {
        this.sex = sex;
    }

    public Integer getDiseaseCategory() {
        return diseaseCategory;
    }

    public void setDiseaseCategory(Integer diseaseCategory) {
        this.diseaseCategory = diseaseCategory;
    }

    public Double getGlucose() {
        return glucose;
    }

    public void setGlucose(Double glucose) {
        this.glucose = glucose;
    }

    public Double getUrea() {
        return urea;
    }

    public void setUrea(Double urea) {
        this.urea = urea;
    }

    public Double getCreatinine() {
        return creatinine;
    }

    public void setCreatinine(Double creatinine) {
        this.creatinine = creatinine;
    }

    public Double getPotassium() {
        return potassium;
    }

    public void setPotassium(Double potassium) {
        this.potassium = potassium;
    }

    public Double getSodium() {
        return sodium;
    }

    public void setSodium(Double sodium) {
        this.sodium = sodium;
    }

    public Double getCrp() {
        return crp;
    }

    public void setCrp(Double crp) {
        this.crp = crp;
    }

    public Double getPh() {
        return ph;
    }

    public void setPh(Double ph) {
        this.ph = ph;
    }
}
