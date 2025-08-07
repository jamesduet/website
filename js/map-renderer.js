const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let markers = [];
let markerPoints = [];
let trips = [];
let previousTrips = [];
let labelIndex = 0;
let totalDistance = 0;
let totalTime = 0;

// Map initialization.
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 37.347016, lng: -121.922675 },
        mapTypeId: 'roadmap'
    });

    const service = new google.maps.DirectionsService();
    let renderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    renderer.setMap(map);
    
    // Remove polygon to show markers.
    // Define the LatLng coordinates for the polygon's path.
    // const coords = [
    //     {lat: 37.483125, lng: -121.894504},
    //     {lat: 37.393192, lng: -122.145304},
    //     {lat: 37.257249, lng: -122.039427},
    //     {lat: 37.214122, lng: -121.980332},
    //     {lat: 37.224206, lng: -121.766818},
    //     {lat: 37.313502, lng: -121.747823}
    // ];

    // Construct the polygon.
    // const polygon = new google.maps.Polygon({
    // paths: coords,
    // strokeColor: "#118bf0",
    // strokeOpacity: 0.5,
    // strokeWeight: 5,
    // fillColor: "#118bf0",
    // fillOpacity: 0.1,
    // });
    // polygon.setMap(map);

    // This event listener calls addMarker() when the map is clicked.
    map.addListener('click', (event) => {
        let marker = addMarker(event.latLng, map);

        if (markers.length > 1) {
            renderer.setMap(map);
            // Display route.
            displayRoute(service, renderer);
        }

        // Get the coordinates when drag then update with the new coordinates.
        google.maps.event.addListener(marker, 'dragend', (dragEvent) => {
            map.panTo(dragEvent.latLng);
            
            // Update new coordinates.
            upsertCoordinates(marker, dragEvent.latLng, 'update');

            if (markers.length > 1) {
                // Display route.
                displayRoute(service, renderer);
            }
        });

        // Remove marker when unclick.
        google.maps.event.addListener(marker, 'click', () => {
            marker.setMap(null);
            markers = markers.filter((item) => {
                return item.label !== marker.label;
            });
            
            if (markers.length > 1) {
                renderer.setMap(map);
                // Display route.
                displayRoute(service, renderer);
            } else {
                if (markers.length > 0) {
                    map.panTo(markers[0]);
                    renderer.setMap(null);

                    setAllTrips(null);
                } else {
                    labelIndex = 0;
                }
            }
        });
    });
}

// Add marker label.
function addMarkerLabel(index) {
    let label;

    if (markers.length > 0) {
        lastLabel = markers[markers.length-1].label;
        label = String.fromCharCode(lastLabel.charCodeAt() + 1);
    } else {
        label = labels[labelIndex++ % labels.length];
    }
    
    return label;
}

// Adds a marker to the map.
function addMarker(coordinates, map) {
    const markerLabel = addMarkerLabel();

    // Add the marker at the clicked location, and add the next-available label from the array of alphabetical characters.
    const marker = new google.maps.Marker({
        position: coordinates,
        draggable: true,
        label: markerLabel,
        map: map,
    });

    // Centers the map on markers coordinates.
    map.setCenter(marker.position);

    // Adds the marker on the map.
    marker.setMap(map);

    // Append new coordinates.
    upsertCoordinates(marker, coordinates, 'add');

    markerPoints.push(marker);

    return marker;
}

// Display route in map.
function displayRoute(service, renderer) {
    let waypoints = [];

    // Push values for waypoints.
    if (markers.length > 2) {
        for (let i = 1; i <= markers.length - 2; i++) {
            waypoints.push({
                location: markers[i],
                stopover: true,
            });
        }
    }

    // Fetch directions for a route including waypoints.
    service.route(
        {
            origin: markers[0],
            destination: markers[markers.length - 1],
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
        },
        (response, status) => {
            if (status === 'OK' && response) {
                // Display route on map.
                renderer.setDirections(response);

                // Get response value.
                const route = response.routes;

                if (route && route.length > 0) {
                    const legs = route[0].legs;
                    
                    if (legs && legs.length > 0) {
                        // Process response values.
                        setAllTrips(legs);
                    }
                }
            } else {
                window.alert(`Error: ${status}`);
          }
        }
    );
}

