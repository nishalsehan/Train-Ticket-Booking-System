	
	$('#requestBtn').click(function(){
		var name = $('#senderName').val();
		var email = $('#senderEmail').val();
		var phone = $('#senderPhone').val();
		var store = $('#storeName').val();
		var address = $('#businessAddress').val();
		var city = $('#city').val();
		var otherText = $('#otherText').val();
		var type = $("input[name='sellType']:radio:checked").val();
	
		
		if( store == '' ){
			$("#storeError").html("Please enter your business name");
			$('#storeName').focus();
		}
		else{
			$("#storeError").html('');
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
							$("#emailError").html("Please enter your email");
							$('#senderEmail').focus();
						}
						else{
							$("#emailError").html('');
							var emailreg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
							if( emailreg.test(email) === true ){
								$("#emailError").html('');
								if( address == '' ){
									$("#addressError").html("Please enter your business address");
									$('#businessAddress').focus();
								}else{
									$("#addressError").html('');
									if( city == null){
										$("#cityError").html("Please choose your nearest city");
										$('#city').focus();
									}
									else{
										$("#cityError").html('');
										if( type == null ){
											$("#typeError").html("Please choose your need");
											$('#sellType').focus();
										}
										else if( type == 'Other' ){
											$("#typeError").html('');
											if( otherText == '' ){
												$("#otherError").html("Please enter your need here");
												$('#otherText').focus();
											}
											else{
												$("#otherError").html('');
													HoldOn.open({
													theme: 'sk-rect',
													message:'Loading',
													backgroundColor:"#fff",
													textColor:"#818181"
												});
												var formInformation = 'senderName='+ name + '&senderEmail='+ email + '&senderPhone='+ phone + '&storeName='+ store +'&sellingType=' + otherText + '&senderAddress=' + address + '&city=' + city;
												$.ajax({
													type: "POST",
													url: "functions/requestRate.php",
													data: formInformation,
													cache: false,
													success: function(result){
														$("#resultMsg").html('<div style="text-align: center; color: #00aa8d; font-weight:700; font-size: 13px; margin-top: 20px;" >'+result+'</div>');
														$('.successContent').removeClass('hide');
														setTimeout(function(){
															HoldOn.close();
														},100);
													},
													error: function (data) {
														$("#resultMsg").html('<div style="text-align: center; color: #ef5a5a; font-weight:700; font-size: 13px; margin-top: 20px;" >Unable to request the rates. Try again later.</div>');
														setTimeout(function(){
															HoldOn.close();
														},100);
													}
												});
												gotoReset(); 
											}
										}
										else{
											HoldOn.open({
												theme: 'sk-rect',
												message:'Loading',
												backgroundColor:"#fff",
												textColor:"#818181"
											});
											var formInformation = 'senderName='+ name + '&senderEmail='+ email + '&senderPhone='+ phone + '&storeName='+ store +'&sellingType=' + type + '&senderAddress=' + address + '&city=' + city;
											$.ajax({
												type: "POST",
												url: "functions/requestRate.php",
												data: formInformation,
												cache: false,
												success: function(result){
													$("#resultMsg").html('<div style="text-align: center; color: #00aa8d; font-weight:700; font-size: 13px; margin-top: 60px;" >'+result+'</div>');
													$('.successContent').removeClass('hide');
													setTimeout(function(){
														HoldOn.close();
													},100);
												},
												error: function (data) {
													$("#resultMsg").html('<div style="text-align: center; color: #ef5a5a; font-weight:700; font-size: 13px; margin-top: 60px;" >Unable to request the rates. Try again later.</div>');
													setTimeout(function(){
														HoldOn.close();
													},100);
												}
											});
											gotoReset(); 
										}
									}
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
		}

	});
	
	function gotoReset(){
		$('#senderName').val('');
		$("#nameError").html('');
		$('#senderEmail').val('');
		$("#emailError").html('');
		$('#senderPhone').val('');
		$("#phoneError").html('');
		$('#storeName').val('');
		$("#storeError").html('');
		$('input[name=sellType]').prop('checked', false);
		$("#typeError").html('');
		$('#otherText').val('');
		$("#otherError").html('');
		$('#businessAddress').val('');
		$("#addressError").html('');
		$('#city').val('');
		$("#cityError").html('');
		$('.successContent').addClass('hide');

	}
	
	function changeNatureNeed(){
		var type = $("input[name='sellType']:radio:checked").val();
		if( type == 'Other' ){
			$('#otherText').removeClass('hide');
		}
		else{
			$('#otherText').addClass('hide');
		}
	}
			
	$(document).ready(function(){
		
		
		
		$.ajax({
			type: "GET",
			url: "https://track.simplexdelivery.com/recipient/simplex/branch-list",
			success: function(result){
				
				var senderDH = document.getElementById('city');
				
				for(var i = 0; i < result.length; i++) {
					
					if( result[i] == "Head Office" ){
						result.splice(i, 1);
					}
					if( result[i] == "Greater Colombo" ){
						result.splice(i, 1);
					}
					if( result[i] == "Suburbs" ){
						result.splice(i, 1);
					}
					
					var opt = document.createElement('option');
					opt.innerHTML = result[i];
					opt.value = result[i];
					senderDH.appendChild(opt);
				}
				for(var i = 0; i < result.length; i++) {
					
					if( result[i] == "Head Office" ){
						result.splice(i, 1);
					}
					if( result[i] == "Greater Colombo" ){
						result.splice(i, 1);
					}
					if( result[i] == "Suburbs" ){
						result.splice(i, 1);
					}
					
					var opt = document.createElement('option');
					opt.innerHTML = result[i];
					opt.value = result[i];
				}

			},
			error: function (data) {
				console.log('error');
			}
		});
		
	});
			
			
			
			
		
		
			