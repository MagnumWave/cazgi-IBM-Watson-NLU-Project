const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version:'2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url
    });

    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        url: `${req.query.url}`,
        features:{
            'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 10,
            },
            'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 10,
            },
            'emotion':{
                'document':true
            },
        }
    }

    getNLUInstance().analyze(analyzeParams)
        .then(resp => res.send(JSON.stringify(resp.result.emotion.document.emotion)))
        .catch(err => res.send(JSON.stringify(err.statusText)));
    //console.log(req.query.url);
    //res.send(req.query.url);
});

app.get("/url/sentiment", (req,res) => {
    //console.log(req.query.url);

    const analyzeParams = {
        url: `${req.query.url}`,
        features:{
            'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 10,
            },
            'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 10,
            },
            'sentiment': {
                'document': true,
            },
        }
    }

    getNLUInstance().analyze(analyzeParams)
        .then(resp => res.send(resp.result.sentiment.document.label))
        .catch(err => res.send("Invalid URL."));
    

    //return res.send("url sentiment is: "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        text: `${req.query.text}`,
        features:{
            'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 10,
            },
            'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 10,
            },
            'emotion':{
                'document':true
            },
        }
    }

    getNLUInstance().analyze(analyzeParams)
        .then(resp => {
            //console.log(JSON.stringify(resp.result.emotion.document.emotion, null, 2));
            res.send(JSON.stringify(resp.result.emotion.document.emotion,null,2));
        })
        .catch(err => res.send(JSON.stringify(err.statusText)));
    
    //return res.send({"happy":"10","sad":"90"});
});


app.get("/text/sentiment", (req,res) => {

    const analyzeParams = {
        text: `${req.query.text}`,
        features:{
            'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
            },
            'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
            },
            'sentiment': {
                'document': true,
            },
        }
    }

    getNLUInstance().analyze(analyzeParams)
        .then(resp => res.send(resp.result.sentiment.document.label))
        .catch(err => {
            if (err.statusText == 'Bad Request') {
                res.send('Text cannot be empty.')
            } else if (err.statusText == 'Unprocessable Entity') {
                res.send('Not enough words to process. Please write some more text.')
            } else {
                res.send(err.statusText)
            }
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

