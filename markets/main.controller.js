(function () {
    'use strict';

    angular
        .module('app')
        .controller('Markets.MainController', Controller);

    function Controller($scope, MarketService,$cookieStore
        ,ProvinceService,TownshipService) {
        var vm = this;

        vm.markets = [];
        vm.deleteMarket = deleteMarket;
        vm.getAllProvice=getAllProvice;

        
        if($cookieStore.get('globals')){
           vm.dataLogin=$cookieStore.get('globals');
        }else{
            vm.dataLogin=null;
        }

        initController();

        function initController() {
            loadMarkets();

            
            
            $scope.$on('markets-updated', loadMarkets);
        }
        
        function loadMarkets() {
            vm.markets = MarketService.GetAll();
           //console.log(vm.markets);
        }

        function deleteMarket(id) {
            MarketService.Delete(id);
            loadMarkets();
        }


         function getAllProvice() {
           var provinces= ProvinceService.GetAll();
            return provinces;
        }


    }

})();