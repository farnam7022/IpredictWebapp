/**
 * Created by DanHenton on 23/09/15.
 */
angular.module('app.services.portfolio', [])
    .factory('PortfolioService', function($http, $rootScope, ContractService){

        //Vars go here

        var myInfo = [
            {title:"Rank", attr:1, changeInAttr:2},
            {title:"Worth", attr:20.05, changeInAttr:0.07},
            {title:"Wallet", attr:12.74, changeInAttr:-4.0},
            {title:"Portfolio", attr:7.39, changeInAttr:0.07}
        ];


        var stocks = {
            //    ID : AMOUNT OF STOCK
            "0004" : 8,
            "0001" : 2,
            "0003" : 3,
            "0006" : 1,
            "0010" : 2,
            "0012" : 4
        };

        var shorts = {
            //    ID : AMOUNT OF STOCK
            "0005" : 2,
            "0002" : 1,
            "0004" : 3,
            "0009" : 3,
            "0011" : 1
        };

        var myStocks = function() {

            var contracts = [];
            for (var stockID in stocks){
                var stock_contract = ContractService.getContract(stockID);
                contracts.push({title: stock_contract.name, amount: stocks[stockID], value:stock_contract.buy, profit: stock_contract.buy-stock_contract.sell,
                    averageCost: 0.0, lastPrice: stock_contract.last, difference: stock_contract.buy - stock_contract.last});
            }
            return contracts;
        };

        var myShorts = function(){

            var contracts = [];
            for (var shortID in shorts){
                var stock_contract = ContractService.getContract(shortID);
                contracts.push({title: stock_contract.name, amount: shorts[shortID], value:stock_contract.buy, profit: stock_contract.buy-stock_contract.sell,
                    averageCost: 0.0, lastPrice: stock_contract.last, difference: stock_contract.buy - stock_contract.last});
            }
            return contracts;
        };

        var addStock = function(type, contractID, amount){
            if(type == "stock"){
                if(contractID in stocks){
                    stocks[contractID] += amount;
                }else{
                    stocks.push({contractID : amount});
                }
            }else{ // "short"
                if(contractID in shorts){
                    shorts[contractID] += amount;
                }else{
                    shorts.push({contractID: amount})
                }
            }
        };

        var removeStock = function(type, contractID, amount){
            if(type == "stock"){
                if(contractID in stocks && (stocks[contractID] - amount) > 0){
                    stocks[contractID] -= amount;
                }else{
                    delete stocks[contractID];
                }
            }else{
                if(contractID in shorts && (shorts[contractID] - amount) > 0) {
                    shorts[contractID] -= amount;
                }else{
                    delete shorts[contractID];
                }
            }
        };

        var serviceFunctions = {
            //functions go in here

            getMyInfo: function() {
                return myInfo;
            },

            getMyStocks: function() {
                return myStocks();
            },

            getMyShorts: function() {
                return myShorts();
            }
        };
        return serviceFunctions;
    });