// Insert/Update values to markers array.
function upsertCoordinates(marker, coordinates, action) {
    coordinates = coordinates.toJSON();

    if (action === 'add') {
        // Push coordinates to the array.
        markers.push({ 
            label: marker.label,
            lat: coordinates.lat,
            lng: coordinates.lng
        });
    } else {
        // Find index of new coordinates. 
        const objIndex = markers.findIndex((obj => obj.label === marker.label));

        // Update object's lat/lng property.
        markers[objIndex].lat = coordinates.lat;
        markers[objIndex].lng = coordinates.lng;
    }
}

// Dispay all trips.
async function setAllTrips(legs) {
    trips = [];

    // Clear datatable.
    const dataTable = $('#tripsTable').DataTable();
    dataTable.clear().draw();

    // Display previous trips.
    let lastCount = setPreviousTrips();
    lastCount = lastCount > 0 ? lastCount : 0;
    
    if (legs && (legs !== null || legs.length > 0)) {
        for (let i = 0; i < legs.length; i++) {
            const distance = legs[i].distance.text;
            const time = legs[i].duration.text;
            const distanceValue = Number(distance.replace(/[^\d.-]/g, ''));
            const timeValue = Number(time.replace(/[^\d.-]/g, ''));

            const origin = await (new Promise((resolve) => {
                formatAddress(legs[i].start_address, (response) => {
                    resolve(response);
                });
            }));
            const destination = await (new Promise((resolve) => {
                formatAddress(legs[i].end_address, (response) => {
                    resolve(response);
                });
            }));

            totalDistance += distanceValue;
            totalTime += timeValue;

            trips.push({
                origin,
                destination,
                distanceValue,
                timeValue
            });

            // Display current trips.
            setDataTable(lastCount, origin, destination, distanceValue, timeValue);
            lastCount++;
        }
    }

    // Display average distance and time.
    setLastRow(lastCount);
}

// Display previous trips.
function setPreviousTrips() {
    let lastCount = 0;
    totalDistance = 0;
    totalTime = 0;
    
    if (previousTrips.length > 0) {
        for (let j = 0; j < previousTrips.length; j++) {
            const count = previousTrips[j].length;

            if (count > 0) {
                lastCount = lastCount > 0 ? lastCount : 0;
                for (let i = 0; i < count; i++) {
                    const trip = previousTrips[j][i];

                    totalDistance += trip.distanceValue;
                    totalTime += trip.timeValue;

                    setDataTable(lastCount, trip.origin, trip.destination, trip.distanceValue, trip.timeValue);
                    lastCount++;
                }
            }
        }

        return lastCount;
    }
}

// Display data in datatable.
function setDataTable(i, origin, destination, distance, time) {
    const rowId = i+1;
    
    const newRow = $('#tripsTable').DataTable().row.add(
        $('<tr>'+
            `<td>${i+1}</td>` +
            `<td>${origin.address1 !== undefined ? origin.address1 : ''}</td>` +
            `<td>${origin.city}</td>` +
            `<td>${origin.state}</td>` +
            `<td>${origin.zipcode}</td>` +
            `<td>${destination.address1 !== undefined ? destination.address1 : ''}</td>` +
            `<td>${destination.city}</td>` +
            `<td>${destination.state}</td>` +
            `<td>${destination.zipcode}</td>` +
            `<td>${distance}</td>` +
            `<td>${time}</td>` +
        '</tr>')[0]
    ).draw().node();

    $(newRow).addClass(`trip-${rowId}`);
}

// Display average row.
function setLastRow(lastCount) {
    const avgDistance = parseFloat((totalDistance / lastCount).toFixed(2));
    const avgTime = parseFloat((totalTime / lastCount).toFixed(2));
    const tripString = lastCount > 1 ? 'trips' : 'trip';

    const newRow = $('#tripsTable').DataTable().row.add(
        $('<tr>' + 
            `<td style="display: none;"></td>` +
            `<td style="display: none;"></td>` +
            `<td style="display: none;"></td>` +
            `<td style="display: none;"></td>` +
            `<td style="display: none;"></td>` +
            `<td style="display: none;"></td>` +
            `<td style="display: none;"></td>` +
            `<td style="display: none;"></td>` +
            `<td colspan="9" class="avgTd">Average of ${lastCount} ${tripString}</td>` +
            `<td>${avgDistance}</td>` +
            `<td>${avgTime}</td>` +
        '</tr>')[0]
    ).draw().node();

    $(newRow).addClass('trip-total');
}

