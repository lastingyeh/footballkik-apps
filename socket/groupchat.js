module.exports = function(io, Users) {
	const users = new Users();

	io.on('connection', socket => {
		socket.on('join', (params, callback) => {
			socket.join(params.room);

			users.addUserData(socket.id, params.name, params.room);

			io.to(params.room).emit('userList', users.getUserList(params.room));

			callback();
		});

		socket.on('createMessage', (message, callback) => {
			io.to(message.room).emit('newMessage', {
				text: message.text,
				room: message.room,
				from: message.sender,
				image:message.userPic,
			});
			// call client clear input-msg val('')
			callback();
		});

		socket.on('disconnect', () => {
			const user = users.removeUser(socket.id);

			if (user) {
				io
					.to(user.room)
					.emit('userList', users.getUserList(user.room));
			}
		});
	});
};
