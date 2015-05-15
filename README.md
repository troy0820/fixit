#See, Click, Fix it [![Build Status](https://travis-ci.org/troy0820/fixit.svg)](https://travis-ci.org/troy0820/fixit)

This project is to take the api and provide front end work with express.
This project will also map the coordinates of issues at the location.

###Getting started
```
git clone git@github.com:troy0820/fixit.git
cd fixit
npm install
npm install --save bower
bower install bootstrap
bower install font-awesome
bower install leaflet.markercluster
```
![Map picture](/public/images/map.png)
#API endpoints for this project are at these urls.
```
https://seeclickfix.com/api/v2/issues?place_url=hampton&state=VA
https://seeclickfix.com/api/v2/issues?place_url=newport-news&state=VA
https://seeclickfix.com/api/v2/issues?place_url=suffolk&state=VA
https://seeclickfix.com/api/v2/issues?place_url=norfolk&state=VA
https://seeclickfix.com/api/v2/issues?place_url=portsmouth&state=VA
https://seeclickfix.com/api/v2/issues?place_url=chesapeake&state=VA
https://seeclickfix.com/api/v2/issues?place_url=virginia-beach&state=VA
```
##Documentation for metadata are included in /GET request of each endpoint, i.e pages, per_page, etc.
 
