const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// step 4 - Your API shoud have a GET /api/quotes.random rout
app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    // console.log for testing
    console.log(randomQuote);
    res.send({quote: randomQuote});
});

// step 5 - Your API should have a GET /api/quapes rout
app.get('/api/quotes', (req, res, next) => {
    if(req.query.person) {
        res.send({quotes: quotes.filter(item => item.person === req.query.person)})
    } else if (req.query.person && !req.query.quote) {
        res.send({quotes: []});
    } else {
        res.send({quotes: quotes});
    }
});

// step 6 - Your API should have a POST /api/quotes rout 
app.post('/api/quotes', (req, res, next) => {
    const {quote, person} = req.query;

    if(quote && person) {
        const newQuote = {
            quote: quote, 
            person: person,
        }
        quotes.push(newQuote)
        res.status(201).send({quote: newQuote});
    } else {
        res.status(400).send(console.log('Error: Please include a name AND a quote!'));
    }
    
})

// step 3 - set you server to listen on the port variable
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});