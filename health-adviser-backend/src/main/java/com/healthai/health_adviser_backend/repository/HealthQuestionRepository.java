package com.healthai.health_adviser_backend.repository;

import com.healthai.health_adviser_backend.entity.HealthQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthQuestionRepository
        extends JpaRepository<HealthQuestion, Long> {
}
