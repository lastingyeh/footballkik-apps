$(document).ready(function() {
	var socket = io();

	socket.on('connect', function() {
		var room = 'GlobalRoom';
		var name = $('#nameUser').val();
		var img = $('#nameImage').val();

		socket.emit('global room', { room, name, img });

		socket.on('message display', function() {
			$('#reload').load(location.href + ' #reload');
		});
	});

	socket.on('loggedInUser', function(users) {
		var friends = $('.friend').text();
		var friend = friends.split('@').map(f => f.trim());

		var name = $('#nameUser')
			.val()
			.toLowerCase();
		var ol = $('<div></div>');
		var arr = [];

		for (let i = 0; i < users.length; i++) {
			if (friend.indexOf(users[i].name) > -1) {
				arr.push(users[i]);

				var userName = users[i].name.toLowerCase();

				var list = `<img src="https://placehold.it/300x300" class="pull-left img-circle" style="width:50px; height:50px; margin-right:10px;" />
				<p><a id="val" href="/chat/${userName.replace(/ /g, '-')}.${name.replace(
					/ /g,
					'-',
				)}"><h3 style="padding-top:15px; color:gray; font-size:14px;">@${
					users[i].name
				}
				<span class="fa fa-circle online_friend"></span></h3></a></p>
				<div class="clearfix"></div><hr style=" margin-top: 14px; margin-bottom: 14px;" />`;

				ol.append(list);
			}
		}

		$('#numOfFriends').text(`(${arr.length})`);
		$('.onlineFriends').html(ol);
	});
});
