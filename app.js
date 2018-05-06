(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngAnimate','ngCookies','ngRoute','ui.multiselect'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // rota padrão
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('view', {
                url: '/',
                templateUrl: 'view/main.html',
                controller: 'view.MainController',
                controllerAs: 'vm'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'products/main.html',
                controller: 'Products.MainController',
                controllerAs: 'vm'
            })
                .state('products.add', {
                    url: '/add',
                    templateUrl: 'products/add-edit.html',
                    controller: 'Products.AddEditController',
                    controllerAs: 'vm'
                })
                .state('products.edit', {
                    url: '/edit/:id',
                    templateUrl: 'products/add-edit.html',
                    controller: 'Products.AddEditController',
                    controllerAs: 'vm'

                }) .state('users', {
                url: '/users',
                templateUrl: 'users/main.html',
                controller: 'Users.MainController',
                controllerAs: 'vm'
            })
              .state('users.add', {
                    url: '/add',
                    templateUrl: 'users/add-edit.html',
                    controller: 'Users.AddEditController',
                    controllerAs: 'vm'
                })
                .state('users.edit', {
                    url: '/edit/:id',
                    templateUrl: 'users/add-edit.html',
                    controller: 'Users.AddEditController',
                    controllerAs: 'vm'

                }).state('markets', {
                url: '/markets',
                templateUrl: 'markets/main.html',
                controller: 'Markets.MainController',
                controllerAs: 'vm'
            })
             .state('markets.add', {
                    url: '/add',
                    templateUrl: 'markets/add-edit.html',
                    controller: 'Markets.AddEditController',
                    controllerAs: 'vm'
                })



              .state('markets.edit', {
                    url: '/markets/:id',
                    templateUrl: 'markets/add-edit.html',
                    controller: 'Markets.AddEditController',
                    controllerAs: 'vm'

                })
        
             .state('areas', {
                url: '/areas',
                templateUrl: 'areas/main.html',
                controller: 'Areas.MainController',
                controllerAs: 'vm'
            })
                .state('areas.add', {
                    url: '/add',
                    templateUrl: 'areas/add-edit.html',
                    controller: 'Areas.AddEditController',
                    controllerAs: 'vm'
                })
                .state('areas.edit', {
                    url: '/edit/:id',
                    templateUrl: 'areas/add-edit.html',
                    controller: 'Areas.AddEditController',
                    controllerAs: 'vm'

                }) 

                .state('login', {
                url: '/login',
                templateUrl: 'login/main.html',
                controller: 'login.MainController',
                controllerAs: 'vm'
            })



                ;
    }

    function run($rootScope,$http,$location, ProductService
        ,UserService,$cookieStore,ProvinceService
        ,TownshipService,MarketService,SellerService,AreaService) {

        // adicionando alguns produtos inicialmente
        if(ProductService.GetAll().length === 0) {
            
            ProductService.Save({ name: 'Tomate', price: '250.00' });
            ProductService.Save({ name: 'Banana', price: '200.00' });
            ProductService.Save({ name: 'Sereal (Flip Flops)', price: '1500.00' });
        }

        if(UserService.GetAll().length === 0) {           
            UserService.Save({
             fullname: 'Eurico Sapalo', 
             username: 'admin',
             password: '1',
             acesslevel: 'SUPERADMIN' 
         }); 
    }


        if(ProvinceService.GetAll().length === 0) {         
             ProvinceService.Save({
                 name: 'Luanda', acronimo: 'LA'});
     }
     

        if(TownshipService.GetAll().length === 0) {         
             TownshipService.Save({
                 name: 'Cazenga', 
                 idProvince:1

             });

              TownshipService.Save({
                 name: 'Rangel', 
                 idProvince:2

             });

              TownshipService.Save({
                 name: 'Belas', 
                 idProvince:3

             });
     }


        if(MarketService.GetAll().length === 0) { 
                
             MarketService.Save({
                 name:'Congolences', 
                 accountable:'Mauro Manuel',
                 province:{name:'Luanda',acronimo: 'LA'},
                 township:{name:'Rangel',idProvince:2}
             });

             MarketService.Save({
                 name:'Kikolo', 
                 accountable:'José Amaral ',
                 province:{name:'Luanda',acronimo: 'LA'},
                 township:{name:'Cazenga',idProvince:1}
             });

            
     }


       if(SellerService.GetAll().length === 0) {         
             SellerService.Save({
                 numberSeller:'LDCZAB12001', 
                 marketName:'Congolences',
                 beginActDate:'09/02/2012',
                 craeteDate:'25/03/2012',
                 area:'Fescos',
                 place:'Armazem',
                 paymentType:'Diario',
                 valuePayment:100,


             });
           
           
           
         if(AreaService.GetAll().length === 0) { 


                 AreaService.Save({
                 name:'Fescos', 
                 accountable:'Januario Ilario '
            
             });

                  AreaService.Save({
                 name:'Verduras', 
                 accountable:'Martins Galiano '
            
             });

                   AreaService.Save({
                 name:'Materias de construção', 
                 accountable:'Bruna Batalha '
            
             });


              }

             

            
     }





        
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
        });


        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }

            if ($location.path() == '/login' && $rootScope.globals.currentUser) {
                $location.path('/');
            }

        });


    }

})();
