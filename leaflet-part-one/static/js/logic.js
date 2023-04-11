var myMap = L.map("myMap", {
  center: [37.09, -95.71],
  zoom: 4
});

console.log("myMap: ", myMap)

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
//use this link for the info
var link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

// Getting our GeoJSON data
d3.json(link).then(function (data) {
  // Creating a GeoJSON layer with the retrieved data
  console.log(data);

  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      var geojsonMarkerOptions = {
        radius: (feature.properties.mag) * 5,
        fillColor: gradients(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      return L.circleMarker(latlng, geojsonMarkerOptions)
      .bindPopup(`<p>Magnitude: ${feature.properties.mag}</p><br><p>Location: ${feature.properties.place}</p><br><p>Depth: ${feature.geometry.coordinates[2]}</p>`)
      .openPopup();   
    }
  }).addTo(myMap);

  var legend = L.control({ position: "bottomright" });
  legend.onAdd= function() {
    var div = L.DomUtil.create("div", "legend");

    div.innerHTML += 
    " <p><div><div class='box greengreen'></div>10-10</div>"+
   " <br>"+
   " <div><div class='box limegreen'></div>10-29</div>"+
   " <br>"+
   " <div><div class='box yellow'></div>30-49</div>"+
   " <br>"+
   " <div><div class='box orange'></div>50-69</div>"+
   " <br>"+
   " <div><div class='box darkorange'></div>70-90</div>"+
   " <br>"+
   "<div><div class='box red'></div>90+</div>"+
   "<br></p>"
   
    
    return div;
};
legend.addTo(myMap)

  

})
.catch(function(e){
  console.log("Error: " + e.error);
  console.log("Error message: " + e.message);
  
});


function gradients(depth) {
      
  if (depth < 10) {
    return "#05f71d";//green green
  }
  
  if (depth < 30) {
    return "#d4ee00";//lime green

  }

  if (depth < 50 ) {//yellow
    return "#eecc00";

  }
  if (depth < 70) { //lighter orange
    return "#ee9c00";

  }
  if (depth < 90) {
    return "#ea822c";//dark orange
  }

  return "#ea2c2c";//red

}
