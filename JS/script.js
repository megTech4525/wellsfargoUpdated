//Get form and button elements
const localTransferBtn = document.getElementById('localTransferBtn');
const foreignTransferBtn = document.getElementById('foreignTransferBtn');
const wireTransferBtn = document.getElementById('wireTransferBtn');



// Add event listeners for buttons
localTransferBtn.addEventListener('click', () => {
    // Show local form and hide foreign form
    localTransferForm.classList.add('active');
    foreignTransferForm.classList.remove('active');
    localTransferBtn.classList.add('active');
    foreignTransferBtn.classList.remove('active');
});

foreignTransferBtn.addEventListener('click', () => {
    // Show foreign form and hide local form
    foreignTransferForm.classList.add('active');
    localTransferForm.classList.remove('active');
    foreignTransferBtn.classList.add('active');
    localTransferBtn.classList.remove('active');
});

wireTransferBtn.addEventListener('click', () => {
    // Show foreign form and hide local form
    wireTransferForm.classList.add('active');
    foreignTransferForm.classList.remove('active');
    
    localTransferForm.classList.remove('active');
    // foreignTransferBtn.classList.add('active');
    // localTransferBtn.classList.remove('active');
});


// Select DOM elements
const localTransferForm = document.getElementById('localTransferForm');
const foreignTransferForm = document.getElementById('foreignTransferForm');
const wireTransferForm = document.getElementById('wireTransferForm')
const localAmountInput = document.getElementById('localAmount');
const foreignAmountInput = document.getElementById('foreignAmount')
const wireAmountInput = document.getElementById('wireAmount')


// Handle local withdrawal submission
localTransferForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const amountToWithdraw = parseFloat(localAmountInput.value);
    const foreigncurrentBalance = parseFloat(localStorage.getItem('initialAmount')) || 0;

    // Validation
    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (amountToWithdraw > foreigncurrentBalance) {
        alert('Insufficient balance.');
        return;
    }

    // Update remaining balance
    const remainingBalance = foreigncurrentBalance - amountToWithdraw;
    localStorage.setItem('initialAmount', remainingBalance);

    if (remainingBalance) {
        
    }
    // Save transaction
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({
        type: 'Local Transfer',
        amount: amountToWithdraw,
        date: new Date().toISOString(),
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));

    alert(`Withdrawal of $${amountToWithdraw.toLocaleString()} was successful!`);

    // Redirect to balance display page
    window.location.href = '../HTML/Transaction.html';
});

// Handle local withdrawal submission
foreignTransferForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const foreignamountToWithdraw = parseFloat(foreignAmountInput.value);
    const currentBalance = parseFloat(localStorage.getItem('initialAmount')) || 0;

    // Validation
    if (isNaN(foreignamountToWithdraw) || foreignamountToWithdraw <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (foreignamountToWithdraw > currentBalance) {
        alert('Insufficient balance.');
        return;
    }

    // Update remaining balance
    const remainingBalance = currentBalance - foreignamountToWithdraw;
    localStorage.setItem('initialAmount', remainingBalance);

    if (remainingBalance) {
        
    }
    // Save transaction
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({
        type: 'Foreign Transfer',
        amount: foreignamountToWithdraw,
        date: new Date().toISOString(),
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));

    alert(`Withdrawal of $${foreignamountToWithdraw.toLocaleString()} was successful!`);

    // Redirect to balance display page
    window.location.href = '../HTML/Transaction.html';
});

wireTransferForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const wireamountToWithdraw = parseFloat(wireAmountInput.value);
    const currentBalance = parseFloat(localStorage.getItem('initialAmount')) || 0;

    // Validation
    if (isNaN(wireamountToWithdraw) || wireamountToWithdraw <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (wireamountToWithdraw > currentBalance) {
        alert('Insufficient balance.');
        return;
    }

    // Update remaining balance
    const remainingBalance = currentBalance - wireamountToWithdraw;
    localStorage.setItem('initialAmount', remainingBalance);

    if (remainingBalance) {
        
    }
    // Save transaction
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({
        type: 'Wire Transfer',
        amount: wireamountToWithdraw,
        date: new Date().toISOString(),
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));

    alert(`Withdrawal of $${wireamountToWithdraw.toLocaleString()} was successful!`);

    // Redirect to balance display page
    window.location.href = '../HTML/Transaction.html';
});





