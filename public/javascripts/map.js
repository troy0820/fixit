
        var RedIcon = L.Icon.Default.extend({
          options: {
                iconUrl: '/images/marker-icon-red.png'
          }
       });
       var redIcon = new RedIcon();

    var map = L.map('map').setView(["<%= list[0].lat %>", "<%= list[0].lng %>"], 11);

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

function success(pos) {
var crd = pos.coords;

var me = L.marker([crd.latitude,crd.longitude],{ icon: redIcon })
        me.bindPopup('Your location is here.')
        me.addTo(map);
};

function error(err) {
console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);
navigator.geolocation.watchPosition(success, error, options);

     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
     }).addTo(map);

      var lngth = "<%= list.length %>";
      var arr = []
          art = []
          summ = []
          arr = "<%=lat.slice() %>";
          art = "<%=lng.slice() %>";
          summ = "<%= summary.slice() %>";
          addr ="<%= address.slice() %>";
          var summary = summ.split(',');
          var array = arr.split(',');
          var array2 = art.split(',');
          var markers = new L.MarkerClusterGroup();

        for(var i= 0; i < lngth; i++) {
             var marker = L.marker(new L.LatLng(array[i], array2[i]), {
          });
            L.circle([array[i],array2[i]]).setRadius(1609.34).addTo(map); //radius around marker should be a mile. Can change if need be.
            marker.bindPopup('Summary: '+summary[i] + '<br/>');
            markers.addLayer(marker);
          }

        map.addLayer(markers);
        /*        for (var i = 0; i < lngth; i++) {
               marker = new L.marker([array[i],array2[i]])
         .bindPopup('Summary: ' + summary[i] )
         .addTo(map); */
