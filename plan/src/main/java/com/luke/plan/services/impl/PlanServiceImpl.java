package com.luke.plan.services.impl;

import com.luke.plan.domain.Plan;
import com.luke.plan.services.PlanService;
import com.luke.plan.mapper.PlanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PlanServiceImpl implements PlanService {
    @Autowired
    private PlanMapper planDao;

    @Override
    public List<Plan> findAll() {
        return planDao.findAll();
    }
}
