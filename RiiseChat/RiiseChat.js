const apiKey = '';
const chatWindow = document.getElementById('messages');
const inputField = document.getElementById('input');
const submitButton = document.getElementById('submit-button');
const thinkingImage = document.querySelector('.thinking-image');

function sendMessage(input) {
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: input,
      max_tokens: 150,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })
  };

  addChatEntry("user", input);
  addChatEntry("BotoCop", "BotoCop is typing...");
  showThinkingImage(); // show the thinking image

  fetch("https://api.openai.com/v1/engines/davinci-codex/completions", requestOptions)
    .then(response => response.json())
    .then(data => {
      let product = data.choices[0].text;
      product = product.slice(0, product.lastIndexOf(".")) + ".";
      let humanWords = product.split(" ").filter(word => !word.includes('\x07')).join(" ");
      addChatEntry("BotoCop", humanWords);
      setTimeout(() => {
        hideThinkingImage(); // hide the thinking image
      }, 3000); // hide the thinking image after 2 seconds

    })
    .catch(error => {
      console.error(error);
      addChatEntry("BotoCop", "Sorry, I'm resting. Please try again later.");
      hideThinkingImage(); // hide the thinking image in case it's still showing
    });
}

function addChatEntry(sender, message) {
  const messagesContainer = document.getElementById('messages');

  let chatDiv = document.createElement('div');
  chatDiv.className = `${sender} response`;
  chatDiv.innerHTML = `<span>${message}</span>`;
  
  if (sender === "user") {
    chatDiv.classList.add("userColor");
  } else if (sender === "BotoCop") {
    chatDiv.classList.add("roboColor");
  }
  
  messagesContainer.appendChild(chatDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


function handleSubmit(event) {
  event.preventDefault(); // prevent the default form submission behavior
  let input = inputField.value.trim();
  if (input) {
    sendMessage(input);
    inputField.value = '';
  }
}

inputField.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    event.preventDefault();
    handleSubmit(event);
  }
});

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  handleSubmit(event);

  submitButton.classList.add('clicked');
  setTimeout(() => {
    submitButton.classList.remove('clicked');
  }, 500);
});

// Initial bot message
addChatEntry('BotoCop', 'Hi there Human! My Name Is BotoCop! How can I help you?');

function showThinkingImage() {
  thinkingImage.style.display = 'block';
}

function hideThinkingImage() {
  thinkingImage.style.display = 'none';
}

function positionThinkingImage() {
  if (window.innerWidth <= 767) {
    thinkingImage.style.top = "-250px";
    thinkingImage.style.left = "calc(-5% - 40px)";
    thinkingImage.style.transform = "scale(0.07)";
  } else {
    thinkingImage.style.top = "";
    thinkingImage.style.left = "";
    thinkingImage.style.transform = "";
  }
}

// call the function once to initialize the position
positionThinkingImage();

// call the function on window resize events
window.addEventListener("resize", positionThinkingImage);


