// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app based on the current page
    initApp();
});

// Initialize app based on current page
function initApp() {
    // Get the current page from the URL
    const currentPage = window.location.pathname.split('/').pop();
    
    // Apply dark mode if set
    applyTheme();
    
    // Initialize functionality based on current page
    if (currentPage === '' || currentPage === 'index.html') {
        initHomePage();
    } else if (currentPage === 'order.html') {
        initOrderPage();
    } else if (currentPage === 'subscription.html') {
        initSubscriptionPage();
    } else if (currentPage === 'settings.html') {
        initSettingsPage();
    }
}

// Initialize Home Page
function initHomePage() {
    console.log('Initializing Home Page');
    
    // Get DOM elements
    const waterLevel = document.getElementById('water-level');
    const tankLevelText = document.getElementById('tank-level-text');
    const phValue = document.getElementById('ph-value');
    const turbidityValue = document.getElementById('turbidity-value');
    const bacterialValue = document.getElementById('bacterial-value');
    const tempValue = document.getElementById('temp-value');
    
    // Initial water level (75%)
    let level = 75;
    updateWaterLevel(level);
    
    // Simulate real-time data updates
    setInterval(() => {
        // Randomly change water level (±2%)
        level += (Math.random() * 4 - 2);
        level = Math.max(0, Math.min(100, level));
        updateWaterLevel(level);
        
        // Update water quality metrics
        updateWaterQuality();
    }, 5000);
    
    // Update water level display
    function updateWaterLevel(level) {
        waterLevel.style.height = `${level}%`;
        tankLevelText.textContent = `${Math.round(level)}%`;
        
        // Change color based on level
        if (level < 20) {
            waterLevel.style.backgroundColor = 'rgba(220, 53, 69, 0.7)'; // Low - Red
        } else if (level < 40) {
            waterLevel.style.backgroundColor = 'rgba(255, 193, 7, 0.7)'; // Warning - Yellow
        } else {
            waterLevel.style.backgroundColor = 'rgba(0, 161, 214, 0.7)'; // Good - Blue
        }
    }
    
    // Update water quality metrics
    function updateWaterQuality() {
        // Simulate small variations in water quality metrics
        const ph = (7.0 + Math.random() * 0.4).toFixed(1);
        const turbidity = (Math.random() * 1.5).toFixed(1);
        const temp = (20 + Math.random() * 5).toFixed(1);
        
        // Update display
        phValue.textContent = ph;
        turbidityValue.textContent = `${turbidity} NTU`;
        tempValue.textContent = `${temp}°C`;
        
        // Update status indicators based on values
        updateStatusIndicator(phValue.parentElement.querySelector('.status'), 
                             ph >= 6.5 && ph <= 8.5 ? 'good' : 'warning',
                             ph >= 6.5 && ph <= 8.5 ? 'GOOD' : 'ATTENTION');
        
        updateStatusIndicator(turbidityValue.parentElement.querySelector('.status'), 
                             turbidity <= 1.0 ? 'good' : turbidity <= 2.0 ? 'warning' : 'bad',
                             turbidity <= 1.0 ? 'GOOD' : turbidity <= 2.0 ? 'ATTENTION' : 'POOR');
        
        updateStatusIndicator(tempValue.parentElement.querySelector('.status'), 
                             temp >= 18 && temp <= 25 ? 'good' : 'warning',
                             temp >= 18 && temp <= 25 ? 'GOOD' : 'ATTENTION');
    }
    
    // Update status indicator class and text
    function updateStatusIndicator(element, className, text) {
        element.className = `status ${className}`;
        element.textContent = text;
    }
}

