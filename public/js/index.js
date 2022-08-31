// const {alert} = require('./functions.js');
$(document).ready(function(){
	const form = $("form");

	//On register btn click
	$('#registerBtn').click(function(){
		$('#modalTitle').text("Register");
		$('#check').show();
		$('#basicModal').modal('show');
	});
	
	$('#loginBtn').click(function(){
		$('#modalTitle').text("Login");
		$('#check').hide();
		$('#basicModal').modal('show');
	});

	//on form submit
	form.on('submit', function(e){
		e.preventDefault();
		
		const username = $('input[name="username"]').val();
		const password = $('input[name="password"]').val();

		//if form title is "Register" 
		if($('#modalTitle').text() == "Register"){
			//Check if user accepted terms
			if(!$('#check input').is(':checked')){
				$('#check input').focus();
				return;
			}
			//Change button to loading spinner
			$('#modal_btn').html('<i class="fa-solid fa-spinner fa-spin"></i>');
			$.ajax({
				url: '/api/signup',
				type: 'POST',
				data: { username, password },
				success: function(data){
					console.log(data);
					if (data.status) {
						alert("Account created successfully!", "success");
					} else {
						alert(data.msg, "danger");
					}
				},
				error: function(err){
					alert(err.responseJSON.message, "danger");
				},
				complete: function(){
					//Remove the spinner
					$('#modal_btn').html('Submit');
				}
			});

		} else if($('#modalTitle').text() == "Login") {
			$('#modal_btn').html('<i class="fa-solid fa-spinner fa-spin"></i>');
			$.ajax({
				url: '/api/login',
				type: 'POST',
				data: { username, password },
				success: function(data){
					console.log(data);
					if (data.status) {
						alert("Logged in!", "success");
					} else {
						alert(data.msg, "danger");
					}
				},
				//get json response if error
				error: function(err){
					alert(err.responseJSON.message, "danger");
				},
				complete: function(){
					$('#modal_btn').html('Submit');
				}
			});
		}
		
	});
	//Bootstrap alert
	const alert = (message, type) => {
		const wrapper = document.createElement('div');
		//Left it with the hide button temporarily, will be discussed later
		wrapper.innerHTML = [
			`<div class="alert alert-${type} alert-dismissible" role="alert">`,
			`   <div>${message}</div>`,
			'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
			'</div>'
		].join('');

		$('div.modal-body').append(wrapper);

		setTimeout(() => {
			wrapper.remove();
		} , 3000);
	};
});