// Format address based on datatable td data.
function formatAddress(address, callback) {
    const geocoder = new google.maps.Geocoder();

    let addressObj= {};
    let address1 = "";
    let zipcode = "";
    let city = "";
    let state = "";

    setTimeout(() => {
        geocoder.geocode({ address: address }, (response, status) => {
            if (status === 'OK' && response && response.length > 0) {
                const addressComponents = response[0].address_components;

                if (addressComponents && addressComponents.length > 0) {
                    for (const component of addressComponents) {
                        const componentType = component.types[0];

                        switch (componentType) {
                            case 'street_number': {
                                address1 = `${component.long_name} ${address1}`;
                                break;
                            }
                            case 'route': {
                                address1 += component.short_name;
                                addressObj.address1 = address1;
                                break;
                            }
                            case 'postal_code': {
                                zipcode = component.long_name;
                                addressObj.zipcode = zipcode;
                                break;
                            }
                            case 'locality': {
                                city = component.long_name;
                                addressObj.city = city;
                                break;
                            }
                            case 'administrative_area_level_1': {
                                state = component.long_name;
                                addressObj.state = state;
                                break;
                            }
                        }
                    }
                    
                    callback(addressObj);
                }
            } else {
                window.alert(`Error: ${status}`);
            }
        });
    }, 200);
}

// Remove marker in the map.
function removeMarker() {
    for (let i = 0; i < markerPoints.length; i++) {
        markerPoints[i].setMap(null);
    }
}

function clearTable() {
    markers = [];
    markerPoints = [];
    trips = [];
    previousTrips = [];
    labelIndex = 0;
    totalDistance = 0;
    totalTime = 0;
}

// Add new trip.
function newTrip() {
    // Push previous trips.
    previousTrips.push(trips);

    // Reset markers.
    markers = [];
    removeMarker();
    markerPoints = [];
    labelIndex = 0;

    // Reinitialize map.
    initMap();
}

function validateFile(event) {
    const data = event.target.files[0];
    const sizeLimit = 3*1000*1000;
    const { name: fileName, size: fileSize } = data;
    const fileExtension = fileName.split(".").pop().toLowerCase();

    if (fileExtension !== 'csv') {
        alert('File type not allowed.');
    }

    if (fileSize > sizeLimit) {
        alert('File size should be up to 3MB.');
    }

    if (fileExtension === 'csv' && fileSize < sizeLimit) {
        handleFileSelect(data);
    }
}

function handleFileSelect(file) {
    let fileData = null;

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (event) {
        Papa.parse(event.target.result, {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                fileData = results;
            }
        });

        let errors = fileData.errors;
        if (errors.length > 0) {
            uploadCSVError();
        }

        let headers = fileData.meta['fields'];
        populateCSVData(fileData.data, headers);
    }

    reader.onerror = function () {
        uploadCSVError();
    }
}

