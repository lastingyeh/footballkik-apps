$(document).ready(function() {
	loadData('.paginate');
	return getResult();
});

function getResult() {
	$.ajax({
		url: 'https://content.guardianapis.com/football?page-size=10&show-fields=all&order-by=newest&api-key=test',
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			const results = data.response.results.reduce((prev, curr) => {
				const dateFormat = new Date(Date.parse(curr.webPublicationDate)).toDateString();

				prev += `
					<form class="paginate">
						<div class="col-md-12 news-post">
							<div class="row">
								<a href="${curr.webUrl}" target="_blank" style="color:#4aa1f3; text-decoration:none;">
									<div class="col-md-2">
										<img src="${curr.fields.thumbnail}" class="img-responsive"/>
									</div>

									<div class="col-md-10">
										<h4 class="news-date">${dateFormat}</h4>
										<h3>${curr.fields.headline}</h3>
										<p class="news-text">${curr.fields.standfirst}</p>
									</div>
								</a> 
							</div>
						</div>
					</form>`;
				return prev;
			}, '');

			$('#newsResults').html(results);

			$('.paginate')
				.slice(0, 2)
				.show();
		},
		error: function(err) {
			console.log(err);
		},
	});
}

function loadData(divClass) {
	$('#loadMore').on('click', function(e) {
		e.preventDefault();

		$(`${divClass}:hidden`)
			.slice(0, 3)
			.slideDown();

		$('html, body').animate({ scrollTop: $(this).offset().top }, 2000);
	});

	$('#linkTop').click(function(){
		$('html, body').animate({ scrollTop: 0 }, 500);
	})
}
