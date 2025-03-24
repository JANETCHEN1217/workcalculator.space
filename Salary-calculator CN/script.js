// 全局变量
let monthlyPay = 0;
let workDays = 22;
let workHours = 8;
let startTime = "9:00";
let endTime = "18:00";
let secondRate = 0;
let minuteRate = 0;
let hourRate = 0;
let dayRate = 0;
let isFishing = false;
let isOverworking = false;
let fishStartTime = null;
let overworkStartTime = null;
let totalFishMoney = 0;
let totalOverworkMoney = 0;
let totalFishTime = 0;
let totalOverworkTime = 0;
let wishlistItems = [];
let currentSavingItem = null;
let savingInterval = null;
let savingStartTime = null;
let savingTotalSeconds = 0;

// 成就等级
const fishingAchievements = [
    { level: 1, title: "初级摸鱼者", description: "你已经开始享受摸鱼的乐趣", time: 1 },
    { level: 2, title: "熟练摸鱼者", description: "摸鱼已经成为你工作的一部分", time: 60 },
    { level: 3, title: "资深摸鱼者", description: "你已经掌握了摸鱼的精髓", time: 300 },
    { level: 4, title: "摸鱼专家", description: "别人工作的时候，你在摸鱼", time: 600 },
    { level: 5, title: "摸鱼大师", description: "摸鱼界的传奇人物", time: 1800 },
    { level: 6, title: "摸鱼之神", description: "你就是摸鱼的代名词", time: 3600 }
];

const overworkAchievements = [
    { level: 1, title: "加班新手", description: "你刚刚踏入加班的世界", time: 1 },
    { level: 2, title: "加班常客", description: "加班开始成为你生活的一部分", time: 60 },
    { level: 3, title: "加班达人", description: "你的生活已经与加班密不可分", time: 300 },
    { level: 4, title: "加班专家", description: "你已经忘记了下班的感觉", time: 600 },
    { level: 5, title: "加班大师", description: "公司里的最后一盏灯", time: 1800 },
    { level: 6, title: "加班之王", description: "你的床已经搬到了公司", time: 3600 }
];

// 物品数据
const itemData = {
    daily: [
        { name: "喜茶满杯波波冰", price: 32 },
        { name: "奈雪の茶大杯烤奶", price: 38 },
        { name: "星巴克焦糖玛奇朵", price: 36 },
        { name: "海底捞四人套餐", price: 500 },
        { name: "电影票两张", price: 100 },
        { name: "网红面包店打卡", price: 200 },
        { name: "必胜客双人套餐", price: 189 },
        { name: "一盒巧克力", price: 88 }
    ],
    luxury: [
        { name: "LV Neverfull包包", price: 12000 },
        { name: "iPhone 15 Pro Max", price: 9999 },
        { name: "Dyson吹风机", price: 3990 },
        { name: "川久保玲小红心", price: 2390 },
        { name: "巴黎世家老爹鞋", price: 7990 },
        { name: "Apple Watch Ultra", price: 6299 },
        { name: "Switch OLED版", price: 2499 },
        { name: "Sony WH-1000XM5", price: 2999 }
    ],
    travel: [
        { name: "日本关西三日游", price: 5000 },
        { name: "马尔代夫一周游", price: 15000 },
        { name: "欧洲十日游", price: 30000 },
        { name: "迪士尼亲子游", price: 8000 },
        { name: "张家界三日游", price: 3000 },
        { name: "北海道雪季游", price: 7000 },
        { name: "云南自由行", price: 4000 },
        { name: "西藏朝圣之旅", price: 6500 }
    ]
};

// 页面加载时初始化
document.addEventListener("DOMContentLoaded", function() {
    initElements();
    loadSavedData();
    startTimeUpdates();
    initSavingFunction();
});

// 初始化页面元素
function initElements() {
    const monthlySalary = document.getElementById("monthlySalary");
    const workDaysInput = document.getElementById("workDays");
    const workHoursInput = document.getElementById("workHours");
    const workStartTime = document.getElementById("workStartTime");
    const workEndTime = document.getElementById("workEndTime");
    
    if (monthlySalary) {
        monthlySalary.addEventListener("input", calculateRates);
    }
    
    if (workDaysInput) {
        workDaysInput.addEventListener("input", calculateRates);
    }
    
    if (workHoursInput) {
        workHoursInput.addEventListener("input", calculateRates);
    }
    
    if (workStartTime) {
        workStartTime.addEventListener("input", calculateRates);
    }
    
    if (workEndTime) {
        workEndTime.addEventListener("input", calculateRates);
    }
    
    const fishButton = document.getElementById("fishButton");
    if (fishButton) {
        fishButton.addEventListener("click", toggleFishing);
    }
    
    const overworkButton = document.getElementById("overworkButton");
    if (overworkButton) {
        overworkButton.addEventListener("click", toggleOverwork);
    }
    
    initItemSelection();
}

