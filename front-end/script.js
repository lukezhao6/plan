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
//定义一个函数 createPlanElement，用于根据给定的计划数据创建 DOM 元素
function createPlanElement(plan) {
  //创建一个 <tr> 元素作为行元素
  const rowElement = document.createElement("tr");
  //创建一个 <td> 元素作为名称单元格
  const nameCell = document.createElement("td");
  //设置名称单元格的文本内容为计划的名称
  nameCell.textContent = plan.planName;
  //将名称单元格添加到行元素中
  rowElement.appendChild(nameCell);

  const sourceCell = document.createElement("td");
  sourceCell.textContent = plan.source;
  rowElement.appendChild(sourceCell);

  const progressCell = document.createElement("td");
  const progressContainer = document.createElement("div");
  //添加类名 progress-container
  progressContainer.classList.add("progress-container");
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  progressBar.style.width = plan.schedule;
  const progressText = document.createElement("div");
  progressText.classList.add("progress-text");
  progressText.textContent = plan.schedule;
  progressBar.appendChild(progressText);
  progressContainer.appendChild(progressBar);
  progressCell.appendChild(progressContainer);
  rowElement.appendChild(progressCell);
  const targetCell = document.createElement("td");
  targetCell.textContent = plan.target;
  rowElement.appendChild(targetCell);

  const statusCell = document.createElement("td");
  statusCell.classList.add("plan-status");

  const statusParagraph = document.createElement("p");
  statusParagraph.classList.add("status-plan");
  statusParagraph.textContent = plan.status;

  switch (plan.status) {
    case "待开始":
      statusParagraph.classList.add("status-not-started");
      break;
    case "进行中":
      statusParagraph.classList.add("status-in-progress");
      break;
    case "已完成":
      statusParagraph.classList.add("status-completed");
      break;
  }

  statusCell.appendChild(statusParagraph);
  rowElement.appendChild(statusCell);

  const linkCell = document.createElement("td");
  if (plan.link) {
    const linkElement = document.createElement("a");
    linkElement.classList.add("link");
    linkElement.href = plan.link;
    linkElement.textContent = "查看详情";
    linkElement.target = "_blank";
    linkCell.appendChild(linkElement);
  } else {
    linkCell.textContent = "无链接";
  }
  rowElement.appendChild(linkCell);

  return rowElement;
}

function groupPlansByStatus(plans) {
  const groupedPlans = {
    待开始: [],
    进行中: [],
    已完成: [],
  };

  plans.forEach((plan) => {
    groupedPlans[plan.status].push(plan);
  });

  return groupedPlans;
}

function renderPlans(plans, container) {
  container.innerHTML = "";

  for (const status in plans) {
    const statusGroup = plans[status];

    const statusElement = document.createElement("div");
    statusElement.classList.add("plan-group");

    const statusHeader = document.createElement("h2");
    statusHeader.textContent = status;
    statusElement.appendChild(statusHeader);

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["计划名称", "来源", "进度", "目标", "状态", "链接"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    statusGroup.forEach((plan) => {
      const planElement = createPlanElement(plan);
      tbody.appendChild(planElement);
    });

    table.appendChild(tbody);
    statusElement.appendChild(table);

    container.appendChild(statusElement);
  }
}
function renderPlanData(planData) {
  //获取计划容器和月份列表
  const planContainer = document.getElementById("plan-container");
  //获取计划数据中的计划数组
  const monthList = document.getElementById("month-list");
  //遍历计划数据中的计划数组
  planData.plan.forEach((monthPlans, monthIndex) => {
    for (const month in monthPlans) {
      const monthGroup = monthPlans[month];

      const monthElement = document.createElement("li");
      const monthLink = document.createElement("a");
      monthLink.textContent = month;
      monthLink.href = "#";
      monthLink.dataset.monthIndex = monthIndex;
      monthElement.appendChild(monthLink);

      const weekList = document.createElement("ul");

      for (const week in monthGroup) {
        const weekElement = document.createElement("li");
        const weekLink = document.createElement("a");
        weekLink.textContent = week;
        weekLink.href = "#";
        weekLink.dataset.monthIndex = monthIndex;
        weekLink.dataset.week = week;
        weekElement.appendChild(weekLink);
        weekList.appendChild(weekElement);
      }

      monthElement.appendChild(weekList);
      monthList.appendChild(monthElement);
    }
  });
  //获取第一个月的计划数据
  monthList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "A") {
      event.preventDefault();
      const monthIndex = target.dataset.monthIndex;
      const week = target.dataset.week;

      const monthPlans = planData.plan[monthIndex];
      for (const month in monthPlans) {
        const monthGroup = monthPlans[month];
        if (week) {
          const weekPlans = monthGroup[week];
          const groupedPlans = groupPlansByStatus(weekPlans);
          renderPlans(groupedPlans, planContainer);
        } else {
          let allPlans = [];
          for (const week in monthGroup) {
            allPlans = allPlans.concat(monthGroup[week]);
          }
          const groupedPlans = groupPlansByStatus(allPlans);
          renderPlans(groupedPlans, planContainer);
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", getPlanData);
document.addEventListener("DOMContentLoaded", () => {
  const addPlanButton = document.getElementById("add-plan-button");
  const modal = document.getElementById("plan-modal");
  const closeModalButton = document.getElementById("close-modal-button");
  const planForm = document.getElementById("plan-form");

  // 打开模态框
  addPlanButton.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // 关闭模态框
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 关闭模态框，点击模态框外部
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // 提交表单
  planForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const planName = document.getElementById("plan-name").value;
    const planTime = document.getElementById("plan-time").value;

    fetch("http://127.0.0.1/plan/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: planName,
        time: planTime,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("成功:", data);
        modal.style.display = "none";
        // 这里可以添加刷新计划列表的代码
      })
      .catch((error) => {
        console.error("错误:", error);
      });
  });
});
