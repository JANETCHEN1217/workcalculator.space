// Global variables
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

// Achievement levels
const fishingAchievements = [
    { level: 1, title: "Beginner Breaker", description: "You've started enjoying break time", time: 1 },
    { level: 2, title: "Skilled Breaker", description: "Taking breaks has become part of your work", time: 60 },
    { level: 3, title: "Senior Breaker", description: "You've mastered the essence of break time", time: 300 },
    { level: 4, title: "Break Expert", description: "You take breaks while others work", time: 600 },
    { level: 5, title: "Break Master", description: "A legendary figure in the break world", time: 1800 },
    { level: 6, title: "Break God", description: "You are the definition of break time", time: 3600 }
];

const overworkAchievements = [
    { level: 1, title: "Overtime Novice", description: "You've just entered the world of overtime", time: 1 },
    { level: 2, title: "Overtime Regular", description: "Overtime is becoming part of your life", time: 60 },
    { level: 3, title: "Overtime Expert", description: "Your life has become inseparable from overtime", time: 300 },
    { level: 4, title: "Overtime Pro", description: "You've forgotten what getting off work feels like", time: 600 },
    { level: 5, title: "Overtime Master", description: "The last light in the office", time: 1800 },
    { level: 6, title: "Overtime King", description: "You've moved your bed to the office", time: 3600 }
];

// Item data
const itemData = {
    daily: [
        { name: "Bubble Tea", price: 32 },
        { name: "Cheese Roasted Milk Tea", price: 38 },
        { name: "Caramel Macchiato", price: 36 },
        { name: "Hot Pot for Four", price: 500 },
        { name: "Two Movie Tickets", price: 100 },
        { name: "Trending Bakery Treats", price: 200 },
        { name: "Pizza Hut Meal for Two", price: 189 },
        { name: "Box of Chocolates", price: 88 }
    ],
    luxury: [
        { name: "LV Neverfull Bag", price: 12000 },
        { name: "iPhone 15 Pro Max", price: 9999 },
        { name: "Dyson Hair Dryer", price: 3990 },
        { name: "CDG Play T-shirt", price: 2390 },
        { name: "Balenciaga Sneakers", price: 7990 },
        { name: "Apple Watch Ultra", price: 6299 },
        { name: "Nintendo Switch OLED", price: 2499 },
        { name: "Sony WH-1000XM5", price: 2999 }
    ],
    travel: [
        { name: "3-Day Japan Kansai Tour", price: 5000 },
        { name: "1 Week Maldives Vacation", price: 15000 },
        { name: "10-Day Europe Tour", price: 30000 },
        { name: "Disney Family Trip", price: 8000 },
        { name: "3-Day Wulingyuan National Park Tour", price: 3000 },
        { name: "Hokkaido Snow Season Tour", price: 7000 },
        { name: "Dali & Lijiang Adventure", price: 4000 },
        { name: "Lhasa & Everest Base Camp Tour", price: 6500 }
    ]
};

// Initialize when the page loads
document.addEventListener("DOMContentLoaded", function() {
    initElements();
    loadSavedData();
    startTimeUpdates();
    initSavingFunction();
});

// Initialize page elements
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

// Load saved data from localStorage
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

// Start periodic updates
function startTimeUpdates() {
    // Update every second
    setInterval(updateWorkTime, 1000);
}

// Calculate income rates
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
    
    // Calculate daily wage
    dayRate = monthlyPay / workDays;
    
    // Calculate hourly wage
    hourRate = dayRate / workHours;
    
    // Calculate minute wage
    minuteRate = hourRate / 60;
    
    // Calculate second wage
    secondRate = minuteRate / 60;
    
    // Update display
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
    
    // Save data to localStorage
    localStorage.setItem("monthlySalary", monthlyPay);
    localStorage.setItem("workDays", workDays);
    localStorage.setItem("workHours", workHours);
    localStorage.setItem("workStartTime", startTime);
    localStorage.setItem("workEndTime", endTime);
    
    // Update calculations
    updateWorkTime();
    updateTodayEarnings();
    updateMonthlyEarnings();
    updateYearlyEarnings();
}

