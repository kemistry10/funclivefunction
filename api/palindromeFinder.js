// api/palindromeChecker.js
const findPalindromes = (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    return words.filter(word => word === word.split('').reverse().join(''));
};

export default (req, res) => {
    if (req.method === 'POST') {
        const { inputText } = req.body;

        if (!inputText) {
            return res.status(400).json({ error: 'inputText is required' });
        }

        const characterCount = inputText.length;
        const palindromes = findPalindromes(inputText);

        res.status(200).json({ characterCount, palindromes });
    } else if (req.method === 'GET') {
        res.status(200).json({
            name: 'palindromeFinder',
            description: 'Counts characters and finds palindromic words in the provided text',
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
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
