// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;
const OLLAMA_URL = 'http://localhost:11434';
const MODEL = 'gemma3:1b';

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Store chat history in memory
const chatHistory = [];

// Websocket connection
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send current chat history to new client
  ws.send(JSON.stringify({
    type: 'history',
    data: chatHistory
  }));
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Broadcast to all clients
function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// API routes
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Add user message to history
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    chatHistory.push(userMessage);
    broadcast({ type: 'message', data: userMessage });

    // Start timing
    const startTime = Date.now();

    // Format the request for Ollama
    const ollamaRequest = {
      model: MODEL,
      prompt: message,
      options: {
        num_predict: 1024,
      },
      stream: false
    };

    // Send request to Ollama
    const response = await axios.post(`${OLLAMA_URL}/api/generate`, ollamaRequest);
    
    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Process the response
    const responseData = response.data;
    const assistantMessage = {
      role: 'assistant',
      content: responseData.response,
      timestamp: new Date().toISOString(),
      metadata: {
        responseTime: responseTime,
        tokenCount: responseData.eval_count,
        promptEval: responseData.prompt_eval_count,
        totalEval: responseData.eval_count,
      }
    };

    // Add assistant message to history
    chatHistory.push(assistantMessage);
    broadcast({ type: 'message', data: assistantMessage });

    res.json({ success: true, message: assistantMessage });
  } catch (error) {
    console.error('Error communicating with Ollama:', error);
    res.status(500).json({ 
      error: 'Failed to communicate with Ollama',
      details: error.message 
    });
  }
});

// Get model information
app.get('/api/model', async (req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_URL}/api/show`, {
      params: { name: MODEL }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching model info:', error);
    res.status(500).json({ 
      error: 'Failed to fetch model information',
      details: error.message 
    });
  }
});

// Clear chat history
app.post('/api/clear', (req, res) => {
  chatHistory.length = 0;
  broadcast({ type: 'history', data: [] });
  res.json({ success: true });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Using Ollama model: ${MODEL}`);
  console.log(`Web interface available at http://localhost:${PORT}`);
});

