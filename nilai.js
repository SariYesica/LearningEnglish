document.addEventListener('DOMContentLoaded', function() {
  // Display existing results
  displayResults();
  
  // Initialize chart
  initializeProgressChart();
  
  // Clear all results button
  document.getElementById('clear-results').addEventListener('click', clearAllResults);
});

function displayResults() {
  const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
  const resultsList = document.getElementById('results-list');
  const noResults = document.getElementById('no-results');
  
  resultsList.innerHTML = '';
  
  if (quizResults.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  
  noResults.style.display = 'none';
  
  quizResults.forEach((result, index) => {
    const percentage = Math.round((result.score / result.totalQuestions) * 100);
    let scoreClass = '';
    
    if (percentage >= 80) scoreClass = 'high-score';
    else if (percentage >= 50) scoreClass = 'medium-score';
    else scoreClass = 'low-score';
    
    const resultElement = document.createElement('div');
    resultElement.className = `card result-card ${scoreClass}`;
    resultElement.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-title">Quiz on ${result.date}</h5>
          <p class="card-text">Score: ${result.score}/${result.totalQuestions} (${percentage}%)</p>
        </div>
        <button class="btn btn-outline-danger btn-sm delete-btn" data-index="${index}">
          Delete
        </button>
      </div>
    `;
    
    resultsList.appendChild(resultElement);
  });
  
  // Add event listeners to delete buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      deleteResult(parseInt(this.dataset.index));
    });
  });
}

function deleteResult(index) {
  const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
  quizResults.splice(index, 1);
  localStorage.setItem('quizResults', JSON.stringify(quizResults));
  displayResults();
  initializeProgressChart(); // Update chart
}

function clearAllResults() {
  if (confirm('Are you sure you want to delete all quiz results? This cannot be undone.')) {
    localStorage.removeItem('quizResults');
    displayResults();
    initializeProgressChart();
  }
}

function initializeProgressChart() {
  const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
  const ctx = document.getElementById('progress-chart').getContext('2d');
  
  // Sort results by date
  quizResults.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const labels = quizResults.map(result => 
    new Date(result.date).toLocaleDateString());
  const data = quizResults.map(result => 
    Math.round((result.score / result.totalQuestions) * 100));
  
  // Destroy previous chart if exists
  if (window.progressChart) {
    window.progressChart.destroy();
  }
  
  if (quizResults.length > 0) {
    window.progressChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quiz Scores (%)',
          data: data,
          borderColor: '#0d6efd',
          backgroundColor: 'rgba(13, 110, 253, 0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
}