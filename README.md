## from a technical challenge (part1), to a user-friendly solution ([part2](#part2)) to use of ai agents ([part3](#part3)).

# part1
<h2 id="part1"></h2>

# How to Run Gemma3:1b on Android

## Introduction

This guide will walk you through the steps to run the Gemma3 1b large language model on your Android device using Termux and Ollama. This allows you to experience the power of a capable AI model directly on your phone!

**Please note:** Running Gemma 3:1b requires a device with at least 8GB of RAM. Performance will vary depending on your device's hardware.

## Prerequisites

*   An Android device with at least 8GB of RAM and 20 GB free space.
*   A stable internet connection.
*   Patience! The initial download and setup can take some time. (downloading: Termux, (update), proot-distro, Ubuntu, (update), curl, ollama, gemma3:1b (around 5-6 GB of data, don't do it on mobile data))

## kill command is ctrl + c or ctrl + d , if you don't kill, processes will run in background 

## Steps

1.  **Install Termux:** Download and install Termux from the Google Play Store: [https://play.google.com/store/apps/details?id=com.termux](https://play.google.com/store/apps/details?id=com.termux)

2.  **Update and Upgrade Termux:** Open Termux and run the following command:

    ```bash
    apt update && apt upgrade -y
    ```

3.  **Install proot-distro:** Run the following command:

    ```bash
    apt install proot-distro
    ```

4.  **Login to Ubuntu:** Run the following command:

    ```bash
    proot-distro login ubuntu
    ```

    **And now you feel like a real hacker ;)**

5.  **Update and Upgrade Ubuntu (inside proot):**  After logging into Ubuntu, run:

    ```bash
    apt update && apt upgrade -y
    ```

6.  **Install Ollama:** First, install `curl`:

    ```bash
    apt install curl
    ```

    Then, install Ollama using the following command:

    ```bash
    curl -fsSL https://ollama.com/install.sh | sh
    ```

7.  **Start Ollama and Run Gemma:**  Open *three* Termux terminal windows. (Swipe from the left edge of the screen in Termux and click the "+" icon to create new terminals.)

    *   **Terminal 1:** Run:

        ```bash
        proot-distro login ubuntu
        ollama serve
        ```

    *   **Terminal 2:** Run:

        ```bash
        proot-distro login ubuntu
        ollama run gemma3:1b
        ```

        Gemma will be downloaded and started. This may take a while. You can interact with Gemma directly in this terminal (talk with it).

    *   **Terminal 3:** You can interact with Gemma here by: 

8.  **Interact with Gemma:**  In Terminal 3 (or any new terminal after starting `ollama serve` and `ollama run gemma3:1b`), you can interact with Gemma using the following command:

    ```bash
    ollama run gemma3:1b "prompt go here"
    ```

    Replace `"prompt go here"` with your desired prompt. Gemma will respond directly in the terminal.

9.  **Create an Alias (Optional):** To simplify the command, you can create an alias:

    ```bash
    alias gemma="ollama run gemma3:1b"
    ```

    Now you can simply type:

    ```bash
    gemma "prompt goes here"
    ```

## Troubleshooting

*   **"proot-distro" not found:** Ensure you have installed `proot-distro` correctly in step 3.
*   **Ollama download fails:** Check your internet connection.
*   **Slow performance:** Gemma 3B:1b is a relatively large model. Performance will be limited by your device's hardware. Expected waiting time is from 20 seconds to 5 minutes.

## Disclaimer

This guide is provided for informational purposes only. Running AI models on mobile devices can be resource-intensive and may impact battery life and performance. Use at your own risk.

## Part 2
<h2 id="part2"></h2>

# Ollama Connection App - Web Interface for Gemma3:1b on Android

## Introduction

This application provides a web interface for interacting with Gemma3:1b running on your Android device via Ollama. It allows you to send messages to the model and receive responses in a chat-like format. This builds upon the previous guide for running Gemma3:1b on Android using Termux and Ollama.

## Prerequisites

*   You must have completed the steps outlined in the [Gemma3:1b on Android - Termux & Ollama Setup] guide. This includes having Termux, proot-distro, and Ollama installed and running with Gemma3:1b downloaded.
*   Node.js and Git must be installed in Termux.

## Installation

1.  **Install Node.js and Git:**  With the Termux, run:

    ```bash
    apt update && apt upgrade -y
    apt install nodejs git
    ```

2.  **Clone the Repository:** Clone this repository using Git:

    ```bash
    git clone https://github.com/peterbabulik/Gemma3b-on-Android-.git
    ```

3.  **Navigate to the Project Directory:**

    ```bash
    cd Gemma3b-on-Android-
    ```

4.  **Install Dependencies:** Install the required Node.js packages:

    ```bash
    npm install
    ```
# if you have 'ollama run' and ' ollama serve gemma3:1b' running in 'proot-distro login ubuntu ' then:
 
```bash
    npm start
```
and go to: `http://localhost:3000` if not:

## Running the Application

1.  **Start Ollama:** Ensure Ollama is running in a separate Termux terminal window:

    ```bash
    proot-distro login ubuntu
    ollama serve
    ```

2.  **Run Gemma 3B:1b:**  In another Termux terminal window, start Gemma 3B:1b:

    ```bash
    proot-distro login ubuntu
    ollama run gemma3:1b
    ```

3.  **Start the Application:** In a *third* Termux terminal window, run:

    ```bash
    cd Gemma3b-on-Android-
    npm start
    ```

    This will start the Node.js server.

4.  **Access the Web Interface:** Open a web browser on your Android device (or a computer on the same network) and navigate to `http://localhost:3000`.  You should see the chat interface.

## Code Explanation (server.js)

The `server.js` file contains the core logic for the application. Here's a breakdown of the key components:

*   **Dependencies:**
    *   `express`: A web application framework for Node.js.
    *   `http`:  Used to create the HTTP server.
    *   `WebSocket`:  Used to create a WebSocket server for real-time communication.
    *   `path`:  Used for working with file paths.
    *   `axios`:  Used to make HTTP requests to the Ollama API.
    *   `body-parser`:  Used to parse JSON request bodies.

*   **Configuration:**
    *   `PORT`: The port number the server will listen on (defaults to 3000).
    *   `OLLAMA_URL`: The URL of the Ollama API (defaults to `http://localhost:11434`).
    *   `MODEL`: The name of the Ollama model to use (defaults to `gemma3:1b`).

*   **Middleware:**
    *   `express.static`: Serves static files from the `public` directory (e.g., `index.html`, CSS, JavaScript).
    *   `bodyParser.json`: Parses JSON request bodies.

*   **Chat History:**
    *   `chatHistory`: An array used to store the chat messages.

*   **WebSocket Server:**
    *   The `wss.on('connection')` event handler is triggered when a new client connects to the WebSocket server.
    *   It sends the current chat history to the new client.
    *   The `broadcast` function sends messages to all connected clients.

*   **API Routes:**
    *   `/api/chat`:  Handles incoming chat messages. It sends the message to Ollama, receives the response, and broadcasts both the user message and the assistant's response to all connected clients.
    *   `/api/model`: Fetches model information from the Ollama API.
    *   `/api/clear`: Clears the chat history.
    *   `/`: Serves the `index.html` file. from ./public/ folder

*   **Server Startup:**
    *   The server listens on the specified port and logs a message to the console.

## Public Directory (public/)

The `public` directory contains the `index.html` file, which provides the user interface for the chat application.

## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues on GitHub.

## License

[MIT License](LICENSE)

## Part 3
<h2 id="part3"></h2>

# Agentic D&D Simulation with Gemma 3B:1b and Ollama

## Introduction

This project demonstrates how to create an agentic Dungeons & Dragons (D&D) simulation using Gemma 3:1b and Ollama. It showcases a basic game loop where the Game Master (AI) and player characters (AI) interact, driven by prompts sent to the LLM. This builds upon the previous guides for running Gemma 3:1b on Android and creating a web interface to interact with the Ollama API.

## Prerequisites

*   You must have completed the steps in ([part1](#part1)) and ([part2](#part2))
*   Node.js and npm must be installed within the in Termux.
*   Ollama must be running with Gemma 3:1b downloaded.

## Installation

1.  **Clone the Repository:** In your Termux Ubuntu environment, run:

    ```bash
    git clone https://github.com/peterbabulik/D-D-AI-locally.git
    ```

2.  **Navigate to the Project Directory:**

    ```bash
    cd D-D-AI-locally
    ```

3.  **Initialize npm:**

    ```bash
    npm init -y
    ```

4.  **Install Dependencies:**

    ```bash
    npm install node-fetch fs
    ```
# if ollama is running and gemma3:1b is loaded:

```bash
    node index.js
```
# if not:

## Running the Simulation

1.  **Start Ollama:** Ensure Ollama is running in a separate Termux terminal window:

    ```bash
    proot-distro login ubuntu 
    ollama serve
    ```

2.  **Run Gemma 3:1b:** In another Termux terminal window, start Gemma 3:1b:

    ```bash
    proot-distro login ubuntu 
    ollama run gemma3:1b
    ```

3.  **Start the Simulation:** In a third Termux terminal window, run:

    ```bash
    cd D-D-AI-locally
    node index.js
    ```

    The simulation will begin, and the Game Master and player characters will take turns interacting.

## Code Explanation

*   **`index.js`:** This is the main file that orchestrates the D&D simulation.
    *   **Database Operations:** Functions `loadDatabase` and `saveToDatabase` handle loading and saving the game state to a JSON file (`dnd_campaign.json`).
    *   **Ollama Communication:** The `askOllama` function sends prompts to the Ollama API and retrieves responses.
    *   **Context Generation:** `generateGameMasterContext` and `generatePlayerContext` create prompts for the Game Master and player characters, respectively, based on the current game state and character details.
    *   **Game Loop:** The `runGame` function implements the main game loop, where the Game Master and players take turns, and the game state is updated based on their actions.
    *   **Campaign Analysis:** `analyzeCharacter` and `analyzeCampaign` functions provide insights into character actions and the overall campaign state.
*   **`characters.js`:** This file defines the characters in the game, including their roles, races, classes, abilities, and personalities.

## Key Concepts

*   **Agentic Simulation:** The simulation is driven by LLM-powered agents (the Game Master and player characters) who respond to prompts based on their roles and the current game state.
*   **Contextual Prompts:** The prompts sent to the LLM are carefully crafted to provide the necessary context for the agents to make informed decisions.
*   **Game State Management:** The `dnd_campaign.json` file stores the game state, including the location, quest, inventory, and character health.
*   **Iterative Gameplay:** The game loop allows for iterative gameplay, where the actions of the agents influence the game state and subsequent prompts.

## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues on GitHub.

## License

[MIT License](LICENSE)
