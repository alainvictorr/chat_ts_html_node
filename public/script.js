const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

userInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const message = userInput.value;
  if (message.trim() === '') return;

  const userMessageDiv = document.createElement('div');
  userMessageDiv.textContent = `You: ${message}`;
  userMessageDiv.className = 'message user-message';
  messagesDiv.appendChild(userMessageDiv);

  // Scroll to the bottom
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    const botMessageDiv = document.createElement('div');
    botMessageDiv.textContent = `Bot: ${data.response}`;
    botMessageDiv.className = 'message bot-message';
    messagesDiv.appendChild(botMessageDiv);

    // Scroll to the bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (error) {
    console.error('Error:', error);
  }

  userInput.value = '';
}