// Initialize Order Page
function initOrderPage() {
    console.log('Initializing Order Page');
    
    // Get DOM elements
    const quantitySelect = document.getElementById('water-quantity');
    const deliveryDateInput = document.getElementById('delivery-date');
    const deliveryTimeSelect = document.getElementById('delivery-time');
    const summaryQuantity = document.getElementById('summary-quantity');
    const summaryPrice = document.getElementById('summary-price');
    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');
    const payNowBtn = document.getElementById('pay-now-btn');
    const modal = document.getElementById('confirmation-modal');
    const closeModal = document.getElementById('close-modal');
    const backToHome = document.getElementById('back-to-home');
    const modalQuantity = document.getElementById('modal-quantity');
    const modalPrice = document.getElementById('modal-price');
    const modalDate = document.getElementById('modal-date');
    const modalTime = document.getElementById('modal-time');
    
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    deliveryDateInput.min = tomorrow.toISOString().split('T')[0];
    
    // Update order summary when quantity changes
    quantitySelect.addEventListener('change', function() {
        const quantity = this.value;
        let price;
        
        switch(quantity) {
            case '500':
                price = '₹500';
                break;
            case '1000':
                price = '₹1000';
                break;
            case '1500':
                price = '₹1450';
                break;
            case '2000':
                price = '₹1900';
                break;
            default:
                price = '₹0';
        }
        
        summaryQuantity.textContent = `${quantity}L`;
        summaryPrice.textContent = price;
    });
    
    // Update summary when date changes
    deliveryDateInput.addEventListener('change', function() {
        const date = new Date(this.value);
        const formattedDate = date.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        summaryDate.textContent = formattedDate;
    });
    
    // Update summary when time changes
    deliveryTimeSelect.addEventListener('change', function() {
        const timeValue = this.value;
        let timeText;
        
        switch(timeValue) {
            case 'morning':
                timeText = 'Morning (9AM - 12PM)';
                break;
            case 'afternoon':
                timeText = 'Afternoon (12PM - 3PM)';
                break;
            case 'evening':
                timeText = 'Evening (3PM - 6PM)';
                break;
            default:
                timeText = '';
        }
        
        summaryTime.textContent = timeText;
    });
    
    // Handle pay now button click
    payNowBtn.addEventListener('click', function() {
        if (!deliveryDateInput.value) {
            alert('Please select a delivery date');
            return;
        }
        
        // Update modal content
        modalQuantity.textContent = summaryQuantity.textContent;
        modalPrice.textContent = summaryPrice.textContent;
        modalDate.textContent = summaryDate.textContent;
        modalTime.textContent = summaryTime.textContent;
        
        // Show modal
        modal.classList.add('active');
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Back to home button in modal
    backToHome.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Initialize Subscription Page
function initSubscriptionPage() {
    console.log('Initializing Subscription Page');
    
    // Get DOM elements
    const subscriptionBadge = document.getElementById('subscription-badge');
    const nextReplacement = document.getElementById('next-replacement-date');
    const subscribeBtn = document.getElementById('subscribe-btn');
    const subModal = document.getElementById('subscription-modal');
    const closeSubModal = document.getElementById('close-sub-modal');
    const backToHomeSub = document.getElementById('back-to-home-sub');
    const firstReplacement = document.getElementById('first-replacement');
    const nextBilling = document.getElementById('next-billing');
    
    // Check if already subscribed (from localStorage)
    const isSubscribed = localStorage.getItem('isSubscribed') === 'true';
    
    if (isSubscribed) {
        subscriptionBadge.textContent = 'Active';
        subscriptionBadge.classList.add('active');
        subscribeBtn.textContent = 'Manage Subscription';
        
        // Get saved subscription date or create new one
        let subscriptionDate = localStorage.getItem('subscriptionDate');
        if (!subscriptionDate) {
            subscriptionDate = new Date().toISOString();
            localStorage.setItem('subscriptionDate', subscriptionDate);
        }
        
        // Calculate next replacement date (3 months from subscription)
        const nextReplacementDate = new Date(subscriptionDate);
        nextReplacementDate.setMonth(nextReplacementDate.getMonth() + 3);
        
        nextReplacement.innerHTML = `<p>Next filter replacement: ${nextReplacementDate.toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })}</p>`;
    }
    
    // Handle subscribe button click
    subscribeBtn.addEventListener('click', function() {
        if (isSubscribed) {
            // Handle manage subscription (just toggle for demo)
            localStorage.setItem('isSubscribed', 'false');
            window.location.reload();
            return;
        }
        
        // Set subscription date to today
        const today = new Date();
        const subscriptionDate = today.toISOString();
        localStorage.setItem('subscriptionDate', subscriptionDate);
        
        // Calculate first replacement (3 months from now)
        const replacementDate = new Date(today);
        replacementDate.setMonth(today.getMonth() + 3);
        
        // Calculate next billing (1 year from now)
        const billingDate = new Date(today);
        billingDate.setFullYear(today.getFullYear() + 1);
        
        // Update modal content
        firstReplacement.textContent = replacementDate.toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        nextBilling.textContent = billingDate.toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Show modal
        subModal.classList.add('active');
        
        // Set subscription to active
        localStorage.setItem('isSubscribed', 'true');
    });
    
    // Close modal
    closeSubModal.addEventListener('click', function() {
        subModal.classList.remove('active');
        window.location.reload();
    });
    
    // Back to home button in modal
    backToHomeSub.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === subModal) {
            subModal.classList.remove('active');
            window.location.reload();
        }
    });
}

// Initialize Settings Page
function initSettingsPage() {
    console.log('Initializing Settings Page');
    
    // Get DOM elements
    const themeToggle = document.getElementById('theme-toggle');
    const qualityAlertsToggle = document.getElementById('quality-alerts-toggle');
    const levelAlertsToggle = document.getElementById('level-alerts-toggle');
    const filterAlertsToggle = document.getElementById('filter-alerts-toggle');
    
    // Set toggle states from localStorage
    themeToggle.checked = localStorage.getItem('darkMode') === 'true';
    qualityAlertsToggle.checked = localStorage.getItem('qualityAlerts') !== 'false';
    levelAlertsToggle.checked = localStorage.getItem('levelAlerts') !== 'false';
    filterAlertsToggle.checked = localStorage.getItem('filterAlerts') !== 'false';
    
    // Theme toggle
    themeToggle.addEventListener('change', function() {
        localStorage.setItem('darkMode', this.checked);
        applyTheme();
    });
    
    // Notification toggles
    qualityAlertsToggle.addEventListener('change', function() {
        localStorage.setItem('qualityAlerts', this.checked);
    });
    
    levelAlertsToggle.addEventListener('change', function() {
        localStorage.setItem('levelAlerts', this.checked);
    });
    
    filterAlertsToggle.addEventListener('change', function() {
        localStorage.setItem('filterAlerts', this.checked);
    });
}

// Apply theme based on localStorage
function applyTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode);
}
