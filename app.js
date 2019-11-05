var express = require('express');
var jwt = require('jsonwebtoken');

var app = express();

app.get('/api', (req, res) => {
    res.json({
        msg: 'Welcome to api'
    });
    //console.log('Welcome to api');
});

app.post('/api/login', (req, res) => {
    var user = {
        id: 1,
        name: 'Anshul',
        email: 'anshul.reejonia@gmail.com'
    }
    jwt.sign({user}, 'shhhh...', {expiresIn: '12h'}, (err, token) => {
        res.json({
            token
        });
    });
    
    //console.log('Welcome to api');
});


app.post('/api/posts', verifyToken, (req, res) => {

    var token = req.token;

    jwt.verify(token, 'shhhh...', (err, authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                msg: 'Post created',
                user: authData
            });
        }
    });
    
    //console.log('Welcome to api');
});




//auth-token: Bearer <access_token>
function verifyToken(req, res, next){
    const bearerHeader = req.headers['auth-token'];
    console.log(bearerHeader);

    //res.send(bearerHeader);



    if(typeof bearerHeader !== 'undefined'){
        var bearer = bearerHeader.split(' ');
        var bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}


function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
}

var port = normalizePort(process.env.PORT || '4000');
var listener = app.listen(port, 'localhost', function() {
    console.log("Listening on port " + listener.address().port);
});
