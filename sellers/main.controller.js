(function () {
    'use strict';

    angular
        .module('app')
        .controller('Sellers.MainController', Controller);

    function Controller($scope, ProductService
        ,SellerService,$cookieStore) {
        var vm = this;

        vm.sellers = [];
        vm.deleteSeller = deleteSeller;
        
        if($cookieStore.get('globals')){
           vm.dataLogin=$cookieStore.get('globals');
        }else{
            vm.dataLogin=null;
        }

        initController();

        function initController() {
            loadSellers();

            
            $scope.$on('sellers-updated', loadSellers);
        }
        
        function loadSellers() {
            vm.sellers = SellerService.GetAll();
           
        }

        function deleteSeller(id) {
            SellerService.Delete(id);
            loadSellers();
        }
    }

})();