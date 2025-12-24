package com.healthai.health_adviser_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class AssessmentResponse {
    private int riskScore;
    private String riskLevel;
    private String aiInsights;
    private List<Long> followUpQuestionIds;
}
