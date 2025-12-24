package com.healthai.health_adviser_backend.repository;


import com.healthai.health_adviser_backend.entity.HealthAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthAssessmentRepository
        extends JpaRepository<HealthAssessment, Long> {
}