// Update work time
function updateWorkTime() {
    const now = new Date();
    const startTimeParts = startTime.split(":");
    const endTimeParts = endTime.split(":");
    
    const workStartDate = new Date(now);
    workStartDate.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]), 0);
    
    const workEndDate = new Date(now);
    workEndDate.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]), 0);
    
    // Determine if current time is within working hours
    const isWorkingHours = now >= workStartDate && now <= workEndDate;
    
    // Calculate elapsed work time (seconds)
    let elapsedWorkSeconds = 0;
    if (now > workStartDate) {
        if (now < workEndDate) {
            // Still working
            elapsedWorkSeconds = Math.floor((now - workStartDate) / 1000);
        } else {
            // Work day ended
            elapsedWorkSeconds = Math.floor((workEndDate - workStartDate) / 1000);
        }
    }
    
    // Calculate today's earnings
    const todayEarned = elapsedWorkSeconds * secondRate;
    const todayEarnedElement = document.getElementById("todayEarned");
    if (todayEarnedElement) {
        todayEarnedElement.textContent = formatCurrency(todayEarned);
    }
    
    // Calculate remaining work time and progress
    let remainingWorkSeconds = 0;
    let workProgress = 0;
    const totalWorkSeconds = Math.floor((workEndDate - workStartDate) / 1000);
    
    if (now < workStartDate) {
        // Haven't started working yet
        remainingWorkSeconds = totalWorkSeconds;
        workProgress = 0;
    } else if (now < workEndDate) {
        // Currently working
        remainingWorkSeconds = Math.floor((workEndDate - now) / 1000);
        workProgress = (elapsedWorkSeconds / totalWorkSeconds) * 100;
    } else {
        // Work day ended
        remainingWorkSeconds = 0;
        workProgress = 100;
    }
    
    // Update countdown text
    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        if (remainingWorkSeconds > 0) {
            const hours = Math.floor(remainingWorkSeconds / 3600);
            const minutes = Math.floor((remainingWorkSeconds % 3600) / 60);
            const seconds = remainingWorkSeconds % 60;
            countdownElement.textContent = `${hours} hours ${minutes} minutes ${seconds} seconds`;
        } else {
            countdownElement.textContent = "Day complete";
        }
    }
    
    // Update progress bar
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
    
    // Update break and overtime timers
    updateFishingTimer();
    updateOverworkTimer();
}

// Update today's earnings
function updateTodayEarnings() {
    const now = new Date();
    const startTimeParts = startTime.split(":");
    const endTimeParts = endTime.split(":");
    
    const workStartDate = new Date(now);
    workStartDate.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]), 0);
    
    const workEndDate = new Date(now);
    workEndDate.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]), 0);
    
    // Determine if work has started yet
    if (now < workStartDate) {
        // Haven't started working yet
        const todayEarnedElement = document.getElementById("todayEarned");
        if (todayEarnedElement) {
            todayEarnedElement.textContent = formatCurrency(0);
        }
        return;
    }
    
    // Calculate elapsed work time (seconds)
    let elapsedWorkSeconds;
    if (now < workEndDate) {
        // Still working
        elapsedWorkSeconds = Math.floor((now - workStartDate) / 1000);
    } else {
        // Work day ended
        elapsedWorkSeconds = Math.floor((workEndDate - workStartDate) / 1000);
    }
    
    // Calculate today's earnings
    const todayEarned = elapsedWorkSeconds * secondRate;
    const todayEarnedElement = document.getElementById("todayEarned");
    if (todayEarnedElement) {
        todayEarnedElement.textContent = formatCurrency(todayEarned);
    }
}

