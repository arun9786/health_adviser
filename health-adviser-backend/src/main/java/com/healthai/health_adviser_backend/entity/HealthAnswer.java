package com.healthai.health_adviser_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "health_answers")
@Getter
@Setter
public class HealthAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long assessmentId;
    private Long questionId;

    @Column(length = 1000)
    private String answer;
}

