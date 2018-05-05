(function () {
    'use strict';

    angular
        .module('app')
        .controller('Users.AddEditController', Controller);

    function Controller($scope, $state, $stateParams, UserService) {
        var vm = this;

        vm.title = 'Adicionar Usuario';
        vm.user = {};
        vm.saveUser = saveUser;

        initController();

        function initController() {
            if ($stateParams.id) {
                vm.title = 'Editar Usuario';
                vm.user = UserService.GetById($stateParams.id);
                
            }
        }

        function saveUser() {
         // console.log('vm.product', vm.product);
            // salvar usuario
            UserService.Save(vm.user);

            // redireciona para a lista de usuarios
            $state.go('users');

            
            //emit um envento para que a controladora possa actualizar
            $scope.$emit('users-updated');
        }
    }

})();