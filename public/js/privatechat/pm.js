$(document).ready(function() {
	var socket = io();

	var paramOne = $.deparam(window.location.pathname);
	var newParam = paramOne.split('.');
	var username = newParam[0];

	$('#receiver_name').text(`@${username}`);

	// swap(newParam, 0, 1);
	// var newParam2 = newParam[0] + '.' + newParam[1];
	var [a, b] = newParam;
	var paramTwo = [b, a].join('.');
	
	socket.on('connect', function() {
		var params = { room1: paramOne, room2: paramTwo };

		socket.emit('join PM', params);

		socket.on('message display',function(){
			$('#reload').load(location.href + ' #reload');
		})
	});

	socket.on('new message', function(data) {
		var template = $('#message-template').html();
		var message = Mustache.render(template, {
			text: data.text,
			sender: data.sender,
		});

		$('#messages').append(message);
	});

	$('#message_form').on('submit', function(e) {
		e.preventDefault();

		var msg = $('#msg').val();
		var sender = $('#nameUser').val();

		if (msg.trim().length > 0) {
			socket.emit(
				'private message',
				{
					text: msg,
					sender,
					room: paramOne,
				},
				function() {
					$('#msg').val('');
				},
			);
		}
	});

	$('#send-message').on('click', function() {
		var message = $('#msg').val();

		$.ajax({
			url: `/chat/${paramOne}`,
			type: 'POST',
			data: { message },
			success: function() {
				$('#msg').val('');
			},
		});
	});
});

// function swap(input, value_1, value_2) {
// 	var temp = input[value_1];
// 	input[value_1] = input[value_2];
// 	input[value_2] = temp;
// }

function swapFormat(input) {
	const [a, b] = input;
	return [b, a].join('.');
}
