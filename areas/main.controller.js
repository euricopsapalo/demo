(function () {
    'use strict';

    angular
        .module('app')
        .controller('Areas.MainController', Controller);

    function Controller($scope, AreaService,$cookieStore) {
        var vm = this;

        vm.areas = [];
        vm.deleteArea = deleteArea;
        
        if($cookieStore.get('globals')){
           vm.dataLogin=$cookieStore.get('globals');
        }else{
            vm.dataLogin=null;
        }

        initController();

        function initController() {
            loadAreas();

            
            
            $scope.$on('areas-updated', loadAreas);
        }
        
        function loadAreas() {
            vm.areas = AreaService.GetAll();
           
        }

        function deleteArea(id) {
            AreaService.Delete(id);
            loadAreas();
        }
    }

})();