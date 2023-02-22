import dotenv from 'dotenv';
dotenv.config();

      
// Retrieve API key from environment variable
const apiKey = process.env.OPENAI_API_KEY;

// Check if API key is set
if (!apiKey) {
  console.error('Error: OPENAI_API_KEY environment variable not set.');
  process.exit(1);
}

const chatWindow = document.getElementById("messages");
const inputField = document.getElementById("input");

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
  addChatEntry("bot", "Typing...");

  fetch("https://api.openai.com/v1/engines/davinci-codex/completions", requestOptions)
    .then(response => response.json())
    .then(data => {
      let product = data.choices[0].text;
      product = product.slice(0, product.lastIndexOf(".")) + ".";
      addChatEntry("bot", product);
    })
    .catch(error => console.error(error));
}

function addChatEntry(sender, message) {
  const messagesContainer = document.getElementById("messages");

  let chatDiv = document.createElement("div");
  chatDiv.className = `${sender} response`;
  chatDiv.innerHTML = `<span>${message}</span>`;
  messagesContainer.appendChild(chatDiv);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

inputField.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    event.preventDefault();
    let input = inputField.value.trim();
    if (input) {
      sendMessage(input);
      inputField.value = "";
    }
  }
});

