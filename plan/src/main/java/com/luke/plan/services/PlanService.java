package com.luke.plan.services;

import com.luke.plan.domain.Plan;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PlanService {
    List<Plan> findAll();
}
