$(document).ready(function() {
	var socket = io();

	var room = $('#groupName').val();
	var sender = $('#sender').val();
	var userPic = $('#nameImage').val();

	socket.on('connect', function() {
		console.log('Yea! User Connected');

		var params = { room, name: sender };

		socket.emit('join', params, function() {
			console.log('User has joined this channel');
		});
	});

	socket.on('userList', function(users) {
		var ol = $('<ol></ol>');

		users.forEach(user => {
			ol.append(`<p><a id="val" data-toggle="modal" data-target="#myModal">${user}</a></p>`);
		});

		$(document).on('click', '#val', function() {
			$('#name').text(`@${$(this).text()}`);
			$('#receiverName').val($(this).text());
			$('#nameLink').attr('href', `/profile/${$(this).text()}`);
		});

		$('#numValue').text(`(${users.length})`);
		$('#users').html(ol);
	});

	socket.on('newMessage', function(data) {
		var template = $('#message-template').html();
		var message = Mustache.render(template, {
			text: data.text,
			sender: data.from,
			userImage: data.image,
		});

		$('#messages').append(message);
	});

	$('#message-form').on('submit', function(e) {
		e.preventDefault();

		var msg = $('#msg').val();

		socket.emit('createMessage', { text: msg, room, sender, userPic }, function() {
			$('#msg').val('');
		});

		$.ajax({
			url: `/group/${room}`,
			type: 'POST',
			data: {
				message: msg,
				groupName: room,
			},
			success: function() {
				$('#msg').val('');
			},
		});
	});
});
