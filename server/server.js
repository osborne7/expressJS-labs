const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

// app.use((req,res, next) => {
//     fs.appendFile()
// })

// app.get('/', (req, res) => {
//     res.send('Hello from the web server side.');
// })

app.use(bodyParser.urlencoded({ extended: false }));

let contactArray = [];

app.post('/contact-form', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);

    contactArray.push({
        name: name,
        email: email
    });

    fs.writeFileSync('contacts.json', JSON.stringify(contactArray, null, 2), 'utf-8', err => {
        if (err) console.log(err);
    })
    res.send('Thanks for submitting!');
})

app.post('/formsubmissions', (req, res) => {
    fs.readFile('contacts.json', { encoding: 'utf-8' }, (err, data) => {
        if(err) console.log(err);
        console.log(data);
        res.send(data);
    })
})

app.use(express.static(path.join(__dirname, '../public')));

app.listen(4114);