// 从localStorage加载已保存的数据
function loadSavedData() {
    const savedMonthlyPay = localStorage.getItem("monthlySalary");
    const savedWorkDays = localStorage.getItem("workDays");
    const savedWorkHours = localStorage.getItem("workHours");
    const savedStartTime = localStorage.getItem("workStartTime");
    const savedEndTime = localStorage.getItem("workEndTime");
    const savedTotalFishTime = localStorage.getItem("totalFishTime");
    const savedTotalOverworkTime = localStorage.getItem("totalOverworkTime");
    const savedTotalFishMoney = localStorage.getItem("totalFishMoney");
    const savedTotalOverworkMoney = localStorage.getItem("totalOverworkMoney");
    const savedWishlistItems = localStorage.getItem("wishlistItems");
    
    const monthlySalaryInput = document.getElementById("monthlySalary");
    const workDaysInput = document.getElementById("workDays");
    const workHoursInput = document.getElementById("workHours");
    const workStartTimeInput = document.getElementById("workStartTime");
    const workEndTimeInput = document.getElementById("workEndTime");
    
    if (savedMonthlyPay && monthlySalaryInput) {
        monthlySalaryInput.value = savedMonthlyPay;
    }
    
    if (savedWorkDays && workDaysInput) {
        workDaysInput.value = savedWorkDays;
    }
    
    if (savedWorkHours && workHoursInput) {
        workHoursInput.value = savedWorkHours;
    }
    
    if (savedStartTime && workStartTimeInput) {
        workStartTimeInput.value = savedStartTime;
    }
    
    if (savedEndTime && workEndTimeInput) {
        workEndTimeInput.value = savedEndTime;
    }
    
    if (savedTotalFishTime) {
        totalFishTime = parseFloat(savedTotalFishTime);
        const totalFishTimeElement = document.getElementById("totalFishTime");
        if (totalFishTimeElement) {
            totalFishTimeElement.textContent = formatTime(totalFishTime);
        }
        updateFishingAchievement();
    }
    
    if (savedTotalOverworkTime) {
        totalOverworkTime = parseFloat(savedTotalOverworkTime);
        const totalOverworkTimeElement = document.getElementById("totalOverworkTime");
        if (totalOverworkTimeElement) {
            totalOverworkTimeElement.textContent = formatTime(totalOverworkTime);
        }
        updateOverworkAchievement();
    }
    
    if (savedTotalFishMoney) {
        totalFishMoney = parseFloat(savedTotalFishMoney);
        const totalFishMoneyElement = document.getElementById("totalFishMoney");
        if (totalFishMoneyElement) {
            totalFishMoneyElement.textContent = formatCurrency(totalFishMoney);
        }
    }
    
    if (savedTotalOverworkMoney) {
        totalOverworkMoney = parseFloat(savedTotalOverworkMoney);
        const totalOverworkMoneyElement = document.getElementById("totalOverworkMoney");
        if (totalOverworkMoneyElement) {
            totalOverworkMoneyElement.textContent = formatCurrency(totalOverworkMoney);
        }
    }
    
    if (savedWishlistItems) {
        try {
            wishlistItems = JSON.parse(savedWishlistItems);
            renderWishlistItems();
        } catch (e) {
            console.error("Error parsing wishlist items", e);
        }
    }
    
    calculateRates();
}

// 开始定时更新
function startTimeUpdates() {
    // 每秒更新一次
    setInterval(updateWorkTime, 1000);
}

// 计算收入比率
function calculateRates() {
    const monthlySalaryInput = document.getElementById("monthlySalary");
    const workDaysInput = document.getElementById("workDays");
    const workHoursInput = document.getElementById("workHours");
    const workStartTimeInput = document.getElementById("workStartTime");
    const workEndTimeInput = document.getElementById("workEndTime");
    
    if (!monthlySalaryInput || !workDaysInput || !workHoursInput || !workStartTimeInput || !workEndTimeInput) {
        return;
    }
    
    monthlyPay = parseFloat(monthlySalaryInput.value) || 0;
    workDays = parseInt(workDaysInput.value) || 22;
    workHours = parseInt(workHoursInput.value) || 8;
    startTime = workStartTimeInput.value || "9:00";
    endTime = workEndTimeInput.value || "18:00";
    
    // 计算日工资
    dayRate = monthlyPay / workDays;
    
    // 计算小时工资
    hourRate = dayRate / workHours;
    
    // 计算分钟工资
    minuteRate = hourRate / 60;
    
    // 计算秒工资
    secondRate = minuteRate / 60;
    
    // 更新显示
    const hourRateElement = document.getElementById("hourRate");
    const minuteRateElement = document.getElementById("minuteRate");
    const secondRateElement = document.getElementById("secondRate");
    const dayRateElement = document.getElementById("dayRate");
    
    if (hourRateElement) {
        hourRateElement.textContent = formatCurrency(hourRate);
    }
    
    if (minuteRateElement) {
        minuteRateElement.textContent = formatCurrency(minuteRate);
    }
    
    if (secondRateElement) {
        secondRateElement.textContent = formatCurrency(secondRate);
    }
    
    if (dayRateElement) {
        dayRateElement.textContent = formatCurrency(dayRate);
    }
    
    // 保存数据到localStorage
    localStorage.setItem("monthlySalary", monthlyPay);
    localStorage.setItem("workDays", workDays);
    localStorage.setItem("workHours", workHours);
    localStorage.setItem("workStartTime", startTime);
    localStorage.setItem("workEndTime", endTime);
    
    // 更新计算结果
    updateWorkTime();
    updateTodayEarnings();
    updateMonthlyEarnings();
    updateYearlyEarnings();
}

