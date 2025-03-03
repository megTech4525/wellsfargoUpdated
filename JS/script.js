//Get form and button elements
const localTransferBtn = document.getElementById('localTransferBtn');
const foreignTransferBtn = document.getElementById('foreignTransferBtn');
const wireTransferBtn = document.getElementById('wireTransferBtn');
const closeReceipt = document.getElementById("close");
const transactionSlipContainer = document.getElementById('transactionSlipContainer');
const printSlip = document.getElementById('print');
const downloadSlip = document.getElementById('download');
const viewReceipt = document.getElementById('viewReceipt');
const successful = document.getElementById('confirmTransaction')
const transactionAmount = document.getElementById("localAmount").value;
const closeinsufficient = document.getElementById('close-insufficient');
const declinePage = document.getElementById('declineTransaction');
const loading = document.getElementById('Loading');

//VIEW RECEIPT BUTTON
viewReceipt.addEventListener('click', () => {
    transactionSlipContainer.style.display = 'block'
    if (transactionSlipContainer) {
        successful.style.display = 'none'
    }
    
})

//CLOSE TRANSACTION SLIP
closeReceipt.addEventListener('click', () => {
    transactionSlipContainer.style.display = 'none'
    if (transactionSlipContainer) {
        transactionAmount == ''
        window.location.href = '../HTML/Transaction.html'
    }
});

closeinsufficient.addEventListener('click', () => {
    declinePage.style.display = 'none'
    if (declinePage) {
        transactionAmount == ''
        window.location.href = '../HTML/Transaction.html'
    }
});

//DOWNLOAD TRANSACTION SLIP
downloadSlip.addEventListener('click', () => {
    html2canvas(document.getElementById("transactionSlip")).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "transaction_receipt.png";
        link.click();
    });
     
})
    
   //SHARING TRANSACTION SLIP 

printSlip.addEventListener('click', () => {
        html2canvas(document.getElementById("transactionSlip")).then(canvas => {
            let imageData = canvas.toDataURL("image/png"); // Convert receipt to image
    
            if (navigator.share) { // Check if sharing is supported
                navigator.share({
                    title: "Transaction Receipt",
                    text: "Here is your transaction receipt.",
                    files: [new File([dataURItoBlob(imageData)], "receipt.png", { type: "image/png" })]
                }).catch(err => console.log("Sharing failed:", err));
            } else {
                alert("Sharing is not supported on this device.");
            }
        });
    
        function dataURItoBlob(dataURI) {
            let byteString = atob(dataURI.split(",")[1]); // Decode base64
            let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]; // Get the MIME type
            let ab = new ArrayBuffer(byteString.length); // Create ArrayBuffer
            let ia = new Uint8Array(ab); // Convert ArrayBuffer to Uint8Array
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString }); // Return a Blob object
        }
        
})


// Add event listeners for buttons
localTransferBtn.addEventListener('click', () => {
    // Show local form and hide foreign form
    localTransferForm.classList.add('active');
    foreignTransferForm.classList.remove('active');
    localTransferBtn.classList.add('active');
    foreignTransferBtn.classList.remove('active');
    wireTransferForm.classList.remove('active');

});

foreignTransferBtn.addEventListener('click', () => {
    // Show foreign form and hide local form
    foreignTransferForm.classList.add('active');
    localTransferForm.classList.remove('active');
    foreignTransferBtn.classList.add('active');
    localTransferBtn.classList.remove('active');
    wireTransferForm.classList.remove('active');
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
const banks = document.getElementById('Foreignbank')



// SELECT COUNTRY DROP DOWN
const countryDropdown = document.getElementById('country');
const countryDropdown1 = document.getElementById('wcountries');  
fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                let option = document.createElement("option");
                let option1 = document.createElement("option")
                option.value = country.name.common;
                option1.value = country.name.common;
                
                option.textContent = country.name.common;
                option1.textContent = country.name.common;
                countryDropdown.appendChild(option);
                countryDropdown1.appendChild(option1);
            });
        })
        .catch(error => console.error("Error fetching country data:", error));   




