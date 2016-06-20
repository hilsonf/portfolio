var express 	= require('express');
var app = express();

app.use(express.static('public'));

app.get('*', function(req, res){
    res.sendFile('./public/index.html', { root: __dirname });
}); 

// Download Resume 
app.get('/download',function(req, res){

	console.log('RESULTS======  ', res.download('/public/downloads/resume.pdf'));

// res.download('public/downloads/resume.pdf');
	
});

var server = app.listen(process.env.PORT || 3000, function(){
	console.log('server listening on ', server.address().port)
})

//apples