// Update monthly earnings
function updateMonthlyEarnings() {
    const now = new Date();
    const currentDay = now.getDate();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    
    // Calculate days worked this month (considering weekdays)
    let workedDays = 0;
    for (let i = 1; i <= currentDay; i++) {
        const date = new Date(now.getFullYear(), now.getMonth(), i);
        const dayOfWeek = date.getDay();
        // If it's a weekday (Monday-Friday)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            workedDays++;
        }
    }
    
    // Limit worked days to not exceed set work days
    workedDays = Math.min(workedDays, workDays);
    
    // Calculate earnings for days worked this month
    const monthlyEarned = dayRate * workedDays;
    
    const monthlyEarnedElement = document.getElementById("monthlyEarned");
    if (monthlyEarnedElement) {
        monthlyEarnedElement.textContent = formatCurrency(monthlyEarned);
    }
}

// Update yearly earnings
function updateYearlyEarnings() {
    const now = new Date();
    const currentMonth = now.getMonth();
    
    // Calculate earnings for months passed
    const yearlyEarned = monthlyPay * (currentMonth + 1);
    
    const yearlyEarnedElement = document.getElementById("yearlyEarned");
    if (yearlyEarnedElement) {
        yearlyEarnedElement.textContent = formatCurrency(yearlyEarned);
    }
}

// Update fishing timer
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
    
    // Calculate money "earned" during current break session
    const moneyLost = elapsedSeconds * secondRate;
    const currentFishMoney = document.getElementById("currentFishMoney");
    if (currentFishMoney) {
        currentFishMoney.textContent = formatCurrency(moneyLost);
    }
}

// Update overwork timer
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
    
    // Calculate money earned during current overtime session
    const moneyEarned = elapsedSeconds * secondRate;
    const currentOverworkMoney = document.getElementById("currentOverworkMoney");
    if (currentOverworkMoney) {
        currentOverworkMoney.textContent = formatCurrency(moneyEarned);
    }
}

// Update fishing achievement
function updateFishingAchievement() {
    const fishAchievement = document.getElementById("fishAchievement");
    if (!fishAchievement) {
        return;
    }
    
    let currentAchievement = { level: 0, title: "Not Started", description: "Start a break to earn achievements" };
    
    for (let i = fishingAchievements.length - 1; i >= 0; i--) {
        if (totalFishTime >= fishingAchievements[i].time * 60) {
            currentAchievement = fishingAchievements[i];
            break;
        }
    }
    
    fishAchievement.innerHTML = `<div class="achievement-title">${currentAchievement.title}</div>
                              <div class="achievement-description">${currentAchievement.description}</div>`;
}

// Update overwork achievement
function updateOverworkAchievement() {
    const overworkAchievement = document.getElementById("overworkAchievement");
    if (!overworkAchievement) {
        return;
    }
    
    let currentAchievement = { level: 0, title: "Not Started", description: "Start overtime to earn achievements" };
    
    // Check if there is overtime recorded
    if (totalOverworkTime > 0) {
        // Find highest achievement reached
        for (let i = overworkAchievements.length - 1; i >= 0; i--) {
            if (totalOverworkTime >= overworkAchievements[i].time * 60) {
                currentAchievement = overworkAchievements[i];
                break;
            }
        }
    }
    
    overworkAchievement.innerHTML = `<div class="achievement-title">${currentAchievement.title}</div>
                                  <div class="achievement-description">${currentAchievement.description}</div>`;
    
    // Add debug info
    console.log("Updated overtime achievement, current overtime:", totalOverworkTime, "seconds");
    console.log("Current achievement:", currentAchievement);
}

// Initialize item selection
function initItemSelection() {
    const categoryBtns = document.querySelectorAll(".category-btn");
    const itemGrid = document.querySelector(".item-grid");
    const customNameInput = document.getElementById("customName");
    const customPriceInput = document.getElementById("customPrice");
    const addCustomItemBtn = document.getElementById("addCustomItem");
    
    if (categoryBtns && categoryBtns.length > 0) {
        // Default to first category
        categoryBtns[0].classList.add("active");
        displayItems("daily");
        
        // Add category click events
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
                alert("Please enter a valid item name and price");
            }
        });
    }
    
    // Load saved wishlist
    loadWishlist();
}

