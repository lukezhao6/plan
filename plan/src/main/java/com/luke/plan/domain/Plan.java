package com.luke.plan.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Plan extends BaseEntity {

    private String planName;
    private String status;
    private String totalPart;
    private String source;
    private String target;
    private String link;

}
