package com.healthai.health_adviser_backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthai.health_adviser_backend.entity.HealthQuestion;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FollowUpRuleService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Returns follow-up question IDs based on:
     * - current question
     * - user's answer
     */
    public List<Long> getFollowUpQuestionIds(
            HealthQuestion question,
            String answer) {

        List<Long> followUpIds = new ArrayList<>();

        if (question.getFollowUpRules() == null) {
            return followUpIds;
        }

        try {
            Map<String, Object> ruleJson =
                    objectMapper.readValue(
                            question.getFollowUpRules(),
                            Map.class
                    );

            List<Map<String, Object>> rules =
                    (List<Map<String, Object>>) ruleJson.get("rules");

            // MULTI_SELECT answers
            List<String> answerList =
                    answer.contains(",")
                            ? Arrays.stream(answer.split(","))
                            .map(String::trim)
                            .toList()
                            : List.of(answer);

            for (Map<String, Object> rule : rules) {

                String triggerAnswer =
                        rule.get("answer").toString();

                if (answerList.contains(triggerAnswer)) {

                    List<Integer> showIds =
                            (List<Integer>) rule.get("show");

                    for (Integer id : showIds) {
                        followUpIds.add(id.longValue());
                    }
                }
            }

        } catch (Exception e) {
            // log error if needed
        }

        return followUpIds;
    }
}