// Display items for specific category
function displayItems(category) {
    const itemGrid = document.querySelector(".item-grid");
    if (!itemGrid) return;
    
    // Clear existing items
    itemGrid.innerHTML = "";
    
    // Add new items
    if (itemData[category]) {
        itemData[category].forEach(item => {
            const itemCard = document.createElement("div");
            itemCard.className = "item-card";
            itemCard.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            `;
            
            itemCard.addEventListener("click", function() {
                calculateWorkTime(item.name, item.price);
            });
            
            itemGrid.appendChild(itemCard);
        });
    }
}

// Calculate work time
function calculateWorkTime(itemName, price) {
    if (hourRate <= 0) {
        alert("Please set a valid monthly salary and work time first");
        return;
    }
    
    // Calculate work time needed (seconds)
    const workSeconds = price / secondRate;
    
    // Convert to hours, minutes
    const workHours = Math.floor(workSeconds / 3600);
    const workMinutes = Math.floor((workSeconds % 3600) / 60);
    
    // Update display
    const wishlistResult = document.querySelector(".wishlist-result");
    if (wishlistResult) {
        wishlistResult.innerHTML = `
            <div class="item-info">
                <span>${itemName}</span>
                <span>$${price.toFixed(2)}</span>
            </div>
            <span class="work-time">Work required: ${workHours} hours ${workMinutes} minutes</span>
            <span class="fun-text">Buy it! You deserve this little happiness~</span>
            <button class="start-saving-btn">Start Saving For It</button>
            <button class="stop-saving-btn" style="display:none;">Stop Saving</button>
            <div class="saving-progress-container" style="display:none;">
                <p class="saving-status-text">
                    <span class="time-left">Time left: <span id="saving-time-left">0 hours 0 minutes</span></span>
                    <span class="completed-text">Completed: <span id="saving-completed">0</span>%</span>
                </p>
                <div class="saving-progress-bar">
                    <div class="saving-progress"></div>
                </div>
                </div>
            <div class="complete-badge">Completed!</div>
            <div class="confetti-container"></div>
            <button class="add-to-wishlist-btn">Add to My Wishlist</button>
        `;
        
        // Initialize saving function
        initSavingFunction();
        
        // Add add-to-wishlist button event
        const addToWishlistBtn = wishlistResult.querySelector(".add-to-wishlist-btn");
        if (addToWishlistBtn) {
            addToWishlistBtn.addEventListener("click", function() {
                addToWishlist(itemName, price, workHours, workMinutes);
            });
        }
    }
}

// Add to wishlist
function addToWishlist(name, price, hours, minutes) {
    // Check if already exists
    const existingItem = wishlistItems.find(item => item.name === name && item.price === price);
    if (existingItem) {
        alert("This item is already in your wishlist");
        return;
    }
    
    // Add new item
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
    
    // Save and refresh display
    saveWishlist();
    renderWishlistItems();
}

// Save wishlist to localStorage
function saveWishlist() {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
}

// Load wishlist from localStorage
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

// Render wishlist items
function renderWishlistItems() {
    const wishlistContainer = document.querySelector(".my-wishlist-items");
    if (!wishlistContainer) return;
    
    if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML = `<div class="empty-wishlist">Your wishlist is empty. Add some items you want!</div>`;
        return;
    }
    
    // Clear existing content
    wishlistContainer.innerHTML = "";
    
    // Add each wishlist item
    wishlistItems.forEach(item => {
        // Calculate progress percentage
        let progressPercent = 0;
        if (item.price > 0) {
            progressPercent = Math.min(100, Math.floor((item.savedAmount / item.price) * 100));
        }
        
        // Format amounts
        const savedAmountFormatted = formatCurrency(item.savedAmount);
        const priceFormatted = formatCurrency(item.price);
        
        // Create wishlist item element
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
            <div class="wishlist-item-time">Work required: ${item.hours} hours ${item.minutes} minutes</div>
            <div class="wishlist-progress">
                <div class="wishlist-progress-bar" style="width: ${progressPercent}%"></div>
            </div>
            <div class="saving-status">
                <span class="saved-amount">Saved: ${savedAmountFormatted}</span>
                <span class="remain-time" data-id="${item.id}"></span>
            </div>
            <div class="wishlist-item-actions">
                <button class="save-button" data-id="${item.id}">${item.isSaving ? 'Saving...' : 'Start Saving'}</button>
                <button class="stop-button" data-id="${item.id}" style="display: ${item.isSaving ? 'block' : 'none'}">Stop</button>
                <button class="delete-button" data-id="${item.id}">×</button>
            </div>
        `;
        
        wishlistContainer.appendChild(itemElement);
        
        // Update remaining time display
        if (item.isSaving) {
            updateItemRemainingTime(item);
        }
    });
    
    // Add event listeners
    attachWishlistEventListeners();
}

// Attach wishlist event listeners
function attachWishlistEventListeners() {
    // Start saving buttons
    document.querySelectorAll(".save-button").forEach(button => {
        button.addEventListener("click", function() {
            const itemId = parseInt(this.getAttribute("data-id"));
            startSavingForItem(itemId);
        });
    });
    
    // Stop saving buttons
    document.querySelectorAll(".stop-button").forEach(button => {
        button.addEventListener("click", function() {
            const itemId = parseInt(this.getAttribute("data-id"));
            stopSavingForItem(itemId);
        });
    });
    
    // Delete buttons
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", function() {
            const itemId = parseInt(this.getAttribute("data-id"));
            deleteWishlistItem(itemId);
        });
    });
}

