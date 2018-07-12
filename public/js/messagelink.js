$(document).ready(function() {
	var socket = io();

	var paramOne = $.deparam(window.location.pathname);
	var newParam = paramOne.split('.');
	var [a, b] = newParam;
	var paramTwo = [b, a].join('.');

	socket.on('connect', function() {
		var params = { room1: paramOne, room2: paramTwo };

		socket.emit('join PM', params);

		socket.on('new refresh', function() {
			$('#reload').load(location.href + ' #reload');
		});
	});

	$(document).on('click', '#messageLink', function() {
		var chatId = $(this).data().value;

		$.ajax({
			url: `/chat/${paramOne}`,
			type: 'POST',
			data: { chatId },
			success: function() {},
		});

		socket.emit('refresh', {});
	});
});
