 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
 
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCj2R-rkYViWqghPkIKy7qk0nKQTEk9UMo",
    authDomain: "login-form-e0f85.firebaseapp.com",
    projectId: "login-form-e0f85",
    storageBucket: "login-form-e0f85.firebasestorage.app",
    messagingSenderId: "553640742535",
    appId: "1:553640742535:web:4b8d0f645870bdf1feb222"
  };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig); 

 function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    
    // Scroll to the message div
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

 const signUp = document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event) => {
     event.preventDefault();
 
     const email = document.getElementById('rEmail').value;
     const password = document.getElementById('rPassword').value;
     const confirmPassword = document.getElementById('confirmPassword').value;
     const firstName = document.getElementById('fName').value;
     const lastName = document.getElementById('lName').value;
     const mobileNumber = document.getElementById('phone').value;
     const address = document.getElementById('address').value;
     const postalCode = document.getElementById('postalCode').value;
 
     // Check if password and confirm password match
     if (password !== confirmPassword) {
         showMessage('Passwords do not match! Please try again.', 'signUpMessage');
         return; // Prevent form submission if passwords don't match
     }
 
     const auth = getAuth();
     const db = getFirestore();
 
     createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
             const user = userCredential.user;
             const userData = {
                 email: email,
                 firstName: firstName,
                 lastName: lastName,
                 mobileNumber: mobileNumber,
                 address: address,
                 postalCode: postalCode
             };
             showMessage('Account Created Successfully', 'signUpMessage');
             const docRef = doc(db, "users", user.uid);
             setDoc(docRef, userData)
                 .then(() => {
                     window.location.href = 'loading.html';
                 })
                 .catch((error) => {
                     console.error("Error writing document", error);
                 });
         })
         .catch((error) => {
             const errorCode = error.code;
             if (errorCode == 'auth/email-already-in-use') {
                 showMessage('Email Address Already Exists !!!', 'signUpMessage');
             } else {
                 showMessage('Unable to create User', 'signUpMessage');
             }
         });
         signUp.disabled = true;
// Show loading spinner
showMessage('Creating account...', 'signUpMessage');

 });



 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('Login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='loading.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 });
 // Initialize Intl-Tel-Input for phone input
   // Populate the country dropdown with all countries
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