// Start saving for an item
function startSavingForItem(itemId) {
    const item = wishlistItems.find(i => i.id === itemId);
    if (!item) return;
    
    // Stop any other active savings
    wishlistItems.forEach(i => {
        if (i.id !== itemId && i.isSaving) {
            stopSavingForItem(i.id);
        }
    });
    
    // Start saving for current item
    item.isSaving = true;
    item.startTime = new Date().getTime();
    
    // Save and refresh
    saveWishlist();
    renderWishlistItems();
    
    // Start periodic updates
    startSavingUpdates();
}

// Stop saving for an item
function stopSavingForItem(itemId) {
    const item = wishlistItems.find(i => i.id === itemId);
    if (!item || !item.isSaving) return;
    
    item.isSaving = false;
    item.startTime = null;
    
    // Save and refresh
    saveWishlist();
    renderWishlistItems();
}

// Delete wishlist item
function deleteWishlistItem(itemId) {
    const confirmDelete = confirm("Are you sure you want to delete this wishlist item?");
    if (!confirmDelete) return;
    
    // Find and remove
    const index = wishlistItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        wishlistItems.splice(index, 1);
        
        // Save and refresh
        saveWishlist();
        renderWishlistItems();
    }
}

// Start periodic saving updates
function startSavingUpdates() {
    // Update every second
    if (!window.savingUpdateInterval) {
        window.savingUpdateInterval = setInterval(updateAllSavingItems, 1000);
    }
}

// Update all active saving items
function updateAllSavingItems() {
    let activeSaving = false;
    
    wishlistItems.forEach(item => {
        if (item.isSaving) {
            activeSaving = true;
            updateItemSavingProgress(item);
        }
    });
    
    // If no active savings, stop periodic updates
    if (!activeSaving && window.savingUpdateInterval) {
        clearInterval(window.savingUpdateInterval);
        window.savingUpdateInterval = null;
    }
}

