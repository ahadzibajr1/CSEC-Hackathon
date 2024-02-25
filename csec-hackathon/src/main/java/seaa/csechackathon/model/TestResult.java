package seaa.csechackathon.model;

import jakarta.persistence.*;
import seaa.csechackathon.dto.TestResultCreateRequest;

@Entity
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name="code", nullable = false, unique = true)
    private Integer code;

    @Column(name="sex", nullable = false)
    private Boolean sex;

    @Column(name="disease_category")
    private Integer diseaseCategory;


    @Column(name = "glucose", nullable = false)
    private Double glucose;

    @Column(name = "urea", nullable = false)
    private Double urea;

    @Column(name = "creatinine", nullable = false)
    private Double creatinine;

    @Column(name = "potassium", nullable = false)
    private Double potassium;

    @Column(name = "sodium", nullable = false)
    private Double sodium;

    @Column(name = "crp", nullable = false)
    private Double crp;

    @Column(name = "ph", nullable = false)
    private Double ph;


    public TestResult() {
    }

    public TestResult(Integer id, Integer code, Boolean sex, Integer diseaseCategory, Double glucose, Double urea, Double creatinine, Double potassium, Double sodium, Double crp, Double ph) {
        this.id = id;
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

    public TestResult(TestResultCreateRequest testResultCreateRequest) {
        this.code = testResultCreateRequest.getCode();
        this.sex = testResultCreateRequest.getSex();
        this.glucose = testResultCreateRequest.getGlucose();
        this.creatinine = testResultCreateRequest.getCreatinine();
        this.urea = testResultCreateRequest.getUrea();
        this.ph = testResultCreateRequest.getPh();
        this.potassium = testResultCreateRequest.getPotassium();
        this.sodium = testResultCreateRequest.getSodium();
        this.crp = testResultCreateRequest.getCrp();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
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
