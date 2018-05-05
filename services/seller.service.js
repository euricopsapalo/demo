(function () {
    'use strict';

    angular
        .module('app')
        .factory('SellerService', Service);

    function Service($filter) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Save = Save;
        service.Delete = Delete;

        return service;

        
        function GetAll() {
            return getSellers();
        }

        

        function GetById(id) {
            var filtered = $filter('filter')(getSellers(), { id: id });
            var seller = filtered.length ? filtered[0] : null;
            
            return seller;
        }

        function Save(seller) {
            var sellers = getSellers();

            if (seller.id) {

                for (var i = 0; i < sellers.length; i++) {
                    if (sellers[i].id === seller.id) {
                        sellers[i] = seller;
                        break;
                    }
                }
                setSellers(sellers);
            } else {
             
                var lastSeller = sellers[sellers.length - 1] || { id: 0 };
              
                seller.id = lastSeller.id + 1;
  
                sellers.push(seller);
                setSellers(sellers);
            }

            return;
        }

         
        function Delete(id) {
            var sellers = getSellers();
            for (var i = 0; i < sellers.length; i++) {
                var seller = sellers[i];
                if (seller.id === id) {
                    seller.splice(i, 1);
                    break;
                }
            }
            setSeller(sellers);
            
            return;
        }

       
        function getSellers() {
            if (!localStorage.sellers) {
                localStorage.sellers = JSON.stringify([]);
            }

            return JSON.parse(localStorage.sellers);
        }

       
        function setSellers(sellers) {
            localStorage.sellers = JSON.stringify(sellers);
        }
    }
})();