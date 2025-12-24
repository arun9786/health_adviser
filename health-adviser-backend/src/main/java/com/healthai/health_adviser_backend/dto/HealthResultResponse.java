package com.healthai.health_adviser_backend.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class HealthResultResponse {

    private BasicInfo basicInfo;
    private Risk risk;
    private List<String> riskFactors;
    private Recommendations recommendations;
    private String aiNote;

    @Getter @Setter
    public static class BasicInfo {
        private String age;
        private Double height;
        private Double weight;
        private Double bmi;
        private String bmiCategory;
    }

    @Getter @Setter
    public static class Risk {
        private String level;
        private Integer score;
    }

    @Getter @Setter
    public static class Recommendations {
        private List<String> nutrition;
        private List<String> exercise;
        private List<String> lifestyle;
    }
}

