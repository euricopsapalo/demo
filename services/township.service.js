(function () {
    'use strict';

    angular
        .module('app')
        .factory('TownshipService', Service);

    function Service($filter) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Save = Save;
        service.Delete = Delete;

        return service;

        
        function GetAll() {
            return getTownships();
        }

        

        function GetById(id) {
            var filtered = $filter('filter')(getTownships(), { id: id });
            var township = filtered.length ? filtered[0] : null;
            
            return township;
        }

        function Save(township) {
            var townships = getTownships();

            if (township.id) {

                for (var i = 0; i < townships.length; i++) {
                    if (townships[i].id === township.id) {
                        townships[i] = township;
                        break;
                    }
                }
                setTownships(townships);
            } else {
             
                var lastTownships = townships[townships.length - 1] || { id: 0 };
              
                township.id = lastTownships.id + 1;
  
                townships.push(township);
                setTownships(townships);
            }

            return;
        }

         
        function Delete(id) {
            var townships = getTownships();
            for (var i = 0; i < townships.length; i++) {
                var township = townships[i];
                if (township.id === id) {
                    township.splice(i, 1);
                    break;
                }
            }
            setTownships(townships);
            
            return;
        }

       
        function getTownships() {
            if (!localStorage.townships) {
                localStorage.townships = JSON.stringify([]);
            }

            return JSON.parse(localStorage.townships);
        }

       
        function setTownships(townships) {
            localStorage.townships = JSON.stringify(townships);
        }
    }
})();