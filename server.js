// server.js
var
	express = require('express'),
	app = express(),
	logger = require('morgan'),
	path = require('path'),
	ejs = require('ejs')

// Settings + Middleware
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// API Routes:
app.get('/api', function(req,res){
	res.json({message: "API Base Route. These are not the droids you are looking for."})
})

// All other GETs lead to index.html
app.get('*', function(req,res){
	res.sendFile(__dirname + '/public/index.html');
})

app.listen(3000, function(err){
	if(err) throw err
	console.log('Server running on 3000. Love is in the air.')
})