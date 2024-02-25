package seaa.csechackathon.enums;

public enum DiseaseCategory {
    LAKA(1), SREDNJA(2), TESKA(3);

    private final int value;

    DiseaseCategory(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static DiseaseCategory fromValue(int value) {
        for (DiseaseCategory status : DiseaseCategory.values()) {
            if (status.getValue() == value) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid disease category!");
    }
}
