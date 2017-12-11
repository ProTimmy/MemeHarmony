var email = "";

$(document).ready(function() {
	$('#toRegister').click(function() {
		$('.form#login').hide();
		$('.form#register').show();
		clearMessageLog();
	});

	$('#toLogin').click(function() {
		$('.form#register').hide();
		$('.form#login').show();
		clearMessageLog();
	});

	// Login function
	$('#login_button').click(function() {
		username = $('#register_username').val();
		pwd = $('#register_password').val();

		if(pwd.length > 3) {
			var hashedPassword = SHA256(pwd);
			var ref = fire.database().ref('/users/' + username);

			ref.once("value", snapshot => {
				var info = snapshot.val();
				if(info === null) {
					displayLog("Invalid username");
					return;
				}

				if(info.username === username && info.password === hashedPassword) {
					// TODO: Log in
				} else {
					displayLog("Incorrect password!");
				}
			});
		} else {
			displayLog("Password must be larger than 3 characters.")
		}
	});

	// Register function
	$('#register_button').click(function() {
		username = $('#register_username').val();
		pwd = $('#register_password').val();
		gen = $("input[name='gen']:checked").val();
		pref = $("input[name='pref']:checked");

		preferences = [];
		for(var i = 0; i < pref.length; i++) {
			preferences.push(pref[i].value);
		}

		if(pwd.length > 3) {
			var hashedPassword = SHA256(pwd);
			var ref = database.ref('/users/' + userId);

			database.ref('users/' + username).set({
				username: username,
				password: hashedPassword,
				gender: gen,
				preference: preferences,
				tags: 0
			}, function(err) {
				if (err !== null) {
					// Insert error handling here for register page
					console.log(err);
					return;
				} else {
					$('#register_username').val("");
					$('#register_password').val("");
					$('input:checkbox').prop('checked', '');
					$('input:radio').prop('checked', '');
					displayLog("User successfully registered!");
				}
			});
		} else {
			displayLog("Password must be larger than 3 characters.")
		}
	});
});

var displayLog = function(message) {
	$('.log_text').text(message);
}

var clearMessageLog = function() {
	$('.log_text').text("");
}
