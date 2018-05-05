(function () {
    'use strict';

    angular
        .module('app')
        .controller('Users.MainController', Controller);

    function Controller($scope,UserService,$cookieStore) {
        var vm = this;

        vm.users = [];
        vm.deleteUser = deleteUser;
         

        if($cookieStore.get('globals')){

            var value=$cookieStore.get('globals');
            vm.dataLogin=value.currentUser;


        }else{
            vm.dataLogin=-1;
        }
        

        initController();

        function initController() {
            loadUsers();

            
            //recarregar os produtos quando actualizados
            $scope.$on('users-updated', loadUsers);
        }
        
        function loadUsers() {
           
            //console.log(UserService.GetByUaP('admin','0'));
            vm.users = UserService.GetAll();

        }

        function deleteUser(id) {
            UserService.Delete(id);
            loadUsers();
                           
        }
    }

})();