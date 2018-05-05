(function () {
    'use strict';

    angular
        .module('app')
        .controller('Sellers.AddEditController', Controller);

    function Controller($scope, $state,
     $stateParams, MarketService,$cookieStore
     ,ProvinceService,TownshipService,$rootScope,
     SellerService
     ) {
        var vm = this;

        vm.title = 'Cadastro de  Vendedor';
        vm.seller = {};
        vm.Provices={};
        $rootScope.Provices={}
        $rootScope.Townships={}
        vm.saveSeller = saveMarket;
        

        initController();

        function initController() {
             loadSellers();
            if ($stateParams.id) {
                vm.title = 'Editar vendedor';
                vm.seller = SellerService.GetById($stateParams.id);
               
            }
        }

        function saveSeller() {
           
            SellerService.Save(vm.seller);

           
            $state.go('sellers');

            
            $scope.$emit('sellers-updated');
        }

          function loadProvince() {
            vm.Provices = ProvinceService.GetAll();
            $rootScope.Provices=ProvinceService.GetAll();
            $rootScope.Townships=TownshipService.GetAll();
            
           
        }

    }

})();