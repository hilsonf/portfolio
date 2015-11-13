var express 	= require('express'),
	cloudinary  = require('cloudinary');

var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

cloudinary.config({
	cloud_name: 'dxrthhmgz',
	api_key: '131749864128378',
	api_secret: 'jKhPFYKMdRPxvNQYNbYsgVYGWiI'
}) 
app.post('/removeComment',function(req,res){
	console.log(req.body);
	cloudinary.uploader.destroy(req.body.imageID, function(result) { console.log(result) });
	
});

app.get('*', function(req, res){
    res.sendFile('./public/index.html', { root: __dirname });
}); 

var server = app.listen(process.env.PORT || 3000, function(){
	console.log('server listening on ', server.address().port)
})
