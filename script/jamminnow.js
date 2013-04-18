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
			
			var markerPath = "./img/markers/";
			var markerShadow = {
				url: markerPath + 'shadow.png',
				anchor: new google.maps.Point(12, 20)
			};

			
			var LatLngChatillonSurSeine = new google.maps.LatLng(47.860452,4.573714);
			var LatLngAiseyBonEspoir = new google.maps.LatLng(47.755639,4.562616);
			var LatLngMontbard = new google.maps.LatLng(47.618661,4.336338);
			
			var mapOptions = {
				zoom: 7,
				streetViewControl: false,
				center: LatLngChatillonSurSeine,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scaleControl: true
			};
			var mapIllustration = new google.maps.Map(document.getElementById('ou_illustration'), mapOptions);
			var mapMobile = new google.maps.Map(document.getElementById('mobile_map'), mapOptions);
			
			var mapLogisOptions = {
				zoom: 11,
				streetViewControl: false,
				center: LatLngAiseyBonEspoir,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scaleControl: true
			};
			var mapLogis = new google.maps.Map(document.getElementById('logis_illustration'), mapLogisOptions);

			/* les markers sur la carte de la mairie */
			var markerIllustration = new google.maps.Marker({
				position: LatLngChatillonSurSeine,
				map: mapIllustration,
				title: "C'est ici qu'on se marie!",
				icon: markerPath + "wedding.png",
				shadow: markerShadow
			});
			var markerMobile = new google.maps.Marker({
				position: LatLngChatillonSurSeine,
				map: mapMobile,
				title: "C'est ici qu'on se marie!",
				icon: markerPath + "wedding.png",
				shadow: markerShadow
			});
			
			/* les markers sur la carte de bon espoir */
			var markerBonEspoir = new google.maps.Marker({
				position: LatLngAiseyBonEspoir,
				map: mapLogis,
				title: "Vin d'honneur et repas",
				icon: markerPath + "party.png",
				shadow: markerShadow
			});

			
			/* les clics sur les obnoxious doivent centrer la carte */
			$(".focusOnChatillon").on("click", function() { mapIllustration.setCenter(LatLngChatillonSurSeine); mapMobile.setCenter(LatLngChatillonSurSeine); });
			$(".focusOnMontbard").on("click", function() { 
				mapIllustration.setCenter(LatLngMontbard); 
				mapMobile.setCenter(LatLngMontbard); 
				var newInfoWindow = new google.maps.InfoWindow({
						content: "Ici, la gare de Montbard! Tadam!",
						position : LatLngMontbard
					});
				newInfoWindow.open(mapIllustration);
			});
			$(".focusOnBonEspoir").on("click", function() { mapLogis.setCenter(LatLngAiseyBonEspoir); });
			
			/* ok, maintenant peuplons les logis :) */
			var logis = [
				{"Id":"htelDeLaCtedor", "Type":"hotel", "Nom":"Hôtel de La Côte-d'or", "Adresse": "2 Rue Charles Ronot, Chatillon sur Seine", "Telephone": "03 80 91 13 29", "Infos":["<a href=\"mailto:remillet.gerard@club-internet.fr\">remillet.gerard@club-internet.fr</a>", "Trois étoiles", "70-80€ la chambre", "9 chambres"], "Lat":47.858302, "Lng":4.571176},
{"Id":"htelLaMontagne", "Type":"hotel", "Nom":"Hôtel La Montagne", "Adresse": "12 Rue Maréchal de Lattre, Chatillon sur Seine", "Telephone": "03 80 91 10 61", "Infos":["40€ la chambre", "12 chambres", "<a href=\"http://www.hotel-restaurant-lamontagne.com/hotel-chatillon-sur-seine-restaurant-bourgogne-21.html\">Site</a>"], "Lat":47.859744, "Lng":4.572459},
{"Id":"leSaintVorles", "Type":"hotel", "Nom":"Le Saint Vorles", "Adresse": "1, Rue prés Carnot, Chatillon sur Seine", "Telephone": "03 80 81 55 83", "Infos":["à partir de 47€"], "Lat":47.860494, "Lng":4.573197},
{"Id":"htelDuChevalRouge", "Type":"hotel", "Nom":"Hôtel du Cheval rouge", "Adresse": "4 place du 8 Mai 1945, Chatillon sur Seine", "Telephone": "03 80 81 53 70", "Infos":["à partir de 43€"], "Lat":47.859777, "Lng":4.571696},
{"Id":"sylviaHotel", "Type":"hotel", "Nom":"Sylvia Hotel", "Adresse": "9 avenue de la gare, Chatillon sur Seine", "Telephone": "03 80 91 02 44", "Infos":["<a href=\"mailto:sylviahotel@wanadoo.fr\">sylviahotel@wanadoo.fr</a>", "Deux étoiles", "57€ la chambre", "17 chambres"], "Lat":47.867401, "Lng":4.573138},
{"Id":"tipazaExOllin", "Type":"hotel", "Nom":"Tipaza (ex Ollin)", "Adresse": "32 avenue de la gare, Chatillon sur Seine", "Telephone": "03 80 91 28 25", "Infos":["aucune note"], "Lat":47.868996, "Lng":4.572561},
{"Id":"htelrestaurantDeLaPoste", "Type":"hotel", "Nom":"Hôtel-restaurant de la Poste", "Adresse": "6, rue Amont, Villaines en duesmois", "Telephone": "03 80 89 03 01", "Infos":["à partir de 50€", "4 chambres"], "Lat":47.680631, "Lng":4.525489},
{"Id":"aubergeDeLaBaume", "Type":"hotel", "Nom":"Auberge de la Baume", "Adresse": "Rue d'en Bas 21330 Balot", "Telephone": "03 80 81 40 15", "Infos":["<a href=\"mailto:la.baume@aliceadsl.fr\">la.baume@aliceadsl.fr</a>", "48 à 64 euros", "2 épis", "10 chambres", "<a href=\"http://www.aubergedelabaume.com/bienvenue.htm\">Site</a>"], "Lat":47.814773, "Lng":4.429224},
{"Id":"htelLeMagiot", "Type":"hotel", "Nom":"Hôtel le Magiot", "Adresse": "Rue de Magiot 21400 Montliot-et-Courcelles", "Telephone": "03 80 91 20 51", "Infos":["<a href=\"mailto:lemagiot@wanadoo.fr\">lemagiot@wanadoo.fr</a>", "à partir de 45 euros, tarif famille", "2 étoiles", "22 chambres", "<a href=\"http://le-magiot-hotel-soiree-etape-seminaire-restaurant.lemagiot-21.com/\">Site</a>"], "Lat":47.89003, "Lng":4.560327},
{"Id":"chezJozephine", "Type":"gite", "Nom":"Chez Jozephine", "Adresse": "10 Rue Pissepot, Nod-sur-Seine", "Telephone": "03.80.93.25.48", "Infos":["<a href=\"mailto:chez.Jozefine@orange.fr\">chez.Jozefine@orange.fr</a>", "195 euros le week end", "3 épis", "6 personnes", "<a href=\"http://chez.jozefine.free.fr/\">Site</a>"], "Lat":47.765922, "Lng":4.572939},
{"Id":"gteDeNod", "Type":"gite", "Nom":"Gîte de Nod", "Adresse": "4 Rue haute, Nod-sur-Seine", "Telephone": "03 80 93 25 89", "Infos":["<a href=\"mailto:gitedenod@orange.fr\">gitedenod@orange.fr</a>", "Trois étoiles", "48 euros pour 2 + 8 personnes supplémentaires", "1 chambre", "4 personnes"], "Lat":47.765878, "Lng":4.573694},
{"Id":"gteDeLaJonction", "Type":"gite", "Nom":"Gîte de la jonction", "Adresse": "6 rue de l'église, Nod-sur-Seine", "Telephone": "03.80.45.97.15", "Infos":["<a href=\"mailto:gites.de.france21@wanadoo.fr\">gites.de.france21@wanadoo.fr</a>", "150 euros le WE", "2 chambres de 2 places", "4 personnes", "<a href=\"http://www.gites-de-france-cotedor.com/fiche-hebergement-21G821.html\">Site</a>"], "Lat":47.766855, "Lng":4.572954},
{"Id":"laMarchalerie", "Type":"gite", "Nom":"La Maréchalerie", "Adresse": "1 Rue des étriers, Coulmier le Sec", "Telephone": "03.80.45.97.15", "Infos":["<a href=\"mailto:gites.de.france21@wanadoo.fr\">gites.de.france21@wanadoo.fr</a>", "420 euros le WE", "3 épis", "5 chambres", "11 personnes", "<a href=\"http://www.gites-de-france-cotedor.com/fiche-hebergement-21G751.html\">Site</a>"], "Lat":47.749809, "Lng":4.495084},
{"Id":"laChenevireBernadetteRioux", "Type":"gite", "Nom":"La Chenevière / Bernadette Rioux", "Adresse": "Rue du moulin, Saint-Germain le Rocheux", "Telephone": "01-64-46-43-78", "Infos":["<a href=\"mailto:danriou@club-internet.fr\">danriou@club-internet.fr</a>", "1 chambre", "4 personnes", "<a href=\"http://www.gites-de-france-cotedor.com/fiche-hebergement-21G45.html\">Site</a>"], "Lat":47.749966, "Lng":4.668165},
{"Id":"leMoulinDeSaintGermain", "Type":"gite", "Nom":"Le Moulin de Saint Germain", "Adresse": "Le moulin, Saint-Germain le Rocheux", "Telephone": "03 80 93 29 70", "Infos":["2 gîtes, 2 chambres d'hôtes", "2 à 8 personnes", "<a href=\"http://www.moulin-de-saint-germain.com/petitgite.html\">Site</a>"], "Lat":47.749966, "Lng":4.668165},
{"Id":"laGrangeDeLaChouette", "Type":"gite", "Nom":"La grange de la chouette", "Adresse": "1 Rue du Roy, Saint-Germain le Rocheux", "Telephone": "03.80.45.97.15", "Infos":["<a href=\"mailto:gites.de.france21@wanadoo.fr\">gites.de.france21@wanadoo.fr</a>", "3 épis", "400 le WE", "4 chambres", "8 personnes", "<a href=\"http://www.gites-de-france-cotedor.com/fiche-hebergement-21G838.html\">Site</a>"], "Lat":47.755118, "Lng":4.674498},
{"Id":"jeanEtFranoiseMillot", "Type":"gite", "Nom":"Jean et Françoise Millot", "Adresse": "11 Rue du recept, Chatillon sur Seine", "Telephone": "03 80 81 50 65", "Infos":["<a href=\"mailto:francoisedelery@wanadoo.fr\">francoisedelery@wanadoo.fr</a>", "2 personnes"], "Lat":47.858172, "Lng":4.574733},
{"Id":"gteSansNom", "Type":"gite", "Nom":"Gîte sans nom ???", "Adresse": "2 chemin de la Combe des Paces, Chatillon sur Seine", "Telephone": " 03.80.45.97.15", "Infos":["<a href=\"mailto:gites.de.france21@wanadoo.fr\">gites.de.france21@wanadoo.fr</a>", "2 épis", "150 euros le WE", "4 personnes"], "Lat":47.863037, "Lng":4.581619},
{"Id":"gteSansNomAussi", "Type":"gite", "Nom":"Gîte sans nom aussi ???", "Adresse": "Cosne, 4 route de Baigneux, Quemigny-sur-seine", "Telephone": "03.80.45.97.15", "Infos":["<a href=\"mailto:gites.de.france21@wanadoo.fr\">gites.de.france21@wanadoo.fr</a>", "120 euros le WE", "4 personnes", "<a href=\"http://www.gites-de-france-cotedor.com/fiche-hebergement-21G454.html\">Site</a>"], "Lat":47.674306, "Lng":4.669693},
{"Id":"gteDeLaPierrePerce", "Type":"gite", "Nom":"Gîte de la pierre percée", "Adresse": "2 chemin de la roche, Ampilly-lès-Bordes", "Telephone": "03-80-96-54-55", "Infos":["<a href=\"mailto:martine.babouillard@hotmail.fr\">martine.babouillard@hotmail.fr</a>", "3 épis", "490 euros le WE", "11 personnes", "<a href=\"http://gites-sourcesdeseine.com/\">Site</a>"], "Lat":47.632242, "Lng":4.628902},
{"Id":"gteDeLaRoche", "Type":"gite", "Nom":"Gîte de la Roche", "Adresse": "4 chemin de la Roche, Ampilly-lès-Bordes", "Telephone": "06 88 03 89 18", "Infos":["4 épis", "620 euros le WE", "13 personnes"], "Lat":47.632772, "Lng":4.629264},
{"Id":"laPlanchotte", "Type":"gite", "Nom":"La Planchotte", "Adresse": "Rue Voriot, Jours les Baigneux", "Telephone": "03.80.45.97.15", "Infos":["<a href=\"mailto:gites.de.france21@wanadoo.fr\">gites.de.france21@wanadoo.fr</a>", "3 épis", "255 euros le WE", "3 chambres", "6 personnes", "<a href=\"http://www.gites-de-france-cotedor.com/fiche-hebergement-21G396.html\">Site</a>"], "Lat":47.59846, "Lng":4.649319},
{"Id":"laRoseraie", "Type":"gite", "Nom":"La Roseraie", "Adresse": "8 route de Montbard, Savoisy", "Telephone": "03.80.45.97.15", "Infos":["<a href=\"mailto:gites.de.france21@wanadoo.fr\">gites.de.france21@wanadoo.fr</a>", "2 épis", "190 euros le WE", "3 chambres", "5 personnes", "<a href=\"http://www.gites-de-france-cotedor.com/fiche-hebergement-21G156.html\">Site</a>"], "Lat":47.77587, "Lng":4.354831},
{"Id":"gteDeLaColombe", "Type":"gite", "Nom":"Gîte de la Colombe", "Adresse": "4, rue des Chagners, Sainte-Colombe-sur-Seine", "Telephone": "03.80.91.17.65 / 06.16.95.16.10", "Infos":["<a href=\"mailto:jean-claude.tissaux@wanadoo.fr\">jean-claude.tissaux@wanadoo.fr</a>", "2 épis", "190 euros le WE", "2 chambres", "6 personnes"], "Lat":47.871046, "Lng":4.541362},
{"Id":"cottageDeBourgogne", "Type":"chambredhote", "Nom":"Cottage de Bourgogne", "Adresse": "4 Rue de la Maison Commune, Ampilly-le-sec", "Telephone": "03 80 91 14 79 / 06 72 62 00 99", "Infos":["<a href=\"mailto:beatrice.guichardot@free.fr\">beatrice.guichardot@free.fr</a>", "de 45 à 65 euros", "1 chambre", "1 à 3 personnes        ", "<a href=\"http://www.cottagedebourgogne.com/\">Site</a>"], "Lat":47.809215, "Lng":4.530745},
{"Id":"letrier", "Type":"chambredhote", "Nom":"L'etrier", "Adresse": "9 Rue des étriers, Coulmier-le-sec", "Telephone": "03.80.81.30.56", "Infos":["<a href=\"mailto:fr.21@orange.fr\">fr.21@orange.fr</a>", "3 épis", "de 40 à 90 euros", "3 chambres", "1 à 5 personnes", "<a href=\"http://www.chambres-d-hotes-l-etrier.com/\">Site</a>"], "Lat":47.749809, "Lng":4.495084},
{"Id":"leSoleilDor", "Type":"chambredhote", "Nom":"Le Soleil d'or", "Adresse": "12 route de Dijon, Saint-Marc sur Seine", "Telephone": "03 80 81 69 23", "Infos":["<a href=\"mailto:le-soleil-dor@hotmail.co.uk\">le-soleil-dor@hotmail.co.uk</a>", "à partir de 46 euros", "3 chambres", "2 à 4 personnes", "<a href=\"http://le-soleil-dor.yolasite.com/\">Site</a>"], "Lat":47.747875, "Lng":4.583978},
{"Id":"mEtMmePhilipps", "Type":"chambredhote", "Nom":"M et Mme Philipps", "Adresse": "13 rue Appolinaire, Chatillon sur Seine", "Telephone": "03 80 81 53 95 ", "Infos":["60 euros", "3 chambres", "1 à 2 personnes"], "Lat":47.858166, "Lng":4.589093},
{"Id":"mmeAubry", "Type":"chambredhote", "Nom":"Mme Aubry ", "Adresse": "Ferme de Cessey, Jours-lès-Baigneux ", "Telephone": "03 80 96 51 89", "Infos":["<a href=\"mailto:marie-therese.aubry734@orange.fr\">marie-therese.aubry734@orange.fr</a>", "2 chambres 2 personnes        "], "Lat":47.59846, "Lng":4.649319},
{"Id":"leRelaisDeMorville", "Type":"chambredhote", "Nom":"Le relais de Morville", "Adresse": "1 Grande Rue 21500 Fresnes", "Telephone": "03-80-92-12-76", "Infos":["<a href=\"mailto:relais21@orange.fr\">relais21@orange.fr</a>", "45 euros", "5 chambres 2 personnes", "<a href=\"http://le.relais.pagesperso-orange.fr/\">Site</a>"], "Lat":47.615563, "Lng":4.429065},
{"Id":"leNidDakiko", "Type":"chambredhote", "Nom":"Le nid d'Akiko", "Adresse": "9 rue du huit mai 1945, Laignes", "Telephone": "03 80 81 47 46 / 06 72 74 99 36", "Infos":["<a href=\"mailto:lenidakiko@free.fr\">lenidakiko@free.fr</a>", "de 57 à 87 euros", "3 chambres", "2 à 5 personnes"], "Lat":47.847146, "Lng":4.365972},
			];

			var allMarkers = {};
			
			function createMarker(logisInfos) {
				var newmarker = new google.maps.Marker({
					position: new google.maps.LatLng(logisInfos["Lat"], logisInfos["Lng"]),
					map: mapLogis,
					title: "",
					icon: markerPath + logisInfos["Type"] +".png",
					shadow: markerShadow
				});
				newmarker["clicked"] = false;

				var newInfoWindow = new google.maps.InfoWindow({
						content: document.parseTemplate($("#LogisTemplate").html(), logisInfos)
					});
				
				var newEntry = $("<li id='" + logisInfos["Id"] + "' class='Logis'>" + document.parseTemplate($("#LogisTemplate").html(), logisInfos) + "</li>");
				$("#logements").append(newEntry);
				
				newmarker['infowindow'] = newInfoWindow;
				newmarker['control'] = newEntry;
				newInfoWindow['marker'] = newmarker;
				newInfoWindow['control'] = newEntry;
				newEntry['infowindow'] = newInfoWindow;
				newEntry['marker'] = newmarker;
				
				google.maps.event.addListener(newmarker, 'mouseover', function() {
					if (!this['infowindow'].getMap()) {
						this['infowindow'].open(mapLogis, this);
					}
				});
						
				google.maps.event.addListener(newmarker, 'mouseout', function() {
					if (!this["clicked"]) this['infowindow'].close();
				});
				
				google.maps.event.addListener(newmarker, 'click', function() {
					currentlyClickedMarker = newmarker;
					$(".SelectedLogis").removeClass("SelectedLogis");
					var blockInfos = this['control'];
					window.scrollTo(0, blockInfos.position().top - 50);
					$.each( allMarkers, function( key, value ) {
						value["mapWindow"].close();
						value["mapMarker"]["clicked"] = false;
					});
					if (!this['infowindow'].getMap()) {
						this['infowindow'].open(mapLogis, this);
					}
					this['clicked'] = true;
					blockInfos.addClass("SelectedLogis");
				});
				
				google.maps.event.addListener(newInfoWindow, 'closeclick', function() {
					this['marker']['clicked'] = false;
					$(this['control']).removeClass("SelectedLogis");
					this.close();
				});
				
				newEntry.on("click", function() {
					$(".SelectedLogis").removeClass("SelectedLogis");
					$.each( allMarkers, function( key, value ) {
						value["mapWindow"].close();
						value["mapMarker"]["clicked"] = false;
					});
					mapLogis.setCenter(newmarker.getPosition()); 
					if (!newInfoWindow.getMap()) {
						newInfoWindow.open(mapLogis, newmarker);
					}
					newmarker["clicked"] = true;
					$(this).addClass("SelectedLogis");
				});
				
				allMarkers[logisInfos["Id"]] = {"mapMarker": newmarker, "mapWindow": newInfoWindow, "domElement": newEntry};
				
			}
			
			$.each(logis, function() {
				createMarker(this);
			});
			
			// on recommence, encore et encore, le début, d'accord, d'accord, etc... Si je codais mieux ça devrait pouvoir s'emballer qqpart...
			//changeDimensions();
			/*calculateTopIllustration();*/
			refreshScrollSpy();
		}

		function loadScript() {
		  var script = document.createElement("script");
		  script.type = "text/javascript";
		  script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language=fr&callback=initializeMaps";
		  document.body.appendChild(script);
		}

			window.onload = loadScript;
			
			// on fixe les dimensions une dernière fois (bug des 15%)
			changeDimensions();
			// cough...
			new Konami('http://www.google.com');
		});
