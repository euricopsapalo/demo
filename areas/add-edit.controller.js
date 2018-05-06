(function () {
    'use strict';

    angular
        .module('app')
        .controller('Areas.AddEditController', Controller);

    function Controller($scope, $state, $stateParams, AreaService,$cookieStore) {
        var vm = this;

        vm.title = 'Cadastrar Area';
        vm.area = {};
        vm.saveArea = saveArea;

        initController();

        function initController() {
            if ($stateParams.id) {
                vm.title = 'Editar area';
                vm.area = AreaService.GetById($stateParams.id);
            }
        }

        function saveArea() {
         
            
            AreaService.Save(vm.area);

            
            $state.go('areas');

            
            
            $scope.$emit('areas-updated');
        }
    }

})();