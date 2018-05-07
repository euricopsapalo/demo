(function () {
    'use strict';
   var dataPicture=null;
   var app= angular.module('app');
  
    app.controller('Sellers.AddEditController', Controller);

    function Controller($scope, $state,
     $stateParams, MarketService,$cookieStore
     ,ProvinceService,TownshipService,$rootScope,
     SellerService,AreaService,PlaceService,ProductService
    ) {
        var vm = this;

        vm.title = 'Cadastro de  Vendedor';
        vm.seller = {};
        $rootScope.Provices={};
        $rootScope.Barcode=null;
        $rootScope.Townships={};
        $rootScope.Places={};
        $rootScope.Areas={};
        $rootScope.Markets={};
        $rootScope.Products={};
        vm.saveSeller = saveSeller;
        vm.barcodeSeller=barcodeSeller;
        

        initController();

        function initController() {
             load();
             
            if ($stateParams.id) {
                vm.title = 'Editar vendedor';
                vm.seller = SellerService.GetById($stateParams.id);              
            }
        }

        function saveSeller() { 
           vm.seller.img=dataPicture;     
            SellerService.Save(vm.seller);        
            $state.go('sellers');
            $scope.$emit('sellers-updated');
        }



        function load() {
            $rootScope.Provices=ProvinceService.GetAll();
            $rootScope.Townships=TownshipService.GetAll();
            $rootScope.Places=PlaceService.GetAll();
            $rootScope.Areas=AreaService.GetAll();
            $rootScope.Markets=MarketService.GetAll(); 
            $rootScope.Products=ProductService.GetAll();; 
        }


          function barcodeSeller(data) {

          console.log(data); 
            $rootScope.Barcode=data;
        }


       



    }

   
        app.directive('fileChanged', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function ($scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            }

            ngModel.$render = angular.noop;

            element.bind('change', function (event) {
                ngModel.$setViewValue(event.target.files[0]);
                $scope.$apply();
            });
        }
    };
})
.factory('FileReader', function ($q, $window) {

    if (!$window.FileReader) {
        throw new Error('Browser does not support FileReader');
    }

    function readAsDataUrl(file) {
        var deferred = $q.defer(),
            reader = new $window.FileReader();

        reader.onload = function () {
            deferred.resolve(reader.result);
        };

        reader.onerror = function () {
            deferred.reject(reader.error);
        };

        reader.readAsDataURL(file);

        return deferred.promise;
    }

    return {
        readAsDataUrl: readAsDataUrl
    };
}).
directive('filePreview', function (FileReader) {
    return {
        restrict: 'A',
        scope: {
            filePreview: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('filePreview', function (filePreview) {
                if (filePreview && filePreview.name) {
                    FileReader.readAsDataUrl(filePreview).then(function (result) {
                        element.attr('src', result);
                        dataPicture=result;
                        console.log(dataPicture);
                    });
                }
            });
        }
    };
});




})();