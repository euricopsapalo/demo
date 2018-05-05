(function () {
    'use strict';

    angular
        .module('app')
        .controller('Products.MainController', Controller);

    function Controller($scope, ProductService,$cookieStore) {
        var vm = this;

        vm.products = [];
        vm.deleteProduct = deleteProduct;
        
        if($cookieStore.get('globals')){
           vm.dataLogin=$cookieStore.get('globals');
        }else{
            vm.dataLogin=null;
        }

        initController();

        function initController() {
            loadProducts();

            
            //recarregar os produtos quando actualizados
            $scope.$on('products-updated', loadProducts);
        }
        
        function loadProducts() {
            vm.products = ProductService.GetAll();
           
        }

        function deleteProduct(id) {
            ProductService.Delete(id);
            loadProducts();
        }
    }

})();