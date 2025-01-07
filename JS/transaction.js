const remainingBalance = localStorage.getItem('newBalance')
const completedTransaction = document.getElementById('number-transaction-completed')
if (remainingBalance) {
    completedTransaction += 1;
    console.log(remainingBalance)
    
}
