const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('*', function(req, res){
    res.sendFile('./public/index.html', { root: __dirname });
}); 

const server = app.listen(process.env.PORT || 3000, function(){
	console.log('server listening on ', server.address().port)
})