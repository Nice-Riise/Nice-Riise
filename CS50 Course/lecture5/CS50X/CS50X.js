// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}


//Currency Converter 


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
  //currency Converter END.....

  //Counter Start

let counter = 0;

function count() {
    counter++;
    document.querySelector("#liveCounter").innerHTML = counter;

    if (counter % 10 === 0) {
        alert(`the count is now ${counter}`);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("button").onclick = count;
}); 
//Counter END...