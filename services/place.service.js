(function () {
    'use strict';

    angular
        .module('app')
        .factory('PlaceService', Service);

    function Service($filter) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Save = Save;
        service.Delete = Delete;

        return service;

       
        function GetAll() {
            return getPlaces();
        }

      

        function GetById(id) {
            var filtered = $filter('filter')(getPlaces(), { id: id });
            var place = filtered.length ? filtered[0] : null;
            
            return place;
        }

        function Save(place) {
            var places = getPlaces();

            if (place.id) {
             
                
                for (var i = 0; i < places.length; i++) {
                    if (places[i].id === place.id) {
                        places[i] = place;
                        break;
                    }
                }
                setPlaces(places);
            } else {
               
                var lastPlace = places[places.length - 1] || { id: 0 };
              

                place.id = lastPlace.id + 1;

                
                place.state=false;

                
                places.push(place);
               
                setPlaces(places);
            }

            return;
        }

      
        function Delete(id) {
            var places = getPlaces();
            for (var i = 0; i < places.length; i++) {
                var place = places[i];
                if (place.id === id) {
                    places.splice(i, 1);
                    break;
                }
            }
            setPlaces(places);
            
            return;
        }

    
        function getPlaces() {
            if (!localStorage.places) {
                localStorage.places = JSON.stringify([]);
            }

            return JSON.parse(localStorage.places);
        }

    
        function setPlaces(places) {
            localStorage.places = JSON.stringify(places);
        }
    }
})();