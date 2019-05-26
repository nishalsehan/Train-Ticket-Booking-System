	
	var imgsrc = '' ;
	var images = [] ;
	var imgsize = '' ;
		
	$(document).ready(function() {
		$('#image_upload_preview').hide();
		$("#inputFile").change(function () {
			readURL(this);
		});
		
		$.ajax({
			type: "GET",
			url: "https://track.simplexdelivery.com/recipient/issue/issue-category",
			success: function(result){
				console.log(result);
				
				var senderDH = document.getElementById('complaintAbout');
				
				for(var i = 0; i < result.length; i++) {
					
					var opt = document.createElement('option');
					opt.innerHTML = result[i].category;
					opt.value = result[i].category;
					senderDH.appendChild(opt);
				}

			},
			error: function (data) {
				console.log('error');
			}
		});
	});
			
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			var fileType = input.files[0]["type"];
			var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
			if ($.inArray(fileType, ValidImageTypes) < 0) {
				$('#image_upload_preview').hide();
				$("#imageError").html("Please choose image. Its extention should be .png, .jpg, .jpeg or .gif");
			}
			else{
				reader.onload = function (e) {
					$('#image_upload_preview').attr('src', e.target.result);
					imgsize = input.files[0].size / 1024;
					imgsrc = e.target.result;
					if( imgsize >= 500 ){
						$("#imageError").html("Your Image Size is "+Math.round(imgsize)+" Kb. Image size should be less than 500 Kb");
						$('#image_upload_preview').hide();
					}
					else{
						$('#image_upload_preview').show();
						$("#imageError").html('');
					}
				}
				reader.readAsDataURL(input.files[0]);
			}

		}
	}
			
	$('#complaintBtn').click(function(){
		var id = $('#trackId').val();
		var name = $('#senderName').val();
		var phone = $('#senderPhone').val();
		var address = $('#senderAddress').val();
		var about = $('#complaintAbout').val();
		var complaint = $('#senderComplaint').val();
		var createdBy = "Customer";
		var type = "customerIssue";
		images.push(imgsrc);
		
		if( id == ''){
			$('#trackidError').html('Tracking ID is required');
			$('#trackId').focus();
		}
		else{
			$('#trackidError').html('');
			if( name == ''){
				$('#nameError').html('Name is required');
				$('#senderName').focus();
			}
			else{
				$('#nameError').html('');
				if( phone == '' ){
					$("#phoneError").html("Please write your phone");
					$('#senderPhone').focus();
				}
				else{
					var phonereg = /^[0][0-9]{9}$/;
					if( phonereg.test(phone) === true ){
						$("#phoneError").html('');
						if(address == ''){
							$("#addressError").html("Address is required");
							$('#senderAddress').focus();
						}
						else{
							$("#addressError").html('');
							if( about == null ){
								$("#complaintAboutError").html("Please choose your Complaint type");
								$('#complaintAbout').focus();
							}
							else{
								$("#complaintAboutError").html('');
								if( $('#complaintAbout').text() == "Other" ){
									var newAbout = $('#newCompalintAbout').val();
									if( newAbout == '' ){
										$('#newCompalintAboutError').html('Please write anything')
										$('#newCompalintAbout').focus();
									}
									else{
										$('#newCompalintAboutError').html('');
										if( complaint == ''){
											$("#complaintError").html("Please choose your Complaint type");
											$('#senderComplaint').focus();
										}
										else{
											$("#complaintError").html('');
											var issue = {
												"trackingId":id,
												"name":name,
												"phoneNumber":phone,
												"images":images,
												"aboutIssue":newAbout,
												"description":complaint,
												"address":address,
												"createdBy":createdBy,
												"type":type
											};
											addIssue(issue); 
										}
									}
								}
								else{
									if( complaint == ''){
										$("#complaintError").html("Please choose your Complaint type");
										$('#senderComplaint').focus();
									}
									else{
										$("#complaintError").html('');
										var issue = {
											"trackingId":id,
											"name":name,
											"phoneNumber":phone,
											"images":images,
											"aboutIssue":about,
											"description":complaint,
											"address":address,
											"createdBy":createdBy,
											"type":type
										};
										addIssue(issue);  
									}
								}
							}
						}
					}
					else{
						$("#phoneError").html("Please write 10 digits valid phone number start with 0");
						$('#senderPhone').focus();
					}
				}
			}
		}
		imgsrc = "";
		images = [];
	});
			
	$('#complaintAbout').change(function(){
		var about = $('#complaintAbout').text();
		if( about == 'Other' ){
			$('#aboutText').removeClass('hide');
		}
		else{
			$('#aboutText').addClass('hide');
		}
	});
	
	function addIssue(issue){
		HoldOn.open({
			theme: 'sk-rect',
			message:'Loading',
			backgroundColor:"#fff",
			textColor:"#818181"
		});
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "https://track.simplexdelivery.com/issue/add-issue",
			data: JSON.stringify(issue),
			dataType: 'json',
			timeout: 600000,
			success: function (data) {
				loadSuccessPage(data);
				setTimeout(function(){
					HoldOn.close();
				},100);	
			},
			error: function (data) {
				$("#resultError").html('<div style="color: #ef5a5a; font-weight:700; margin: 10px 0px 0px; text-align:center; font-size: 13px;" >Unable to create your complaint. Please try again later.</div>');
				
				setTimeout(function(){
					HoldOn.close();
				},100);	
				gotoReset();
			  
			}
		});
	}
	
	function gotoReset(){
		/* ('#trackId').val(''); */
		$('#trackidError').html('');
		$('#senderName').val('');
		$('#nameError').html('')
		$('#senderPhone').val('');
		$("#phoneError").html('');
		$('#senderAddress').val('');
		$("#addressError").html('');
		$('#complaintAbout').val('');
		$("#complaintError").html('');
		$('#newCompalintAboutError').html('');
		$('#senderComplaint').val('');
		$("#complaintError").html('');
		$('#image_upload_preview').hide();
		$("#imageError").html('');
		$('#trackId').addClass('hasnot-id');
		$('#trackId').removeClass('has-id');
		$("#trackId").val('');
	}
			
	function loadSuccessPage(data) {
		var options = {
				timeZone: 'Asia/Colombo',
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			},
			formatter = new Intl.DateTimeFormat([], options)
			var datVal = formatter.format(new Date())

		   var  successTicket =  '<div  id="successTicket" >'+
									'<h5 id="ticketConfirm"  >Your complaint submitted successfully.</h5>'+
									'<hr/>'+
									'<h3 class="text-center" >Ticket Informations</h3>'+
									'<hr/>'+
									'<div class="col-sm-12 basicData">'+
										'<div class="row">'+
											'<div class="col-sm-7">'+
												'<div class="row">'+
													'<div class="col-sm-5"><label>Ticket ID</label></div>'+
													'<div class="col-sm-7">'+data.id+'</div>'+
												'</div>'+
												'<div class="row">'+
													'<div class="col-sm-5"><label>Tracking ID</label></div>'+
													'<div class="col-sm-7">'+data.trackingId+'</div>'+
												'</div>'+
												'<div class="row">'+
													'<div class="col-sm-5"><label>Created Date</label></div>'+
													'<div class="col-sm-7">'+datVal+'</div>'+
												'</div>'+
											'</div>'+
											'<div class="col-sm-3 col-sm-offset-2 status">New</div>'+
										'</div>'+
									'</div>'+
									'<hr class="clearHr" >'+
									'<div class="col-sm-12 requesterData ">'+
										'<h4>Requester Informations</h4>'+
										'<div class="row">'+
											'<div class="col-sm-3 col-sm-offset-1"><label>Name</label></div>'+
											'<div class="col-sm-8">'+data.name+'</div>'+
										'</div>'+
										'<div class="row">'+
											'<div class="col-sm-3 col-sm-offset-1"><label>Phone Number</label></div>'+
											'<div class="col-sm-8">'+data.phoneNumber+'</div>'+
										'</div>'+
										'<div class="row">'+
											'<div class="col-sm-3 col-sm-offset-1"><label>Address</label></div>'+
											'<div class="col-sm-8">'+data.address+'</div>'+
										'</div>'+
									'</div>'+
									'<hr class="clearHr" >'+
									'<div class="col-sm-12 complaintData">'+
										'<h4>Complaint Informations</h4>'+
										'<div class="row">'+
											'<div class="col-sm-3 col-sm-offset-1"><label>Subject</label></div>'+
											'<div class="col-sm-8">'+data.aboutIssue+'</div>'+
										'</div>'+
										'<div class="row">'+
											'<div class="col-sm-3 col-sm-offset-1"><label>Description</label></div>'+
											'<div class="col-sm-8" style="word-break: break-all;" >'+data.description+'</div>'+
										'</div>'+
									'</div>'+
									'<hr class="clearHr" >'+
								'</div>'+
								'<div> '+
									'<a class="btn btn-back pull-right" href="complaint.html">Make another Complaint</a> '+
								'</div>';

		$("#pageData").html(successTicket);

	}
				
	$("#trackId").change(function() {
		var trackId = $("#trackId").val();
		id = [trackId];
		$.ajax({
			type: "POST",
			url: "https://track.simplexdelivery.com/recipient/track/single-order",
			data: JSON.stringify(trackId),
			contentType: "application/json", 
			dataType: "json",	    	 
			success: function (data) {
				if( data.order.waybillId ){
					$('#trackId').addClass('has-id');
					$('#trackId').removeClass('hasnot-id');
					$('#trackidError').html('');
				}
				else{
					$('#trackId').addClass('hasnot-id');
					$('#trackId').removeClass('has-id');
					$("#trackId").val('');
					$('#trackidError').html('Wrong WaybillId');
				} 
			},
			error: function(data) {
				$("#trackId").val('');
				$('#trackId').addClass('hasnot-id');
				$('#trackId').removeClass('has-id');
				$('#trackidError').html('Unable to process');
			}
		});
	});
			
			
			