const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Function to identify palindromes
const findPalindromes = (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g);  // Gets all words
    return words.filter(word => word === word.split('').reverse().join(''));  // Checks if word is palindrome
};

// Defines the character and palindrome analysis endpoint (POST)
app.post('/functions/palindromeFinder', (req, res) => {
    const { inputText } = req.body;

    // Checks if inputText exists
    // if (!inputText) {
    //     return res.status(400).send({ error: 'inputText is required' });
    // }

    // Calculates character count
    const characterCount = inputText.length;

    // Finds palindromic words
    const palindromes = findPalindromes(inputText);

    // Sends result back
    res.send({ characterCount, palindromes });
});

// Defines the documentation endpoint (GET)
app.get('/functions/palindromeFinder', (req, res) => {
    res.send({
        name: 'palindromeFinder',
        description: 'Counts characters and finds palindromic words in the text',
        input: {
            type: 'string',
            description: 'Text to analyze for palindromic words',
            example: 'madam racecar apple',
        },
        output: {
            type: 'object',
            description: 'Object with character count and list of palindromic words',
            example: { characterCount: 22, palindromes: ['madam', 'racecar'] },
        }
    });
});

// Starts the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// TODO add token
