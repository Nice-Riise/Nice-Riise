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
    // Get the "dots" element
    var dots = document.getElementById("dots");
    // Get the "more" element
    var moreText = document.getElementById("more");
    // Get the button element
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      // If the "dots" element is not displayed,
      // set the display style of the "dots" element to "inline"
      dots.style.display = "inline";
      // Set the text of the button to "Show hobbies"
      btnText.innerHTML = "Show hobbies";
      // Set the display style of the "more" element to "none"
      moreText.style.display = "none";
      // Scroll the window up
      window.scrollTo({
        top: window.pageYOffset - 500,
        left: 0,
        behavior: "smooth"
      });
    } else {
      // If the "dots" element is displayed,
      // set the display style of the "dots" element to "none"
      dots.style.display = "none";
      // Set the text of the button to "Hide Hobbies"
      btnText.innerHTML = "Hide Hobbies";
      // Set the display style of the "more" element to "inline"
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



const likeButton = document.getElementById('like-button');
const dislikeButton = document.getElementById('dislike-button');
const likeCount = document.getElementById('like-count');
const dislikeCount = document.getElementById('dislike-count');

likeButton.addEventListener('click', () => {
  fetch('like.php')
    .then(response => response.json())
    .then(data => {
      likeCount.textContent = data.count;
    });
});

dislikeButton.addEventListener('click', () => {
  fetch('dislike.php')
    .then(response => response.json())
    .then(data => {
      dislikeCount.textContent = data.count;
    });
});




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
    var toggleBtn = document.querySelector(".fa-bars, .fa-times");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      toggleBtn.classList.remove("fa-bars");
      toggleBtn.classList.add("fa-times");
    } else {
      x.className = x.className.replace(" w3-show", "");
      toggleBtn.classList.remove("fa-times");
      toggleBtn.classList.add("fa-bars");
    }
  }
  


  //likebutton
  likebtn_get_vote('unique_identifier', function(response) {
    console.log(response);
  });


  

