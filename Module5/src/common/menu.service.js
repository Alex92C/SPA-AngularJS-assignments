(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.user = {};

  service.saveUser = function(user) {
    service.user = angular.copy(user);
    console.log(service.user);
  }

  service.getUser = function() {
    return service.user;
  }
  
  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getFavoriteDish = function(categoryShortName, menuNumber) {
    return $http.get(ApiPath + '/menu_items/' + categoryShortName + '/menu_items/' + menuNumber + '.json');
}

}



})();
