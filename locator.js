var mapElement = document.getElementById("map-canvas");

if (navigator.geolocation) { //Feature detection
  // Geolocation supported. Do something here.
  toastr.info("Loading...")
  var success_handler = function(position) {
    
    var latlng = new google.maps.LatLng(position.coords.latitude,
       position.coords.longitude);
    
    var map = new google.maps.Map(mapElement, {
      center: latlng,
      zoom: 15
    });
    
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      animation: google.maps.Animation.DROP,
      icon: "r2d2.png"
    });
    
    var geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({
      location: latlng
    },
    function(results){
      var infoWindow;
      if (results.length > 0) {
        infoWindow = new google.maps.InfoWindow({
          content: results[0].formatted_address,
          position: latlng
        });
        
        toastr.success('Address found with ' + position.coords.accuracy +
        "% accuracy");
        
        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.open(map)
        });
      }else{
        infoWindow = new google.maps.InfoWindow({
          content: "Cannot locate your address.",
          position: latlng
        });
        
        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.open(map)
        });
        
        toastr.error('Your location has been found, but not your address.');
      }
        
    });
    
  }; //end success_handler
  
  var error_handler = function(err) {toastr.error('Location not found. Please try again')};
  var options = {};

  navigator.geolocation.getCurrentPosition(success_handler, error_handler, options);
}