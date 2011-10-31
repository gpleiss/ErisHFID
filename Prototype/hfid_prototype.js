var myCars = new Array("Toyota", "Honda", "Ford");

$(document).ready(function() {
	var TASKLIST = [{msg:"Search for a Trader Joes and send that address to your car", endpoint:"sendToGPS"}, 
	{msg:"Add a new car to your cars list", endpoint:"addCar"}, {msg:"Send a destination from another application to your car", endpoint:"sendToGPSOther"}]
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
		console.log(newCar);
		myCars.push(newCar);
		console.log(myCars)
		$('#carList').append("<div class=\"car\"><div class=\"carbackground\">"+newCar+"</div><div class=\"cardelete\"><span id=\"cardelete\" value=\"" + myCars.length +"\">x</span></div></div><br />");
		$('#addCarDiv').hide();
		$('#mainSettings').show();
	});
	
	
	$('.cardelete').click(function(){
		console.log('hello! car delete!');
		p = $('#myCars').attr("title");
		myCars.splice(p,1);
		console.log(myCars);
	});
	
	// google maps
	var latlng = new google.maps.LatLng(42.293, -71.264);
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
		mapSearch($('#searchTextMap'));
	});
	
	function mapSearch(searchText) {
		$('#map_canvas').show();
		var place = autocomplete.getPlace();
		
		if (searchText.val() != ''){
			var latlng = new google.maps.LatLng(42.293, -71.264);
			var myOptions = {
			  zoom: 8,
			  center: latlng,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var request = {
				location: latlng,
				radius: '50000',
				name: searchText.val()
			};
			 
			infowindow = new google.maps.InfoWindow();
			var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
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
					createMarker(map, results[i]); 
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
	
	function createMarker(map, place) {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
		  map: map,
		  position: place.geometry.location
		});

		google.maps.event.addListener(marker, 'click', function() {
			var dropdown_menu = "<select>";
			for (var i=0; i < myCars.length; i++) {
				var dropdown_menu = dropdown_menu+"<option>"+myCars[i]+"</option>";
			}
			var dropdown_menu = dropdown_menu + "</option></select>";
			var html=place.name+"<br /><br />"+place.vicinity+"<br />"+dropdown_menu+"<br/><input type='button' id='sendToGPS' value='Send To GPS'/>"
			infowindow.setContent(html);
			infowindow.open(map, this);

			var end = new google.maps.LatLng(marker.position.Ma, marker.position.Na);
			//drawDirections(latlng, end);
			
			$("#sendToGPS").live('click', function() {
				$('#cargps_home').fadeOut();
				$('#cargps_newaddress').fadeIn();
				$('#cargps_newaddress_map').show();
				$('#cargps_newaddress_info').show();
			});
		});	
	}	
	
	function yelpMapScreen() {
		$('#map_canvas').show();
	}
	
	if (status == google.maps.DirectionsStatus.OK) {
		directionsDisplay.setDirections(result);
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
		yelpMapScreen(null);
	});
	
});
