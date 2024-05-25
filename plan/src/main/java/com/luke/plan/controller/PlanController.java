package com.luke.plan.controller;

import com.luke.plan.domain.Plan;
import com.luke.plan.services.PlanService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("plan/")
public class PlanController {

    @Autowired
    private PlanService planService;
    @GetMapping("findAll")
    public String createSuPaiOrder(HttpServletResponse response){
//        List<Plan> all = planService.findAll();
        String result = """
                {
                  "plan": [
                    {
                      "2024年五月": {
                        "第一周": [
                          {
                            "planName": "AI大模型工程师",
                            "source": "马士兵教育",
                            "schedule": "20%",
                            "target": "前六章",
                            "link": "https://www.mashibing.com/subject/167?activeNav=1",
                            "status": "待开始"
                          },
                          {
                            "planName": "樊登育儿书（唤醒孩子的内在成长）",
                            "source": "书",
                            "schedule": "30%",
                            "target": "通读一遍",
                            "link": "",
                            "status": "进行中"
                          }
                        ],
                        "第二周": [
                          {
                            "planName": "AI大模型工程师",
                            "source": "马士兵教育",
                            "schedule": "20%",
                            "target": "前六章",
                            "link": "https://www.mashibing.com/subject/167?activeNav=1",
                            "status": "待开始"
                          },
                          {
                            "planName": "樊登育儿书（唤醒孩子的内在成长）",
                            "source": "书",
                            "schedule": "30%",
                            "target": "通读一遍",
                            "link": "",
                            "status": "进行中"
                          }
                        ]
                      }
                    },
                    {
                      "2024年六月": {
                        "第一周": [
                          {
                            "planName": "AI大模型工程师",
                            "source": "马士兵教育",
                            "schedule": "20%",
                            "target": "前六章",
                            "link": "https://www.mashibing.com/subject/167?activeNav=1",
                            "status": "待开始"
                          },
                          {
                            "planName": "樊登育儿书（唤醒孩子的内在成长）",
                            "source": "书",
                            "schedule": "30%",
                            "target": "通读一遍",
                            "link": "",
                            "status": "进行中"
                          }
                        ],
                        "第二周": [
                          {
                            "planName": "AI大模型工程师",
                            "source": "马士兵教育",
                            "schedule": "20%",
                            "target": "前六章",
                            "link": "https://www.mashibing.com/subject/167?activeNav=1",
                            "status": "待开始"
                          },
                          {
                            "planName": "樊登育儿书（唤醒孩子的内在成长）",
                            "source": "书",
                            "schedule": "30%",
                            "target": "通读一遍",
                            "link": "",
                            "status": "进行中"
                          }
                        ]
                      }
                    }
                  ]
                }
                """;
        response.setHeader("Access-Control-Allow-Origin","*");
        return result;
    }


    @GetMapping("findBar")
    public String findBar(HttpServletResponse response){
//        List<Plan> all = planService.findAll();
        String result = """
                {
                  "2024年5月": [
                    { "week": "第一周", "id": "1" },
                    { "week": "第二周", "id": "2" },
                    { "week": "第三周", "id": "3" },
                    { "week": "第四周", "id": "4" }
                  ],
                  "2024年6月": [
                    { "week": "第一周", "id": "5" },
                    { "week": "第二周", "id": "6" },
                    { "week": "第三周", "id": "7" },
                    { "week": "第四周", "id": "8" }
                  ],
                  "2024年7月": [
                    { "week": "第一周", "id": "9" },
                    { "week": "第二周", "id": "10" },
                    { "week": "第三周", "id": "11" },
                    { "week": "第四周", "id": "12" }
                  ]
                }
                """;
        response.setHeader("Access-Control-Allow-Origin","*");
        return result;
    }
}
