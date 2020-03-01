const express = require('express');
const path = require('path');
const app = express();
app.set('port', process.env.PORT || 5000);
const public = path.join(__dirname, '../', 'public');

app.use(express.static(public));

app.get('/', (request, response) => {
    // console.log(`public: ${public}`);
    // console.log(`attempted redirect: /src/public/index.html`);
    // response.redirect('src/public/index.html');
});

app.get('/src/public/index.html', (request, response) => {
    response.send('welcome to the index');
});

module.exports = app;