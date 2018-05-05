(function () {
    'use strict';

    angular
        .module('app')
        .controller('Products.AddEditController', Controller);

    function Controller($scope, $state, $stateParams, ProductService,$cookieStore) {
        var vm = this;

        vm.title = 'Adicionar Produto';
        vm.product = {};
        vm.saveProduct = saveProduct;

        initController();

        function initController() {
            if ($stateParams.id) {
                vm.title = 'Editar produto';
                vm.product = ProductService.GetById($stateParams.id);
            }
        }

        function saveProduct() {
         
            // salvar produto
            ProductService.Save(vm.product);

            // redireciona para a lista de produtos
            $state.go('products');

            
            //emit um envento para que a controladora possa actualizar
            $scope.$emit('products-updated');
        }
    }

})();