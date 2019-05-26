var feedback = '';
var isWaybill = false;


$(".emotionIcon1").click(function() {
	feedback = '1';
});

$(".emotionIcon2").click(function() {
	feedback = '2';
});

$(".emotionIcon3").click(function() {
	feedback = '3';
});

$(".emotionIcon4").click(function() {
	feedback = '4';
});

$(".emotionIcon5").click(function() {
	feedback = '5';
});


$(function() {
	
	$("#feedback-tab").click(function() {
		$("#feedback-form").toggle("slide");
		$('#feedbackError').html('');
	});

	$(".btn-feedBack").on('click', function(event) {
		
		var waybill = $('#feedBackText').val();
		
		if( ( isWaybill == true ) && ( feedback != '' ) ){
			
			var formInformation = 'waybill='+ waybill + '&feedback='+ feedback ;
			$.ajax({
				type: "POST",
				url: "functions/feedback.php",
				data: formInformation,
				cache: false,
				success: function(result){
					$('#feedbackError').html('Thank you for your feedback.');
					$('#feedBackText').val('');
					isWaybill = false;
					feedback = '';
				},
				error: function (data) {
					$('#feedbackError').html('Unable to send you feedback. Try again later.');
				}
			});
			
		}
		else{
			$('#feedbackError').html('Please enter your waybill ID and your feedback.');
		}
		
		event.preventDefault();
	});
});


$("#feedBackText").change(function() {
		var trackId = $("#feedBackText").val();

		$.ajax({
			type: "POST",
			url: "https://track.simplexdelivery.com/recipient/track/single-order",
			data: JSON.stringify(trackId),
			contentType: "application/json", 
			dataType: "json",	    	 
			success: function (data) { 
				if( data.order.waybillId ){
					isWaybill = true;
				}
				else{
					$('#feedbackError').html('Wrong WaybillId');
				} 
			},
			error: function(data) {
				$("#feedBackText").val('');
				$('#feedbackError').html('Unable to process. Please Check your WaybillId.');
			}
		});
	});
	
	





	
	
	
	
	
	
	
	
	
	