async function populateCSVData(data, headers) {
    let lastCount = 0;

    var table = $('#tripsTable').DataTable();

    if (table.data().any()) {
       lastCount = table.data().length - 1;
       table.rows('.trip-total').remove().draw();
    }

    if (data.length > 0) {
        let index = {
            trip: null,
            pickupAddr: null,
            pickupCity: null,
            pickupState: null,
            pickupZipcode: null,
            dropoffAddr: null,
            dropoffCity: null,
            dropoffState: null,
            dropoffZipcode: null,
        }

        for (let j = 0; j < headers.length; j++) {
            let headerStr = headers[j].toLowerCase();
            headerStr = headerStr.replace('-', '');

            if (headerStr === 'index' || headerStr === 'trip') {
                index.trip = headers[j];
            } else if (headerStr === 'pickup address') {
                index.pickupAddr = headers[j];
            } else if (headerStr === 'pickup city') {
                index.pickupCity = headers[j];
            } else if (headerStr === 'pickup state') {
                index.pickupState = headers[j];
            } else if (headerStr === 'pickup zipcode') {
                index.pickupZipcode = headers[j];
            } else if (headerStr === 'dropoff address') {
                index.dropoffAddr = headers[j];
            } else if (headerStr === 'dropoff city') {
                index.dropoffCity = headers[j];
            } else if (headerStr === 'dropoff state') {
                index.dropoffState = headers[j];
            } else if (headerStr === 'dropoff zipcode') {
                index.dropoffZipcode = headers[j];
            }
        }

        for (let i = 0; i < data.length; i++) {
            let address = data[i];
            
            let trip = index.trip ? address[index.trip] : '';
            let pickupAddr = index.pickupAddr? address[index.pickupAddr] : '';
            let pickupCity = index.pickupCity ? address[index.pickupCity] : '';
            let pickupState = index.pickupState ? address[index.pickupState] : '';
            let pickupZipcode = index.pickupZipcode ? address[index.pickupZipcode] : '';
            let dropoffAddr = index.dropoffAddr ? address[index.dropoffAddr] : '';
            let dropoffCity = index.dropoffCity ? address[index.dropoffCity] : '';
            let dropoffState = index.dropoffState ? address[index.dropoffState] : '';
            let dropoffZipcode = index.dropoffZipcode ? address[index.dropoffZipcode] : '';

            let pickupAddress = {
                address1: pickupAddr,
                city: pickupCity,
                state: pickupState,
                zipcode: pickupZipcode
            };

            let dropoffAddress = {
                address1: dropoffAddr,
                city: dropoffCity,
                state: dropoffState,
                zipcode: dropoffZipcode
            };
            
            const result = await (new Promise((resolve) => {
                calculateDistanceTime(pickupAddress, dropoffAddress, (response) => {
                    resolve(response);
                });
            }));

            let distance = result.distance;
            let time = result.time;

            totalDistance += distance;
            totalTime += time;

            const newRow = $('#tripsTable').DataTable().row.add(
                $('<tr>'+
                    `<td>${trip}</td>` +
                    `<td>${pickupAddr}</td>` +
                    `<td>${pickupCity}</td>` +
                    `<td>${pickupState}</td>` +
                    `<td>${pickupZipcode}</td>` +
                    `<td>${dropoffAddr}</td>` +
                    `<td>${dropoffCity}</td>` +
                    `<td>${dropoffState}</td>` +
                    `<td>${dropoffZipcode}</td>` +
                    `<td>${distance}</td>` +
                    `<td>${time}</td>` +
                '</tr>')[0]
            ).draw().node();

            $(newRow).addClass(`trip-${i}`);
            lastCount++;
        }
    }

    // Display average distance and time.
    setLastRow(lastCount);

    document.getElementById('uploadCSVFile').value = '';
}

function calculateDistanceTime(pickup, dropoff, callback) {
    let result = {};
    const service = new google.maps.DirectionsService();

    let pickupAddress = `${pickup.address1} ${pickup.city} ${pickup.state} ${pickup.zipcode}`;
    let dropoffAddress = `${dropoff.address1} ${dropoff.city} ${dropoff.state} ${dropoff.zipcode}`;
    
    service.route(
        {
            origin: pickupAddress,
            destination: dropoffAddress,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
        },
        (response, status) => {
            if (status === 'OK' && response) {
                // Get response value.
                const route = response.routes;
                
                if (route && route.length > 0) {
                    const legs = route[0].legs;
                    
                    if (legs && legs.length > 0) {
                        const distance = legs[0].distance.text;
                        const time = legs[0].duration.text;
                        const distanceValue = Number(distance.replace(/[^\d.-]/g, ''));
                        const timeValue = Number(time.replace(/[^\d.-]/g, ''));

                        result = {
                            distance: distanceValue,
                            time: timeValue
                        }
                    }

                    callback(result);
                }
            } else {
                window.alert(`Error: ${status}`);
          }
        }
    );
}

function uploadCSVError() {
    alert('Error reading file!');

    const dataTable = $('#tripsTable').DataTable();
    dataTable.clear().draw();

    initMap();
    clearTable();
}
