package com.healthai.health_adviser_backend.repository;

import com.healthai.health_adviser_backend.entity.HealthAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthAnswerRepository
        extends JpaRepository<HealthAnswer, Long> {
}
