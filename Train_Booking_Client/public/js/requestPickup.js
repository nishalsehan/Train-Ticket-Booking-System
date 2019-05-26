
var changeSenderLocation = false;

	$('#pickupBtn').click(function(){
		var accnumber = $('#accountNumber').val();
		var contactname = $('#contactName').val();
		var phone = $('#pickupPhone').val();
		var address = $('#pickupAddress').val();
		var destination = $('#city').val();
		var remark = $('#specialRemark').val();
		var vehicle = $("input:radio:checked").val();   
		
		if( accnumber == ''){
			$("#accountError").html("Please enter your account number");
			$('#accountNumber').focus();
		}
		else{
			$("#accountError").html('');
			var numberreg = /^[0-9]*$/;
			if( numberreg.test(accnumber) === true ){
				$("#accountError").html('');
				if( contactname == '' ){
					$("#contactNameError").html("Please enter your contact name");
					$('#contactName').focus();
				}
				else{
					$("#contactNameError").html('');
					if( phone == '' ){
						$("#phoneError").html("Please enter your phone number");
						$('#pickupPhone').focus();
					}
					else{
						$("#phoneError").html('');
						var phonereg = /^[0][0-9]{9}$/;
						if( phonereg.test(phone) === true ){
							$("#phoneError").html('');
							if( address == ''){
								$("#addressError").html("Please enter your pickup address");
								$('#pickupAddress').focus();
							}
							else{
								$("#addressError").html('');
								if( destination == null){
									$("#destinationError").html("Please enter your nearest city");
									$('#pickupDestination').focus();
								}
								else{
									$("#destinationError").html('');
									if( changeSenderLocation == false ){
										$('#senderLocationError').html('<div class="customeError">Please pin your location.</div>');
									}
									else{
										$('#senderLocationError').html('');
										if( remark == ''){
											$("#remarkError").html("Please enter what do you have to pickup ?");
											$('#specialRemark').focus();
										}
										else{
											$("#remarkError").html("");
											if( vehicle == undefined ){
												$("#vehicleError").html("Please choose your pickup vehicle type");
											}
											else{
												$("#vehicleError").html("");
												HoldOn.open({
													theme: 'sk-rect',
													message:'Loading',
													backgroundColor:"#fff",
													textColor:"#818181"
												});

												var data = {
													'client': {
														"accountNumber" : accnumber 
													},
													'contactName' : contactname,
													'vehicleType': vehicle,
													'address': address,
													'phoneNumber': phone,
													'destination': destination,
													'description': remark
												};
												
												$.ajax({
													type: "POST",
													url: "https://track.simplexdelivery.com/recipient/pickup/single-upload",
													data: JSON.stringify(data),
													contentType: "application/json",
													dataType: "json",
													timeout: 100000000,
													success: function(data){ 
														
														$("#resultMsg").html('<div style="text-align: center; color: #00aa8d; font-weight:700; font-size: 13px; margin-top: 20px;" >'+result+'</div>');
														setTimeout(function(){
															HoldOn.close();
														},100);
													},
													error: function(data) { 
														
														if( data.status == 404 ){
															$("#resultMsg").html('<div style="text-align: center; color: #ef5a5a; font-weight:700; font-size: 13px; margin-top: 20px;" >Invalid Account number.</div>');
														}
														else if( data.status == 200 ){
															$("#resultMsg").html('<div style="text-align: center; color: #00aa8d; font-weight:700; font-size: 13px; margin-top: 20px;" >Supplier pickup added</div>');
														}
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
									
							}
						}
						else{
							$("#phoneError").html("Please enter 10 digits valid phone number start with 0");
							$('#pickupPhone').focus();
						}
					}

				}
			}
			else{
				$("#accountError").html("Please enter your account number correctly");
				$('#accountNumber').focus();
			}
		}
		
	});
		
	function gotoReset(){
		$('#accountNumber').val('');
		$('#pickupPhone').val('');
		$('#pickupAddress').val('');
		$('#specialRemark').val('');
		$('#vehicleType').val('');
		$('#city').val('');
		$('#contactName').val('');
		$('#pickupDestination').val('');
		$('input[name="vehicleType"]').prop('checked', false);
		$("#accountError").html('');
		$("#phoneError").html('');
		$("#addressError").html('');
		$("#remarkError").html('');
		$("#vehicleError").html('');
		$("#contactNameError").html('');
		$("#destinationError").html('');
		$('#senderLocationError').html('');
	}
	
	/* $('#us3').locationpicker({
		location: {
			latitude: 6.8772019,
			longitude: 79.8923317
		},
		radius: 30,
		inputBinding: {
			latitudeInput: $('#us3-lat'),
			longitudeInput: $('#us3-lon'),
			radiusInput: $('#us3-radius'),
			locationNameInput: $('#us3-address')
		},
		onchanged: function (currentLocation, radius, isMarkerDropped) {
			changeSenderLocation = true;
		}
	}); */
	
			
	$(document).ready(function(){
		
		 google.maps.event.addDomListener(window, "load", businessLocationInitialize());
		
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
	
	
	var map;
		  
	function businessLocationInitialize() {

		var myLatlng = new google.maps.LatLng(6.8772019, 79.8923317);

		var myOptions = {
			zoom: 15,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		map = new google.maps.Map(document.getElementById("business-Location"), myOptions);
		
		var marker = new google.maps.Marker({
						map: map,
						draggable: true,
						position: myLatlng
					});

		var input = document.getElementById('business-input');
		var searchBox1 = new google.maps.places.SearchBox(input);
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

		map.addListener('bounds_changed', function() {
			searchBox1.setBounds(map.getBounds());
		});
		
		google.maps.event.addListener(marker, 'dragend', function (event) {
			document.getElementById("business-lat").value = event.latLng.lat();
			document.getElementById("business-long").value = event.latLng.lng();
			changeSenderLocation = true;
		});

		var markers = [];
		
		searchBox1.addListener('places_changed', function() {
			
			marker.setMap(null);
			
			var places = searchBox1.getPlaces();

			if (places.length == 0) {
				return;
			}

			markers.forEach(function(marker) {
				marker.setMap(null);
			});
			
			markers = [];

			var bounds = new google.maps.LatLngBounds();
			places.forEach(function(place) {
				
				var marker = new google.maps.Marker({
					map: map,
					draggable: true,
					title: place.name,
					position: place.geometry.location
				});
				
				document.getElementById("business-lat").value = place.geometry.location.lat();
				document.getElementById("business-long").value = place.geometry.location.lng();
				
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}
				var icon = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
				};

				markers.push(marker);

				if (place.geometry.viewport) {
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
				
				google.maps.event.addListener(marker, 'dragend', function (event) {
					document.getElementById("business-lat").value = event.latLng.lat();
					document.getElementById("business-long").value = event.latLng.lng();
					changeSenderLocation = true;
				});
			
			});
		
			map.fitBounds(bounds);
			changeSenderLocation = true;
			
		});

	}