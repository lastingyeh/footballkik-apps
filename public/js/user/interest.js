$(document).ready(function() {
	$('#favClubBtn').on('click', function() {
		var favClub = $('#favClub').val();

		if (!favClub) {
			$('#error').html('<div class="alert alert-danger">You cannot submit an empty field</div>');
		} else {
			$('#error').html('');
			$.ajax({
				url: '/settings/interests',
				type: 'POST',
				data: { favClub },
				success: function() {
                    $('#favClub').val('')
					setTimeout(() => {
						window.location.reload();
					}, 200);
				},
			});
		}
    });
    
    $('#favPlayerBtn').on('click', function() {
		var favPlayer = $('#favPlayer').val();

		if (!favPlayer) {
			$('#error').html('<div class="alert alert-danger">You cannot submit an empty field</div>');
		} else {
			$('#error').html('');
			$.ajax({
				url: '/settings/interests',
				type: 'POST',
				data: { favPlayer },
				success: function() {
                    $('#favPlayer').val('')
					setTimeout(() => {
						window.location.reload();
					}, 200);
				},
			});
		}
    });
    
    $('#nationalTeamBtn').on('click', function() {
		var nationalTeam = $('#nationalTeam').val();

		if (!favPlayer) {
			$('#error').html('<div class="alert alert-danger">You cannot submit an empty field</div>');
		} else {
			$('#error').html('');
			$.ajax({
				url: '/settings/interests',
				type: 'POST',
				data: { nationalTeam },
				success: function() {
                    $('#nationalTeam').val('')
					setTimeout(() => {
						window.location.reload();
					}, 200);
				},
			});
		}
	});
});
