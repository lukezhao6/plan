package com.luke.plan.mapper;

import com.luke.plan.domain.Plan;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface PlanMapper {
    public List<Plan> findAll();
}
