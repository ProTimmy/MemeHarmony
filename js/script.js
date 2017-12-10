$(document).ready(function() {
	$('#toRegister').click(function() {
		$('.form#login').hide();
		$('.form#register').show();
	});

	$('#toLogin').click(function() {
		$('.form#register').hide();
		$('.form#login').show();
	});
});
