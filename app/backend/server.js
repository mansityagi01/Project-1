const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();  // Loads the environment variables from the .env file

const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Define the POST endpoint to communicate with OpenAI API
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).send({ error: 'Message is required' });
    }

    try {
        // Make a request to OpenAI API
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',  // OpenAI model you want to use
                prompt: userMessage,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  // The API key from .env
                    'Content-Type': 'application/json',
                },
            }
        );

        // Extract the OpenAI response and send it back to the frontend
        const answer = response.data.choices[0].text.trim();
        res.send({ reply: answer });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch response from OpenAI' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
