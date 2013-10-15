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
			
			/* TIMING STUFF */
			
			function daysTill() {
			  //----------  EDIT THE VARIABLES BELOW  ------------------
			  // EDIT THE VARIABLES BELOW
			  var day=	21; // Day
			  var month=	9; // Month
			  var year=	2013; //Year
			  //----------  END OF EDIT  -------------------------------

			  var daystocount=new Date(year, month -1, day);
			  today=new Date();
			  if (today.getMonth()==month && today.getDate()>day) {
				daystocount.setFullYear(daystocount.getFullYear());
				}
			  var oneday=1000*60*60*24;
			  return (Math.ceil((daystocount.getTime()-today.getTime())/(oneday)));
			}
			
			/* combien de jours? */
			var daysRemaining = daysTill().toString();
			$("#remainingDays").text(daysRemaining);
			daysRemaining > 1 ? $("#farFuture").show():$("#farFuture").hide();
			daysRemaining == 1 ? $("#tomorrow").show():$("#tomorrow").hide();
			daysRemaining == 0 ? $("#today").show():$("#today").hide();
			daysRemaining < 0 ? $("#past").show():$("#past").hide();
			
			/* TEMPLATE STUFF */
			
			/* templating! Rick Strahl's */
			var _tmplCache = {}
			this.parseTemplate = function(str, data) {
				/// <summary>
				/// Client side template parser that uses <#= #> and <# code #> expressions.
				/// and # # code blocks for template expansion.
				/// NOTE: chokes on single quotes in the document in some situations
				///       use &rsquo; for literals in text and avoid any single quote
				///       attribute delimiters.
				/// </summary>    
				/// <param name="str" type="string">The text of the template to expand</param>    
				/// <param name="data" type="var">
				/// Any data that is to be merged. Pass an object and
				/// that object's properties are visible as variables.
				/// </param>    
				/// <returns type="string" />  
				var err = "";
				try {
					var func = _tmplCache[str];
					if (!func) {
						var strFunc =
						"var p=[],print=function(){p.push.apply(p,arguments);};" +
									"with(obj){p.push('" +
						//                        str
						//                  .replace(/[\r\t\n]/g, " ")
						//                  .split("<#").join("\t")
						//                  .replace(/((^|#>)[^\t]*)'/g, "$1\r")
						//                  .replace(/\t=(.*?)#>/g, "',$1,'")
						//                  .split("\t").join("');")
						//                  .split("#>").join("p.push('")
						//                  .split("\r").join("\\'") + "');}return p.join('');";

						str.replace(/[\r\t\n]/g, " ")
						   .replace(/'(?=[^#]*#>)/g, "\t")
						   .split("'").join("\\'")
						   .split("\t").join("'")
						   .replace(/<#=(.+?)#>/g, "',$1,'")
						   .split("<#").join("');")
						   .split("#>").join("p.push('")
						   + "');}return p.join('');";

						//alert(strFunc);
						func = new Function("obj", strFunc);
						_tmplCache[str] = func;
					}
					return func(data);
				} catch (e) { err = e.message; }
				return ""; //"< # ERROR: " + err.htmlEncode() + " # >";
			}
			
			
			
			
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
			/*changeDimensions();
			calculateTopIllustration();*/
			refreshScrollSpy();
			$('html,body').animate({scrollTop: $(window.location.hash).offset().top},'fast'); // hack à cause de l'injection des hotels
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
