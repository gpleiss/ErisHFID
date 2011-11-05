var myCars = {"Toyota":"toyo32aw3@toyota.com",
			  "Honda":"accord320b@honda.com", 
			  "Ford":"f2ab44b2@ford.com"};
			  

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
		$('.send_notification').hide();
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
		document.earchTextMap.focus();
	});
	
	// hide all tasks
	$('.task').hide();

	$('.recentAddress').click(function(){
		console.log();
		$('.gpsInner').hide();
		$('#map').show();
		name = $(this).html().trim();
		lat = parseFloat($(this).attr('lat'));
		lng = parseFloat($(this).attr('lng'));
		addressMapScreen(name, new google.maps.LatLng(lat, lng));
	});
	
	$.each(myCars, function(car, email) {
		carListEntry = generateCarListEntryHtml(car, email);
		$('#carList').append(carListEntry);
	});
	
	function generateCarListEntryHtml(car, email) {
		var html = '<div class="car">';
		html = html + '<div class="carbackground">';
		html = html + '<div class="car_name">'+car+'</div>';
		html = html + '<div class="car_email">'+email+'</div>';
		html = html + '</div>';
		html = html + '<div class="cardelete" title="'+car+'">';
		html = html + '<span id="cardelete">x</span>';
		html = html + '</div></div><br />';
		return html;
	}
	
	$('#addCar').click(function(){
		$('#mainSettings').hide();
		$('#addCarDiv').show();
	});
	
	$('#saveCar').click(function(){
		var newCar = $('#newCarAlias').val();
		var newCarEmail = $('#newCarEmail').val();
		myCars[newCar] = newCarEmail;
		newCarHtml = generateCarListEntryHtml(car, email);
		$('#carList').append(newCarHtml);
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
	
	var car_email = myCars["Toyota"];
	$('#gps_home_email').html(car_email);
	var car_email = "toyo32aw3";
	$('.gps_email').html(car_email+"@toyota.com");
	$('#gps_carinfo_serial').html(car_email.substring(0, car_email.length - 11));
	
	$('#email_submit').click(function(){
		$('#email_changed').show();
		$('#email_changed_bkgrnd').show();
		car_email = $('#write').val() + '@toyota.com';
		car_serial = $('#write').val();
		$('#submitted_email').html(car_email);
		$('#gps_home_email').html(car_email);
		$('.gps_email').html(car_email);
		myCars["Toyota"] = car_email;
		$('#gps_carinfo_serial').html(car_email);
	});
	
	$("#email_cancel").click(function(){
		$('#new_email').hide();
		$('#car_info').show();
	});
	
	
	$("#email_changed_ok").click(function(){
		$('#new_email').hide();
		$('#email_changed').hide();
		$('#email_changed_bkgrnd').hide();
		$('#cargps_home').show();
	});
	
	$(".gps_email").click(function(){
		$('#cargps_home').hide();
		$('#car_info').show();
	});
	
	$("#car_info_button").click(function(){
		$('#cargps_home').hide();
		$('#car_info').show();
	});
	
	$("#main_menu_button").click(function(){
		$('#cargps_home').show();
		$('#car_info').hide();
	});
	
	$("#change_email_button").click(function(){
		$('#new_email').show();
		$('#car_info').hide();
	});
	
	// google maps
	var latlng 				= new google.maps.LatLng(42.293, -71.264);
	var directionsService 	= new google.maps.DirectionsService();	
	var directionsDisplay	= new google.maps.DirectionsRenderer();
	var distanceService		= new google.maps.DistanceMatrixService();
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
					createMarker(map, results[i], infowindow, false); 
				}
			}
		}
	}
	
	function addressMapScreen(name, loc_latlng) {		
		$('#map_canvas').show();
		var mapcenter_latlng = new google.maps.LatLng(42.293, -71.264);
		$('#searchTextMap').val(name);
		
		var myOptions = {
			zoom: 10,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var request = {
			location: loc_latlng,
			radius: '10',
			name: name
		};
		infowindow = new google.maps.InfoWindow({
			maxWidth: 100,
		});
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
					createMarker(map, results[0], infowindow, true); 
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
	
	function createMarker(map, place, infowindow, markerOpened) {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location
		});
		google.maps.event.addListener(marker, 'click', function() {
			openMarker(marker, map, place);
		});
		if (markerOpened) {
			openMarker(marker, map, place);
		}
	}	
	
	function makeCarDropdownHtml() {
		var dropdown_menu = '<select id="car_select">';
		$.each(myCars, function(car, email){
			dropdown_menu = dropdown_menu+'<option value="'+car+'">'+car+"</option>";
		});
		dropdown_menu = dropdown_menu + "</option></select>";
		return dropdown_menu;
	}
	
	function openMarker(marker, map, place) {
		var dropdown_menu = makeCarDropdownHtml();
		var end = new google.maps.LatLng(marker.position.Na, marker.position.Oa);
		distanceService.getDistanceMatrix(
		{
			origins: [latlng],
			destinations: [end],
			travelMode: google.maps.TravelMode.DRIVING,
			avoidHighways: false,
			avoidTolls: false
		}, distanceServiceCallback);

		function distanceServiceCallback(response, status) {
		// See Parsing the Results for
		// the basics of a callback function.
			if (status == google.maps.DistanceMatrixStatus.OK) {
				var origins = response.originAddresses;
				var destinations = response.destinationAddresses;

				for (var i = 0; i < origins.length; i++) {
					var results = response.rows[i].elements;
					for (var j = 0; j < results.length; j++) {
						var element = results[j];
						var distance = element.distance.text;
						var duration = element.duration.text;
						var from = origins[i];
						var to = destinations[j];
					}
				}
			}
			var html=place.name+"<br />"+'<span style="font-size:.8em;">'+place.vicinity +'</span><br/>Distance: '+distance+'<br/>Time: '+duration+'<br/>'+dropdown_menu+"<br/><input type='button' id='sendToGPS' value='Send To GPS'/>"
			console.log(html);
			infowindow.setContent(html);
			infowindow.open(map, marker);
			
			
			directionsDisplay.setMap(map);
			drawDirections(latlng, end, directionsDisplay);
			
			$("#sendToGPS").live('click', function() {
				var carToSendTo = $('#car_select').val();
				sendAddressToGPS(carToSendTo, marker, place, latlng, end, map, distance, duration);
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
	
	function sendAddressToGPS(carToSendTo, marker, place, latlng, end, map, distance, duration) {
		var sending = true;
		
		infowindow.close(map, marker);
		$('#sending_header').html('<h2>Sending to ' + carToSendTo + '</h2>');
		$('#sending').show();
		$('#sending_background').fadeIn();
		$('#cancel_send_button').click(function(){
			$('#sending').hide();
			$('#sending_background').hide();
			infowindow.open(map, marker);
			sending = false;
		});
		
		setTimeout(function() {
			if (!sending) { // If user canceled sending
				return;
			}
			$('#sending').hide();
			$('#sent').show();
			$('#sending_background').fadeOut();
			$('#resend_button').click(function() {
				$('#sent').hide();
				sendAddressToGPS(carToSendTo, marker, place, latlng, end, map, distance, duration);
				// TODO: bug - resend name is undefined after 2 resends
			});
			
			// Only send address to GPS if Toyota is selected
			if (carToSendTo == "Toyota") {
				gpsRecieveAddress(place, latlng, end, distance, duration);
			}
		}, 2000);
	}
	
	function gpsRecieveAddress(place, latlng, end, distance, duration) {
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
		$('#cargps_newaddress_info_address').html('<h3>' + place.vicinity + '<br/>Distance: '+distance+'<br/>Estimated Time:'+duration+'</h3>');		
	}
	
	function addressPopup(){
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
	}
	
	$('#highlight').click(function(){
		// check if its checked
		if ($('#highlight').is(':checked')){
			$('#yelpAddress').addClass('addressLink');
			$('#yelplogo').show();
			$('#yelplogo').addClass('yelplogoLink');
		}
		else{
			$('#yelpAddress').removeClass('addressLink');
			$('#yelplogo').removeClass('yelplogoLink');
			$('#yelplogo').hide();
		}
	});
	$('.yelplogoLink').live('click', function(){
		addressPopup();	
	});
	
	// Yelp "open with GPS connect" popup
	$('.addressLink').live('click', function(){
		addressPopup();	
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
		addressMapScreen('Trader Joes', new google.maps.LatLng(42.292, -71.235));
	});
});
