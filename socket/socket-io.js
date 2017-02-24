// Modul socket.io
var socketio = require('socket.io');
var isConnect = false;
var numUsers = 0;

module.exports.listen = function(server) {
	var io = socketio.listen(server);

	io.on('connection', function(socket){
		console.log('sukses');
		var addedUser = false;
		isConnect = true;

		socket.on('new message', function (data) {
			socket.broadcast.emit('new message', {
			  username: socket.username,
			  message: data
			});
		});

		socket.on('add user', function (username) {
			if (addedUser) return;
			socket.username = username;
			++numUsers;
			addedUser = true;
			socket.emit('login', {
				  numUsers: numUsers
			});

			socket.broadcast.emit('user joined', {
				  username: socket.username,
				  numUsers: numUsers
				});
		});

		socket.on('typing', function () {
			console.log('ngetik');
			socket.broadcast.emit('typing', {
			  username: socket.username
			});
		});

		socket.on('stop typing', function () {
			socket.broadcast.emit('stop typing', {
			  username: socket.username
			});
		});

		socket.on('disconnect', function () {
			if (addedUser) {
			  --numUsers;

			  socket.broadcast.emit('user left', {
			    username: socket.username,
			    numUsers: numUsers
			  });
			}
		});
	});
}