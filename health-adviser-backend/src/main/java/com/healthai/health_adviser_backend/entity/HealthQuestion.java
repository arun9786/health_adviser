package com.healthai.health_adviser_backend.entity;

import com.healthai.health_adviser_backend.enums.QuestionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "health_questions")
@Getter
@Setter
public class HealthQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @Column(columnDefinition = "json")
    private String options;

    private String category;
    @Column(columnDefinition = "text")
    private String riskRules;
    @Column(columnDefinition = "text")
    private String followUpRules;
}

