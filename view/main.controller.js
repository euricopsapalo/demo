(function () {
    'use strict';

   var app= angular.module('app');
   app.controller('view.MainController', Controller);

    function Controller($scope, ProductService,MarketService,$cookieStore) {

    	$scope.selectedRow = 0;
	    $scope.showTable = true;
        var vm = this;

        
        if($cookieStore.get('globals')){
        	var value=$cookieStore.get('globals');
             vm.dataLogin=value.currentUser;

        }else{
            vm.dataLogin=-1;
        }

        //vm.dataLogin.acesslevel=1;

        vm.markets = [];



        initController();

        function initController() {
            loadMarkets();

            
            //recarregar os produtos quando actualizados
           $scope.$on('markets-updated', loadMarkets);
        }
        
        function loadMarkets() {
            vm.markets = MarketService.GetAll();
            //console.log(vm.products);

        }


        $scope.setClickedRow = function(index){
		    $scope.selectedRow = index;
	   }
	
	    $scope.$watch('selectedRow', function() {

	      });


    }

    app.directive('arrowSelector',['$document',function($document){
	return{
		restrict:'A',
		link:function(scope,elem,attrs,ctrl){
			var elemFocus = false;             
			elem.on('mouseenter',function(){
				elemFocus = true;
			});
			elem.on('mouseleave',function(){
				elemFocus = false;
			});
			$document.bind('keydown',function(e){
				if(elemFocus){
					if(e.keyCode == 38){
						
						if(scope.selectedRow == 0){
							return;
						}
						scope.$apply(function(){
							scope.selectedRow--;
						});
						e.preventDefault();
					}
					if(e.keyCode == 40){
						if(scope.selectedRow == scope.foodItems.length - 1){
							return;
						}
						scope.selectedRow++;
						scope.$apply();
						e.preventDefault();
					}
				}
			});
		}
	};
}]);

})();