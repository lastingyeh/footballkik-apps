$(document).ready(function() {
	$('.add-btn').on('click', function() {
		$('#add-input').click();
	});

	$('#add-input').on('change', function() {
		var addInput = $(this);

		if (addInput.val() !== '') {
			var formData = new FormData();

			formData.append('upload', addInput[0].files[0]);
			$('#completed').html('File Uploaded Successfully');

			$.ajax({
				url: '/userupload',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function() {
					try {
						addInput.val('');
					} catch (error) {
						console.log(error);
					}
				},
			});
		}

		showImage(this);
	});

	$('#profile').on('click', function() {
		console.log('profile click');

		var username = $('#username').val();
		var fullname = $('#fullname').val();
		var country = $('#country').val();
		var gender = $('#gender').val();
		var mantra = $('#mantra').val();
		var addInput = $('#add-input')[0].files[0];

		try {
			const uploadImg = addInput ? addInput.name : $('#user-image').val();

			console.log(uploadImg);

			var valid = true;

			if (!(username && fullname && country && gender && mantra)) {
				valid = false;

				$('#error').html('<div class="alert alert-danger">You can submit an empty field</div>');
			} else {
				$('#error').html('');
				$('add-input').val('');
			}

			if (valid) {
				$.ajax({
					url: '/settings/profile',
					type: 'POST',
					data: {
						username,
						fullname,
						gender,
						country,
						mantra,
						upload: uploadImg,
					},
					success: function() {
						setTimeout(function() {
							window.location.reload();
						}, 200);
					},
				});
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
		}
	});
});

function showImage(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			// console.log(e.target.result);

			$('#show_img').attr('src', getObjectURL(input.files[0]));
		};

		reader.readAsDataURL(input.files[0]);
	}
}

function getObjectURL(file) {
	var url = null;
	if (window.createObjcectURL != undefined) {
		url = window.createOjcectURL(file);
	} else if (window.URL != undefined) {
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) {
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}