// 更新工作时间
function updateWorkTime() {
    const now = new Date();
    const startTimeParts = startTime.split(":");
    const endTimeParts = endTime.split(":");
    
    const workStartDate = new Date(now);
    workStartDate.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]), 0);
    
    const workEndDate = new Date(now);
    workEndDate.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]), 0);
    
    // 判断当前是否在工作时间内
    const isWorkingHours = now >= workStartDate && now <= workEndDate;
    
    // 计算已经过去的工作时间（秒）
    let elapsedWorkSeconds = 0;
    if (now > workStartDate) {
        if (now < workEndDate) {
            // 还在工作中
            elapsedWorkSeconds = Math.floor((now - workStartDate) / 1000);
        } else {
            // 已经下班
            elapsedWorkSeconds = Math.floor((workEndDate - workStartDate) / 1000);
        }
    }
    
    // 计算今天的收入
    const todayEarned = elapsedWorkSeconds * secondRate;
    const todayEarnedElement = document.getElementById("todayEarned");
    if (todayEarnedElement) {
        todayEarnedElement.textContent = formatCurrency(todayEarned);
    }
    
    // 计算剩余工作时间和进度
    let remainingWorkSeconds = 0;
    let workProgress = 0;
    const totalWorkSeconds = Math.floor((workEndDate - workStartDate) / 1000);
    
    if (now < workStartDate) {
        // 还没开始工作
        remainingWorkSeconds = totalWorkSeconds;
        workProgress = 0;
    } else if (now < workEndDate) {
        // 工作中
        remainingWorkSeconds = Math.floor((workEndDate - now) / 1000);
        workProgress = (elapsedWorkSeconds / totalWorkSeconds) * 100;
    } else {
        // 已下班
        remainingWorkSeconds = 0;
        workProgress = 100;
    }
    
    // 更新倒计时文本
    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        if (remainingWorkSeconds > 0) {
            const hours = Math.floor(remainingWorkSeconds / 3600);
            const minutes = Math.floor((remainingWorkSeconds % 3600) / 60);
            const seconds = remainingWorkSeconds % 60;
            countdownElement.textContent = `${hours}小时${minutes}分钟${seconds}秒`;
        } else {
            countdownElement.textContent = "已下班";
        }
    }
    
    // 更新进度条
    const progressElement = document.getElementById("countdownProgress");
    if (progressElement) {
        if (now < workStartDate) {
            progressElement.style.width = "0%";
        } else if (now > workEndDate) {
            progressElement.style.width = "100%";
        } else {
            progressElement.style.width = `${workProgress}%`;
        }
    }
    
    // 更新摸鱼和加班计时器
    updateFishingTimer();
    updateOverworkTimer();
}

// 更新今日收入
function updateTodayEarnings() {
    const now = new Date();
    const startTimeParts = startTime.split(":");
    const endTimeParts = endTime.split(":");
    
    const workStartDate = new Date(now);
    workStartDate.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]), 0);
    
    const workEndDate = new Date(now);
    workEndDate.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]), 0);
    
    // 判断当前是否已经开始工作
    if (now < workStartDate) {
        // 还没开始工作
        const todayEarnedElement = document.getElementById("todayEarned");
        if (todayEarnedElement) {
            todayEarnedElement.textContent = formatCurrency(0);
        }
        return;
    }
    
    // 计算已经过去的工作时间（秒）
    let elapsedWorkSeconds;
    if (now < workEndDate) {
        // 还在工作中
        elapsedWorkSeconds = Math.floor((now - workStartDate) / 1000);
    } else {
        // 已经下班
        elapsedWorkSeconds = Math.floor((workEndDate - workStartDate) / 1000);
    }
    
    // 计算今天的收入
    const todayEarned = elapsedWorkSeconds * secondRate;
    const todayEarnedElement = document.getElementById("todayEarned");
    if (todayEarnedElement) {
        todayEarnedElement.textContent = formatCurrency(todayEarned);
    }
}

