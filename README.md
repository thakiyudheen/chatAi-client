# Chat Application with Bot

This project is a real-time chat application with bot integration, built using React, TypeScript, Vite, and Socket.IO for WebSocket communication. The chat app also ensures secure rendering of dynamic HTML responses from the bot using HTML sanitization.

## Features

- **Real-time Communication**: Powered by Socket.IO for client-server communication.
- **Tailwind CSS**: Fully styled using Tailwind CSS for a responsive and modern design.
- **Bot Integration**: Chat bot responds to user input with dynamically generated HTML, which is sanitized and safely injected into the DOM.
- **TypeScript Support**: Ensures type safety across the application.
- **HTML Sanitization**: To prevent XSS attacks, all bot responses are sanitized using `DOMPurify`.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/chat-app-bot.git
   cd chat-app-bot
