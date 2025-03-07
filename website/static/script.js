async function predict() {
    const form = new FormData(document.getElementById("predictionForm"));
  
    const response = await fetch("/predict", {
      method: "POST",
      body: form,
    });
  
    const data = await response.json();
    document.getElementById("result").innerHTML = `<h3>Result: ${data.result}</h3>`;

  }
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input, select, textarea'); 
    const progressBar = document.getElementById('progressBar');
    const totalFields = inputs.length;

    function updateProgress() {
        let filledFields = 0;

        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                if (input.checked) {
                    filledFields++;
                }
            } else if (input.type === 'text' || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT') {
                if (input.value.trim() !== '') {
                    filledFields++;
                }
            }
        });

        const progress = (filledFields / totalFields) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${Math.round(progress)}%`;
    }

    // Add event listener to every input field to update the progress bar
    inputs.forEach(input => {
        input.addEventListener('change', updateProgress);
        input.addEventListener('input', updateProgress);
    });

    // Initialize Progress Bar on Page Load
    updateProgress();
});