const countrySelect = document.getElementById('country');
const countries = new Intl.DisplayNames(['en'], { type: 'region' });

const countryCodes = Object.keys(countries.of)
    .map(code => ({ code, name: countries.of(code) }))
    .sort((a, b) => a.name.localeCompare(b.name));

countryCodes.forEach(({ code, name }) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    countrySelect.appendChild(option);
});

// Initialize Intl-Tel-Input for phone input
const phoneInput = document.getElementById('phone');
intlTelInput(phoneInput, {
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
    initialCountry: "auto",
    geoIpLookup: function (callback) {
        fetch('https://ipinfo.io/json?token=') // Replace with your token from ipinfo.io
            .then((response) => response.json())
            .then((data) => callback(data.country))
            .catch(() => callback("us"));
    }
});




























// // Get form and button elements
// const localTransferBtn = document.getElementById('localTransferBtn');
// const foreignTransferBtn = document.getElementById('foreignTransferBtn');


// // Add event listeners for buttons
// localTransferBtn.addEventListener('click', () => {
//     // Show local form and hide foreign form
//     localTransferForm.classList.add('active');
//     foreignTransferForm.classList.remove('active');
//     localTransferBtn.classList.add('active');
//     foreignTransferBtn.classList.remove('active');
// });

// foreignTransferBtn.addEventListener('click', () => {
//     // Show foreign form and hide local form
//     foreignTransferForm.classList.add('active');
//     localTransferForm.classList.remove('active');
//     foreignTransferBtn.classList.add('active');
//     localTransferBtn.classList.remove('active');
// });



// const amountToWithdraw = document.getElementById('localAmount').value;
// const localTransferForm = document.getElementById('localTransferForm');
// const foreignTransferForm = document.getElementById('foreignTransferForm');
// const withdrawableAmount = localStorage.getItem('initialAmount')



    
// localTransferForm.addEventListener('submit', (e) => {
//     e.preventDefault();
// // Create the transaction object
// const transaction = {
//     type: 'Local Transfer',
//     recipient: document.getElementById('localAccountNumber').value,
//     amount: document.getElementById('localAmount').value.toLocaleString(),
//     date: new Date().toISOString()
// };

// // Retrieve existing transactions from localStorage or initialize a new array
// let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
// transactions.push(transaction);

// // Save updated transactions back to localStorage
// localStorage.setItem('transactions', JSON.stringify(transactions));

//          window.location.href = '../HTML/Transaction.html'
        
//          localAmountToLocalString()
// }) 



// // const foreignTransferForm = document.getElementById('foreignTransferForm');

// foreignTransferForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     // Collect form data
//     const transaction = {
//         type: 'Foreign Transfer',
//         recipientIBAN: document.getElementById('foreignAccountNumber').value,
//         bankName: document.getElementById('foreignBankName').value,
//         amount: document.getElementById('foreignAmount').value.toLocaleString(),
//         date: new Date().toISOString(),
//         purpose: document.getElementById('localAmount').value, // Ensure the correct ID
//         description: document.getElementById('localAmount').value, // Ensure the correct ID
//     };

//     // Retrieve existing transactions from localStorage or initialize a new array
//     let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
//     transactions.push(transaction);

//     // Save updated transactions back to localStorage
//     localStorage.setItem('transactions', JSON.stringify(transactions));

//     // Show success message
//     alert('Transaction of ' + "$"+ transaction.amount + ' was successfully completed!');

//     // Optionally redirect to transaction history page
//     window.location.href = '../HTML/Transaction.html';
// });


// function localAmountToLocalString() {
//     const amountToWithdraw = localStorage.setItem('amountToWithdraw', withdrawnBalance)
// }

