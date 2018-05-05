(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProvinceService', Service);

    function Service($filter) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Save = Save;
        service.Delete = Delete;

        return service;

        
        function GetAll() {
            return getProvinces();
        }

        

        function GetById(id) {
            var filtered = $filter('filter')(getProvinces(), { id: id });
            var province = filtered.length ? filtered[0] : null;
            
            return province;
        }

        function Save(province) {
            var provinces = getProvinces();

            if (province.id) {

                for (var i = 0; i < provinces.length; i++) {
                    if (provinces[i].id === province.id) {
                        provinces[i] = province;
                        break;
                    }
                }
                setProvinces(provinces);
            } else {
             
                var lastProvince = provinces[provinces.length - 1] || { id: 0 };
              
                province.id = lastProvince.id + 1;
  
                provinces.push(province);
                setProvinces(provinces);
            }

            return;
        }

         
        function Delete(id) {
            var provinces = getProvinces();
            for (var i = 0; i < provinces.length; i++) {
                var province = provinces[i];
                if (province.id === id) {
                    province.splice(i, 1);
                    break;
                }
            }
            setProvince(provinces);
            
            return;
        }

       
        function getProvinces() {
            if (!localStorage.provinces) {
                localStorage.provinces = JSON.stringify([]);
            }

            return JSON.parse(localStorage.provinces);
        }

       
        function setProvinces(provinces) {
            localStorage.provinces = JSON.stringify(provinces);
        }
    }
})();