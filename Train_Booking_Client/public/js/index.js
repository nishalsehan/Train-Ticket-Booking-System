
	
	$(document).ready(function(){
		
		$("#userSignupBtn").css("background","#fff");
		$("#userSignupBtn").css("color","#f96332");
		$("#userLoginBtn").css("background","#fff");
		$("#userLoginBtn").css("color","#f96332");
		/* $("#navigation .navbar-nav>li>a:hover").css("border","1px solid #fff"); */

	
		$('#trackBtn').click(function(){	
			if($('#trackId').val() == ''){
				$("#alertText").html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please write your tracking id.</div>');
				$('#trackId').focus();
			}
			else{
				window.location.href = "trackOrder.html?trackID="+$('#trackId').val();
			}
		});
		
		document.querySelector('#trackId').addEventListener('keypress', function (e) {
			var key = e.which || e.keyCode;
			if (key === 13) { 
				if($('#trackId').val() == ''){
					$("#alertText").html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please write your tracking id.</div>');
					$('#trackId').focus();
				}
				else{
					window.location.href = "trackOrder.html?trackID="+$('#trackId').val();
				}
			}
		});		
		
		//scroll navbar animation effect //
		$(window).scroll(function () {
			if ($(window).scrollTop() > 200) {
				$(".navbar-brand a").css("color","#fff");
				$("#navigation").removeClass("animated-header");
				$("#navigation").css("box-shadow","1px 1px 1px #ddd");
				$("#navigation").css("background", "#fff");
				$("#simplexlogo").attr("src","./image/orange-logo.png");
				$("#navigation .navbar-nav>li>a").css("color","rgba(249, 99, 50, 0.75)");
				$("#userSignupBtn").css("background","#f96332");
				$("#userSignupBtn").css("color","#fff");
				$("#userLoginBtn").css("background","#f96332");
				$("#userLoginBtn").css("color","#fff");
				
				
			} else {
				$(".navbar-brand a").css("color","inherit");
				$("#navigation").addClass("animated-header");
				$("#navigation").css("box-shadow", "none");
				$("#navigation").css("background", "transparent");
				$("#simplexlogo").attr("src","./image/white-logo.png");
				$("#navigation .navbar-nav>li>a").css("color","#fff");
				$("#userSignupBtn").css("background","#fff");
				$("#userSignupBtn").css("color","#f96332");
				$("#userLoginBtn").css("background","#fff");
				$("#userLoginBtn").css("color","#f96332");
				/* $(".nav>li>a:focus").css("border","1px solid #fff"); */
			}
		});	
					
	});

	
	
	
	
	
	
	
	
	