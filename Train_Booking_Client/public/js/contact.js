
	$('#contactBtn').click(function(){
		var name = $('#senderName').val();
		var email = $('#senderEmail').val();
		var phone = $('#senderPhone').val();
		var message = $('#senderMsg').val();

		if( name == '' ){
			$("#nameError").html("Please enter your name");
			$('#senderName').focus();
		}
		else{
			$("#nameError").html('');
			if( phone == '' ){
				$("#phoneError").html("Please enter your phone");
				$('#senderPhone').focus();
			}
			else{
				$("#phoneError").html('');
				var phonereg = /^[0][0-9]{9}$/;
				if( phonereg.test(phone) === true ){
					if( email == '' ){
						$("#emailError").html("Please enter a your email");
						$('#senderEmail').focus();
					}
					else{
						$("#emailError").html('');
						var emailreg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
						if( emailreg.test(email) === true ){						
							if( message == '' ){
								$("#msgError").html("Please enter your message");
								$('#senderMsg').focus();
							}
							else{
								HoldOn.open({
									theme: 'sk-rect',
									message:'Loading',
									backgroundColor:"#fff",
									textColor:"#818181"
								});
								var formInformation = 'senderName='+ name + '&senderEmail='+ email + '&senderPhone='+ phone + '&senderMsg='+ message;
								$.ajax({
									type: "POST",
									url: "functions/contact.php",
									data: formInformation,
									cache: false,
									success: function(result){
										$("#resultMsg").html('<div style="text-align: center; color: #00aa8d; font-weight:700; font-size: 13px; margin-top: 10px;" >'+result+'</div>');
										setTimeout(function(){
											HoldOn.close();
										},100);
									},
									error: function (data) {
										$("#resultMsg").html('<div style="text-align: center; color: #ef5a5a; font-weight:700; font-size: 13px; margin-top: 10px;" >Unable to contact us. Try again later.</div>');
										setTimeout(function(){
											HoldOn.close();
										},100);
									}
								});
								gotoReset();
							}
						}
						else{
							$("#emailError").html("Please enter a valid email address");
							$('#senderEmail').focus();
						}
					}
				}
				else{
					$("#phoneError").html("Please enter 10 digits valid phone number start with 0");
					$('#senderPhone').focus();
				}
			}
		}
	});
	
	function gotoReset(){
		$('#senderName').val('');
		$("#nameError").html('');
		$('#senderEmail').val('');
		$("#emailError").html('');
		$('#senderPhone').val('');
		$("#phoneError").html('');
		$('#senderMsg').val('');
		$("#msgError").html('');
	}
			
			