const bodyParser = require('body-parser');
const express = require('express');
const mongo = require('mongodb');

const router = express.Router();
const MongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;

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

const product = {};

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
		client.find({name: {$eq: req.params.nama}}).toArray((err, respon) => {
			console.log(respon);
			res.status(201);
			res.send(respon);
		})
	})
})

router.post('/addProduct', (req, res) => {
	mongoConnect().then((client) => {
		product._id = new ObjectID();
		product.name = req.body.name;
		product.price = req.body.price;

		client.insertOne(product, (err, respon) => {
			if(!err){
				res.status(201);
				return res.send(true);
			}
		})
	})
})



module.exports = router;