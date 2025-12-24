package com.healthai.health_adviser_backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthai.health_adviser_backend.dto.AnswerDTO;
import com.healthai.health_adviser_backend.entity.HealthQuestion;
import com.healthai.health_adviser_backend.repository.HealthQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RiskCalculationService {

    private final HealthQuestionRepository questionRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public RiskCalculationService(HealthQuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    /* -------------------------------
     * PUBLIC API
     * ------------------------------- */

    public int calculateRisk(List<AnswerDTO> answers) {
        int totalScore = 0;

        for (AnswerDTO answer : answers) {
            HealthQuestion question =
                    questionRepository.findById(answer.getQuestionId())
                            .orElse(null);

            if (question == null || question.getRiskRules() == null) {
                continue;
            }

            totalScore += calculateQuestionRisk(
                    question.getRiskRules(),
                    answer.getAnswer()
            );
        }
        return totalScore;
    }

    public String getRiskLevel(int score) {
        if (score >= 75) return "CRITICAL";
        if (score >= 50) return "HIGH";
        if (score >= 25) return "MEDIUM";
        return "LOW";
    }

    /* -------------------------------
     * INTERNAL LOGIC
     * ------------------------------- */

    private int calculateQuestionRisk(String riskRulesJson, String answer) {

        try {
            Map<String, Integer> rules =
                    objectMapper.readValue(riskRulesJson, Map.class);

            // MULTI_SELECT answers (comma separated)
            if (answer.contains(",")) {
                int sum = 0;
                for (String value : answer.split(",")) {
                    sum += rules.getOrDefault(value.trim(), 0);
                }
                return sum;
            }

            // NUMBER-based answers → bucket conversion
            if (isNumeric(answer)) {
                String bucket = convertToBucket(
                        Double.parseDouble(answer),
                        rules.keySet()
                );
                return rules.getOrDefault(bucket, 0);
            }

            // SINGLE_SELECT
            return rules.getOrDefault(answer, 0);

        } catch (Exception e) {
            return 0;
        }
    }

    /* -------------------------------
     * UTIL METHODS
     * ------------------------------- */

    private boolean isNumeric(String value) {
        try {
            Double.parseDouble(value);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Converts numeric value into rule bucket
     * Example:
     * 7 -> "7-8"
     * 9 -> ">8"
     */
    private String convertToBucket(double value, Iterable<String> ruleKeys) {

        for (String key : ruleKeys) {

            if (key.startsWith("<")) {
                double limit = Double.parseDouble(key.substring(1));
                if (value < limit) return key;
            }

            if (key.startsWith(">")) {
                double limit = Double.parseDouble(key.substring(1));
                if (value > limit) return key;
            }

            if (key.contains("-")) {
                String[] parts = key.split("-");
                double min = Double.parseDouble(parts[0]);
                double max = Double.parseDouble(parts[1]);
                if (value >= min && value <= max) return key;
            }
        }
        return "";
    }
}

