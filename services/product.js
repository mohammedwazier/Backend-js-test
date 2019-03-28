const bodyParser = require('body-parser');
const express = require('express');

const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

function mongoConnect(){
	return new Promise((resolve) => {
		MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true },(err, db) => {
			const dbo = db.db('workshop').collection('product');
			resolve(dbo);
		});
	})
} 

router.get('/getAllProduct', (req, res) => {
	mongoConnect().then((client) => {
		client.find().toArray((err, respon) => {
			console.log(respon);
			res.status(201);
			res.send(respon);
		})
	});
})

router.get('/getSingleProduct/:nama', (req, res) => {
	mongoConnect().then((client) => {
		client.find({name: req.params.id}).toArray((err, respon) => {
			res.status(201);
			res.send(respon);
		})
	})
})

router.post('/addProduct', (req, res) => {
	mongoConnect().then((client) => {
		const product = {};
		product.name = req.body.name;
		product.price = req.body.price;

		client.insert(product, (err, respon) => {
			if(!err){
				res.status(201);
				return res.send(true);
			}
			res.status(201);
			return res.send(false);
		})
	})
})



module.exports = router;