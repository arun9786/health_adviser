package com.healthai.health_adviser_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "health_assessments")
@Getter
@Setter
public class HealthAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int riskScore;
    private String riskLevel;

    private LocalDateTime createdAt;
}