// 更新本月收入
function updateMonthlyEarnings() {
    const now = new Date();
    const currentDay = now.getDate();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    
    // 计算本月已经过去的天数（考虑工作日）
    let workedDays = 0;
    for (let i = 1; i <= currentDay; i++) {
        const date = new Date(now.getFullYear(), now.getMonth(), i);
        const dayOfWeek = date.getDay();
        // 如果是工作日（周一至周五）
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            workedDays++;
        }
    }
    
    // 限制已工作天数不超过设定的工作日
    workedDays = Math.min(workedDays, workDays);
    
    // 计算本月已经工作的收入
    const monthlyEarned = dayRate * workedDays;
    
    const monthlyEarnedElement = document.getElementById("monthlyEarned");
    if (monthlyEarnedElement) {
        monthlyEarnedElement.textContent = formatCurrency(monthlyEarned);
    }
}

// 更新年度收入
function updateYearlyEarnings() {
    const now = new Date();
    const currentMonth = now.getMonth();
    
    // 计算已经过去的月份的收入
    const yearlyEarned = monthlyPay * (currentMonth + 1);
    
    const yearlyEarnedElement = document.getElementById("yearlyEarned");
    if (yearlyEarnedElement) {
        yearlyEarnedElement.textContent = formatCurrency(yearlyEarned);
    }
}

// 切换摸鱼状态
function toggleFishing() {
    const fishButton = document.getElementById("fishButton");
    const fishTimer = document.getElementById("fishTimer");
    
    if (!fishButton || !fishTimer) {
        return;
    }
    
    if (!isFishing) {
        // 开始摸鱼
        isFishing = true;
        fishStartTime = new Date();
        fishButton.textContent = "停止摸鱼";
        fishButton.classList.add("active");
    } else {
        // 停止摸鱼
        isFishing = false;
        const now = new Date();
        const timeSpent = (now - fishStartTime) / 1000; // 秒
        totalFishTime += timeSpent;
        
        // 计算摸鱼期间"损失"的钱
        const moneyLost = timeSpent * secondRate;
        totalFishMoney += moneyLost;
        
        fishButton.textContent = "开始摸鱼";
        fishButton.classList.remove("active");
        fishTimer.textContent = "00:00:00";
        
        // 更新总计显示
        updateFishTotals();
        
        // 保存数据
        localStorage.setItem("totalFishTime", totalFishTime);
        localStorage.setItem("totalFishMoney", totalFishMoney);
    }
}

// 更新摸鱼计时器
function updateFishingTimer() {
    if (!isFishing || !fishStartTime) {
        return;
    }
    
    const fishTimer = document.getElementById("fishTimer");
    if (!fishTimer) {
        return;
    }
    
    const now = new Date();
    const elapsedSeconds = Math.floor((now - fishStartTime) / 1000);
    
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    
    fishTimer.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    
    // 计算当前摸鱼时段"赚到"的钱
    const moneyLost = elapsedSeconds * secondRate;
    const currentFishMoney = document.getElementById("currentFishMoney");
    if (currentFishMoney) {
        currentFishMoney.textContent = formatCurrency(moneyLost);
    }
}

// 更新摸鱼总计
function updateFishTotals() {
    const totalFishTimeElement = document.getElementById("totalFishTime");
    const totalFishMoneyElement = document.getElementById("totalFishMoney");
    
    if (totalFishTimeElement) {
        totalFishTimeElement.textContent = formatTime(totalFishTime);
    }
    
    if (totalFishMoneyElement) {
        totalFishMoneyElement.textContent = formatCurrency(totalFishMoney);
    }
    
    // 更新成就
    updateFishingAchievement();
}

// 更新摸鱼成就
function updateFishingAchievement() {
    const fishAchievement = document.getElementById("fishAchievement");
    if (!fishAchievement) {
        return;
    }
    
    let currentAchievement = { level: 0, title: "尚未开始", description: "开始摸鱼以获得成就" };
    
    for (let i = fishingAchievements.length - 1; i >= 0; i--) {
        if (totalFishTime >= fishingAchievements[i].time * 60) {
            currentAchievement = fishingAchievements[i];
            break;
        }
    }
    
    fishAchievement.innerHTML = `<div class="achievement-title">${currentAchievement.title}</div>
                              <div class="achievement-description">${currentAchievement.description}</div>`;
}

// 切换加班状态
function toggleOverwork() {
    const overworkButton = document.getElementById("overworkButton");
    const overworkTimer = document.getElementById("overworkTimer");
    
    if (!overworkButton || !overworkTimer) {
        return;
    }
    
    if (!isOverworking) {
        // 开始加班
        isOverworking = true;
        overworkStartTime = new Date();
        overworkButton.textContent = "停止加班";
        overworkButton.classList.add("active");
    } else {
        // 停止加班
        isOverworking = false;
        const now = new Date();
        const timeSpent = (now - overworkStartTime) / 1000; // 秒
        totalOverworkTime += timeSpent;
        
        // 计算加班期间赚的钱
        const moneyEarned = timeSpent * secondRate;
        totalOverworkMoney += moneyEarned;
        
        overworkButton.textContent = "开始加班";
        overworkButton.classList.remove("active");
        overworkTimer.textContent = "00:00:00";
        
        // 更新总计显示
        updateOverworkTotals();
        
        // 保存数据
        localStorage.setItem("totalOverworkTime", totalOverworkTime);
        localStorage.setItem("totalOverworkMoney", totalOverworkMoney);
        
        // 添加调试信息
        console.log("停止加班，本次加班时间：", timeSpent, "秒");
        console.log("总计加班时间：", totalOverworkTime, "秒");
    }
}

