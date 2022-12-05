const express = require('express');
const getDisneyCharsForRound = require('./app');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json()); // for parsing application/json

// endpoint for getting 4 random disney characters per round
app.get('/api', async (req, res) => {

    const data = await getDisneyCharsForRound();
    const arr = [];

    // convert map into array of objects
    for (const [k, v] of data) {
        if (typeof v === 'object') {
            arr.push({ id: k, film: v[0], imageUrl: v[1] });
        } else {
            arr.push({ id: k, film: v });
        }
    }

    res.send({ disneyChars: arr });
});

// endpoint for checking if user submission is the correct answer
app.post('/submit', (req, res) => {

    const submittedAns = req.body;
    let correctAns = false;

    // only one of the four options (correct answer) has an imageUrl property and therefore is of length 3
    if (Object.keys(submittedAns).length === 3) correctAns = true;

    res.send({ correctAns: correctAns });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
