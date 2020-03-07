//Importando express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const http = require('http');
const routes = require('./routes')

const { setupWebsocket } = require('./websocket');

/*Vamos precisar do 'CORS' pra poder abilitar as opções de acesso a API de forma
externa*/

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://admin:admin@cluster0-shxn1.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// app.use(cors(); - cors sem nada é liberado pra qualquer aplicação
app.use(cors());

app.use( express.json() );
app.use(routes);

server.listen(process.PORT || 3333);