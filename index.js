const express = require('express');
const multer = require('multer');
const pdfCharacterCount = require('./pdfCharacterCount.js'); // Import function handler

const app = express();
const PORT = 3000;
const upload = multer();

// Defines the PDF character count function endpoint (POST)
app.post('/functions/pdfCharacterCount', upload.single('pdf'), pdfCharacterCount);

// Defines the documentation endpoint (GET)
app.get('/functions/pdfCharacterCount', (req, res) => {
    res.json({
        name: 'pdfCharacterCount',
        description: 'Counts the number of characters in a PDF file',
        input: {
            type: 'file',
            description: 'A PDF file to analyze',
            example: 'sample.pdf',
        },
        output: {
            type: 'number',
            description: 'The total number of characters in the PDF',
            example: 1024,
        }
    });
});

// Starts the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

