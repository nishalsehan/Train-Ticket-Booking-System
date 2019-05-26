
	$(document).ready(function(){
		
		 
		 var url_string = window.location.toString();
		 var url = new URL(url_string);
		 var id = url.searchParams.get("trackID");
		 console.log(id);
		 
		 if( id != null ){
			 $('#trackId').val(id)
			 trackOrder();
		 }
		
		
		$('#trackBtn').click(function(){
			trackOrder();
		});
		
		document.querySelector('#trackId').addEventListener('keypress', function (e) {
			var key = e.which || e.keyCode;
			if (key === 13) { 
				trackOrder();
			}
		});
		
	});
	
	function trackOrder(){			
	
		
		
		var ids = $('#trackId').val();
		$('#trackStatusResult').html('');
		$('#trackResult').html('');
		$('#rateService').html('');
		$('#trackStatusResultPhone').html('');
		
		if(ids == ''){
			$('#alertText').show();
			$("#alertText").html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please write your tracking id.</div>');
			$('#trackId').focus();
		} else {
			HoldOn.open({
				theme: 'sk-rect',
				message:'Loading',
				backgroundColor:"#fff",
				textColor:"#818181"
			});
			$('#alertText').hide();
			$.ajax({
				type: "POST",
				/* url: "https://track.simplexdelivery.com/recipient/track/view/bulk", */
				url: "https://track.simplexdelivery.com/recipient/track/single-order",
				data: JSON.stringify(ids),
				contentType: "application/json",
				dataType: "json",
				timeout: 100000000,
				success: function(result){ 
					$('.sec-title h2').css("marginTop", "0px");
					console.log(result);
					
					var showData = '<div class="col-sm-8 col-sm-offset-2" >'+
											'<div class="row form-group" >'+
												'<div class="col-sm-5">'+
													'<label>Tracking ID</label>'+
												'</div>'+
												'<div class="col-sm-7">'+
													'<input type="text" class="form-control" value="'+result.order.waybillId+'" disabled >'+
												'</div>'+
											'</div>'+
											'<div class="row form-group" >'+
												'<div class="col-sm-5">'+
													'<label>Order ID</label>'+
												'</div>'+
												'<div class="col-sm-7">'+
													'<input type="text" class="form-control" value="'+result.order.orderId+'" disabled >'+
												'</div>'+
											'</div>'+
											'<div class="row form-group" >'+
												'<div class="col-sm-5">'+
													'<label>COD (Cach On Delivery) Amount</label>'+
												'</div>'+
												'<div class="col-sm-7">'+
													'<input type="text" class="form-control" value="'+result.order.codAmount+' .00 LKR" disabled >'+
												'</div>'+
											'</div>'+
											'<div class="row form-group" >'+
												'<div class="col-sm-5">'+
													'<label>Current Status</label>'+
												'</div>'+
												'<div class="col-sm-7">'+
													'<input type="text" class="form-control" value="'+result.delivery.deliveryStatus+'" disabled >'+
												'</div>'+
											'</div>'+
										'</div>'+
										'<div class="col-sm-2"></div>';
										
					$('#trackResult').html(showData);
					
					var commentData = '<div class="row">'+
										'<div class="col-sm-4 col-sm-offset-4 text-center">'+
											'<h3>Rate our Service</h3>'+
											'<div class="form-group">'+
												'<button type="button" class="btn emotionIcon emotionIcon1"></button>'+
												'<button type="button" class="btn emotionIcon emotionIcon2"></button>'+
												'<button type="button" class="btn emotionIcon emotionIcon3"></button>'+
												'<button type="button" class="btn emotionIcon emotionIcon4"></button>'+
												'<button type="button" class="btn emotionIcon emotionIcon5"></button>'+
											'</div>'+
											'<div class="form-group">'+
												'<textarea rows="3" class="form-control" id="comment" ></textarea>'+
											'</div>'+
											'<div class="form-group">'+
												'<button class="btn btn-block" id="commentBtn" >Submit</button>'+
											'</div>'+
										'</div>'+
									'</div>';
					//$('#rateService').html(commentData);
					
					var complaintData = '<div class="row">'+
										'<div class="col-sm-4 col-sm-offset-4 ">'+
											'<div class="form-group text-center">'+
												'<a class="btn" id="complaintBtn" href="complaint.html" >Make a Complaint</a>'+
											'</div>'+
										'</div>'+
									'</div>';
					$('#makeComplaint').html(complaintData);

					if( result.delivery.deliveryStatus == 'Processing' || result.delivery.deliveryStatus == 'Unable to Process' ){
						$('#trackResult').html('');
						$('#rateService').html('');
						$('#trackStatusResultPhone').html('');
						$('#alertText').show();
						$('#alertText').html('<div class="row text-center">'+
											'<img src="icons/emotional/sad.png" alt="sad icon" style="width: 80px;" >'+
											'<h4 style="font-weight: 700;" >Sorry, we do not have this order ......</h4>'+
										'</div>');
						
					}
					
					if( result.delivery.deliveryStatus == 'Collected by Simplex' ||  result.delivery.deliveryStatus == 'Different Destination' ){
						
						var statusData = '<div class="row  col-sm-12">'+
											'<div class="progress-with-circle">'+
												'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 0%;"></div>'+
											'</div>'+
											'<ul class="statusProgress" >'+
												'<li>'+
													'<a>'+
														'<div class="icon-circle" style="border-color: #00aa8d;" >'+
															'<i class="fa fa-cart-arrow-down" aria-hidden="true" style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -74%;" >'+
															'<label>Collected by simplex</label><br>'+
															''+result.delivery.collectedDate+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 20%;" >'+
															'<i class="fa fa-map-marker"></i>'+
														'</div>'+
														'<p style="margin-left: -28%;" >'+
															'<label>Received at destination</label><br>'+
															'Pending'+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 45%;" >'+
															'<i class="fa fa-truck"></i>'+
														'</div>'+
														'<p style="margin-left: 20%;" >'+
															'<label>Out for delivery</label><br>'+
															'Pending'+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 72%;" >'+
															'<i class="fa fa-check-circle-o"></i>'+
														'</div>'+
														'<p style="margin-left: 75%;" >'+
															'<label>Delivery</label><br>'+
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
															  '<i class="fa fa-cart-arrow-down fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Collected by simplex</label><br>'+
															''+result.delivery.collectedDate+''+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Received at destination</label><br>'+
															'<p>pending</p>'+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															 '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Out for delivery</label><br>'+
															'<p>pending</p>'+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-check fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Delivery</label><br>'+
															'<p>pending</p>'+
														'</div>'+
													'</div>';
										
					}
					
					if( result.delivery.deliveryStatus == 'Received at Destination' ){
						
						var statusData = '<div class="row  col-sm-12">'+
											'<div class="progress-with-circle">'+
												'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 33%;"></div>'+
											'</div>'+
											'<ul class="statusProgress" >'+
												'<li>'+
													'<a>'+
														'<div class="icon-circle" style="border-color: #00aa8d;" >'+
															'<i class="fa fa-cart-arrow-down" aria-hidden="true" style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -74%;" >'+
															'<label>Collected by simplex</label><br>'+
															''+result.delivery.collectedDate+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 20%; border-color: #00aa8d;" >'+
															'<i class="fa fa-map-marker"  style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -28%;" >'+
															'<label>Received at destination</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.order.destinationHub+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 45%;" >'+
															'<i class="fa fa-truck"></i>'+
														'</div>'+
														'<p style="margin-left: 20%;" >'+
															'<label>Out for delivery</label><br>'+
															'Pending'+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 72%;" >'+
															'<i class="fa fa-check-circle-o"></i>'+
														'</div>'+
														'<p style="margin-left: 75%;" >'+
															'<label>Delivery</label><br>'+
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
															  '<i class="fa fa-cart-arrow-down fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Collected by simplex</label><br>'+
															''+result.delivery.collectedDate+''+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
															  '<i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Received at destination</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.order.destinationHub+''+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															 '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Out for delivery</label><br>'+
															'<p>pending</p>'+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-check fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Delivery</label><br>'+
															'<p>pending</p>'+
														'</div>'+
													'</div>';
										
					}
					
					if( result.delivery.deliveryStatus == 'Dispatch to Destination' ){
						
						var statusData = '<div class="row  col-sm-12">'+
											'<div class="progress-with-circle">'+
												'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 33%;"></div>'+
											'</div>'+
											'<ul class="statusProgress" >'+
												'<li>'+
													'<a>'+
														'<div class="icon-circle" style="border-color: #00aa8d;" >'+
															'<i class="fa fa-cart-arrow-down" aria-hidden="true" style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -74%;" >'+
															'<label>Collected by simplex</label><br>'+
															''+result.delivery.collectedDate+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 20%; border-color: #00aa8d;" >'+
															'<i class="fa fa-map-marker"  style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -28%;" >'+
															'<label>Dispatch to Destination</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.order.destinationHub+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 45%;" >'+
															'<i class="fa fa-truck"></i>'+
														'</div>'+
														'<p style="margin-left: 20%;" >'+
															'<label>Out for delivery</label><br>'+
															'Pending'+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 72%;" >'+
															'<i class="fa fa-check-circle-o"></i>'+
														'</div>'+
														'<p style="margin-left: 75%;" >'+
															'<label>Delivery</label><br>'+
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
															  '<i class="fa fa-cart-arrow-down fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Collected by simplex</label><br>'+
															''+result.delivery.collectedDate+''+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
															  '<i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Dispatch to Destination</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.order.destinationHub+''+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															 '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Out for delivery</label><br>'+
															'<p>pending</p>'+
														'</div>'+
														'<div class="col-sm-12 ">'+
															'<span class="fa-stack fa-3x">'+
															  '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
															  '<i class="fa fa-check fa-stack-1x fa-inverse"></i>'+
															'</span><br>'+
															'<label>Delivery</label><br>'+
															'<p>pending</p>'+
														'</div>'+
													'</div>';
										
					}
					
					
					if( result.delivery.deliveryStatus == 'Out for Delivery' ){
						
						var statusData = '<div class="row  col-sm-12">'+
											'<div class="progress-with-circle">'+
												'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 66%;"></div>'+
											'</div>'+
											'<ul class="statusProgress" >'+
												'<li>'+
													'<a>'+
														'<div class="icon-circle" style="border-color: #00aa8d;" >'+
															'<i class="fa fa-cart-arrow-down" aria-hidden="true" style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -74%;" >'+
															'<label>Collected by simplex</label><br>'+
															''+result.delivery.collectedDate+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 20%; border-color: #00aa8d;" >'+
															'<i class="fa fa-map-marker"  style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -28%;" >'+
															'<label>Received at destination</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.order.destinationHub+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 45%; border-color: #00aa8d;" >'+
															'<i class="fa fa-truck" style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: 20%;" >'+
															'<label>Out for delivery</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.delivery.agentName+'<br>'+
															''+result.delivery.agentPhone+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 72%;" >'+
															'<i class="fa fa-check-circle-o"></i>'+
														'</div>'+
														'<p style="margin-left: 75%;" >'+
															'<label>Delivery</label><br>'+
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
														  '<i class="fa fa-cart-arrow-down fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Collected by simplex</label><br>'+
														''+result.delivery.collectedDate+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Received at destination</label><br>'+
														''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
														''+result.order.destinationHub+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														 '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Out for delivery</label><br>'+
														''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
														''+result.delivery.agentName+'<br>'+
														''+result.delivery.agentPhone+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
														  '<i class="fa fa-check fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Delivery</label><br>'+
														'<p>pending</p>'+
													'</div>'+
												'</div>';
										
					}
					
					if( result.delivery.deliveryStatus == 'Rescheduled' ){
						
						var statusData = '<div class="row  col-sm-12">'+
											'<div class="progress-with-circle">'+
												'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 66%;"></div>'+
											'</div>'+
											'<ul class="statusProgress" >'+
												'<li>'+
													'<a>'+
														'<div class="icon-circle" style="border-color: #00aa8d;" >'+
															'<i class="fa fa-cart-arrow-down" aria-hidden="true" style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -74%;" >'+
															'<label>Collected by simplex</label><br>'+
															''+result.delivery.collectedDate+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 20%; border-color: #00aa8d;" >'+
															'<i class="fa fa-map-marker"  style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -28%;" >'+
															'<label>Received at destination</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.order.destinationHub+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 45%; border-color: #00aa8d;" >'+
															'<i class="fa fa-truck" style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: 20%;" >'+
															'<label>Rescheduled</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].rescheduleDate+'<br>'+
															''+result.delivery.deliveryStatusChanges[0].reason+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 72%;" >'+
															'<i class="fa fa-check-circle-o"></i>'+
														'</div>'+
														'<p style="margin-left: 75%;" >'+
															'<label>Delivery</label><br>'+
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
														  '<i class="fa fa-cart-arrow-down fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Collected by simplex</label><br>'+
														''+result.delivery.collectedDate+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Received at destination</label><br>'+
														''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
														''+result.order.destinationHub+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														 '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Rescheduled</label><br>'+
														''+result.delivery.deliveryStatusChanges[0].rescheduleDate+'<br>'+
														''+result.delivery.deliveryStatusChanges[0].reason+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #f6f6f6;" ></i>'+
														  '<i class="fa fa-check fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Delivery</label><br>'+
														'<p>pending</p>'+
													'</div>'+
												'</div>';
										
					}
					
						
					if( result.delivery.deliveryStatus == 'Failed to Deliver' || result.delivery.deliveryStatus == 'Return to Simplex' || result.delivery.deliveryStatus == 'Return to Client' || result.delivery.deliveryStatus == 'Return Received' || result.delivery.deliveryStatus == 'Received at Simplex' ){
						
						var statusData = '<div class="row col-sm-12">'+
											'<div class="progress-with-circle">'+
												'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 99%;"></div>'+
											'</div>'+
											'<ul class="statusProgress" >'+
												'<li>'+
													'<a>'+
														'<div class="icon-circle" style="border-color: #00aa8d;" >'+
															'<i class="fa fa-cart-arrow-down" aria-hidden="true" style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -74%;" >'+
															'<label>Collected by simplex</label><br>'+
															''+result.delivery.collectedDate+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 20%; border-color: #00aa8d;" >'+
															'<i class="fa fa-map-marker"  style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -28%;" >'+
															'<label>Received at destination</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.order.destinationHub+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 45%; border-color: #00aa8d;" >'+
															'<i class="fa fa-truck" style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: 20%;" >'+
															'<label>Out for delivery</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.delivery.agentName+'<br>'+
															''+result.delivery.agentPhone+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 72%; border-color: #00aa8d;" >'+
															'<i class="fa fa-times-circle" style="color:#00aa8d;"></i>'+
														'</div>'+
														'<p style="margin-left: 38%; width: 100%;" >'+
															'<label>Delivery</label><br>'+
															'Failed<br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.delivery.deliveryStatusChanges[0].reason+''+
														'</p>'+
													'</a>'+
												'</li>'+
											'</ul>'+
										'</div>';
										
						var statusDataPhone = '<div class="row text-center">'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-cart-arrow-down fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Collected by simplex</label><br>'+
														''+result.delivery.collectedDate+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Received at destination</label><br>'+
														''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
														''+result.order.destinationHub+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														 '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Out for delivery</label><br>'+
														''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
														''+result.delivery.agentName+'<br>'+
														''+result.delivery.agentPhone+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-times-circle fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Delivery</label><br>'+
														'Failed<br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.delivery.deliveryStatusChanges[0].reason+''+
													'</div>'+
												'</div>';
										
					}	
					

					if( result.delivery.deliveryStatus == 'Delivered' || result.delivery.deliveryStatus == 'Partially Delivered' ){
						
						var statusData = '<div class="row col-sm-12">'+
											'<div class="progress-with-circle">'+
												'<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 99%;"></div>'+
											'</div>'+
											'<ul class="statusProgress" >'+
												'<li>'+
													'<a>'+
														'<div class="icon-circle" style="border-color: #00aa8d;" >'+
															'<i class="fa fa-cart-arrow-down" aria-hidden="true" style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -74%;" >'+
															'<label>Collected by simplex</label><br>'+
															''+result.delivery.collectedDate+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 20%; border-color: #00aa8d;" >'+
															'<i class="fa fa-map-marker"  style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: -28%;" >'+
															'<label>Received at destination</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.order.destinationHub+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 45%; border-color: #00aa8d;" >'+
															'<i class="fa fa-truck" style="color:#00aa8d;" ></i>'+
														'</div>'+
														'<p style="margin-left: 20%;" >'+
															'<label>Out for delivery</label><br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
															''+result.delivery.agentName+'<br>'+
															''+result.delivery.agentPhone+''+
														'</p>'+
													'</a>'+
												'</li>'+
												'<li>'+
													'<a >'+
														'<div class="icon-circle" style="margin-left: 72%; border-color: #00aa8d;" >'+
															'<i class="fa fa-check-circle" style="color:#00aa8d;"></i>'+
														'</div>'+
														'<p style="margin-left: 38%; width: 100%;" >'+
															'<label>Delivery</label><br>'+
															'Successful<br>'+
															''+result.delivery.deliveryStatusChanges[0].changedDate+''+
														'</p>'+
													'</a>'+
												'</li>'+
											'</ul>'+
										'</div>';
										
						var statusDataPhone = '<div class="row text-center">'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-cart-arrow-down fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Collected by simplex</label><br>'+
														''+result.delivery.collectedDate+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Received at destination</label><br>'+
														''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
														''+result.order.destinationHub+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														 '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-truck fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Out for delivery</label><br>'+
														''+result.delivery.deliveryStatusChanges[0].changedDate+'<br>'+
														''+result.delivery.agentName+'<br>'+
														''+result.delivery.agentPhone+''+
													'</div>'+
													'<div class="col-sm-12 ">'+
														'<span class="fa-stack fa-3x">'+
														  '<i class="fa fa-circle fa-stack-2x" style="color: #00aa8d;" ></i>'+
														  '<i class="fa fa-check-circle fa-stack-1x fa-inverse"></i>'+
														'</span><br>'+
														'<label>Delivery</label><br>'+
														'Successful<br>'+
														''+result.delivery.deliveryStatusChanges[0].changedDate+''+
													'</div>'+
												'</div>';
										
					}
						
						
						
						
						
						$('#trackStatusResult').html(statusData);
						$('#trackStatusResultPhone').html(statusDataPhone);
						
					
					setTimeout(function(){
						HoldOn.close();
					},100);							
				},
				error: function(errMsg) {
					$('#alertText').show();
					/* $("#alertText").html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Unable to track your order</div>'); */
					$('#alertText').html('<div class="row text-center">'+
											'<img src="icons/emotional/sad.png" alt="sad icon" style="width: 80px;" >'+
											'<h4 style="font-weight: 700;" >Sorry, we do not have this order ......</h4>'+
										'</div>');
					setTimeout(function(){
						HoldOn.close();
					},100);	
				}
			});
		}
		$('#trackId').val('');
	}
	
			
			