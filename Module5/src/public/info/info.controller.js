(()=>{
    'use strict';
        
    angular.module('public')
    .controller('info', infoController);
    
    //Just catches rootScope "update" broadcasts and updates if it hears any.
    infoController.$inject=['MenuService'];
    function infoController(service){
        let control = this;

        control.userInfo = service.userInfo;
        control.splitFav = control.userInfo.splitFav;
        control.mealItem = control.userInfo.favMealItem;
        
        console.log("Info Controller Active!");
        console.log(control.userInfo);

        if (angular.equals(control.userInfo, {})){
            control.registered=false;
        } else {
            control.registered=true;
        }

        console.log("Current registered state "+control.registered);
    }

})();