// Update item saving progress
function updateItemSavingProgress(item) {
    if (!item.isSaving || !item.startTime) return;
    
    const now = new Date().getTime();
    const elapsedMs = now - item.startTime;
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    
    // Calculate saved amount
    const earnedAmount = elapsedSeconds * secondRate;
    item.savedAmount = Math.min(item.price, earnedAmount);
    
    // Calculate progress
    const progressPercent = Math.min(100, Math.floor((item.savedAmount / item.price) * 100));
    
    // Update progress bar
    const progressBar = document.querySelector(`.wishlist-item[data-id="${item.id}"] .wishlist-progress-bar`);
    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
    
    // Update saved amount
    const savedAmountElement = document.querySelector(`.wishlist-item[data-id="${item.id}"] .saved-amount`);
    if (savedAmountElement) {
        savedAmountElement.textContent = `Saved: ${formatCurrency(item.savedAmount)}`;
    }
    
    // Update remaining time
    updateItemRemainingTime(item);
    
    // If saved enough, stop saving
    if (item.savedAmount >= item.price) {
        item.savedAmount = item.price;
        item.isSaving = false;
        item.startTime = null;
        
        // Show completion notification
        showItemCompletionNotification(item);
    }
    
    // Save updates
    saveWishlist();
}

// Update item remaining time
function updateItemRemainingTime(item) {
    if (!item.isSaving) return;
    
    const remainingAmount = Math.max(0, item.price - item.savedAmount);
    const remainingSeconds = Math.ceil(remainingAmount / secondRate);
    
    // Calculate hours, minutes, seconds
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    
    // Update display
    const remainTimeElement = document.querySelector(`.remain-time[data-id="${item.id}"]`);
    if (remainTimeElement) {
        if (remainingSeconds > 0) {
            remainTimeElement.textContent = `Remaining: ${hours}h ${minutes}m ${seconds}s`;
        } else {
            remainTimeElement.textContent = "Completed!";
        }
    }
}

// Show item completion notification
function showItemCompletionNotification(item) {
    alert(`Congratulations! You've successfully saved enough to buy ${item.name}!`);
    
    // Refresh display
    renderWishlistItems();
}

// Toggle fishing
function toggleFishing() {
    const fishButton = document.getElementById("fishButton");
    const fishTimer = document.getElementById("fishTimer");
    
    if (!fishButton || !fishTimer) {
        return;
    }
    
    if (!isFishing) {
        // Start break
        isFishing = true;
        fishStartTime = new Date();
        fishButton.textContent = "Stop Break";
        fishButton.classList.add("active");
    } else {
        // Stop break
        isFishing = false;
        const now = new Date();
        const timeSpent = (now - fishStartTime) / 1000; // seconds
        totalFishTime += timeSpent;
        
        // Calculate money "earned" during break
        const moneyLost = timeSpent * secondRate;
        totalFishMoney += moneyLost;
        
        fishButton.textContent = "Start Break";
        fishButton.classList.remove("active");
        fishTimer.textContent = "00:00:00";
        
        // Update totals display
        updateFishTotals();
        
        // Save data
        localStorage.setItem("totalFishTime", totalFishTime);
        localStorage.setItem("totalFishMoney", totalFishMoney);
    }
}

// Toggle overwork
function toggleOverwork() {
    const overworkButton = document.getElementById("overworkButton");
    const overworkTimer = document.getElementById("overworkTimer");
    
    if (!overworkButton || !overworkTimer) {
        return;
    }
    
    if (!isOverworking) {
        // Start overtime
        isOverworking = true;
        overworkStartTime = new Date();
        overworkButton.textContent = "Stop Overtime";
        overworkButton.classList.add("active");
    } else {
        // Stop overtime
        isOverworking = false;
        const now = new Date();
        const timeSpent = (now - overworkStartTime) / 1000; // seconds
        totalOverworkTime += timeSpent;
        
        // Calculate money earned during overtime
        const moneyEarned = timeSpent * secondRate;
        totalOverworkMoney += moneyEarned;
        
        overworkButton.textContent = "Start Overtime";
        overworkButton.classList.remove("active");
        overworkTimer.textContent = "00:00:00";
        
        // Update totals display
        updateOverworkTotals();
        
        // Save data
        localStorage.setItem("totalOverworkTime", totalOverworkTime);
        localStorage.setItem("totalOverworkMoney", totalOverworkMoney);
        
        // Add debug info
        console.log("Stopped overtime, session duration:", timeSpent, "seconds");
        console.log("Total overtime:", totalOverworkTime, "seconds");
    }
}

