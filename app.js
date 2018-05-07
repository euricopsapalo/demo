(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngAnimate','ngCookies','ngRoute','ui.multiselect',"kendo.directives"])
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
                   
                .state('sellers', {
                url: '/sellers',
                templateUrl: 'sellers/main.html',
                controller: 'Sellers.MainController',
                controllerAs: 'vm'
            })
                .state('sellers.add', {
                    url: '/add',
                    templateUrl: 'sellers/add-edit.html',
                    controller: 'Sellers.AddEditController',
                    controllerAs: 'vm'
                })
                .state('sellers.edit', {
                    url: '/edit/:id',
                    templateUrl: 'sellers/add-edit.html',
                    controller: 'Sellers.AddEditController',
                    controllerAs: 'vm'

                }) .state('sellers.sellerGb', {
                    templateUrl: 'sellers/barcode.html',
                    controller: 'Sellers.AddEditController',
                    controllerAs: 'vm'

                }).state('sellers.detalhe', {
                    templateUrl: 'sellers/detalhe.html',
                    controller: 'Sellers.AddEditController',
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
        ,TownshipService,MarketService,SellerService,
         AreaService,PlaceService) {

        // adicionando alguns produtos inicialmente
        if(ProductService.GetAll().length === 0) {
            
            ProductService.Save({ name: 'Martelo', category:{
                 name:'Materias de construção', 
                 accountable:'Bruna Batalha ',
                 state:false,
                 id:3
            
             },state:false});
            ProductService.Save({ name: 'Frango', category: {
                 name:'Frescos', 
                 accountable:'Januario Ilario ',
                 state:false,
                 id:1
            
             },state:false});


            ProductService.Save({ name: 'Alface ', category:{
                 name:'Verduras', 
                 accountable:'Martins Galiano ',
                 state:false,
                 id:2
            
             },state:false});
        }

        if(UserService.GetAll().length === 0) {           
            UserService.Save({
             fullname: 'Eurico Sapalo', 
             username: 'admin',
             password: '1',
             acesslevel: 'SUPERADMIN',
             state:false
         
         }); 
       }


        if(ProvinceService.GetAll().length === 0) {         
             ProvinceService.Save({
                 name: 'Luanda', acronimo: 'LA',state:false});
        }
     

        if(TownshipService.GetAll().length === 0) { 


             TownshipService.Save({
                 name: 'Cazenga', 
                 idProvince:1,
                 state:false

             });

              TownshipService.Save({
                 name: 'Rangel', 
                 idProvince:1,
                 state:false

             });

              TownshipService.Save({
                 name: 'Belas', 
                 idProvince:1,
                 state:false

             });
        }


        if(MarketService.GetAll().length === 0) { 
                
             MarketService.Save({
                 name:'Congolences', 
                 accountable:'Mauro Manuel',
                 province:{name:'Luanda',acronimo: 'LA',id:1},
                 township:{name:'Rangel',idProvince:2,id:2},
                 state:false
             });

             MarketService.Save({
                 name:'Kikolo', 
                 accountable:'José Amaral ',
                 province:{name:'Luanda',acronimo: 'LA',id:1},
                 township:{name:'Cazenga',idProvince:1,id:1},
                 state:false
             });
            
        }


         

       if(SellerService.GetAll().length === 0) {         
             SellerService.Save({
                 numberSeller:'LDCZAB12001', 
                 market:{
                 name:'Congolences', 
                 accountable:'Mauro Manuel',
                 province:{name:'Luanda',acronimo: 'LA'},
                 township:{name:'Rangel',idProvince:2},
                 state:false,
                 id:1
             },
             area:{
                 name:'Fescos', 
                 accountable:'Januario Ilario ',
                 state:false,
                 id:1
            
             }
             ,
                 beginActDate:'2012-02-09',
                 birthday:'1993-04-30',
                 place:{
                     name:'Armazem',
                     tent:false,
                     tentnumber:0
                     ,
                     state:false,
                     id:4
                }

                 ,


                 paymentType:'Diario',
                 valuePayment:100,
                 name:'Virginia Silva',
                 bi:'00461940LA045',
                 mother:'Teresa Silva Botelho',
                 father:'Gelson Botelho',
                 province:{name:'Luanda',acronimo: 'LA',id:1},
                 township:{name:'Cazenga',idProvince:1,id:1},
                 gender:'F',
                 streetAddress:'C6',
                 residenceAddress:'Nelito Soares',
                 residenceAddressNumber:50,
                 residenceAddressZone:11,
                 residenceTownship:{name:'Cazenga',idProvince:1,id:1},
                 residenceProvince:{name:'Luanda',acronimo: 'LA',id:1},
                 indentificationArchive:{name:'Luanda',acronimo: 'LA',id:1},
                 emissionDateBi:'2014-07-31',
                 civilState:'casada(o)',
                 contactNumber1:927895634,
                 contactNumber2:917895634,
                 products:
                 [

                 { 'name': 'Frango', 'category': {
                 name:'Frescos', 
                 accountable:'Januario Ilario ',
                 state:false,
                 id:1         
                 },state:false,'id':2}


                 ],class:9,
                 student:'Sim',
                 read:'Sim'

             });
        }

        if(AreaService.GetAll().length === 0) { 


                 AreaService.Save({
                 name:'Fescos', 
                 accountable:'Januario Ilario ',
                 state:false
            
             });

                  AreaService.Save({
                 name:'Verduras', 
                 accountable:'Martins Galiano ',
                 state:false
            
             });

                 AreaService.Save({
                 name:'Materias de construção', 
                 accountable:'Bruna Batalha ',
                 state:false
            
             });
        }




        if(PlaceService.GetAll().length === 0) { 


                PlaceService.Save({
                 name:'Barraca',
                 tent:true,
                 tentnumber:1
                 ,
                 state:false
                });

                PlaceService.Save({
                     name:'loja',
                     tent:false,
                     tentnumber:0
                     ,
                     state:false
                });

                PlaceService.Save({
                     name:'Chão',
                     tent:false,
                     tentnumber:0
                     ,
                     state:false
                });


                PlaceService.Save({
                     name:'Armazem',
                     tent:false,
                     tentnumber:0
                     ,
                     state:false
                });

                PlaceService.Save({
                     name:'Contentor',
                     tent:false,
                     tentnumber:0
                     ,
                     state:false
                });

                PlaceService.Save({
                     name:'Quiosque',
                     tent:false,
                     tentnumber:0
                     ,
                     state:false
                });

                PlaceService.Save({
                     name:'Camera frigorifica',
                     tent:false,
                     tentnumber:0
                     ,
                     state:false
                });

             
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