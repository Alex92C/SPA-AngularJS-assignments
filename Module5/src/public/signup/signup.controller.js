/**TODO: Implement custom form verification to check if favMeal item exists
 * upon input being un-focused.
 */
(()=>{
'use strict';
    
angular.module('public')
.controller('signUp', signController);

signController.$inject=['MenuService'];
function signController(service){
    let control=this;
    control.userInfo={};

    /**Controls span elements for favMeal verification.
     * Clicked true and mealExists false? Failure span visible.
     * Both true? Success span visible.
    */
    control.verification={submitClicked: false, mealExists: false};
    
    //If reset button hit, send userInfo clear to service(For now we're just resetting in this page)
    control.reset = () =>{ control.userInfo={}; };

    //If submit button hit (And all fields valid), store fields in service.
    //Broadcast for userInfo to update.
    control.submit = ()=> { 
        service.updateInfo(control.userInfo)
        .then(response=>{
            control.verification.submitClicked = true;
            control.verification.mealExists = response;

            console.log("Verification Result: " + response);
            console.log(service.userInfo);
        });
    };

    //When favFood shortname field loses focus, make service call to validate 
    //food exists in the menu.
}

})();
