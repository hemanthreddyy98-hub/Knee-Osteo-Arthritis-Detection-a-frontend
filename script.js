// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // If showing results page, draw chart
    if (pageId === 'results') {
        drawChart();
    }
}

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Show image preview
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImg').src = e.target.result;
            document.getElementById('imagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
        
        // Hide previous results
        document.getElementById('analysisResults').style.display = 'none';
    }
}

// Analyze image (simulated)
function analyzeImage() {
    // Show loading state
    const analyzeBtn = document.querySelector('.analyze-btn');
    const originalText = analyzeBtn.textContent;
    analyzeBtn.textContent = '🔍 Analyzing...';
    analyzeBtn.disabled = true;
    
    // Simulate analysis delay
    setTimeout(() => {
        // Generate random results
        const classifications = ['Healthy', 'Doubtful', 'Minimal', 'Moderate', 'Severe'];
        const randomClassification = classifications[Math.floor(Math.random() * classifications.length)];
        const randomConfidence = Math.floor(Math.random() * 20) + 75; // 75-95%
        const klScores = ['0', '1', '2', '3', '4'];
        const randomKLScore = klScores[Math.floor(Math.random() * klScores.length)];
        
        // Update results
        document.getElementById('classification').textContent = randomClassification;
        document.getElementById('confidence').textContent = randomConfidence + '%';
        document.getElementById('klScore').textContent = randomKLScore;
        
        // Show results
        document.getElementById('analysisResults').style.display = 'block';
        
        // Reset button
        analyzeBtn.textContent = originalText;
        analyzeBtn.disabled = false;
        
        // Scroll to results
        document.getElementById('analysisResults').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Draw simple chart
function drawChart() {
    const canvas = document.getElementById('chartCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart data
    const labels = ['Healthy', 'Doubtful', 'Minimal', 'Moderate', 'Severe'];
    const data = [1600, 1400, 1800, 2000, 1200];
    const colors = ['#4CAF50', '#FF9800', '#FFC107', '#FF5722', '#F44336'];
    
    // Chart dimensions
    const chartWidth = canvas.width - 40;
    const chartHeight = canvas.height - 60;
    const barWidth = chartWidth / data.length;
    const maxValue = Math.max(...data);
    
    // Draw bars
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = 20 + (index * barWidth) + (barWidth * 0.1);
        const y = canvas.height - 40 - barHeight;
        const width = barWidth * 0.8;
        
        // Draw bar
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, width, barHeight);
        
        // Draw label
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(labels[index], x + width/2, canvas.height - 20);
        
        // Draw value
        ctx.fillText(value.toLocaleString(), x + width/2, y - 10);
    });
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to content cards
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
        });
    });
    
    // Add click effect to upload box
    const uploadBox = document.querySelector('.upload-box');
    if (uploadBox) {
        uploadBox.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Initialize chart if on results page
    if (document.getElementById('results').classList.contains('active')) {
        drawChart();
    }
});

// Add smooth scrolling for better UX
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Reset any active states
        const activeElements = document.querySelectorAll('.active');
        activeElements.forEach(el => el.classList.remove('active'));
    }
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    // Add touch feedback
    const touchElements = document.querySelectorAll('.nav-btn, .analyze-btn, .upload-box');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}
