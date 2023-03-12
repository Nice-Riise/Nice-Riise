
 /* const API_KEY = "S0FjPAfa6lRHDpf8PC0rJ70wFv9LAfmi";
  const BASE_CURRENCY = 'CAD';

  // Get DOM elements
  const fromCurrencySelect = document.getElementById('fromCurrency');
  const targetCurrencySelect = document.getElementById('targetCurrency');
  const amountInput = document.getElementById('Amount');
  const convertButton = document.getElementById('convert');
  const resultDiv = document.getElementById('result');

  // Add event listener for button click
  convertButton.addEventListener('click', convertCurrency);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  // Make API call to get exchange rates and populate select elements
  fetch(`https://api.exchangeratesapi.io/latest?base=${BASE_CURRENCY}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      // Populate select elements with options
      for (const [currency, rate] of Object.entries(data.rates)) {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrencySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        targetCurrencySelect.appendChild(option2);
      }
    })
    .catch(error => console.error(error));

  // Conversion function
  function convertCurrency() {
    const fromCurrency = fromCurrencySelect.value;
    const targetCurrency = targetCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    // Check if amount is valid
    if (isNaN(amount)) {
      alert('Please enter a valid amount.');
      return;
    }

    // Make API call to get exchange rate
    fetch(`https://api.apilayer.com/v1/convert?access_key=${API_KEY}&from=${fromCurrency}&to=${targetCurrency}&amount=${amount}`)
      .then(response => response.json())
      
      .then(data => {
        // Display result in DOM
        resultDiv.textContent = `${amount.toFixed(2)} ${fromCurrency} = ${data.result.toFixed(2)} ${targetCurrency}`;
      })
      .catch(error => console.error(error));
  }
});

*/


document.addEventListener("DOMContentLoaded", function() {

  var myHeaders = new Headers();
myHeaders.append("apikey", "uOrs6KRs7vGfeozyqa2pS7CETeEigsuz");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

    document.querySelector("form").onsubmit = function() {
      
      fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=USD%2CEUR%2CJPY%2CGBP%2CAUD%2CCAD%2CCHF%2CCNY%2CSEK%2CNZD%2CMXN%2CNOK%2CKRW%2CTRY%2CINR%2CARS%2CBRL%2CRUB%2CIDR%2CZAR%2CPHP%2CCZK%2CDKK%2CHKD%2CHUF%2CILS%2CMYR%2CPLN%2CSGD%2CTHB%2CCLP%2CIDR%2CILS%2CMYR%2CPLN%2CQAR%2CTWD%2CAED%2CSAR%2CARS%2CNGN%2CBGN%2CHRK%2C&base=USD", requestOptions)
  .then(response => response.json())
  .then(data => {

    const currency = document.querySelector("#currency").value.toUpperCase();
    const rate = data.rates[currency];

    if (rate !== undefined) {

      document.querySelector("#result").innerHTML = `1 USD is equal to ${rate.toFixed(2)} ${currency}.`
    } else {
      document.querySelector("#result").innerHTML = "Invalid Currency."
    }
  })
      .catch(error => {
        console.log("Error", error);
      });
      
    

    return false;
    };


});
  
