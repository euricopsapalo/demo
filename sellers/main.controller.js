(function () {
    'use strict';

   var app= angular.module('app');

    angular
        .module('app')
        .controller('Sellers.MainController', Controller);

    function Controller($scope,SellerService,$cookieStore,$rootScope) {
        var vm = this;

        vm.sellers = [];
        vm.deleteSeller = deleteSeller;
        vm.barcodeSeller=barcodeSeller;
        $rootScope.Barcode=null;
        $rootScope.name=null;

        
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
            console.log(vm.sellers);
            loadSellers();
        }

       function barcodeSeller(data) { 
            $rootScope.name=data.name;
            $rootScope.Barcode=data.numberSeller;
        }
    }


})();