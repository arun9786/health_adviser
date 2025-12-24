package com.healthai.health_adviser_backend.controller;



import com.healthai.health_adviser_backend.ai.AiInsightService;
import com.healthai.health_adviser_backend.dto.AnswerDTO;
import com.healthai.health_adviser_backend.dto.AssessmentRequestDTO;
import com.healthai.health_adviser_backend.dto.AssessmentResponse;
import com.healthai.health_adviser_backend.dto.HealthResultResponse;
import com.healthai.health_adviser_backend.entity.HealthQuestion;
import com.healthai.health_adviser_backend.repository.HealthQuestionRepository;
import com.healthai.health_adviser_backend.service.*;

import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin
public class AssessmentController {

    @Autowired
    private RiskCalculationService riskService;
    @Autowired
    private HealthCalculationService healthCalculationService;
    @Autowired
    private RiskFactorService riskFactorService;
    @Autowired
    private RecommendationService recommendationService;
    @Autowired
    private AiInsightService aiInsightService;



    @PostMapping("/submit")
    public HealthResultResponse submit(@RequestBody AssessmentRequestDTO req) {

        int score = riskService.calculateRisk(req.getAnswers());
        String riskLevel = riskService.getRiskLevel(score);

        double bmi = healthCalculationService.calculateBMI(
                req.getUser().getHeight(),
                req.getUser().getWeight()
        );

        String bmiCategory =
                healthCalculationService.bmiCategory(bmi);

        HealthResultResponse response = new HealthResultResponse();

        // BASIC INFO
        HealthResultResponse.BasicInfo basic = new HealthResultResponse.BasicInfo();
        basic.setAge(req.getUser().getAge());
        basic.setHeight(req.getUser().getHeight());
        basic.setWeight(req.getUser().getWeight());
        basic.setBmi(bmi);
        basic.setBmiCategory(bmiCategory);

        // RISK
        HealthResultResponse.Risk risk = new HealthResultResponse.Risk();
        risk.setLevel(riskLevel);
        risk.setScore(score);

        // SET RESPONSE
        response.setBasicInfo(basic);
        response.setRisk(risk);
        response.setRiskFactors(
                riskFactorService.extractFactors(req.getAnswers())
        );

        HealthResultResponse.Recommendations rec =
                new HealthResultResponse.Recommendations();
        rec.setNutrition(recommendationService.nutrition());
        rec.setExercise(recommendationService.exercise());
        rec.setLifestyle(recommendationService.lifestyle());

        response.setRecommendations(rec);

        response.setAiNote(
                aiInsightService.generateEncouragement(
                        req.getUser().getAge(), bmiCategory, riskLevel
                )
        );

        return response;
    }
}


