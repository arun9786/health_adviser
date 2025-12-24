package com.healthai.health_adviser_backend.service;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecommendationService {

    public List<String> nutrition() {
        return List.of(
                "Eat more whole foods such as fruits, vegetables, and lean proteins",
                "Reduce processed and sugary foods",
                "Stay well hydrated"
        );
    }

    public List<String> exercise() {
        return List.of(
                "Aim for at least 150 minutes of moderate exercise per week",
                "Include strength training 2–3 times weekly",
                "Reduce long sitting hours"
        );
    }

    public List<String> lifestyle() {
        return List.of(
                "Get 7–9 hours of quality sleep",
                "Practice stress management techniques",
                "Avoid smoking and limit alcohol intake"
        );
    }
}

