 
	$(document).ready(function(){
		$('#alertText').hide();
		$('#resultContent').hide();
		$('#screenShotImgTr').hide();
		$('#screenShotImgTr_phone').hide();
		$('#actionTable').hide();
		$('#complaintStatusTable').hide();
		$('#trackComplaintPhoneResultTable').hide();
		$('#trackComplaintResultTable').hide();
		$('#screenShotButton').hide();
		$('#screenShotButton_phone').hide();
		
		$('#trackComplaintBtn').click(function(){
			trackComplaint();
		});
		
		document.querySelector('#complaintId').addEventListener('keypress', function (e) {
			var key = e.which || e.keyCode;
			if (key === 13) { 
				trackComplaint();
			}
		});
		
	});
	
	function trackComplaint(){
		
		var ids = $('#complaintId').val();
		$('#trackResult').html('');
		$('#trackStatusResult').html('');
		$('#trackStatusResultPhone').html('');
		
		if(ids == ''){
			$('#alertText').show();
			$("#alertText").html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please write your complaint id.</div>');
			$('#complaintId').focus();
		} else {
			$('#complaintId').val('');
			HoldOn.open({
				theme: 'sk-rect',
				message:'Loading',
				backgroundColor:"#fff",
				textColor:"#818181"
			});
			$('#alertText').hide();
			$.ajax({
				type: "GET",
				url: "https://track.simplexdelivery.com/recipient/issue/" + ids,
				success: function(result){

					$('.sec-title h2').css("marginTop", "0px");
					
					var showData = '<div class="col-sm-8 col-sm-offset-2" >'+
										'<div class="row form-group" >'+
											'<div class="col-sm-5">'+
												'<label>Complaint ID</label>'+
											'</div>'+
											'<div class="col-sm-7">'+
												'<input type="text" class="form-control" value="'+result.id+'" disabled >'+
											'</div>'+
										'</div>'+
										'<div class="row form-group" >'+
											'<div class="col-sm-5">'+
												'<label>Order Tracking ID ( Waybill ID )</label>'+
											'</div>'+
											'<div class="col-sm-7">'+
												'<input type="text" class="form-control" value="'+result.trackingId+'" disabled >'+
											'</div>'+
										'</div>'+
										'<div class="row form-group" >'+
											'<div class="col-sm-5">'+
												'<label>Complaint is about</label>'+
											'</div>'+
											'<div class="col-sm-7">'+
												'<input type="text" class="form-control" value="'+result.aboutIssue+'" disabled >'+
											'</div>'+
										'</div>'+
										'<div class="row form-group" >'+
											'<div class="col-sm-5">'+
												'<label>Current Status</label>'+
											'</div>'+
											'<div class="col-sm-7">'+
												'<input type="text" class="form-control" value="'+result.issueStatus.status+'" disabled >'+
											'</div>'+
										'</div>'+
									'</div>';
										
					$('#trackResult').html(showData);
					
					if( result.issueStatus.status == 'New' ){
					
						var statusData = '<div class="row  col-sm-12">'+
												'<div class="progress-with-circle">'+
													'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 0%;"></div>'+
												'</div>'+
												'<ul class="statusProgress" >'+
													'<li>'+
														'<a>'+
															'<div class="icon-circle" style="border-color: #00aa8d;" >'+
																'<i class="fa fa-comment" aria-hidden="true" style="color:#00aa8d;" ></i>'+
															'</div>'+
															'<p style=" margin-left: -36%; width:100%; " >'+
																'<label>New</label><br>'+
																''+result.createdAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 20%;" >'+
																'<i class="fa fa-user"></i>'+
															'</div>'+
															'<p style="margin-left: -14%; width:100%;" >'+
																'<label>Assign to support executive</label><br>'+
																'Pending'+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 45%;" >'+
																'<i class="fa fa-check"></i>'+
															'</div>'+
															'<p style=" margin-left: 10%; width:100%; " >'+
																'<label>Resolution</label><br>'+
																'Pending'+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 72%;" >'+
																'<i class="fa fa-check-square-o"></i>'+
															'</div>'+
															'<p style=" margin-left: 40%; width:100%; " >'+
																'<label>Acceptance</label><br>'+
																'Pending'+
															'</p>'+
														'</a>'+
													'</li>'+
												'</ul>'+
											'</div>';
											
							var statusDataPhone = '<div class="row text-center">'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
															  '<i class="fa fa-comment fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>New</label><br>'+
															''+result.createdAt+''+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-user fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Assign to support executive</label><br>'+
															'<p>pending</p>'+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															 '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Resolution</label><br>'+
															'<p>pending</p>'+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-check fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Acceptance</label><br>'+
															'<p>pending</p>'+
														'</div>'+
													'</div>';
					}
					
					if( result.issueStatus.status == 'Assigned' || result.issueStatus.status == 'Reopened' ){
					
						var statusData = '<div class="row  col-sm-12">'+
												'<div class="progress-with-circle">'+
													'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 33%;"></div>'+
												'</div>'+
												'<ul class="statusProgress" >'+
													'<li>'+
														'<a>'+
															'<div class="icon-circle" style="border-color: #00aa8d;" >'+
																'<i class="fa fa-comment" aria-hidden="true" style="color:#00aa8d;" ></i>'+
															'</div>'+
															'<p style=" margin-left: -36%; width:100%; " >'+
																'<label>New</label><br>'+
																''+result.createdAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 20%; border-color: #00aa8d;" >'+
																'<i class="fa fa-user" style="color:#00aa8d;" ></i>'+
															'</div>'+
															'<p style="margin-left: -14%; width:100%;" >'+
																'<label>Assign to support executive</label><br>'+
																''+result.issueStatusChanges[0].changedAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 45%;" >'+
																'<i class="fa fa-check"></i>'+
															'</div>'+
															'<p style=" margin-left: 10%; width:100%; " >'+
																'<label>Resolution</label><br>'+
																'Pending'+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 72%;" >'+
																'<i class="fa fa-check-square-o"></i>'+
															'</div>'+
															'<p style=" margin-left: 40%; width:100%; " >'+
																'<label>Acceptance</label><br>'+
																'Pending'+
															'</p>'+
														'</a>'+
													'</li>'+
												'</ul>'+
											'</div>';
											
						var statusDataPhone = '<div class="row text-center">'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
															  '<i class="fa fa-comment fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>New</label><br>'+
															''+result.createdAt+''+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
															  '<i class="fa fa-user fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Assign to support executive</label><br>'+
															''+result.issueStatusChanges[0].changedAt+''+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															 '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Resolution</label><br>'+
															'<p>pending</p>'+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-check fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Acceptance</label><br>'+
															'<p>pending</p>'+
														'</div>'+
													'</div>';
													
					}
					
					if( result.issueStatus.status == 'Resolved' ){
					
						var statusData = '<div class="row  col-sm-12">'+
												'<div class="progress-with-circle">'+
													'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 66%;"></div>'+
												'</div>'+
												'<ul class="statusProgress" >'+
													'<li>'+
														'<a>'+
															'<div class="icon-circle" style="border-color: #00aa8d;" >'+
																'<i class="fa fa-comment" aria-hidden="true" style="color:#00aa8d;" ></i>'+
															'</div>'+
															'<p style=" margin-left: -36%; width:100%; " >'+
																'<label>New</label><br>'+
																''+result.createdAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 20%; border-color: #00aa8d;" >'+
																'<i class="fa fa-user" style="color:#00aa8d;" ></i>'+
															'</div>'+
															'<p style="margin-left: -14%; width:100%;" >'+
																'<label>Assign to support executive</label><br>'+
																''+result.issueStatusChanges[0].changedAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 45%; border-color: #00aa8d;" >'+
																'<i class="fa fa-check" style="color:#00aa8d;"></i>'+
															'</div>'+
															'<p style=" margin-left: 10%; width:100%; " >'+
																'<label>Resolved</label><br>'+
																''+result.issueStatusChanges[1].changedAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 72%;" >'+
																'<i class="fa fa-check-square-o"></i>'+
															'</div>'+
															'<p style=" margin-left: 40%; width:100%; " >'+
																'<label>Acceptance</label><br>'+
																'Pending'+
															'</p>'+
														'</a>'+
													'</li>'+
												'</ul>'+
											'</div>';
											
						var statusDataPhone = '<div class="row text-center">'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-comment fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>New</label><br>'+
														''+result.createdAt+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-user fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Assign to support executive</label><br>'+
														''+result.issueStatusChanges[0].changedAt+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														 '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Resolved</label><br>'+
														''+result.issueStatusChanges[1].changedAt+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
														  '<i class="fa fa-check fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Acceptance</label><br>'+
														'<p>pending</p>'+
													'</div>'+
												'</div>';
													
					}
										
										
					if( result.issueStatus.status == 'Closed' ){
					
						var statusData = '<div class="row  col-sm-12">'+
												'<div class="progress-with-circle">'+
													'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 99%;"></div>'+
												'</div>'+
												'<ul class="statusProgress" >'+
													'<li>'+
														'<a>'+
															'<div class="icon-circle" style="border-color: #00aa8d;" >'+
																'<i class="fa fa-comment" aria-hidden="true" style="color:#00aa8d;" ></i>'+
															'</div>'+
															'<p style=" margin-left: -36%; width:100%; " >'+
																'<label>New</label><br>'+
																''+result.createdAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 20%; border-color: #00aa8d;" >'+
																'<i class="fa fa-user" style="color:#00aa8d;" ></i>'+
															'</div>'+
															'<p style="margin-left: -14%; width:100%;" >'+
																'<label>Assign to support executive</label><br>'+
																''+result.issueStatusChanges[0].changedAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 45%; border-color: #00aa8d;" >'+
																'<i class="fa fa-check" style="color:#00aa8d;"></i>'+
															'</div>'+
															'<p style=" margin-left: 10%; width:100%; " >'+
																'<label>Resolved</label><br>'+
																''+result.issueStatusChanges[result.issueStatusChanges.length-2].changedAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 72%; border-color: #00aa8d;" >'+
																'<i class="fa fa-check-square-o" style="color:#00aa8d;"></i>'+
															'</div>'+
															'<p style=" margin-left: 40%; width:100%; " >'+
																'<label>Closed</label><br>'+
																''+result.issueStatusChanges[result.issueStatusChanges.length-1].changedAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
												'</ul>'+
											'</div>';
											
							var statusDataPhone = '<div class="row text-center">'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-comment fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>New</label><br>'+
														''+result.createdAt+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-user fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Assign to support executive</label><br>'+
														''+result.issueStatusChanges[0].changedAt+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														 '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Resolved</label><br>'+
														''+result.issueStatusChanges[result.issueStatusChanges.length-2].changedAt+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-check fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Closed</label><br>'+
														''+result.issueStatusChanges[result.issueStatusChanges.length-1].changedAt+''+
													'</div>'+
												'</div>';
											
					}
					
					
					if( result.issueStatus.status == 'Accepted' ){
					
						var statusData = '<div class="row  col-sm-12">'+
												'<div class="progress-with-circle">'+
													'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 99%;"></div>'+
												'</div>'+
												'<ul class="statusProgress" >'+
													'<li>'+
														'<a>'+
															'<div class="icon-circle" style="border-color: #00aa8d;" >'+
																'<i class="fa fa-comment" aria-hidden="true" style="color:#00aa8d;" ></i>'+
															'</div>'+
															'<p style=" margin-left: -36%; width:100%; " >'+
																'<label>New</label><br>'+
																''+result.createdAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 20%; border-color: #00aa8d;" >'+
																'<i class="fa fa-user" style="color:#00aa8d;" ></i>'+
															'</div>'+
															'<p style="margin-left: -14%; width:100%;" >'+
																'<label>Assign to support executive</label><br>'+
																''+result.issueStatusChanges[0].changedAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 45%; border-color: #00aa8d;" >'+
																'<i class="fa fa-check" style="color:#00aa8d;"></i>'+
															'</div>'+
															'<p style=" margin-left: 10%; width:100%; " >'+
																'<label>Resolved</label><br>'+
																''+result.issueStatusChanges[result.issueStatusChanges.length-2].changedAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
															'<div class="icon-circle" style="margin-left: 72%; border-color: #00aa8d;" >'+
																'<i class="fa fa-check-square-o" style="color:#00aa8d;"></i>'+
															'</div>'+
															'<p style=" margin-left: 40%; width:100%; " >'+
																'<label>Accepted</label><br>'+
																''+result.issueStatusChanges[result.issueStatusChanges.length-1].changedAt+''+
															'</p>'+
														'</a>'+
													'</li>'+
												'</ul>'+
											'</div>';
											
							var statusDataPhone = '<div class="row text-center">'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-comment fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>New</label><br>'+
														''+result.createdAt+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-user fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Assign to support executive</label><br>'+
														''+result.issueStatusChanges[0].changedAt+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														 '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Resolved</label><br>'+
														''+result.issueStatusChanges[result.issueStatusChanges.length-2].changedAt+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-check fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Accepted</label><br>'+
														''+result.issueStatusChanges[result.issueStatusChanges.length-1].changedAt+''+
													'</div>'+
												'</div>';
											
					}
					
					
					$('#trackStatusResult').html(statusData);
					$('#trackStatusResultPhone').html(statusDataPhone);
					
					
					setTimeout(function(){
						HoldOn.close();
					},100);
					$('#resultContent').show();	
					$('#trackComplaintResultTable').show();
					$('#trackComplaintPhoneResultTable').show();
									
				},
				error: function(errMsg) { 
					$('#alertText').show();
					/* $("#alertText").html("Please check your compliaint ID or Try again later. Thank you."); */
					/* $("#alertText").html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please check your compliaint ID or Try again later. Thank you.</div>'); */
					$('#alertText').html('<div class="row text-center">'+
											'<img src="icons/emotional/sad.png" alt="sad icon" style="width: 80px;" >'+
											'<h4 style="font-weight: 700;" >Sorry, we do not have this complaint . . .</h4>'+
										'</div>');
					$('#complaintId').focus();
					setTimeout(function(){
						HoldOn.close();
					},100);
				}
			});
		}
	}
	
	
	$('#acceptBtn').click(function(){
		
		var data = {
			"id": $('#ticketId').text(), 
			"accepted":"true", 
			"comment": $('#comment').val()
		}
		HoldOn.open({
			theme: 'sk-rect',
			message:'Loading',
			backgroundColor:"#fff",
			textColor:"#818181"
		});
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "https://test.simplexdelivery.com/issue/accept-issue",
			data: JSON.stringify(data),
			dataType: 'json',
			timeout: 600000,
			success: function (result) {
				HoldOn.close();
				console.log('success');
				console.log(result);	
				$.confirm({
					theme: 'modern', // material, modern, bootstrap, supervan
					title: 'Closed Complaint Confrimation code',
					type: 'green',
					content: '' +
					'<form action="" class="formName">' +
					'<div class="form-group">' +
					'<label>Please enter confirmtion code</label>' +
					'<input type="text" placeholder="Confirmation Code" class="confirmText form-control" required />' +
					'</div>' +
					'</form>',
					buttons: {
						formSubmit: {
							text: 'Confirm',
							btnClass: 'btn-green',
							action: function () {
								var code = this.$content.find('.confirmText').val();
								if(!code){
									$.alert({
										type: 'red',
										theme: 'modern',
										title: false,
										content: 'write your confirmation code.',
									});
									return false;
								}
								var data = {
									"id": $('#ticketId').text(), 
									"accepted":"true", 
									"comment": $('#comment').val(),
									"verificationCode": code
								}
								HoldOn.open({
									theme: 'sk-rect',
									message:'Loading',
									backgroundColor:"#fff",
									textColor:"#818181"
								});
								$.ajax({
									type: "POST",
									contentType: "application/json",
									url: "https://test.simplexdelivery.com/issue/verified-issue",
									data: JSON.stringify(data),
									dataType: 'json',
									timeout: 600000,
									success: function (result) {
										console.log('double succss');
										console.log(result);
										if( result == true ){
											$.alert({
												type: 'green',
												theme: 'modern',
												title: false,
												content: 'Your compliant is closed.',
											});
											$('#actionTable').hide();
											HoldOn.close();
										}
										else{
											$.alert({
												type: 'red',
												theme: 'modern',
												title: false,
												content: 'Mismatch confirmation code.',
											});
											HoldOn.close();
										}
									},
									error: function (error) {
										console.log('unable to confirm your code');
										return false;
										HoldOn.close();
									}
								});
							}
						},
						cancel: function () {
							//close
							HoldOn.close();
						},
					}
				}); 

			},
			error: function (error) {
				console.log(error); 
				HoldOn.close();
			}
		});
			
	});
	
	
	$('#rejectBtn').click(function(){
		var data = {
			"id": $('#ticketId').text(), 
			"accepted":"false", 
			"comment": $('#comment').val()
		}
		HoldOn.open({
			theme: 'sk-rect',
			message:'Loading',
			backgroundColor:"#fff",
			textColor:"#818181"
		});
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "https://track.simplexdelivery.com/issue/accept-issue",
			data: JSON.stringify(data),
			dataType: 'json',
			timeout: 600000,
			success: function (result) {
				HoldOn.close();
				console.log('success continue');
				console.log(result);
				$.confirm({
					theme: 'modern', // material, modern, bootstrap, supervan
					title: 'Continue Compliant Confrimation code',
					type: 'green',
					content: '' +
					'<form action="" class="formName">' +
					'<div class="form-group">' +
					'<label>Please enter confirmtion code</label>' +
					'<input type="text" placeholder="Confirmation Code" class="confirmText form-control" required />' +
					'</div>' +
					'</form>',
					buttons: {
						formSubmit: {
							text: 'Confirm',
							btnClass: 'btn-green',
							action: function () {
								var code = this.$content.find('.confirmText').val();
								if(!code){
									$.alert({
										type: 'red',
										theme: 'modern',
										title: false,
										content: 'write your confirmation code.',
									});
									return false;
								}
								var data = {
									"id": $('#ticketId').text(), 
									"accepted":"false", 
									"comment": $('#comment').val(),
									"verificationCode": code
								}
								HoldOn.open({
									theme: 'sk-rect',
									message:'Loading',
									backgroundColor:"#fff",
									textColor:"#818181"
								});
								$.ajax({
									type: "POST",
									contentType: "application/json",
									url: "https://track.simplexdelivery.com/issue/verified-issue",
									data: JSON.stringify(data),
									dataType: 'json',
									timeout: 600000,
									success: function (result) {
										console.log('double succss');
										console.log(result);
										if( result == true ){
											$.alert({
												type: 'green',
												theme: 'modern',
												title: false,
												content: 'Your compliant is continue.',
											});
											$('#actionTable').hide();
											HoldOn.close();
										}
										else{
											$.alert({
												type: 'red',
												theme: 'modern',
												title: false,
												content: 'Mismatch confirmation code.',
											});
											HoldOn.close();
										}
									},
									error: function (error) {
										console.log('unable to confirm your code');
										return false;
										HoldOn.close();
									}
								});
							}
						},
						cancel: function () {
							//close
							HoldOn.close();
						},
					}
				}); 
			},
			error: function (error) {
				console.log(error); 
				HoldOn.close();
			}
		});
		
	});
	
	$('#showScreenshot').click(function(){
		$('#screenShotImgTr').show();	
	});
	
	$('#hideScreenshot').click(function(){
		$('#screenShotImgTr').hide();	
	});
	
	$('#showScreenshot_phone').click(function(){
		$('#screenShotImgTr_phone').show();	
	});
	
	$('#hideScreenshot_phone').click(function(){
		$('#screenShotImgTr_phone').hide();	
	});
	
	
	
	
	
	