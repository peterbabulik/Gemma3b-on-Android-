# How to Run Gemma 3B:1b on Android

## Introduction

This guide will walk you through the steps to run the Gemma3 1b large language model on your Android device using Termux and Ollama. This allows you to experience the power of a capable AI model directly on your phone!

**Please note:** Running Gemma 3B:1b requires a device with at least 8GB of RAM. Performance will vary depending on your device's hardware.

## Prerequisites

*   An Android device with at least 8GB of RAM and 20 GB free space.
*   A stable internet connection.
*   Patience! The initial download and setup can take some time. (downloading: Termux, (update), proot-distro, Ubuntu, (update), curl, ollama, gemma3:1b (around 5-6 GB of data, don't do it on mobile data))

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
        ollama serve
        ```

    *   **Terminal 2:** Run:

        ```bash
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
