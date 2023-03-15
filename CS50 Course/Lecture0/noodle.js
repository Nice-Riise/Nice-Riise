$(document).ready(function() {
	$('#search-form').submit(function(event) {
		event.preventDefault();
		var query = $('#search-box').val();
		window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
	});
});
