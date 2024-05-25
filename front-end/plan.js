//异步函数，用于调用 API 获取数据。
async function callApi() {
  try {
    //使用 fetch API 向指定的 URL 发送 HTTP 请求，以获取数据。
    const response = await fetch("http://127.0.0.1:8081/plan/findAll");
    if (!response.ok) {
      //如果响应状态码不在 200-299 范围内，抛出一个错误。
      throw new Error("Network response was not ok " + response.statusText);
    }
    //将响应解析为 JSON 格式的数据
    const data = await response.json();
    return data;
  } catch (error) {
    //捕获异常，如果发生错误，则在控制台输出错误信息
    console.error("There has been a problem with your fetch operation:", error);
  }
}
//异步函数，用于获取计划数据并进行处理
async function getPlanData() {
  //调用 callApi 函数获取计划数据，并等待获取到数据
  const planData = await callApi();
  //如果成功获取到数据，则执行下面的代码块。
  if (planData) {
    //控制台打印获取到的计划数据
    console.log(planData);
    //调用 renderPlanData 函数，渲染获取到的计划数据
    renderPlanData(planData);
  }
}
// 获取元素
const monthList = document.getElementById("month-list");
const planContainerNotStarted = document.getElementById(
  "plan-container-not-started"
);
const planContainerInProgress = document.getElementById(
  "plan-container-in-progress"
);
const planContainerCompleted = document.getElementById(
  "plan-container-completed"
);

// 模拟的接口返回数据
const data = {
  第一周: [
    {
      planName: "AI大模型工程师",
      source: "马士兵教育",
      schedule: "20%",
      target: "前六章",
      link: "https://www.mashibing.com/subject/167?activeNav=1",
      status: "待开始",
    },
    {
      planName: "樊登育儿书（唤醒孩子的内在成长）",
      source: "书",
      schedule: "30%",
      target: "通读一遍",
      link: "",
      status: "进行中",
    },
  ],
  第二周: [
    {
      planName: "AI大模型工程师",
      source: "马士兵教育",
      schedule: "20%",
      target: "前六章",
      link: "https://www.mashibing.com/subject/167?activeNav=1",
      status: "待开始",
    },
    {
      planName: "樊登育儿书（唤醒孩子的内在成长）",
      source: "书",
      schedule: "100%",
      target: "通读一遍",
      link: "",
      status: "已完成",
    },
  ],
};

// 创建周按钮
function createWeekButtons() {
  Object.keys(data).forEach((week) => {
    const button = document.createElement("button");
    button.innerText = week;
    button.addEventListener("click", () => {
      fillPlans(data[week]);
    });
    monthList.appendChild(button);
  });
}

// 填充计划列表
function fillPlans(plans) {
  // 清空现有的计划
  planContainerNotStarted.innerHTML = "";
  planContainerInProgress.innerHTML = "";
  planContainerCompleted.innerHTML = "";

  plans.forEach((plan) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.innerText = plan.planName;
    row.appendChild(nameCell);

    const sourceCell = document.createElement("td");
    sourceCell.innerText = plan.source;
    row.appendChild(sourceCell);

    const scheduleCell = document.createElement("td");
    scheduleCell.innerText = plan.schedule;
    row.appendChild(scheduleCell);

    const targetCell = document.createElement("td");
    targetCell.innerText = plan.target;
    row.appendChild(targetCell);

    const statusCell = document.createElement("td");
    statusCell.innerText = plan.status;
    row.appendChild(statusCell);

    const linkCell = document.createElement("td");
    if (plan.link) {
      const link = document.createElement("a");
      link.href = plan.link;
      link.innerText = "查看";
      link.target = "_blank";
      linkCell.appendChild(link);
    }
    row.appendChild(linkCell);

    if (plan.status === "待开始") {
      planContainerNotStarted.appendChild(row);
    } else if (plan.status === "进行中") {
      planContainerInProgress.appendChild(row);
    } else if (plan.status === "已完成") {
      planContainerCompleted.appendChild(row);
    }
  });
}

// 初始化页面
createWeekButtons();
