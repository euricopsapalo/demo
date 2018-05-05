(function () {
    'use strict';

    angular
        .module('app')
        .factory('MarketService', Service);

    function Service($filter) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Save = Save;
        service.Delete = Delete;
        service.setMarkets = setMarkets;
                        

        return service;

        
        function GetAll() {
            return getMarkets();
        }

        

        function GetById(id) {
            var filtered = $filter('filter')(getMarkets(), { id: id });
            var market = filtered.length ? filtered[0] : null;
            
            return market;
        }

        function Save(market) {
            var markets = getMarkets();

            if (market.id) {

                for (var i = 0; i < markets.length; i++) {
                    if (markets[i].id === market.id) {
                        markets[i] = market;
                        break;
                    }
                }
                setMarkets(markets);
            } else {
             
                var lastMarket = markets[markets.length - 1] || { id: 0 };
              
                market.id = lastMarket.id + 1;
  
                markets.push(market);
                setMarkets(markets);
            }

            return;
        }

         
        function Delete(id) {
            var markets = getMarkets();
            for (var i = 0; i < markets.length; i++) {
                var market = markets[i];
                if (market.id === id) {
                    markets.splice(i, 1);
                    break;
                }
            }
            setMarkets(markets);
            
            return;
        }

       
        function getMarkets() {
            if (!localStorage.markets) {
                localStorage.markets = JSON.stringify([]);
            }

            return JSON.parse(localStorage.markets);
        }

       
        function setMarkets(markets) {
            localStorage.markets = JSON.stringify(markets);
        }
    }
})();