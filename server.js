var express = require('express')
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);


var port = process.env.PORT || 8080;
var server_port = process.env.OPENSHIFT_NODEJS_PORT || port
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

var allSockets = [];
io.on('connection', function(socket){
  var userId = allSockets.push(socket);
  socket.on('connect', function(){
    io.emit('newUser', userId);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.broadcast.emit('newUserArrival', userId);
});

<<<<<<< HEAD
http.listen(server_port, server_ip_address, function(){
  console.log('listening on *:' + server_port);
=======
http.listen(server_port, function(){
  console.log('listening on *:3000');
>>>>>>> 668cd0f6c930fea6e22a1ee459668f2c54aa87d9
});
