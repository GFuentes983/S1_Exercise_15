"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Payment Form Script
   
   Author: Gabriel Fuentes
   Date: 4.11.19 
   
   Filename: co_payment.js
   
   Function List
   =============
   
   runSubmit()
      Runs validation tests when the submit button is clicked
      
   validateCVC()
      Validates the credit card CVC number
      
   validateMonth()
      Validates that the user has selected the expiration month of the credit card
      
   validateYear()
      Validates that the user has selected the expiration year of the credit card
      
   validateNumber()
      Validates that the user has entered a valid and legitimate card number
      
   validateCredit()
      Validates that the user has selected a credit card type
      
   validateName()
      Validates that the user has specified the name on the credit card
      
   sumDigits(numStr)
      Sums the digits characters in a text string
      
   luhn(idNum)
      Returns true of idNum satisfies the Luhn Algorithm

*/
window.addEventListener('load', function() {
   // Retrieve the field/value pairs from the URL
   var formData = location.search.slice(1);
   formData = formData.replace(/\+/g," ");
   formData = decodeURIComponent(formData);
   var formFields = formData.split(/[&=]/g);

   // Write the field values to the order form
   var df = document.forms.order.elements;
   df.orderDate.value = formFields[1];
   df.modelName.value = formFields[5];
   df.qty.value = formFields[7];
   df.initialCost.value = formFields[9];
   df.protectionName.value = formFields[13];
   df.protectionCost.value = formFields[15];
   df.subtotal.value = formFields[17];
   df.salesTax.value = formFields[19];
   df.totalCost.value = formFields[21];
});

window.addEventListener('load', function() {
   document.getElementById('subButton').onclick = runSubmit;
   document.getElementById('cardName').oninput = validateName;
   document.getElementById('expMonth').onchange = validateMonth;
   document.getElementById('expYear').onchange = validateYear;
   document.getElementById('cvc').oninput = validateCVC;
});

function runSubmit() {
   validateName();
   validateCredit();
   validateNumber();
   validateMonth();
   validateYear();
   validateCVC();
}

function validateCVC() {
   var cardCVC = document.getElementById('cvc');
   var creditCard = document.querySelector('input[name="credit"]:checked').value;

   if (cardCVC.validity.valueMissing) {
      cardCVC.setCustomValidity("Enter your CVC number");
   } else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {
      cardCVC.setCustomValidity("Enter 4-digit CVC number");
   } else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
      cardCVC.setCustomValidity("Enter a 3-digit CVC number");
   } else {
      cardCVC.setCustomValidity("");
   }
}

function validateMonth() {
   var cardMonth = document.getElementById('expMonth');
   if (cardMonth.selectedIndex === 0 ) {
      cardMonth.setCustomValidity("Select the expiration month");
   } else {
      cardMonth.setCustomValidity("");
   }
}

function validateYear() {
   var cardYear = document.getElementById('expYear');
   if (cardYear.selectedIndex === 0 ) {
      cardYear.setCustomValidity("Select the expiration year");
   } else {
      cardYear.setCustomValidity("");
   }
}

function validateNumber() {
   var cardNumber = document.getElementById('cardNumber');
   if (cardNumber.validity.valueMissing) {
      cardNumber.setCustomValidity("Enter you card number")
   } else if (cardNumber.validity.patternMismatch) {
      cardNumber.setCustomValidity("Enter a valid card number")
   } else if (luhn(cardNumber.value) === false) {
      cardNumber.setCustomValidity("Enter a legitimate card number");
   } else {
      cardNumber.setCustomValidity("");
   }
}

function validateCredit() {
   var creditCard = document.forms.payment.elements.credit[0];
   if (creditCard.validity.valueMissing) {
      creditCard.setCustomValidity("Select your credit card");
   } else if (cardNumber.validity.patternMismatch) {
      creditCard.setCustomValidity("");
   } else {
      cardNumber.setCustomValidity("");
   }
}

function validateName() {
   var cardName = document.getElementById('cardName');
   if (cardName.validity.valueMissing) {
      cardName.setCustomValidity("Enter your name as it appears on your card");
   } else {
      cardName.setCustomValidity("");
   }
}

function sumDigits(numStr) {
   var dTotal = 0;
   for (var i = 0; i < numStr.length; i++) {
      dTotal += parseInt(numStr.charAt(i));
   }
   return dTotal;
}

function luhn(idNum) {
   // Retrieve the odd number digits
   for (var i = idNum.length-1; i >= 0; i-=2) {
      string1 += idNum.charAt(i);
   }
   //  Retrieve the even numbered digits
   for (var i = idNum.length-2; i >= 0; i-=1) {
      string2 += 2*idNum.charAt(i);
   }
   // Return whether the sum of the digits is divisible by 10
   return sumDigits(string1 + string2) % 10 === 0;
}