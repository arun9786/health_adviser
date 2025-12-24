package com.healthai.health_adviser_backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AssessmentRequestDTO {
    private UserDTO user;
    private List<AnswerDTO> answers;
}
