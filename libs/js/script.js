 
 /*
	 navigator.geolocation.getCurrentPosition(function(location)
	 {
	
  var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

	 var mymap = L.map('mapid').setView(latlng, 13)});
  var issIcon = L.icon({
    iconUrl: 'img/Iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 32],
    

   // const mark = L.marker([0, 0]).addTo(mymap);
   L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',{
 attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
   maxZoom:5,
   id: 'mapbox.streets',
	tileSize: 512,
       zoomOffset: -1,
   accessToken: 'pk.eyJ1IjoiYmJyb29rMTU0IiwiYSI6ImNpcXN3dnJrdDAwMGNmd250bjhvZXpnbWsifQ.Nf9Zkfchos577IanoKMoYQ'
  }).addTo(mymap);
   */
  
 
   
//Where is ISS?
      const api_url='https://api.wheretheiss.at/v1/satellites/25544';
	  async function getISS(){
	  const response = await fetch(api_url);
	  const data = await response.json();
	   const{latitude,longitude,visibility}=data;
	  // L.marker([latitude, longitude],{icon: issIcon}).addTo(mymap);
	   
	   //mymap.setView([latitude, longitude],2);
	 // $('#btnISS').click(function() {
        
       // mymap.setView([latitude, longitude],2);
    

    
	  document.getElementById('lat').textContent = latitude;
	  document.getElementById('lon').textContent = longitude;
	  document.getElementById('vis').textContent = visibility;
	  
	  }
	    
     getISS();
	 setInterval(getISS, 1000);
	 // handles ISS tracking mode



	  
	 // Get Country Info
$('#selectCountry').change(function(){
    //showInfoBtn();
    //emptyTable('#table2');
    
    $.ajax({
        url: "libs/php/getCountryInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#selectCountry').val(),
            lang: 'en'
        },
        success: function(result){
            console.log(result);
            if(result.status.name == "ok"){
              // setFlag($('#selectCountry').val());
              // setCountryInfo(result);
			   $('#Continent').html(result['data'][0]['continent']);
					$('#Cap').html(result['data'][0]['capital']);
					$('#pop').html(result['data'][0]['population']);
					$('#Area').html(result['data'][0]['areaInSqKm']);
					$('#Cn').html(result['data'][0]['continentName']);
					$('#CName').html(result['data'][0]['countryName']);
					$('#lng').html(result['data'][0]['languages']);
					$('#CC').html(result['data'][0]['countryCode']);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`${textStatus} error in country info`);
        }
    });
});
$('#infoModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus');
  });

 //Get weather Info
 
 
function getWeatherData(){
    $.ajax({
        url: "libs/php/getWeather.php",
        type: 'POST',
        dataType: 'json',
        data: {
           // q: $('#selectCountry').val(),capital
		   q:capital
        },
        success: function(result){
            if(result.cod == 200){
                console.log(result);
                $('#temperature').html(`${Math.floor(parseFloat(result['main']['temp']) - 273.15)} <sup>o</sup>C`);
                $('#humidity').html(`${result['main']['humidity']} %`);
                $('#pressure').html(`${result['main']['pressure']} hPa`);
                lng = result['coord']['lon'];
                lat = result['coord']['lat'];
                updateMarker(result['coord']['lat'], result['coord']['lon']);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Error in weather: ${textStatus} : ${errorThrown} : ${jqXHR}`);
        }
    });
}

