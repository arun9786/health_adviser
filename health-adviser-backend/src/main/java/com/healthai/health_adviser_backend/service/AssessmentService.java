package com.healthai.health_adviser_backend.service;

import com.healthai.health_adviser_backend.dto.AssessmentRequestDTO;
import org.springframework.stereotype.Service;

@Service
public class AssessmentService {

    public String buildSummary(AssessmentRequestDTO req, int score, String level) {

        return """
        Age: %s
        Height: %.1f
        Weight: %.1f
        Risk Level: %s
        """.formatted(
                req.getUser().getAge(),
                req.getUser().getHeight(),
                req.getUser().getWeight(),
                level
        );
    }
}

