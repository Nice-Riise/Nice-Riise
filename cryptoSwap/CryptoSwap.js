
//.sort top 10 cryptocoins from coin paprika
// api from 3 diferent locations in 1inch. to get actual 10 (different tokens)
 
async function getTop10Tokens() {
  const response = await fetch('https://api.coinpaprika.com/v1/coins');
  const tokens = await response.json();
  return tokens.filter(token => token.rank  >= 1 && token.rank <= 40).map(token => token.symbol);
}

async function getTicerData(ticerList) {
  const response = await fetch('https://api.1inch.exchange/v3.0/56/tokens');
  const tokens = await response.json();
  const tokenList = [...Object.values(tokens.tokens)];
  return tokenList.filter(token => ticerList.includes(token.symbol));
}

function renderForm(tokens) {
  const options = tokens.map(token => 
      `<option value="${token.decimals}-${token.address}">${token.name} (${token.symbol})</option>`);
  document.querySelector('select[name=from-token]').innerHTML = options;
  document.querySelector('select[name=to-token]').innerHTML = options;
}

async function formSubmitted(event) {
  event.preventDefault();
  const fromToken = document.querySelector('select[name=from-token]').value;
  const toToken = document.querySelector('select[name=to-token]').value;
  const [fromDecimals, fromAddress] = fromToken.split('-');
  const [toDecimals, toAddress] = toToken.split('-');
  const fromUnit = 10 ** fromDecimals;
  const decimalRatio = 10 ** (toDecimals - fromDecimals);
  if (isNaN(fromUnit)) {
    console.log("amount should be a number string ");
    return;
  }
  const url = `https://api.1inch.io/v3.0/56/quote?fromTokenAddress=${fromAddress}&toTokenAddress=${toAddress}&amount=${fromUnit}`;
  const response = await fetch(url);
  const quote = await response.json();

  // Calculate the gas fee and format the output with a decimal separator based on its value
  const gasFee = quote.estimatedGas;
  const gasFeeNumber = Number(gasFee);
  const useCommaDecimalSeparator = gasFeeNumber >= 1; // Use comma for values >= 1
  const gasFeeString = useCommaDecimalSeparator ? gasFeeNumber.toLocaleString('de-DE') : gasFee; // Use comma separator for gasFee >= 1

  // Calculate the exchange rate and format the output with a decimal separator based on its value
  const exchangeRate = Number(quote.toTokenAmount) / Number(quote.fromTokenAmount) / decimalRatio;
  const usePeriodDecimalSeparator = exchangeRate < 1; // Use period for values < 1
  const exchangeRateString = usePeriodDecimalSeparator ? exchangeRate.toFixed(6) : exchangeRate.toFixed(2); // Use period separator for exchangeRate < 1

  // Update the HTML with the formatted output
  document.querySelector('.js-result-quote-container').innerHTML = `
    <h5>1 ${quote.fromToken.symbol} = ${exchangeRateString} ${quote.toToken.symbol}</h5>
    <h6>EST GasFee = ${gasFeeString}</h6>
  `;
}


    document
    .querySelector('button.SwapPrice')
    .addEventListener('click', formSubmitted);


getTop10Tokens()
.then(getTicerData)
.then(renderForm);



// Tabbed Menu
function openMenu(evt, menuName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("menu");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-dark-grey", "");
  }
  document.getElementById(menuName).style.display = "block";
  evt.currentTarget.firstElementChild.className += " w3-dark-grey";
}
document.getElementById("myLink").click();


function openMenu(evt, menuName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("menu");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.remove("w3-light-grey");
  }
  document.getElementById(menuName).style.display = "block";
  evt.currentTarget.firstElementChild.classList.add("w3-light-grey");
}

document.addEventListener("DOMContentLoaded", function() {
  var gasFeeMenu = document.createElement("div");
  gasFeeMenu.id = "gasfee";
  gasFeeMenu.classList.add("w3-container", "menu", "w3-padding-48", "w3-card");
  gasFeeMenu.innerHTML = `
    <h5>Calculate Gas Fee</h5>
    <form>
      <label for="swap-price">Swap Price:</label>
      <input type="number" id="swap-price" name="swap-price" step="0.0001" required><br>
      <label for="gas-limit">Gas Limit:</label>
      <input type="number" id="gas-limit" name="gas-limit" step="1" required><br>
      <label for="gas-price">Gas Price (Gwei):</label>
      <input type="number" id="gas-price" name="gas-price" step="1" required><br>
      <button type="button" onclick="calculateGasFee()">Calculate Gas Fee</button>
    </form>
    <div id="gas-fee"></div>
  `;
  document.getElementById("menu").appendChild(gasFeeMenu);

  var swapMenuButton = document.createElement("div");
  swapMenuButton.classList.add("w3-col", "s3", "tablink");
  swapMenuButton.innerHTML = `<a href="javascript:void(0)" onclick="openMenu(event, 'gasfee');"><div>Calculate Gas Fee</div></a>`;
  document.getElementById("myLink").parentNode.insertBefore(swapMenuButton, document.getElementById("myLink").nextSibling);
});

function calculateGasFee() {
  const swapPrice = document.getElementById('swap-price').value;
  const gasLimit = document.getElementById('gas-limit').value;
  const gasPrice = document.getElementById('gas-price').value;
  const gasFee = (swapPrice * gasLimit * gasPrice) / 1000000000;
  document.getElementById('gas-fee').innerHTML = `Gas Fee: ${gasFee} ETH`;
}

function openMenu(evt, menuName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("menu");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.remove("selected");
  }
  document.getElementById(menuName).style.display = "block";
  evt.currentTarget.firstElementChild.classList.add("selected");
}
