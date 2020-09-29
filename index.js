const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const EventModel = require('./models');

mongoose.connect('mongodb+srv://devuser:superdev@cluster0.ouyvv.mongodb.net/<dbname>?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to MongoDB');
});

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
	console.log('Received a new request');
	next();
});
// app.use((req, res, next) => {
// 	const authToken = req.headers.token;
// 	if (authToken === 'secret123') {
// 		next();
// 	} else {
// 		res.status(403).send({
// 			message: 'Token is not valid'
// 		});
// 	}
// });

app.get('/', (req, res) => {
	res.send('Event App is UP');
});

app.get('/events', async (req, res) => {
	const eventsDoc = await EventModel.find().exec();
	res.send(eventsDoc);
});

app.get('/events/:id', async (req, res) => {
	const { id } = req.params;
	const eventDoc = await EventModel.findById(id).exec();
	res.send(eventDoc);
});

app.post('/events', async (req, res) => {
	const data = req.body;
	try {
		const eventDoc = await EventModel.create(data);
		res.status(201).send(eventDoc);
	} catch (err) {
		res.send({
			message: 'Unable to save the event',
			error: err
		});
	}
});

app.patch('/events/:id', async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	try {
		await EventModel.findByIdAndUpdate(id, data, (err, doc) => {
			res.send({
				message: 'Successfully updated'
			});
		});
	} catch (err) {
		res.send({
			message: 'Unable to update the event',
			error: err
		});
	}
});

app.delete('/events/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await EventModel.findByIdAndDelete(id);
		res.send({
			message: 'Successfully deleted'
		});
	} catch (err) {
		res.send({
			message: 'Unable to delete the event',
			error: err
		});
	}
});

app.listen(3000, () => console.log('Server listening at port 3000'));
