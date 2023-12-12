/**TODO: 
 * Implement favMeal validation (Re-use .getCategories() for this.) [Done]
 * Extend menuService to allow for user information sharing between menu-info
 *  and menu-signUp [Done]
 */

(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  /**Private function for splitting input favMenu string for HTTP request.
  */
  let splitFavMenu = function (favMeal) {
    let splitArray = favMeal.split("");
    let result = {shortCategory: "", itemNumber: ""};
    
    /**Adds letters to the input category shortname, adds digits to the input 
     * category item number.*/
    splitArray.forEach(element => {
      if (isNaN(element)){
        result.shortCategory += element;
      } else {
        result.itemNumber += element;
      }
    });

    return result;
  }

  /**Move updateInfo menuItem verification here. This will return bool instead
   * for that service and anything *only* wanting verification services to react
   * accordingly.
  */
  service.verifyMenuItem = (currentInput)=>{
    console.log("Verifying current input!");
  }

  /**First split favMeal input into an HTTP request, then make request.
   * If request data returns a NULL, then return false (Item does not exist),
   * otherwise return true (Item exists). This will affect the controller's response.
  */
  service.userInfo = {};
  service.updateInfo = (newInfo) => {
    let inputRequest = splitFavMenu(newInfo.favMeal);

    console.log("Checking if menu item exists!");

    return $http({
      method:'GET',
      url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" +
        inputRequest.shortCategory +
        "/menu_items/" +
        inputRequest.itemNumber +
        ".json"
    })
    .then(response=>{
      console.log(response);

      if(response.data == null){
        console.log("Whoops, menu item doesn't exist!");
        return false;
      }
      else{
        console.log("Item confirmed! ");
        service.userInfo = newInfo;
        service.userInfo.favMealItem = response.data;
        service.userInfo.splitFav=inputRequest;
        return true;
      }
    });
  };
}



})();
