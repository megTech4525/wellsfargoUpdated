const form = document.getElementById('load-form');
const submitButton = document.getElementById('submitButton');
const buttonText = document.getElementById('buttonText');
const loadingSpinner = document.getElementById('loadingSpinner');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the amount value
    const Amount = document.getElementById('amount').value;
   
    const accountNumberInput = document.getElementById("account-number");
   accountNumberInput.addEventListener("change", function () {
  // Save the account number to localStorage
  localStorage.setItem("account-number", accountNumberInput.value);
   });
    // Add "processing" state to the button
    submitButton.classList.add('Proceeding...');

    // Change text to "Processing..."
    buttonText.textContent = 'Proceeding...';

    // Apply styles for processing state
    submitButton.style.backgroundColor = 'navy';  // Set the background color to navy
    submitButton.style.color = 'white';  // Set the text color to aliceblue

    // Disable the button to prevent further clicks
    submitButton.disabled = true;

    // Store amount in localStorage
    localStorage.setItem('initialAmount', Amount);

    // Simulate a delay for the processing (e.g., API call or background task)
    setTimeout(() => {
        // Perform the deposit saving operation
        saveDeposit(Amount);

        // After processing, redirect to Register.html
        window.location.href = 'home.html';
    }, 2000); // Simulating 2 seconds of processing time
});

function saveDeposit(Amount) {
    let deposits = JSON.parse(localStorage.getItem('DepositHistory')) || [];
    deposits.push({
        amount: parseFloat(Amount), // Store amount as a number
        date: new Date().toISOString()
    });
    localStorage.setItem('DepositHistory', JSON.stringify(deposits));
}

console.log("Stored Deposits:", localStorage.getItem('DepositHistory'));
