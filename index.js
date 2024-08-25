const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory storage for demonstration purposes
let dataStore = [];

function processData(request) {
    const { data } = request;

    console.log(data);

    // Separate numbers and alphabets
    const numbers = [];
    const alphabets = [];

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
        }
    });

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(char => /[a-z]/.test(char));
    let highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    // Build the response object
    const response = {
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    return response;
}

// GET route to retrieve data
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// POST route to add data
app.post('/bfhl', (req, res) => {
    const newData = req.body;

    // Basic validation
    if (!newData || !newData.data) {
        return res.status(400).json({ error: 'Data is required' });
    }

    const commonObj = {
        is_success: true,
        user_id: "suryansh_shankar_22072003",
        email: "suryansh.shankar2021@vitstudent.ac.in",
        roll_number: "21BEC0099",
    }

    const formatObj = processData(newData);
    console.log(formatObj);

    const respObj = {
        ...commonObj,
        ...formatObj,
    }

    dataStore.push(newData);
    res.status(201).json(respObj);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});