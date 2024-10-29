import pdfParse from 'pdf-parse';

const pdfCharacterCount = async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).send({ error: 'PDF file is required' });
        }

        const data = await pdfParse(req.file.buffer);
        const text = data.text;
        const characterCount = text.length;
        res.send({ output: characterCount });
    } catch (error) {
        console.error('Error counting characters in PDF:', error);
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
};

export default pdfCharacterCount;