// Handle local withdrawal submission
localTransferForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const amountToWithdraw = parseFloat(localAmountInput.value);
    const foreigncurrentBalance = parseFloat(localStorage.getItem('initialAmount')) || 0;
    const transactionId = "TXN" + Math.floor(Math.random() * 1000000); // Random ID
    const transactionDate = new Date().toLocaleString(); // Current date and time
    const transactionAmount = document.getElementById("localAmount").value;
    const recipient = document.getElementById("localAccountNumber").value;
    const transactionStatus = "Successful"; // Assume success for now
    const Lpurpose = document.getElementById('localPurpose').value;
    let failedTransaction = parseFloat(localStorage.getItem('FT')) || 0;
    

    
    // Validation
    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
        alert('Please enter a valid amount.');
        failedTransaction += 1;
        localStorage.setItem('FT', failedTransaction);
        return;
    }

    if (amountToWithdraw > foreigncurrentBalance) {
        loading.style.display = 'block'
        loading.innerText = "Loading....."

        setTimeout(() => {
        loading.style.display = 'none'
        declinePage.style.display = 'block';
        },2000)
        
        failedTransaction += 1;
        localStorage.setItem('FT', failedTransaction);
        
        return;
    }

    let completedTransaction = parseFloat(localStorage.getItem('CT')) || 0;
    // Update remaining balance

    
    const remainingBalance = foreigncurrentBalance - amountToWithdraw;
    localStorage.setItem('initialAmount', remainingBalance);
    
    completedTransaction += 1;
    localStorage.setItem('CT', completedTransaction)

        
        
        
    
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({
        type: 'Local Transfer',
        amount: amountToWithdraw,
        date: new Date().toISOString(),
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));



    // alert(`Withdrawal of $${amountToWithdraw.toLocaleString()} was successful!`);

   // Display transaction slip
 document.getElementById("transId").innerText = transactionId;
 document.getElementById("transDate").innerText = transactionDate;
    document.getElementById("transAmount").innerText = `$${parseFloat(transactionAmount).toLocaleString(undefined,
        { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
 document.getElementById("transRecipient").innerText = recipient;
 document.getElementById("transStatus").innerText = transactionStatus;
    document.getElementById("transPurpose").innerText = Lpurpose;

// document.getElementById("transactionSlipContainer").classList.remove("hidden");
loading.style.display = 'block'
loading.innerText = "Loading....."
   
        setTimeout(() => {
        loading.style.display = 'none'
        successful.style.display = 'block';

        },2000)
        

    
});




// Handle local withdrawal submission
foreignTransferForm.addEventListener('submit', (e) => {
    e.preventDefault();
     
    const FtransactionId = "TXN" + Math.floor(Math.random() * 1000000); // Random ID
    const FtransactionDate = new Date().toLocaleString(); // Current date and time
    const FtransactionAmount = document.getElementById("foreignAmount").value;
    const Frecipient = document.getElementById("foreignAccountNumber").value;
    const Fcountry = document.getElementById('wcountries').value;
    const FaccountType = document.getElementById('accountType').value
    const FtransactionStatus = "Successful"; // Assume success for now
    const Fpurpose = document.getElementById('foreignPurpose').value;
    const foreignamountToWithdraw = parseFloat(foreignAmountInput.value);
    const currentBalance = parseFloat(localStorage.getItem('initialAmount')) || 0;
    let failedTransaction = parseFloat(localStorage.getItem('FT')) || 0;

    // Validation
    if (isNaN(foreignamountToWithdraw) || foreignamountToWithdraw <= 0) {
        alert('Please enter a valid amount.');
        failedTransaction += 1;
        localStorage.setItem('FT', failedTransaction);
       
        return;
    }

    if (foreignamountToWithdraw > currentBalance) {
        loading.style.display = 'block'
        loading.innerText = "Loading....."

        setTimeout(() => {
        loading.style.display = 'none'
        declinePage.style.display = 'block';
        },2000)
        
        failedTransaction += 1;
        localStorage.setItem('FT', failedTransaction);
       
        return;
    }

    let completedTransaction = parseFloat(localStorage.getItem('CT')) || 0;

    // Update remaining balance
    
    const remainingBalance = currentBalance - foreignamountToWithdraw;
    localStorage.setItem('initialAmount', remainingBalance);

    completedTransaction += 1;
    localStorage.setItem('CT', completedTransaction)

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

    // alert(`Withdrawal of $${foreignamountToWithdraw.toLocaleString()} was successful!`);

document.getElementById("transId").innerText = FtransactionId;
 document.getElementById("transDate").innerText = FtransactionDate;
    document.getElementById("transAmount").innerText = `$${parseFloat(FtransactionAmount).toLocaleString(undefined,
        { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("transRecipient").innerText = Frecipient;
    document.getElementById("transCountry").innerText = Fcountry;
    document.getElementById("transAccount").innerText = FaccountType;
 document.getElementById("transStatus").innerText = FtransactionStatus;
    document.getElementById('transPurpose').innerText = Fpurpose;

// document.getElementById("transactionSlipContainer").classList.remove("hidden");
loading.style.display = 'block'
loading.innerText = "Loading....."
   
        setTimeout(() => {
        loading.style.display = 'none'
        successful.style.display = 'block';

        },2000)
        


    // Redirect to balance display page
    // window.location.href = '../HTML/Transaction.html';
});





wireTransferForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const WtransactionId = "TXN" + Math.floor(Math.random() * 1000000); // Random ID
    const WtransactionDate = new Date().toLocaleString(); // Current date and time
    const WtransactionAmount = document.getElementById("wireAmount").value;
    const Wrecipient = document.getElementById("wireAccountNumber").value;
    const Wcountry = document.getElementById('country').value;
    const WaccountType = document.getElementById('accountType').value
    const WtransactionStatus = "Successful"; // Assume success for now
    const Wpurpose = document.getElementById('wirePurpose').value;
    const wireamountToWithdraw = parseFloat(wireAmountInput.value);
    const currentBalance = parseFloat(localStorage.getItem('initialAmount')) || 0;
    let failedTransaction = parseFloat(localStorage.getItem('FT')) || 0;


    // Validation
    if (isNaN(wireamountToWithdraw) || wireamountToWithdraw <= 0) {
        alert('Please enter a valid amount.');
        failedTransaction += 1;
        localStorage.setItem('FT', failedTransaction)
        return;
    }

    if (wireamountToWithdraw > currentBalance) {
        loading.style.display = 'block'
        loading.innerText = "Loading....."

        setTimeout(() => {
        loading.style.display = 'none'
        declinePage.style.display = 'block';
        },2000)
        
        failedTransaction += 1;
        localStorage.setItem('FT', failedTransaction)
        return;
    }


    let completedTransaction = parseFloat(localStorage.getItem('CT')) || 0;

    // Update remaining balance
    const remainingBalance = currentBalance - wireamountToWithdraw;
    localStorage.setItem('initialAmount', remainingBalance);

    completedTransaction += 1;
    localStorage.setItem('CT', completedTransaction)


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

    // alert(`Withdrawal of $${wireamountToWithdraw.toLocaleString()} was successful!`);

    document.getElementById("transId").innerText = WtransactionId;
    document.getElementById("transDate").innerText = WtransactionDate;
    document.getElementById("transAmount").innerText = `$${parseFloat(WtransactionAmount).toLocaleString(undefined,
        { mainimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("transRecipient").innerText = Wrecipient;
    document.getElementById("transCountry").innerText = Wcountry;
    document.getElementById("transAccount").innerText = WaccountType;
    document.getElementById("transStatus").innerText = WtransactionStatus;
    document.getElementById('transPurpose').innerText = Wpurpose;

// document.getElementById("transactionSlipContainer").classList.remove("hidden");
loading.style.display = 'block'
loading.innerText = "Loading....."
   
        setTimeout(() => {
        loading.style.display = 'none'
        successful.style.display = 'block';

        },2000)
        
 


    // Redirect to balance display page
    // window.location.href = '../HTML/Transaction.html';
});


const body = document.body;

        // Check for saved theme in local storage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.className = savedTheme;
            toggleButton.innerHTML = savedTheme === 'dark-mode'
                ? '<i class="fa fa-toggle-on" aria-hidden="true"></i>'
                : '<i class="fa fa-toggle-off" aria-hidden="true"></i>';
        }

        // Toggle between dark and light modes
        toggleButton.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                body.classList.replace('light-mode', 'dark-mode');
                toggleButton.innerHTML = '<i class="fa fa-toggle-on" aria-hidden="true"></i>';
                localStorage.setItem('theme', 'dark-mode');
            } else {
                body.classList.replace('dark-mode', 'light-mode');
                toggleButton.innerHTML = '<i class="fa fa-toggle-off" aria-hidden="true"></i>';
                localStorage.setItem('theme', 'light-mode');
            }
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

