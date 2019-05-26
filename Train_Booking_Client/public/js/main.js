

	// wow animation js //			
	var wow = new WOW ({
		offset:       75,          
		mobile:       false,       
	});
	wow.init();




	$(document).ready(function(){
		
		// loader function //
		/* setTimeout(function(){
			$('body').addClass('loaded');
		}, 1); */
		
		
		// navigtaion bar intialization //
		jQuery('#nav').singlePageNav({
			offset: jQuery('#nav').outerHeight(),
			filter: ':not(.external)',
			speed: 2000,
			currentClass: 'current',
			easing: 'easeInOutExpo',
			updateHash: true,
			beforeStart: function() {
				console.log('begin scrolling');
			},
			onComplete: function() {
				console.log('done scrolling');
			}
		});
		
		
			

		var links = [
                    {
                        "bgcolor":"#00aa8d",
                        "icon":"+",
						"color": "white"
                    },
                    {
                        "url":"complaint.html",
                        "bgcolor":"#00aa8d",
                        "color":"#fffff",
                        "icon":"<i class='fa fa-file'></i>",
                        "target":"_blank",
						"title": "Make a complaint"
                    },
                    {
                        "url":"request-rate.html",
                        "bgcolor":"#00aa8d",
                        "color":"white",
                        "icon":"<i class='fa fa-question'></i>",
						"title": "Request Rates",
						"target":"_blank",
                    },
					{
                        "url":"contact.html",
                        "bgcolor":"#00aa8d",
                        "color":"white",
                        "icon":"<i class='fa fa-phone'></i>",
						"title": "Contact Us",
						"target":"_blank",
                    }
                ]
                $('.kc_fab_wrapper').kc_fab(links);
		
					
	});

	
	/* function gotoEmotion1(){
		$('#feedBackText').val( $('#feedBackText').val()).after("<img src='icons/emotional/1.png'/>");
		console.log($('#feedBackText').val($('#feedBackText').val() + 'fff'));
	} */
	
	
	
	
	
	
	
	
	
	
	