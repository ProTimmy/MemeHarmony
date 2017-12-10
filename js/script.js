$(document).ready(function() {
	$('#register_button').click(function() {
		if($('.form#register').css("display") == "none") {
			$('.form#login').css("display", "none");
			$('.form#register').css("display", "inline-block");
		} else {

		}
	});

	$('#login_button').click(function() {
		if($('.form#login').css("display") == "none") {
			$('.form#register').css("display", "none");
			$('.form#login').css("display", "inline-block");
		} else {

		}
	});
});
