const sendButton = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messagesDiv = document.getElementById("messages");

sendButton.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        const message = document.createElement("p");
        message.textContent = `You: ${userMessage}`;
        messagesDiv.appendChild(message);
        userInput.value = "";
    }
});
