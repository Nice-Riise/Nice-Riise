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
clock.style.fontSize = '100px';
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




// like dislike button


var likeButton = document.createElement('button');
likeButton.innerHTML = '&#128077';
likeButton.style.backgroundColor = 'transparent';
likeButton.style.color = 'white';
likeButton.style.fontWeight = 'bold';
likeButton.style.fontFamily = 'Arial';
likeButton.style.fontSize = '50px';
likeButton.style.borderRadius = '5px';
likeButton.style.padding = '10px';
likeButton.style.margin = '10px';
likeButton.style.cursor = 'pointer';
document.body.appendChild(likeButton);
var dislikeButton = document.createElement('button');
dislikeButton.innerHTML = '&#128078';
dislikeButton.style.backgroundColor = 'transparent';
dislikeButton.style.color = 'white';
dislikeButton.style.fontWeight = 'bold';
dislikeButton.style.fontFamily = 'Arial';
dislikeButton.style.fontSize = '50px';
dislikeButton.style.borderRadius = '5px';
dislikeButton.style.padding = '10px';
dislikeButton.style.margin = '10px';
dislikeButton.style.cursor = 'pointer';
document.body.appendChild(dislikeButton);
var likeCounter = 0;
var dislikeCounter = 0;
likeButton.addEventListener('click', function() {
  likeCounter++;
  likeCounterDisplay.innerHTML = likeCounter;
});
dislikeButton.addEventListener('click', function() {
  dislikeCounter++;
  dislikeCounterDisplay.innerHTML = dislikeCounter;
});
var likeCounterDisplay = document.createElement('div');
likeCounterDisplay.innerHTML = likeCounter;
likeCounterDisplay.style.fontSize = '20px';
likeCounterDisplay.style.fontFamily = 'Arial';
likeCounterDisplay.style.fontWeight = 'bold';
likeCounterDisplay.style.color = 'white';
likeCounterDisplay.style.margin = '220px';
document.body.appendChild(likeCounterDisplay);
var dislikeCounterDisplay = document.createElement('div');
dislikeCounterDisplay.innerHTML = dislikeCounter;
dislikeCounterDisplay.style.fontSize = '20px';
dislikeCounterDisplay.style.fontFamily = 'Arial';
dislikeCounterDisplay.style.fontWeight = 'bold';
dislikeCounterDisplay.style.color = 'white';
dislikeCounterDisplay.style.margin = '220px';
document.body.appendChild(dislikeCounterDisplay);
/* font not bold */

likeButton.style.fontWeight = 'normal';
dislikeButton.style.fontWeight = 'normal';
/* move the buttons to the center and 20% down from top */

likeButton.style.position = 'absolute';
likeButton.style.top = '20%';
likeButton.style.left = '60%';
dislikeButton.style.position = 'absolute';
dislikeButton.style.top = '20%';
dislikeButton.style.left = '60%';
/* like on the left side and dislike on the right */

likeButton.style.left = '40%';
dislikeButton.style.left = '60%';
/* no borders */

likeButton.style.border = 'none';
dislikeButton.style.border = 'none';
/* no rounded edges */

likeButton.style.borderRadius = '0px';
dislikeButton.style.borderRadius = '0px';
/* move the numbers to top center */

likeCounterDisplay.style.position = 'absolute';
likeCounterDisplay.style.top = '0%';
likeCounterDisplay.style.left = '50%';
dislikeCounterDisplay.style.position = 'absolute';
dislikeCounterDisplay.style.top = '0%';
dislikeCounterDisplay.style.left = '50%';
/* numbers like on left and number dislike on the right */

likeCounterDisplay.style.left = '29%';
dislikeCounterDisplay.style.left = '49%';
/* only one click per visitor */

likeButton.addEventListener('click', function() {
  likeButton.disabled = true;
  dislikeButton.disabled = true;
});
dislikeButton.addEventListener('click', function() {
  likeButton.disabled = true;
  dislikeButton.disabled = true;
});


// visitor graph IN PROGRESS

var visitorCounter = 0;
var visitorCounterDisplay = document.createElement('div');
visitorCounterDisplay.innerHTML = visitorCounter;
visitorCounterDisplay.style.fontSize = '20px';
visitorCounterDisplay.style.fontFamily = 'Arial';
visitorCounterDisplay.style.fontWeight = 'bold';
visitorCounterDisplay.style.color = 'black';
visitorCounterDisplay.style.margin = '10px';
visitorCounterDisplay.style.position = 'absolute';
visitorCounterDisplay.style.top = '0%';
visitorCounterDisplay.style.left = '50%';
document.body.appendChild(visitorCounterDisplay);
visitorCounter++;
visitorCounterDisplay.innerHTML = visitorCounter;