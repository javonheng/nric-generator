const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const e = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post('/api/getNric', (req, res) => {
    // console.log(req.body);
    if (!req.body.year) {
        res.send({
            nric: '',
            error: 'Please input your NRIC.'
        })
    } else

    if (req.body.year < 1800 || req.body.year > 2100) {
        res.send({
            nric: '',
            error: 'Please enter a valid year between 1800 to 2100.'
        });
    } else {
        prefixes = [];
        if (parseInt(req.body.year) >= 2000 && parseInt(req.body.year) <= 2100) {
            prefixes = ['T', 'G'];
        } else if (parseInt(req.body.year) >= 1800 && parseInt(req.body.year) < 2000) {
            prefixes = ['S', 'F'];
        }

        const digit1 = req.body.year.charAt(2);
        const digit2 = req.body.year.charAt(3);
        const lastAplhabet_ST = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
        const lastAplhabet_FG = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];

        lastAlphabet = '';
        nric = '';

        const selectedPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const random7digit = Math.floor(1000000 + Math.random() * 9000000).toString();

        const number = digit1 + digit2 + random7digit.slice(2);
        // console.log(number);
        function stringtoSum (number) {
            const multiplyFactors = [2, 7, 6, 5, 4, 3, 2];
            return number.split('').map(s => parseInt(s)).map((digit, i) => digit * multiplyFactors[i]).reduce((a, b) => a + b, 0);
        }

        let sum = 0;
        if (selectedPrefix === 'T' || selectedPrefix === 'G') sum = 4;
        sum += stringtoSum(number);

        // console.log(sum);
        function getLastPrefix(firstPrefix) {
            switch(firstPrefix) {
                case 'S':
                case 'T':
                    lastAlphabet = lastAplhabet_ST[sum % 11];
                    return lastAlphabet;
                case 'F':
                case 'G':
                    lastAlphabet = lastAplhabet_FG[sum % 11];
                    return lastAlphabet;
            }
        }
        getLastPrefix(selectedPrefix);
        // console.log(lastAlphabet);
        nric = selectedPrefix + number + lastAlphabet;
        // console.log(nric);
        res.send({
            nric: nric,
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));