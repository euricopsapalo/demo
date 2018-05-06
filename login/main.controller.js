(function () {
    'use strict';

    angular
        .module('app')
        .controller('login.MainController', Controller);

    function Controller($scope,$window, $rootScope, $location,$route,AuthenticationService,$cookieStore) {
        var vm = this;

        if($cookieStore.get('globals')){
            var value=$cookieStore.get('globals');
             vm.dataLogin=value.currentUser;
             $rootScope.dataLogin=value.currentUser;

        }else{
            vm.dataLogin=-1;
            $rootScope.dataLogin=-1;
        }
        vm.login = login;
        $rootScope.logout=logout;

        function login() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    
                    $location.path('/');
                    $window.location.reload();
                   
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };  


        function logout(){
                     
            if ( $rootScope.globals.currentUser!=null) {
                console.log('aqui');
                AuthenticationService.ClearCredentials();
                $location.path('/login');
                $route.reload();
            }
       
        }



        } 
       


})();
