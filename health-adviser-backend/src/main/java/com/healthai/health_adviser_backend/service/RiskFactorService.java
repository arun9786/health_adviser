package com.healthai.health_adviser_backend.service;

import com.healthai.health_adviser_backend.dto.AnswerDTO;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class RiskFactorService {

    public List<String> extractFactors(List<AnswerDTO> answers) {
        List<String> factors = new ArrayList<>();

        for (AnswerDTO a : answers) {
            if ("No".equalsIgnoreCase(a.getAnswer())) {
                factors.add("Low physical activity");
            }
            if ("High".equalsIgnoreCase(a.getAnswer())) {
                factors.add("High stress levels");
            }
        }

        return factors;
    }
}

