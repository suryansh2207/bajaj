const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

let dataStore = [];

function processData(request) {
    const { data } = request;

    console.log(data);


    const numbers = [];
    const alphabets = [];

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
        }
    });

    
    const lowercaseAlphabets = alphabets.filter(char => /[a-z]/.test(char));
    let highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    const response = {
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    return response;
}

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
    const newData = req.body;

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
