(function () {
    'use strict';

    angular
        .module('app')
        .factory('AreaService', Service);

    function Service($filter) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Save = Save;
        service.Delete = Delete;

        return service;

       
        function GetAll() {
            return getAreas();
        }

      

        function GetById(id) {
            var filtered = $filter('filter')(getAreas(), { id: id });
            var area = filtered.length ? filtered[0] : null;
            
            return area;
        }

        function Save(area) {
            var areas = getAreas();

            if (area.id) {
             
                
                for (var i = 0; i < areas.length; i++) {
                    if (areas[i].id === area.id) {
                        areas[i] = area;
                        break;
                    }
                }
                setAreas(areas);
            } else {
               
                var lastArea = areas[areas.length - 1] || { id: 0 };
              

                area.id = lastArea.id + 1;

    
                
                areas.push(area);
               
                setAreas(areas);
            }

            return;
        }

      
        function Delete(id) {
            var areas = getAreas();
            for (var i = 0; i < areas.length; i++) {
                var area = areas[i];
                if (area.id === id) {
                    areas.splice(i, 1);
                    break;
                }
            }
            setAreas(areas);
            
            return;
        }

    
        function getAreas() {
            if (!localStorage.areas) {
                localStorage.areas = JSON.stringify([]);
            }

            return JSON.parse(localStorage.areas);
        }

    
        function setAreas(areas) {
            localStorage.areas = JSON.stringify(areas);
        }
    }
})();