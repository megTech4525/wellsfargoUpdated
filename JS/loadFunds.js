
const form = document.getElementById('load-form')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const Amount = document.getElementById('amount').value
    localStorage.setItem('initialAmount', Amount)
    
    
    window.location.href = '../HTML/Register.html'
    // const loadedFunds = localStorage.getItem('initialAmount')
    saveDeposit(Amount)
    // depositedMoney()
})

function saveDeposit(Amount) {
    let deposits = JSON.parse(localStorage.getItem('DepositHistory')) || [];
    deposits.push({
        amount: parseFloat(Amount), // Store amount as a number
        date: new Date().toISOString()
    });
    localStorage.setItem('DepositHistory', JSON.stringify(deposits));
}


console.log("Stored Deposits:", localStorage.getItem('DepositHistory'));






// function depositedMoney(amount) {
//     // Retrieve the existing deposit history or initialize it
//     let depositInHistory = JSON.parse(localStorage.getItem('initialAmount')) || [];
    
//     // Add the new deposit entry
//     depositInHistory.push({
//         type: 'Deposit', // Consistent with transaction structure
//         amount: parseFloat(amount) || 0, // Ensure the amount is a number
//         date: new Date().toISOString() // Save the date in ISO format
//     });

//     // Save back to localStorage
//     localStorage.setItem('DepositHistory', JSON.stringify(depositInHistory));
// }


// function depositedMoney(){
// const depositInHistory = JSON.parse(localStorage.getItem('deposit'))
//     depositInHistory.push({
//         type: 'Deposit',
//         Amount: Amount,
//         Date: new Date().toISOString(),
//     });
//     localStorage.setItem('deposit', JSON.stringify(depositInHistory));
// }

  


