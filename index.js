const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

const categories = require('./data/categories.json');
const news = require('./data/news.json');

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello from the dragon news');
});

app.get('/categories', (req, res) => {
    res.send(categories);
})

// way : 1 => load all news at a time
app.get('/news', (req, res) => {
    res.send(news);
})

// way : 2 => load only one new at a time
app.get('/news/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const selectedNews = news.find(n => n._id === id);
    res.send(selectedNews);
})

// way : 3 => load category based news
app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if(id === 0){
        res.send(news);
    }
    else{
        const categoryNews = news.filter(n => parseInt(n.category_id) === id);
        res.send(categoryNews);
    }
})

app.listen(port, () => {
    console.log(`Express running by port : ${port}`);
})