// Initialize saving function for a single item
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
        // Get currently selected item and work time
        const itemName = document.querySelector('.item-info span:first-child').textContent;
        const workTimeText = document.querySelector('.work-time').textContent;
        
        // Parse work time
        const hoursMatch = workTimeText.match(/(\d+) hours/);
        const minutesMatch = workTimeText.match(/(\d+) minutes/);
        
        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
        
        savingTotalSeconds = hours * 3600 + minutes * 60;
        
        if (savingTotalSeconds <= 0) {
            alert('Invalid work time, cannot start saving');
            return;
        }
        
        currentSavingItem = {
            name: itemName,
            totalSeconds: savingTotalSeconds
        };
        
        // Show progress bar and stop button
        savingProgressContainer.style.display = 'block';
        stopSavingBtn.style.display = 'block';
        startSavingBtn.style.display = 'none';
        completeBadge.classList.remove('show');
        
        // Record start time
        savingStartTime = new Date().getTime();
        
        // Start timer to update progress
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
        
        // Reset interface
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
    
    // Calculate elapsed time
    const currentTime = new Date().getTime();
    const elapsedMs = currentTime - savingStartTime;
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    
    // Calculate progress percentage
    let progressPercent = Math.min(100, Math.floor((elapsedSeconds / currentSavingItem.totalSeconds) * 100));
    
    // Update progress bar
    savingProgress.style.width = progressPercent + '%';
    savingCompleted.textContent = progressPercent;
    
    // Calculate remaining time
    const remainingSeconds = Math.max(0, currentSavingItem.totalSeconds - elapsedSeconds);
    const remainingHours = Math.floor(remainingSeconds / 3600);
    const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);
    const remainingSecondsDisplay = remainingSeconds % 60;
    
    if (remainingSeconds > 0) {
        savingTimeLeft.textContent = `${remainingHours} hours ${remainingMinutes} minutes ${remainingSecondsDisplay} seconds`;
    } else {
        savingTimeLeft.textContent = 'Completed!';
        clearInterval(savingInterval);
        completeBadge.classList.add('show');
        
        // Create celebration effects
        createConfetti();
    }
}

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    confettiContainer.style.display = 'block';
    confettiContainer.innerHTML = '';
    
    // Create 50 colored confetti pieces
    const colors = ['#fbb8d4', '#a8d0f0', '#7868e6', '#79c2f7', '#fca5c7'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after 5 seconds
    setTimeout(() => {
        confettiContainer.style.display = 'none';
    }, 5000);
}

// Format currency
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

// Format time
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${hours} hours ${minutes} minutes ${remainingSeconds} seconds`;
}

// Update break totals
function updateFishTotals() {
    const totalFishTimeElement = document.getElementById("totalFishTime");
    const totalFishMoneyElement = document.getElementById("totalFishMoney");
    
    if (totalFishTimeElement) {
        totalFishTimeElement.textContent = formatTime(totalFishTime);
    }
    
    if (totalFishMoneyElement) {
        totalFishMoneyElement.textContent = formatCurrency(totalFishMoney);
    }
    
    // Update achievements
    updateFishingAchievement();
}

// Update overtime totals
function updateOverworkTotals() {
    const totalOverworkTimeElement = document.getElementById("totalOverworkTime");
    const totalOverworkMoneyElement = document.getElementById("totalOverworkMoney");
    
    if (totalOverworkTimeElement) {
        totalOverworkTimeElement.textContent = formatTime(totalOverworkTime);
    }
    
    if (totalOverworkMoneyElement) {
        totalOverworkMoneyElement.textContent = formatCurrency(totalOverworkMoney);
    }
    
    // Update achievements
    updateOverworkAchievement();
} 