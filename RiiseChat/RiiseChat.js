const apiKey = 'Y';
const chatWindow = document.getElementById('messages');
const inputField = document.getElementById('input');
const submitButton = document.getElementById('submit-button');
const thinkingImage = document.querySelector('.thinking-image');

var meldinger = [
  {"role": "system", "content": "You are a helpful assistant."},
  ]


function sendMessage(input) {
  if (!apiKey) {
    addChatEntry("BotoCop", "Sorry, I'm resting. Please try again later.");
    return;
  }

  meldinger.push({"role":"user", "content":input})

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      max_tokens: 25,
      messages: meldinger,
      
      model: "gpt-3.5-turbo",
     
    })
  };

  addChatEntry("user", input);
  addChatEntry("BotoCop", "BotoCop is typing...");

  fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then(response => response.json())
    .then(data => {
      let product = data.choices[0].message.content;
     
      addChatEntry("BotoCop", product);
      meldinger.push(data.choices[0].message);
      console.log(data);
      inputField.value = '';
    })
    .catch(error => {
      console.error(error);
      addChatEntry("BotoCop", "Sorry, I'm resting. Please try again later.");
      inputField.value = '';
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


inputField.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    event.preventDefault();
    let input = inputField.value.trim();
    if (input) {
      sendMessage(input);
    }
    inputField.value = '';
  }
});

// Initial bot message
addChatEntry('BotoCop', 'Greetings Human! My Name Is BotoCop! How can I help you?');







//button click
submitButton.addEventListener('click', (event) => {
  event.preventDefault();

  submitButton.classList.add('clicked');
  setTimeout(() => {
    submitButton.classList.remove('clicked');
  }, 500);

  let input = inputField.value.trim();
  if (input) {
    sendMessage(input);
    
  }
});

let timeoutId;

inputField.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    event.preventDefault();
    let input = inputField.value.trim();
    if (input) {
      addChatEntry("user", input);
      toggleThinkingImage(true); // Show the lightbulb when the user starts typing
      sendMessage(input);
    }
    inputField.value = '';
  } else {
    clearTimeout(timeoutId); // Cancel the previous setTimeout
    toggleThinkingImage(true); // Show the lightbulb 
  }
});

inputField.addEventListener('keyup', (event) => {
  if (event.code !== 'Enter') {
    timeoutId = setTimeout(() => {
      toggleThinkingImage(false); // Hide the lightbulb 
    }, 6000);
  }
});




function toggleThinkingImage(isTyping) {
  const thinkingImage = document.querySelector('.thinking-image');
  if (isTyping) {
    chatWindow.appendChild(thinkingImage); // Add thinking image to chat window???????
    thinkingImage.style.display = 'block'; // Show thinking image
  } else {
    thinkingImage.style.display = 'none'; // Hide thinking image
  }
}