
//.sort top 10 cryptocoins from coin paprika
// api from 3 diferent locations in 1inch. to get actual 10 (different tokens)
 
async function getTop10Tokens() {

    const response = await fetch('https://api.coinpaprika.com/v1/coins');
    const tokens = await response.json();
return tokens.filter(token => token.rank  >= 1 && token.rank <= 10).map(token => token.symbol);

}


async function getTicerData(ticerList) {

   const [response1, response2, response3] = await Promise.all([
                          fetch('https://api.1inch.exchange/v3.0/1/tokens'),
                          fetch('https://api.1inch.exchange/v3.0/137/tokens'),
                          fetch('https://api.1inch.exchange/v3.0/56/tokens')
]);
const tokens1 = await response1.json();
const tokens2 = await response2.json();
const tokens3 = await response3.json();
const tokenList = [...Object.values(tokens1.tokens), ...Object.values(tokens2.tokens), ...Object.values(tokens3.tokens)];
return tokenList.filter(token => ticerList.includes(token.symbol));
}

function renderForm(tokens) {

    const options = tokens.map(token => 
        `<option value="${token.decimals}-${token.address}">${token.name} (${token.symbol})</option>`);
 
        document
        .querySelector('select[name=from-token]')
        .innerHTML = options;
        document
        .querySelector('select[name=to-token]')
        .innerHTML = options;
        
    }

async function formSubmitted(event) {
    event.preventDefault();
    const fromToken = document.querySelector('select[name=from-token]').value;
    const toToken = document.querySelector('select[name=to-token]').value;
    const [fromDecimals, fromAddress] = fromToken.split('-');
    const [toDecimals, toAddress] = toToken.split('-');
    const fromUnit = 10 ** fromDecimals; 
    if(isNaN(fromUnit)){
        console.log("amount should be a number string ");
        return;
    }
    const url = `https://api.1inch.io/v5.0/1/quote?fromTokenAddress=${fromAddress}&toTokenAddress=${toAddress}&amount=${fromUnit}`;

    const response = await fetch(url);
    const quote = await response.json();
    const exchangeRate = Number(quote.toTokenAmount) / Number(quote.fromTokenAmount);
    document.querySelector('.js-result-quote-container').innerHTML = `
            <h4>1 ${quote.fromToken.symbol} = ${exchangeRate} ${quote.toToken.symbol}</h4>
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



