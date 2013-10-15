$(function() {
		
			/* SCROLL STUFF */
		
			var SideBar = $("#company");
			var Illustrations = $("#company .illustration");
			var Blocks = $("#main .block");
			var ScrollSpy = $('[data-spy="scroll"]');
			var Main = $("#main");
		
			var changeDimensions = function(){
				var bodyheight = $(window).height() - 40;
				Illustrations.height(bodyheight);
				Blocks.css("min-height", bodyheight);
				SideBar.width($(window).width() - Main.width());
			}
						
			var calculateTopIllustration = function() {
				var topValue = $($("li.menu_entry.active a").attr('href') + "_illustration")[0].offsetTop;
				SideBar.animate({top: topValue * -1 + 40}, 300);
			};

			var refreshScrollSpy = function() {
				ScrollSpy.each(function () {
					var $spy = $(this).scrollspy('refresh')
				});
			}
			
			// changeons les dimensions initiales
			changeDimensions();
			// on s'accroche au redimensionnement
			$(window).resize(function() {
				changeDimensions();
				calculateTopIllustration();
				refreshScrollSpy();
			});
			// en cas de changement de menu actif
			$(".navbar ul li").on("activate", function() {
				calculateTopIllustration();
			});
			
			
			
			
			
			
		window.initializeMaps = function() {
		 /* MAP STUFF */
			
			
			var LatLngOuz = new google.maps.LatLng(41.343825,64.126282);
		
			var mapOptions = {
				zoom: 6,
				streetViewControl: false,
				center: LatLngOuz,
				mapTypeId: google.maps.MapTypeId.HYBRID ,
				scaleControl: true
			};
			var mapIllustration = new google.maps.Map(document.getElementById('voyage_illustration'), mapOptions);
			
			
			// on recommence, encore et encore, le début, d'accord, d'accord, etc... Si je codais mieux ça devrait pouvoir s'emballer qqpart...
			refreshScrollSpy();
		}

		function loadScript() {
		  var script = document.createElement("script");
		  script.type = "text/javascript";
		  script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language=fr&callback=initializeMaps";
		  document.body.appendChild(script);
		  refreshScrollSpy();
		}

			window.onload = loadScript;
			
			// on fixe les dimensions une dernière fois (bug des 15%)
			changeDimensions();
			// cough...
		});
