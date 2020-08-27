var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

const port = 3005;

app.listen(port, function () { // говорим на каком порту запускать нашу  NODE_JS  программу.
	console.log(`Example app listening on port http://localhost:${port}/`);
});


const users = ('./users.json');
const noFound = "NO FOUND";


app.post('/users', (req, res) => {

	const { login, password } = JSON.parse(req.body);

	fs.readFile(users, 'utf-8', (err, list) => {

		let array = JSON.parse(list);
		let id;

		let isFind = array.some(({ login: l, password: p, id: user }) => {
			id = user;
			return login == l && password == p;
		});

		isFind ?
			res
				.status(200)
				.send(JSON.stringify(id))
			:
			res
				.status(401)
				.send(JSON.stringify(noFound));


	});
});

app.get('/users/:id', (req, res) => {

	const { id } = req.params;
	let urlToJson = 'goods/' + id + '.json';

	fs.readFile(urlToJson, 'utf-8', (err, data) => {

		res.send(data);
	})

})