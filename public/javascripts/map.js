function success(r){var a=r.coords,e=L.marker([a.latitude,a.longitude],{icon:redIcon});e.bindPopup("This is me"),e.addTo(map)}function error(r){console.warn("ERROR("+r.code+"): "+r.message)}var RedIcon=L.Icon.Default.extend({options:{iconUrl:"/images/marker-icon-red.png"}}),redIcon=new RedIcon,map=L.map("map").setView(["<%= list[0].lat %>","<%= list[0].lng %>"],11),options={enableHighAccuracy:!0,timeout:5e3,maximumAge:0};navigator.geolocation.getCurrentPosition(success,error,options),navigator.geolocation.watchPosition(success,error,options),L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);var lngth="<%= list.length %>",arr=[];art=[],summ=[],arr="<%=lat.slice() %>",art="<%=lng.slice() %>",summ="<%= summary.slice() %>",addr="<%= address.slice() %>";for(var summary=summ.split(","),array=arr.split(","),array2=art.split(","),markers=new L.MarkerClusterGroup,i=0;lngth>i;i++){var marker=L.marker(new L.LatLng(array[i],array2[i]),{});L.circle([array[i],array2[i]]).setRadius(1609.34).addTo(map),marker.bindPopup("Summary: "+summary[i]+"<br/>"),markers.addLayer(marker)}map.addLayer(markers);