(function () {
    'use strict';

    angular
        .module('app')
        .controller('Markets.AddEditController', Controller);

    function Controller($scope, $state,
     $stateParams, MarketService,$cookieStore
     ,ProvinceService,TownshipService,$rootScope
     ) {
        var vm = this;

        vm.title = 'Criar Mercado';
        vm.market = {};
        vm.Provices={};
        $rootScope.Provices={}
        $rootScope.Townships={}
        vm.saveMarket = saveMarket;
        

        initController();

        function initController() {
             loadProvince();
            if ($stateParams.id) {
                vm.title = 'Editar mercado';
                vm.market = MarketService.GetById($stateParams.id);
               
            }
        }

        function saveMarket() {
           
            MarketService.Save(vm.market);
            console.log(vm.market);

           
            $state.go('markets');

            
            $scope.$emit('markets-updated');
        }

          function loadProvince() {
            vm.Provices = ProvinceService.GetAll();
            $rootScope.Provices=ProvinceService.GetAll();
            $rootScope.Townships=TownshipService.GetAll();
            
           
        }

    }

})();