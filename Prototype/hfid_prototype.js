var myCars = new Array("Toyota", "Honda", "Ford");

$(document).ready(function() {
	var TASKLIST = [{msg:"Use the GPS Connect app and search for a 'Trader Joe's' Send that over to your GPS. (Note that the 'Go' button on the GPS does not work)", endpoint:"sendToGPS"}, 
	{msg:"Add a new car to the list of cars in the GPS Connect app.", endpoint:"addCar"}, 
	{msg:"Go on yelp. Send the address of a resturant to your car from Yelp.", endpoint:"sendToGPSOther"},
	{msg:"Look at your recent destinations. Send the address of a recent destination to your car.", endpoint:""}, 
	{msg:"Set a new email address for your car GPS.", endpoint:""}]
	var END;
	
	function clearMobileScreens() {
		$('.home').hide();
		$('.task').hide();
		$('.gpsInner').hide();
	}
	
	$('#home').click(function(){
		clearMobileScreens();
		$('.home').show();
	});
	
	$('#swap').click(function(){
		END = TASKLIST.shift();
		$('#instructionText').html(END['msg']);
		console.log(END);
	});
	
	$('#GPSButton').click(function(){
		clearMobileScreens();
		$('#GPSConnect').show();
		$('#main').show();
	});
	
	$('#YelpButton').click(function(){
		clearMobileScreens();
		$('#Yelp').show();
	});
	
	$('#recentDestButton').click(function(){
		// hide all GPS Inners
		$('.gpsInner').hide();
		// display recent dest
		$('#recentDest').show();
	});
	
	$('#settingsButton').click(function(){
		// hide all GPS Inners
		$('.gpsInner').hide();
		// display settings
		$('#settings').show();
	});
	
	$('#searchText').click(function(){
		// if maps isnt shown show it
		if (!$('#map').is(":visible")){
			$('.gpsInner').hide();
			// display map
			$('#map').show();
			//initialize();
		}
	});
	
	// hide all tasks
	$('.task').hide();

	$('.recentAddress').click(function(){
		$('.gpsInner').hide();
		$('#map').show();
		$('#searchTextMap').val($(this).html().trim());
		$('#searchButtonMap').click();
	});
	
	$('#addCar').click(function(){
		$('#mainSettings').hide();
		$('#addCarDiv').show();
	});
	
	$('#saveCar').click(function(){
		var newCar = $('#newCarAlias').val();
		myCars.push(newCar);
		$('#carList').append("<div class=\"car\"><div class=\"carbackground\">"+newCar+"</div><div class=\"cardelete\"  title=\"" + newCar +"\"><span id=\"cardelete\">x</span></div></div><br />");
		$('#addCarDiv').hide();
		$('#mainSettings').show();
	});
	
	$('.cardelete').live('click', function(){
		var p = $(this).attr("title");
		// find correct car and delete
		for (var i = 0; i<myCars.length; i++){
			if (myCars[i] == p){
				myCars.splice(i, 1);
				$(this).parent().remove();
				break;
			}
		}
		console.log(myCars);
	});
	
	// google maps
	var latlng = new google.maps.LatLng(42.293, -71.264);
	var directionsService = new google.maps.DirectionsService();	
	var directionsDisplay = new google.maps.DirectionsRenderer();
	var myOptions = {
	  zoom: 8,
	  center: latlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	var input = document.getElementById('searchTextMap');	
	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);
	
	// search for nearby locations
	$('#searchButtonMap').click(function(){
		mapSearch($('#searchTextMap').val());
	});
	
	function mapSearch(searchText) {
		$('#map_canvas').show();
		//var place = autocomplete.getPlace();
		
		if (searchText != ''){
			var latlng = new google.maps.LatLng(42.293, -71.264);
			var myOptions = {
			  zoom: 8,
			  center: latlng,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var request = {
				location: latlng,
				radius: '50000',
				keyword: searchText
			};
			 
			infowindow = new google.maps.InfoWindow();
			var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
			service = new google.maps.places.PlacesService(map);
			
			service.search(request, callback);
		}
		
		function callback(results, status) {
			console.log(results);
			console.log(status);
			createCurrentLocMarker(map);
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					var place = results[i];
					createMarker(map, results[i], false); 
				}
			}
		}
	}
	
	function yelpMapScreen(addressString) {
		$('#map_canvas').show();
		var latlng = new google.maps.LatLng(42.293, -71.264);
		var myOptions = {
			zoom: 10,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var request = {
			location: latlng,
			radius: '50000',
			name: addressString
		};
		infowindow = new google.maps.InfoWindow();
		var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		service = new google.maps.places.PlacesService(map);
		createCurrentLocMarker(map);
		service.search(request, callback);
		
		function callback(results, status) {
			console.log(results);
			console.log(status);
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				if (results.length >= 1) {
					var place = results[0];
					createMarker(map, results[0], true); 
				}
			}
		}
	}
	
	
	function createCurrentLocMarker(map) {
		var marker = new google.maps.Marker({
			map: map,
			position: map.getCenter(),
			icon: "images/current_loc_marker.png"
		});
	}
	
	function createMarker(map, place, markerOpened) {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location
		});
		google.maps.event.addListener(marker, 'click', openMarker)
		
		if (markerOpened) {
			openMarker()
		}
		
		function openMarker() {
			var dropdown_menu = "<select>";
			for (var i=0; i < myCars.length; i++) {
				var dropdown_menu = dropdown_menu+"<option>"+myCars[i]+"</option>";
			}
			var dropdown_menu = dropdown_menu + "</option></select>";
			var html=place.name+"<br />"+'<span style="font-size:.8em;">'+place.vicinity +'</span><br />'+dropdown_menu+"<br/><input type='button' id='sendToGPS' value='Send To GPS'/>"
			infowindow.setContent(html);
			infowindow.open(map, this);
			
			var end = new google.maps.LatLng(marker.position.Na, marker.position.Oa);
			directionsDisplay.setMap(map);
			drawDirections(latlng, end, directionsDisplay);
			
			$("#sendToGPS").live('click', function() {
				$('#cargps_home').fadeOut();
				$('#cargps_newaddress').fadeIn();
				$('#cargps_newaddress_map').show();
				// set up new map
				var mapGPS = new google.maps.Map(document.getElementById("cargps_newaddress_map"),myOptions);
				// set up directions
				var directionsDisplayGPS = new google.maps.DirectionsRenderer();
				directionsDisplayGPS.setMap(mapGPS);
				drawDirections(latlng, end, directionsDisplayGPS);
				
				$('#cargps_newaddress_info').show();
				$('#cargps_newaddress_info_name').html('<h2>' + place.name + '</h2>');
				$('#cargps_newaddress_info_address').html('<h3>' + place.vicinity + '</h3>');
			});
		}	
	}	
	
	function drawDirections(start, end, display){
		console.log('draw directions');
		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(result, status) {
			console.log(result);
			
			if (status == google.maps.DirectionsStatus.OK) {
				display.setDirections(result);
			}
		});
	}
	
	// Yelp "open with GPS connect" popup
	$('#addressLink').click(function() {
		// Center the popup
		var padding = parseInt($('#phone').css("padding-left"), 10);
		var phoneScreenTop = $('#phone').position().top - padding;
		var phoneScreenLeft = $('#phone').position().left - padding;
		var phoneScreenWidth = $('#phone').width() + 2*padding;
		var phoneScreenHeight = $('#phone').height() + 2*padding;
		var popupWidth = $('#yelpLinkPopup').width();
		var popupHeight = $('#yelpLinkPopup').height();
		$("#yelpLinkPopup").css({  
			"position": "absolute",  
			"top": phoneScreenHeight/2-popupHeight/2 - padding,  
			"left": phoneScreenWidth/2-popupWidth/2 - padding
		});
		$("#yelpLinkPopupBackground").css({
			"position": "absolute",
			"width": phoneScreenWidth,  
			"height": phoneScreenHeight, 
			"top": 0,  
			"left": 0 
		});
		// Open popup
		$('#yelpLinkPopup').show();
		$('#yelpLinkPopupBackground').fadeIn();
		$('#back').click(function() {
			closeYelpLinkPopup();
		});
	});	
	
	function closeYelpLinkPopup() {
		$('#yelpLinkPopup').hide();
		$('#yelpLinkPopupBackground').fadeOut();
	}
	
	// Open GPS connect from Yelp
	$('#gpsFromYelp').click(function() {
		closeYelpLinkPopup();
		$('#Yelp').fadeOut();
		$('#GPSConnect').fadeIn();
		$('#map').show();
		yelpMapScreen('958 Highland Ave, Needham, MA 02494');
	});
	
});
