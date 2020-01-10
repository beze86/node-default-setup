const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoConnect = require('./db').mongoConnect;
const router = require('./router');

// useful for static files such as css files
app.use(express.static('node_modules'));
app.use(express.static('public'));
// useful for forms
app.use(express.urlencoded({extended:true}));


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use('/', router);

app.use((req, res, next) => {
    res.render('404');
})



mongoConnect(() => {
	let port = process.env.PORT;
	if (port == null || port == "") {
  		port = 8000;
	}
	app.listen(port);
})