// 更新加班计时器
function updateOverworkTimer() {
    if (!isOverworking || !overworkStartTime) {
        return;
    }
    
    const overworkTimer = document.getElementById("overworkTimer");
    if (!overworkTimer) {
        return;
    }
    
    const now = new Date();
    const elapsedSeconds = Math.floor((now - overworkStartTime) / 1000);
    
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    
    overworkTimer.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    
    // 计算当前加班时段赚的钱
    const moneyEarned = elapsedSeconds * secondRate;
    const currentOverworkMoney = document.getElementById("currentOverworkMoney");
    if (currentOverworkMoney) {
        currentOverworkMoney.textContent = formatCurrency(moneyEarned);
    }
}

// 更新加班总计
function updateOverworkTotals() {
    const totalOverworkTimeElement = document.getElementById("totalOverworkTime");
    const totalOverworkMoneyElement = document.getElementById("totalOverworkMoney");
    
    if (totalOverworkTimeElement) {
        totalOverworkTimeElement.textContent = formatTime(totalOverworkTime);
    }
    
    if (totalOverworkMoneyElement) {
        totalOverworkMoneyElement.textContent = formatCurrency(totalOverworkMoney);
    }
    
    // 更新成就
    updateOverworkAchievement();
}

// 更新加班成就
function updateOverworkAchievement() {
    const overworkAchievement = document.getElementById("overworkAchievement");
    if (!overworkAchievement) {
        return;
    }
    
    let currentAchievement = { level: 0, title: "尚未开始", description: "开始加班以获得成就" };
    
    // 检查是否有加班时间记录
    if (totalOverworkTime > 0) {
        // 寻找当前达到的最高成就
        for (let i = overworkAchievements.length - 1; i >= 0; i--) {
            if (totalOverworkTime >= overworkAchievements[i].time * 60) {
                currentAchievement = overworkAchievements[i];
                break;
            }
        }
    }
    
    overworkAchievement.innerHTML = `<div class="achievement-title">${currentAchievement.title}</div>
                                  <div class="achievement-description">${currentAchievement.description}</div>`;
    
    // 添加调试信息
    console.log("更新加班成就，当前加班时间：", totalOverworkTime, "秒");
    console.log("当前成就：", currentAchievement);
}
// 初始化物品选择
function initItemSelection() {
    const categoryBtns = document.querySelectorAll(".category-btn");
    const itemGrid = document.querySelector(".item-grid");
    const customNameInput = document.getElementById("customName");
    const customPriceInput = document.getElementById("customPrice");
    const addCustomItemBtn = document.getElementById("addCustomItem");
    
    if (categoryBtns && categoryBtns.length > 0) {
        // 默认选中第一个分类
        categoryBtns[0].classList.add("active");
        displayItems("daily");
        
        // 添加分类点击事件
        categoryBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                categoryBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                const category = this.getAttribute("data-category");
                displayItems(category);
            });
        });
    }
    
    if (customNameInput && customPriceInput && addCustomItemBtn) {
        addCustomItemBtn.addEventListener("click", function() {
            const name = customNameInput.value.trim();
            const price = parseFloat(customPriceInput.value);
            
            if (name && !isNaN(price) && price > 0) {
                calculateWorkTime(name, price);
                customNameInput.value = "";
                customPriceInput.value = "";
            } else {
                alert("请输入有效的物品名称和价格");
            }
        });
    }
    
    // 加载已保存的心愿单
    loadWishlist();
}

