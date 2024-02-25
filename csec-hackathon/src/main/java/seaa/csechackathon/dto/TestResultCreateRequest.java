package seaa.csechackathon.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class TestResultCreateRequest {

    @NotNull(message = "Code is a required value!")
    @Min(value = 0, message =  "Code can not be a negative number!")
    private Integer code;

    @NotNull(message = "Sex is a required value!")
    private Boolean sex;

    @NotNull(message = "Glucose is a required value!")
    @Min(value = 0, message =  "Glucose level can not be a negative number!")
    private Double glucose;

    @NotNull(message = "Urea is a required value!")
    @Min(value = 0, message =  "Urea level can not be a negative number!")
    private Double urea;

    @NotNull(message = "Creatinine is a required value!")
    @Min(value = 0, message =  "Creatinine level can not be a negative number!")
    private Double creatinine;

    @NotNull(message = "Potassium is a required value!")
    @Min(value = 0, message =  "Potassium level can not be a negative number!")
    private Double potassium;

    @NotNull(message = "Sodium is a required value!")
    @Min(value = 0, message =  "Sodium level can not be a negative number!")
    private Double sodium;

    @NotNull(message = "CRP is a required value!")
    @Min(value = 0, message =  "CRP level can not be a negative number!")
    private Double crp;

    @NotNull(message = "pH is a required value!")
    @Min(value = 0, message =  "pH level can not be a negative number!")
    private Double ph;


    public TestResultCreateRequest(Integer code, Boolean sex, Double glucose, Double urea, Double creatinine, Double potassium, Double sodium, Double crp, Double ph) {
        this.code = code;
        this.sex = sex;
        this.glucose = glucose;
        this.urea = urea;
        this.creatinine = creatinine;
        this.potassium = potassium;
        this.sodium = sodium;
        this.crp = crp;
        this.ph = ph;
    }

    public TestResultCreateRequest() {
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
