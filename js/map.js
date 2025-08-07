$(function () {

	//global variables for storing data
	var addresses = [];
	var address1s = [];
	var address2s = [];
	var cities = [];
	var states = [];
	var zips = [];
	var emails = [];
	var names = [];
	var phones = [];
	var userids = [];
	var permits = [];


	var icons = {
		pin_carpool: {
			icon: 'images/map/ico_carpool.png'
		},
		pin_driving: {
			icon: 'images/map/ico_driving.png'
		},
		pin_cycling: {
			icon: 'images/map/ico_cycling.png'
		},
		pin_mixed: {
			icon: 'images/map/ico_mixed.png'
		},
		pin_transit: {
			icon: 'images/map/ico_transit.png'
		},
		pin_vanpool: {
			icon: 'images/map/ico_vanpool.png'
		},
		pin_walking: {
			icon: 'images/map/ico_walking.png'
		},
		other1: {
			icon: 'images/map/ico_other1.png'
		},
		other2: {
			icon: 'images/map/ico_other2.png'
		},
		other3: {
			icon: 'images/map/ico_other3.png'
		},
		work_pin: {
			icon: 'images/map/ico_work_pin.png'
		},
	};

	//map options
	var defaultOptions = {
		zoom: 5,
		center: new google.maps.LatLng(37.09024, -100.712891),
		panControl: false,
		scrollwheel: false,
		panControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_LEFT
		},
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		scaleControl: true,
		styles: [],

	};
	var darkOptions = {
		zoom: 5,
		center: new google.maps.LatLng(37.09024, -100.712891),
		panControl: false,
		panControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_LEFT
		},
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		scaleControl: false,
		/*styles: [
			{
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#212121"
					}
				]
			},
			{
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#212121"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "administrative.country",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "administrative.locality",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#bdbdbd"
					}
				]
			},
			{
				"featureType": "administrative.neighborhood",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "poi.business",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#181818"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#1b1b1b"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#2c2c2c"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#8a8a8a"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#373737"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#3c3c3c"
					}
				]
			},
			{
				"featureType": "road.highway.controlled_access",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#4e4e4e"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "transit",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#3d3d3d"
					}
				]
			}
		]*/
		styles: [{ "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#e5c163" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#c4c4c4" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [{ "color": "#e5c163" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }, { "visibility": "on" }] }, { "featureType": "poi.business", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#e5c163" }, { "lightness": "0" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [{ "color": "#e5c163" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#575757" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c2c2c" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#999999" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }]
	};

	var defaultOptions_nocenter = {
		styles: [],

	};
	var darkOptions_nocenter = {
		/*styles: [
			{
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#212121"
					}
				]
			},
			{
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#212121"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "administrative.country",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "administrative.locality",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#bdbdbd"
					}
				]
			},
			{
				"featureType": "administrative.neighborhood",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "poi.business",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#181818"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#1b1b1b"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#2c2c2c"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#8a8a8a"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#373737"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#3c3c3c"
					}
				]
			},
			{
				"featureType": "road.highway.controlled_access",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#4e4e4e"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "transit",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#3d3d3d"
					}
				]
			}
		]*/
		styles: [{ "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#e5c163" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#c4c4c4" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [{ "color": "#e5c163" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }, { "visibility": "on" }] }, { "featureType": "poi.business", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#e5c163" }, { "lightness": "0" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [{ "color": "#e5c163" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#575757" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c2c2c" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#999999" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }]
	};
	var infowindow = new google.maps.InfoWindow();

	function bindInfoW(marker, contentString, infowindow) {
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.setContent(contentString);
			infowindow.open(map, marker);
		});
	}
	var geocoder = new google.maps.Geocoder();
	function setHomePin(address, contentString, icon) {
		var pinIcon = new google.maps.MarkerImage(
			icon,
			null, /* size is determined at runtime */
			null, /* origin is 0,0 */
			null, /* anchor is bottom center of the scaled image */
			new google.maps.Size(12, 15)
		);
		MQ.geocode().search(address).on('success', function (e) {
			var best = e.result.best,
				latlng = best.latlng;
			var marker = new google.maps.Marker({
				map: map,
				icon: pinIcon,
				position: latlng
			});
			var infowindow = new google.maps.InfoWindow;

			bindInfoW(marker, contentString, infowindow);
		});
		// setTimeout(function () {
		// 	var pinIcon = new google.maps.MarkerImage(
		// 		icons['home_driver'].icon,
		// 		null, /* size is determined at runtime */
		// 		null, /* origin is 0,0 */
		// 		null, /* anchor is bottom center of the scaled image */
		// 		new google.maps.Size(20, 20)
		// 	);
		// 	MQ.geocode().search(address).on('success', function (e) {
		// 		var best = e.result.best,
		// 			latlng = best.latlng;
		// 		var marker = new google.maps.Marker({
		// 			map: map,
		// 			icon: pinIcon,
		// 			position: latlng
		// 		});
		// 	});
		// 	// geocoder.geocode({ 'address': address }, function (results, status) {
		// 	// 	if (status == 'OK') {
		// 	// 		var marker = new google.maps.Marker({
		// 	// 			map: map,
		// 	// 			icon: pinIcon,
		// 	// 			position: results[0].geometry.location
		// 	// 		});
		// 	// 	} else {
		// 	// 		console.log(status);
		// 	// 		console.log("Error Geocoding: " + address);
		// 	// 	}
		// 	// });
		// }, i * 1000);
	}
	//start google map in map-canvas div
	map = new google.maps.Map(document.getElementById('map-canvas'), defaultOptions);
	function setWork() {
		var pinIcon = new google.maps.MarkerImage(
			icons['work_pin'].icon,
			null, /* size is determined at runtime */
			null, /* origin is 0,0 */
			null, /* anchor is bottom center of the scaled image */
			new google.maps.Size(40, 40)
		);
		var address = document.getElementById('work_address').value;
		MQ.geocode().search(address).on('success', function (e) {
			var best = e.result.best,
				latlng = best.latlng;
			var marker = new google.maps.Marker({
				map: map,
				icon: pinIcon,
				position: latlng
			});
			map.setZoom(10);
			map.panTo(latlng);
		});
		// geocoder.geocode({ 'address': address }, function (results, status) {
		// 	if (status == 'OK') {
		// 		console.log(results[0]);
		// 		var marker = new google.maps.Marker({
		// 			map: map,
		// 			icon: pinIcon,
		// 			position: results[0].geometry.location
		// 		});
		// 		map.setZoom(10);
		// 		map.panTo(results[0].geometry.location);
		// 	} else {
		// 		alert('Geocode was not successful for the following reason: ' + status);
		// 	}
		// });
	}

	function changeMap() {
		var x = document.getElementById("styleToggle").checked;
		if (x) {
			map.setOptions(darkOptions_nocenter);
		}
		else {
			map.setOptions(defaultOptions_nocenter);
		}
	}

	document.getElementById("styleToggle").addEventListener("click", changeMap, false);
	document.getElementById("submit_work").addEventListener("click", setWork, false);
	//grab form data
	$('#uploaded').submit(function () {
		var fileUpload = document.getElementById('fileUpload');
		var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
		if (regex.test(fileUpload.value.toLowerCase())) {
			if (typeof (FileReader) != 'undefined') {
				var reader = new FileReader();
				reader.onload = function (e) {
					var table = document.createElement('table');
					var rows = e.target.result.split("\n");
					for (var i = 0; i < rows.length; i++) {
						var row = table.insertRow(-1); // Change to 0 to display backwards
						var cells = rows[i].split(",");
						//Storing Data from file into various arrays
						permits.push(cells[0]);
						address1s.push(cells[1]);
						address2s.push(cells[2]);
						cities.push(cells[3]);
						states.push(cells[4]);
						zips.push(cells[5]);
						emails.push(cells[6]);
						names.push(cells[7] + " " + cells[8]);
						phones.push(cells[9]);
						userids.push(cells[10]);
						addresses.push(cells[1] + ', ' + cells[3] + ', ' + cells[4] + ', ' + cells[5]);
					}
					for (var i = 0; i < rows.length; i++) {
						var contentString = "ID : <b> " + userids[i] + " </b>" + "<br><br> <b> " + names[i] + " </b>"
							+ "<br><b> " + address1s[i] + " " + address2s[i] + " </b><br><b> " + cities[i] + ", " + states[i] 
							+ " " + zips[i] + "</b><br><br>Permit : <b> " + permits[i] + " </b><br> Email : <b>" + emails[i] + "</b><br> Phone : <b>" + phones[i] + "</b>";
						var icon;
						switch(permits[i]){
							case "Carpool":
								icon = icons["pin_carpool"].icon;
								break;
							case "Cycling":
								icon = icons["pin_cycling"].icon;
								break;	
							case "Driving Alone":
								icon = icons["pin_driving"].icon;
								break;
							case "Mixed":
								icon = icons["pin_mixed"].icon;
								break;
							case "Public Transit":
								icon = icons["pin_transit"].icon;
								break;
							case "Others-1":
								icon = icons["other1"].icon;
								break;
							case "Others-2":
								icon = icons["other2"].icon;
								break;
							case "Others-3":
								icon = icons["other3"].icon;
								break;
							case "Vanpool":
								icon = icons["pin_vanpool"].icon;
								break;
							case "Walking":
								icon = icons["pin_walking"].icon;
								break;
						}
						setHomePin(addresses[i], contentString, icon);
					}
				}
				reader.readAsText(fileUpload.files[0]);
			} else {
				alert("This browser does not support HTML5.");
			}
		} else {

		}
		return false; //prevent the form from submitting
	});
});
