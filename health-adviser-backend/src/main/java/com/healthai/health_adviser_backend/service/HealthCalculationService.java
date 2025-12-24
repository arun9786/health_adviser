package com.healthai.health_adviser_backend.service;

import org.springframework.stereotype.Service;

@Service
public class HealthCalculationService {

    public double calculateBMI(double heightCm, double weightKg) {
        double heightM = heightCm / 100.0;
        return Math.round((weightKg / (heightM * heightM)) * 100.0) / 100.0;
    }

    public String bmiCategory(double bmi) {
        if (bmi < 18.5) return "UNDERWEIGHT";
        if (bmi < 25) return "NORMAL";
        if (bmi < 30) return "OVERWEIGHT";
        return "OBESE";
    }
}

