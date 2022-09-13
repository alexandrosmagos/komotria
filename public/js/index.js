$(document).ready(function(){
	const form = $("form");

	//On register btn click
	$('#registerBtn').click(function(){
		$('#modal_btn').text("Register");
		$('#check').show();
		$('#basicModal').modal('show');
	});
	
	$('#loginBtn').click(function(){
		$('#modal_btn').text("Login");
		$('#check').hide();
		$('#basicModal').modal('show');
	});

	//on form submit
	form.on('submit', function(e){
		e.preventDefault();

		const email = $('input[name="email"]').val();
		const password = $('input[name="password"]').val();

		//if form title is "Register" 
		if($('#modal_btn').text() == "Register"){
			//Check if user accepted terms
			if(!$('#check input').is(':checked')){
				$('#check input').focus();
				return;
			}
			//Change button to loading spinner
			$('#modal_btn').html('<i class="fa-solid fa-spinner fa-spin"></i>');
			$.ajax({
				url: '/register',
				type: 'POST',
				data: { email, password },
				success: function(data){
					console.log(data);
					//clear form
				},
				error: function(err){
					$('#status').removeAttr('hidden');
					$('#status').html(`<div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>`);
					setTimeout(() => {
						$('#status').html(``);
						$('#status').attr('hidden', true);
					}, 2000);
				},
				complete: function(){
					//Remove the spinner
					$('#modal_btn').html('Submit');
				}
			});

		} else if($('#modal_btn').text() == "Login") {
			$('#modal_btn').html('<i class="fa-solid fa-spinner fa-spin"></i>');
			$.ajax({
				url: '/login',
				type: 'POST',
				data: { email, password },
				success: function(data){
					console.log(data);
				},
				//get json response if error
				error: function(err){
					$('#status').removeAttr('hidden');
					$('#status').html(`<div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>`);
					setTimeout(() => {
						$('#status').html(``);
						$('#status').attr('hidden', true);
					}, 2000);
				},
				complete: function(){
					$('#modal_btn').html('Submit');
				}
			});
		}
		
	});
});