// 显示特定分类的物品
function displayItems(category) {
    const itemGrid = document.querySelector(".item-grid");
    if (!itemGrid) return;
    
    // 清空现有物品
    itemGrid.innerHTML = "";
    
    // 添加新物品
    if (itemData[category]) {
        itemData[category].forEach(item => {
            const itemCard = document.createElement("div");
            itemCard.className = "item-card";
            itemCard.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="item-price">￥${item.price.toFixed(2)}</div>
            `;
            
            itemCard.addEventListener("click", function() {
                calculateWorkTime(item.name, item.price);
            });
            
            itemGrid.appendChild(itemCard);
        });
    }
}

// 计算工作时间
function calculateWorkTime(itemName, price) {
    if (hourRate <= 0) {
        alert("请先设置有效的月薪和工作时间");
        return;
    }
    
    // 计算需要工作的时间（秒）
    const workSeconds = price / secondRate;
    
    // 转换为小时、分钟
    const workHours = Math.floor(workSeconds / 3600);
    const workMinutes = Math.floor((workSeconds % 3600) / 60);
    
    // 更新显示结果
    const wishlistResult = document.querySelector(".wishlist-result");
    if (wishlistResult) {
        wishlistResult.innerHTML = `
            <div class="item-info">
                <span>${itemName}</span>
                <span>￥${price.toFixed(2)}</span>
            </div>
            <span class="work-time">需要工作：${workHours}小时${workMinutes}分钟</span>
            <span class="fun-text">买它！你值得拥有这个小确幸~</span>
            <button class="start-saving-btn">开始为它攒钱</button>
            <button class="stop-saving-btn" style="display:none;">停止攒钱</button>
            <div class="saving-progress-container" style="display:none;">
                <p class="saving-status-text">
                    <span class="time-left">剩余时间: <span id="saving-time-left">0小时0分钟</span></span>
                    <span class="completed-text">已完成: <span id="saving-completed">0</span>%</span>
                </p>
                <div class="saving-progress-bar">
                    <div class="saving-progress"></div>
                </div>
                </div>
            <div class="complete-badge">已完成!</div>
            <div class="confetti-container"></div>
            <button class="add-to-wishlist-btn">加入我的心愿单</button>
        `;
        
        // 初始化攒钱功能
        initSavingFunction();
        
        // 添加加入心愿单按钮事件
        const addToWishlistBtn = wishlistResult.querySelector(".add-to-wishlist-btn");
        if (addToWishlistBtn) {
            addToWishlistBtn.addEventListener("click", function() {
                addToWishlist(itemName, price, workHours, workMinutes);
            });
        }
    }
}

// 添加到心愿单
function addToWishlist(name, price, hours, minutes) {
    // 检查是否已存在
    const existingItem = wishlistItems.find(item => item.name === name && item.price === price);
    if (existingItem) {
        alert("该物品已在心愿单中");
        return;
    }
    
    // 添加新项目
    const newItem = {
        id: Date.now(),
        name: name,
        price: price,
        hours: hours,
        minutes: minutes,
        isSaving: false,
        savedAmount: 0,
        startTime: null
    };
    
    wishlistItems.push(newItem);
    
    // 保存并刷新显示
    saveWishlist();
    renderWishlistItems();
}

// 保存心愿单到localStorage
function saveWishlist() {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
}

// 从localStorage加载心愿单
function loadWishlist() {
    const savedItems = localStorage.getItem("wishlistItems");
    if (savedItems) {
        try {
            wishlistItems = JSON.parse(savedItems);
            renderWishlistItems();
        } catch (e) {
            console.error("Error loading wishlist", e);
        }
    }
}

// 渲染心愿单项目
function renderWishlistItems() {
    const wishlistContainer = document.querySelector(".my-wishlist-items");
    if (!wishlistContainer) return;
    
    if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML = `<div class="empty-wishlist">你的心愿单还是空的，快去添加一些想要的物品吧！</div>`;
        return;
    }
    
    // 清空现有内容
    wishlistContainer.innerHTML = "";
    
    // 添加每个心愿单项目
    wishlistItems.forEach(item => {
        // 计算进度百分比
        let progressPercent = 0;
        if (item.price > 0) {
            progressPercent = Math.min(100, Math.floor((item.savedAmount / item.price) * 100));
        }
        
        // 格式化已存金额
        const savedAmountFormatted = formatCurrency(item.savedAmount);
        const priceFormatted = formatCurrency(item.price);
        
        // 创建心愿单项目元素
        const itemElement = document.createElement("div");
        itemElement.className = "wishlist-item";
        if (item.isSaving) {
            itemElement.classList.add("active-saving");
        }
        
        itemElement.innerHTML = `
            <div class="wishlist-item-header">
                <span class="wishlist-item-name">${item.name}</span>
                <span class="wishlist-item-price">${priceFormatted}</span>
            </div>
            <div class="wishlist-item-time">需要工作: ${item.hours}小时${item.minutes}分钟</div>
            <div class="wishlist-progress">
                <div class="wishlist-progress-bar" style="width: ${progressPercent}%"></div>
            </div>
            <div class="saving-status">
                <span class="saved-amount">已存: ${savedAmountFormatted}</span>
                <span class="remain-time" data-id="${item.id}"></span>
            </div>
            <div class="wishlist-item-actions">
                <button class="save-button" data-id="${item.id}">${item.isSaving ? '正在攒钱中...' : '开始攒钱'}</button>
                <button class="stop-button" data-id="${item.id}" style="display: ${item.isSaving ? 'block' : 'none'}">停止</button>
                <button class="delete-button" data-id="${item.id}">×</button>
            </div>
        `;
        
        wishlistContainer.appendChild(itemElement);
        
        // 更新剩余时间显示
        if (item.isSaving) {
            updateItemRemainingTime(item);
        }
    });
    
    // 添加事件监听器
    attachWishlistEventListeners();
}

// 为心愿单添加事件监听器
function attachWishlistEventListeners() {
    // 开始攒钱按钮
    document.querySelectorAll(".save-button").forEach(button => {
        button.addEventListener("click", function() {
            const itemId = parseInt(this.getAttribute("data-id"));
            startSavingForItem(itemId);
        });
    });
    
    // 停止攒钱按钮
    document.querySelectorAll(".stop-button").forEach(button => {
        button.addEventListener("click", function() {
            const itemId = parseInt(this.getAttribute("data-id"));
            stopSavingForItem(itemId);
        });
    });
    
    // 删除按钮
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", function() {
            const itemId = parseInt(this.getAttribute("data-id"));
            deleteWishlistItem(itemId);
        });
    });
}

// 开始为物品攒钱
function startSavingForItem(itemId) {
    const item = wishlistItems.find(i => i.id === itemId);
    if (!item) return;
    
    // 停止其他可能正在进行的攒钱
    wishlistItems.forEach(i => {
        if (i.id !== itemId && i.isSaving) {
            stopSavingForItem(i.id);
        }
    });
    
    // 开始为当前物品攒钱
    item.isSaving = true;
    item.startTime = new Date().getTime();
    
    // 保存并刷新
    saveWishlist();
    renderWishlistItems();
    
    // 开始定时更新
    startSavingUpdates();
}

// 停止为物品攒钱
function stopSavingForItem(itemId) {
    const item = wishlistItems.find(i => i.id === itemId);
    if (!item || !item.isSaving) return;
    
    item.isSaving = false;
    item.startTime = null;
    
    // 保存并刷新
    saveWishlist();
    renderWishlistItems();
}

// 删除心愿单项目
function deleteWishlistItem(itemId) {
    const confirmDelete = confirm("确定要删除这个心愿吗？");
    if (!confirmDelete) return;
    
    // 找到并删除
    const index = wishlistItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        wishlistItems.splice(index, 1);
        
        // 保存并刷新
        saveWishlist();
        renderWishlistItems();
    }
}

// 开始定时更新攒钱进度
function startSavingUpdates() {
    // 每秒更新一次
    if (!window.savingUpdateInterval) {
        window.savingUpdateInterval = setInterval(updateAllSavingItems, 1000);
    }
}

// 更新所有正在攒钱的物品
function updateAllSavingItems() {
    let activeSaving = false;
    
    wishlistItems.forEach(item => {
        if (item.isSaving) {
            activeSaving = true;
            updateItemSavingProgress(item);
        }
    });
    
    // 如果没有正在攒钱的物品，停止定时更新
    if (!activeSaving && window.savingUpdateInterval) {
        clearInterval(window.savingUpdateInterval);
        window.savingUpdateInterval = null;
    }
}

// 更新物品攒钱进度
function updateItemSavingProgress(item) {
    if (!item.isSaving || !item.startTime) return;
    
    const now = new Date().getTime();
    const elapsedMs = now - item.startTime;
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    
    // 计算已攒金额
    const earnedAmount = elapsedSeconds * secondRate;
    item.savedAmount = Math.min(item.price, earnedAmount);
    
    // 计算进度
    const progressPercent = Math.min(100, Math.floor((item.savedAmount / item.price) * 100));
    
    // 更新进度条
    const progressBar = document.querySelector(`.wishlist-item[data-id="${item.id}"] .wishlist-progress-bar`);
    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
    
    // 更新已存金额
    const savedAmountElement = document.querySelector(`.wishlist-item[data-id="${item.id}"] .saved-amount`);
    if (savedAmountElement) {
        savedAmountElement.textContent = `已存: ${formatCurrency(item.savedAmount)}`;
    }
    
    // 更新剩余时间
    updateItemRemainingTime(item);
    
    // 如果已经攒够，停止攒钱
    if (item.savedAmount >= item.price) {
        item.savedAmount = item.price;
        item.isSaving = false;
        item.startTime = null;
        
        // 显示完成提示
        showItemCompletionNotification(item);
    }
    
    // 保存更新
    saveWishlist();
}

// 更新物品剩余时间
function updateItemRemainingTime(item) {
    if (!item.isSaving) return;
    
    const remainingAmount = Math.max(0, item.price - item.savedAmount);
    const remainingSeconds = Math.ceil(remainingAmount / secondRate);
    
    // 计算时分秒
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    
    // 更新显示
    const remainTimeElement = document.querySelector(`.remain-time[data-id="${item.id}"]`);
    if (remainTimeElement) {
        if (remainingSeconds > 0) {
            remainTimeElement.textContent = `剩余: ${hours}小时${minutes}分钟${seconds}秒`;
        } else {
            remainTimeElement.textContent = "已完成!";
        }
    }
}

// 显示物品完成提示
function showItemCompletionNotification(item) {
    alert(`恭喜！你已经成功攒够钱购买 ${item.name} 了！`);
    
    // 刷新显示
    renderWishlistItems();
}

// 格式化货币
function formatCurrency(amount) {
    return `￥${amount.toFixed(2)}`;
}

// 格式化时间
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${hours}小时${minutes}分钟${remainingSeconds}秒`;
}

// 为单个物品添加攒钱功能
function initSavingFunction() {
    const startSavingBtn = document.querySelector('.start-saving-btn');
    const stopSavingBtn = document.querySelector('.stop-saving-btn');
    const savingProgressContainer = document.querySelector('.saving-progress-container');
    const savingProgress = document.querySelector('.saving-progress');
    const savingTimeLeft = document.getElementById('saving-time-left');
    const savingCompleted = document.getElementById('saving-completed');
    const completeBadge = document.querySelector('.complete-badge');
    
    if (!startSavingBtn) return;
    
    startSavingBtn.addEventListener('click', function() {
        // 获取当前选中的物品和工作时间
        const itemName = document.querySelector('.item-info span:first-child').textContent;
        const workTimeText = document.querySelector('.work-time').textContent;
        
        // 解析工作时间
        const hoursMatch = workTimeText.match(/(\d+)小时/);
        const minutesMatch = workTimeText.match(/(\d+)分钟/);
        
        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
        
        savingTotalSeconds = hours * 3600 + minutes * 60;
        
        if (savingTotalSeconds <= 0) {
            alert('工作时间无效，无法开始攒钱');
            return;
        }
        
        currentSavingItem = {
            name: itemName,
            totalSeconds: savingTotalSeconds
        };
        
        // 显示进度条和停止按钮
        savingProgressContainer.style.display = 'block';
        stopSavingBtn.style.display = 'block';
        startSavingBtn.style.display = 'none';
        completeBadge.classList.remove('show');
        
        // 记录开始时间
        savingStartTime = new Date().getTime();
        
        // 启动定时器更新进度
        if (savingInterval) clearInterval(savingInterval);
        
        savingInterval = setInterval(function() {
            updateSavingProgress();
        }, 1000);
    });
    
    stopSavingBtn.addEventListener('click', function() {
        if (savingInterval) {
            clearInterval(savingInterval);
            savingInterval = null;
        }
        
        // 重置界面
        savingProgressContainer.style.display = 'none';
        stopSavingBtn.style.display = 'none';
        startSavingBtn.style.display = 'block';
        savingProgress.style.width = '0%';
        completeBadge.classList.remove('show');
        
        currentSavingItem = null;
    });
}

function updateSavingProgress() {
    if (!currentSavingItem || !savingStartTime) return;
    
    const savingProgress = document.querySelector('.saving-progress');
    const savingTimeLeft = document.getElementById('saving-time-left');
    const savingCompleted = document.getElementById('saving-completed');
    const completeBadge = document.querySelector('.complete-badge');
    const confettiContainer = document.querySelector('.confetti-container');
    const savingProgressContainer = document.querySelector('.saving-progress-container');
    const stopSavingBtn = document.querySelector('.stop-saving-btn');
    const startSavingBtn = document.querySelector('.start-saving-btn');
    
    // 计算已经过去的时间
    const currentTime = new Date().getTime();
    const elapsedMs = currentTime - savingStartTime;
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    
    // 计算进度百分比
    let progressPercent = Math.min(100, Math.floor((elapsedSeconds / currentSavingItem.totalSeconds) * 100));
    
    // 更新进度条
    savingProgress.style.width = progressPercent + '%';
    savingCompleted.textContent = progressPercent;
    
    // 计算剩余时间
    const remainingSeconds = Math.max(0, currentSavingItem.totalSeconds - elapsedSeconds);
    const remainingHours = Math.floor(remainingSeconds / 3600);
    const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);
    const remainingSecondsDisplay = remainingSeconds % 60;
    
    if (remainingSeconds > 0) {
        savingTimeLeft.textContent = `${remainingHours}小时${remainingMinutes}分钟${remainingSecondsDisplay}秒`;
    } else {
        savingTimeLeft.textContent = '已完成!';
        clearInterval(savingInterval);
        completeBadge.classList.add('show');
        
        // 创建庆祝效果
        createConfetti();
    }
}

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    confettiContainer.style.display = 'block';
    confettiContainer.innerHTML = '';
    
    // 创建50个彩色碎片
    const colors = ['#fbb8d4', '#a8d0f0', '#7868e6', '#79c2f7', '#fca5c7'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        confettiContainer.appendChild(confetti);
    }
    
    // 5秒后移除彩色碎片
    setTimeout(() => {
        confettiContainer.style.display = 'none';
    }, 5000);
}
            
            