// SCRIPTS FOR Storied Walks
// SET GLOBAL VARIABLES

// URL of CSV file containing geocoded data 
var csvurl = "https://raw.githubusercontent.com/kerguio/mapping/main/files/Blue_Plaque_Park_Lane.csv";
var icourl = "img/marker.png"


// Function to create geoJson object from flat Json data
function geojson(features) {
  var geojson = {"type": "FeatureCollection", "features": []};
  for (feature in features) {
    let lng = features[feature].longitude;
    let lat = features[feature].latitude;
    if ($.isNumeric(lng) && $.isNumeric(lat) && lng < 1 && lng > -1 && lat < 52 && lat > 51) {
      var plak = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [features[feature].longitude, features[feature].latitude]
        },
        "properties": {
          "name": features[feature].name,
          "fame": features[feature].Famous_for,
          "Address": features[feature].Address,
          "hear": features[feature].hear_the_story,
        }
      };
      geojson.features.push(plak);
    };
  };
  return geojson;
}

// Function to process features in geoJson for map layer
function onEachFeature(feature, layer) {
  var name = feature.properties.name;
  var fame = feature.properties.fame;
  var Address = feature.properties.Address;
  var fame = feature.properties.fame;
  var lat = feature.geometry.coordinates[1];
  var lon = feature.geometry.coordinates[0];
  var url = "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon;
  var html = "<h3>" + name + "</h3><strong>Famous for:</strong> " + fame + '<br><strong>Address:</strong> " + Address + "<br><br><a href="' + url + '" target="_blank">Get Google Maps directions</a><br><br>';
  layer.bindPopup(html);
  var myIcon = L.icon({
    iconUrl: 'img/marker.png',
    iconSize: [25, 30],
    iconAnchor: [12, 30],
    popupAnchor: [0, -25]
  });
  layer.setIcon(myIcon);
  layer.on({
    click: function (e) {
      window.map.flyTo([lat, lon], 18);
    }
  });
}

// Function to initialize map
function makeMap(geopoints) {
  var tiles = L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  window.markers = L.markerClusterGroup();
  var geoJsonLayer = L.geoJson(geopoints, {onEachFeature: onEachFeature});
  window.markers.addLayer(geoJsonLayer);

  window.map = L.map('map', {zoomControl: false}).addLayer(tiles);
  window.map.addLayer(window.markers);

  L.control.zoom({position: "topleft"}).addTo(map);

  L.control.locate(
    {
      position: "topleft",
      icon: "fa fa-compass",
      locateOptions: {
        maxZoom: 18,
        watch: true,
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
      }
    }).addTo(map);

  window.map.fitBounds(window.markers.getBounds());

  L.Control.Filter = L.Control.extend({
    onAdd: function(map) {
      var div = L.DomUtil.create('div', 'leaflet-control-layers');
      div.id = "filter-control";
      return div;
    }
  });
  L.control.filter = function(opts) {
    return new L.Control.Filter(opts);
  }

  L.control.filter({ position: 'bottomleft' }).addTo(map);
  $('#filters').appendTo('#filter-control');
}



// INITIALIZE THE MAP ON LOAD
// Fetch CSV file, convert to json, convert json to geoJson, initialize map
fetch(csvurl).then((response) => {
    return response.text();
})
.then((csvdata) => {
    var jsondata = $.csv.toObjects(csvdata);
    window.geojson = geojson(jsondata);
    makeMap(geojson);
});
