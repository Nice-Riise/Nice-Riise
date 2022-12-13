// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }
  
  // Change style of navbar on scroll
  window.onscroll = function() {myFunction()};
  function myFunction() {
      var navbar = document.getElementById("myNavbar");
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
      } else {
          navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
      }
  }
  
  // Used to toggle the menu on small screens when clicking on the menu button
  function toggleFunction() {
      var x = document.getElementById("navDemo");
      if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
      } else {
          x.className = x.className.replace(" w3-show", "");
      }
  }
  
  

function myFunctionBtn() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Show hobbies"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Hide Hobbies"; 
    moreText.style.display = "inline";
  }
}

/* make a futuristic modern analog clock with numbers */
var clock = document.createElement('MyClock');
clock.style.position = 'absolute';
clock.style.top = '70%';
clock.style.left = '50%';
clock.style.transform = 'translate(-50%, -50%)';
clock.style.fontSize = '50px';
clock.style.fontFamily = 'monospace';
clock.style.color = '#fff';
clock.style.textShadow = '0 0 10px #fff';
clock.style.userSelect = 'none';
document.body.appendChild(clock);
function updateClock() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  clock.innerHTML = time;
}
setInterval(updateClock, 1000);






