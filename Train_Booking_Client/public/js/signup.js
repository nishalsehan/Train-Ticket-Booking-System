	
	
	$('#signupBtn').click(function(){
		var name = $('#contectername').val();
		var email = $('#email').val();
		var pwd = $('#password').val();
		var store = $('#storename').val();
		
		if( store == '' ){
			$("#storeError").html("Please write your store name");
			$('#storename').focus();
		}
		else{
			$("#storeError").html('');
			if( name == '' ){
				$("#nameError").html("Please write your name");
				$('#contectername').focus();
			}
			else{
				$("#nameError").html('');
				
				$("#phoneError").html('');
				if( email == '' ){
					$("#emailError").html("Please write your email");
					$('#email').focus();
				}
				else{
					var emailreg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
					if( emailreg.test(email) === true ){
						$("#emailError").html("");
						if( pwd == '' ){
							$("#passwordError").html("Please write your password");
							$('#password').focus();
						}
						else{
							var pwdreg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
							if( pwdreg.test(pwd) === false ){
								$("#passwordError").html("The password must have one special characters with 8 digits.");
								$('#password').focus();
							}
							else{
								$("#passwordError").html("");
								HoldOn.open({
									theme: 'sk-rect',
									message:'Loading',
									backgroundColor:"#fff",
									textColor:"#818181"
								});
								
								var data = {
									'businessName' : store,
									'clientName' : name,
									'email' : email,
									'password' : pwd,
									'accept' : '0'
								}
								
								$.ajax({
									type: "POST",
									url : "https://track.simplexdelivery.com/recipient/simplex/add/temporary-user",
									data: JSON.stringify(data),
									contentType: "application/json",
									dataType: "json",
									success: function(result){
										if(result.message=='exist'){
											$("#resultMsg").html('<div style="color:#ef5a5a; text-align: center;" >Your email address is already exit in our system. Please use another email address.</div>');
										}
										else{
											$("#resultMsg").html('<div style="color:#00aa8d; text-align: center;" >We have sent the account confirmation link to your email address. Please click the link to continue.</div>');
										}
										
										setTimeout(function(){
											HoldOn.close();
										},100);
									},
									error: function (data) {
										$("#resultMsg").html('<div style="color:#ef5a5a; text-align: center;" >Unable to create youe account. Please try again later.</div>');
										setTimeout(function(){
											HoldOn.close();
										},100);
									}	
								});
								gotoReset();
							}
							

						}
						
						
						
						
					}
					else{
						$("#emailError").html("Please write valid email address");
						$('#email').focus();
					}							
				}
				
			}
		}
		
	});
	
	function gotoReset(){
		$('#contectername').val('');
		$("#nameError").html('');
		$('#email').val('');
		$("#emailError").html('');
		$('#password').val('');
		$('#storename').val('');
		$("#storeError").html('');
		$("#passwordError").html("");
	} 
	
	
	
	
	
	
	
	
	