package com.healthai.health_adviser_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String name;
    private String age;
    private String gender;
    private Double height;
    private Double weight;
}

