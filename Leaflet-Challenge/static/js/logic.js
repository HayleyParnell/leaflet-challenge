// Function to create map
function createMap(earthquakeData) {
    // Create the map
    let map = L.map('map').setView([0, 0], 2);
  
    // Add the base tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(map);
  
    // Loop through earthquake data and add markers to the map
    earthquakeData.features.forEach(function (quake) {
        let mag = quake.properties.mag;
        let depth = quake.geometry.coordinates[2];
        let lat = quake.geometry.coordinates[1];
        let lng = quake.geometry.coordinates[0];
        let radius = mag * 5; // Adjust marker size based on magnitude
        let color = getColor(depth); // Get marker color based on depth
  
      L.circleMarker([lat, lng], {
        radius: radius,
        fillColor: color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup("<h3>" + quake.properties.place + "</h3><hr><p>Magnitude: " + mag + "<br>Depth: " + depth + " km</p>").addTo(map);
    });
  }
  
  // Function to get color based on earthquake depth
  function getColor(depth) {
    if (depth < 10) {
      return 'green';
    } else if (depth < 30) {
      return 'yellow';
    } else if (depth < 50) {
      return 'orange';
    } else {
      return 'red';
    }
  }
  
  // Get earthquake data from USGS
  fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Call function to create map with earthquake data
      createMap(data);
    })
    .catch(function (error) {
      console.log(error);
    });
  