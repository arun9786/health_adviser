package com.healthai.health_adviser_backend.controller;

import com.healthai.health_adviser_backend.entity.HealthQuestion;
import com.healthai.health_adviser_backend.repository.HealthQuestionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin
public class QuestionController {

    private final HealthQuestionRepository repository;

    public QuestionController(HealthQuestionRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/questions/add")
    public ResponseEntity<HealthQuestion> saveQuestion(@RequestBody HealthQuestion question) {
        return ResponseEntity.ok(repository.save(question));
    }

    @GetMapping("/questions")
    public List<HealthQuestion> getQuestions() {
        return repository.findAll();
    }
}
