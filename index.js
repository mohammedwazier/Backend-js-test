const test = require('./services/test');
const express = require('express');
const router = express.Router();
const http = require('http');
const app = express();

const product = require('./services/product');

app.use(express.static('public'))
app.use('/', router.get('', (req,res) => {
	res.send('Hello, this is from server');
}));

app.use('/api/product', product);

const server = http.createServer(app);

const port = 8200;

server.listen(port, () => {
	console.log('Server is running on Port http://localhost:'+port);
});