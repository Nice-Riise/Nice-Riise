const chatContainer = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

const apiKey = "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";

function sendMessage(message) {
  const messageElement = addMessage(message, "user", "pending");
  
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: message,
      max_tokens: 100,
      n: 1,
      stop: ["\n"]
    })
  };

  fetch("https://api.openai.com/v1/engines/davinci-codex/completions", requestOptions)
    .then(response => response.json())
    .then(data => {
      const response = data.choices[0].text.trim();
      updateMessageStatus(messageElement, "sent");
      addMessage(response, "bot");
    })
    .catch(error => {
      console.error(error);
      updateMessageStatus(messageElement, "failed");
    });
}

function addMessage(message, sender, status) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(sender);
  messageElement.classList.add(status);
  messageElement.innerText = message;
  chatContainer.appendChild(messageElement);
  
  return messageElement;
}

function updateMessageStatus(messageElement, status) {
  messageElement.classList.remove("pending");
  messageElement.classList.add(status);
}

chatForm.addEventListener("submit", event => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (message) {
    sendMessage(message);
    chatInput.value = "";
  }
});
