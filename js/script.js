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
		if(this.password.value.length > 1) {
			var userId = this.email.value.split(".")[0];
			var email = this.email.value;
			var state = this.state;
			var hashedPassword = crypto.SHA256(this.password.value).toString();
			var ref = fire.database().ref('/users/' + userId);

			ref.once("value", snapshot => {
				var info = snapshot.val();
				if(info === null) {
					console.log("The read failed: invalid username");
					return;
				}

				if(info.email === email && info.password === hashedPassword) {
					that.setLogin(info.email, info.isAdmin);
				} else {
					alert("Incorrect password!");
				}
			});
		}
	});

	// Register function
	$('#register_button').click(function() {
		email = $('#register_username').val();
		pwd = $('#register_password').val();
		gen = $("input[name='gen']:checked").val();
		pref = $("input[name='pref']:checked");

		preferences = [];
		for(var i = 0; i < pref.length; i++) {
			preferences.push(pref[i].value);
		}

		if(pwd.length > 1) {
			var userId = email.split(".")[0];
			var hashedPassword = SHA256(pwd);
			var ref = database.ref('/users/' + userId);

			database.ref('users/' + userId).set({
				email: email,
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
		}
	});
});

var displayLog = function(message) {
	$('.log_text').text(message);
}

var clearMessageLog = function() {
	$('.log_text').text("");
}
