package com.luke.plan.controller;

import com.luke.plan.services.PlanService;
import lombok.extern.slf4j.Slf4j;
import com.luke.plan.domain.Plan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("plan/")
public class PlanController {

    @Autowired
    private PlanService planService;

    @GetMapping("findAll")
    public List<Plan> createSuPaiOrder() {
        return planService.findAll();
    }
}
