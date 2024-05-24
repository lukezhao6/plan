package com.luke.plan.domain;

import lombok.Data;

@Data
public class BaseEntity {
    private Long id;
    private String creator;
    private String updator;

    private String createdTime;
    private String updatedTime;
}
