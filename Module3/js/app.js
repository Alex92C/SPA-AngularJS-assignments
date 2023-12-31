(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
        .directive('foundItems', FoundItems);

    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onEmpty: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.shortName = '';

        menu.matchedMenuItems = function(searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.then(function(items) {
                if (items && items.length > 0) {
                    menu.message = '';
                    menu.found = items;
                } else {
                    menu.message = 'Nothing found!';
                    menu.found = [];
                }
            }).catch(function(error) {
                console.error('Error occurred:', error);
            });
        };

        menu.removeMenuItem = function(itemIndex) {
            menu.found.splice(itemIndex, 1);
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(response) {
                var foundItems = [];

                // Iterate over the keys of response.data
                for (var key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        var category = response.data[key];

                        // Iterate over the menu_items array of the current category
                        for (var i = 0; i < category['menu_items'].length; i++) {
                            if (searchTerm.length > 0 && category['menu_items'][i]['description'].toLowerCase().indexOf(searchTerm) !== -1) {
                                foundItems.push(category['menu_items'][i]);
                            }
                        }
                    }
                }

                return foundItems;
            }).catch(function(error) {
                console.error('Error occurred:', error);
                throw error;  // Re-throw the error to ensure it isn't silently swallowed.
            });
        };
    }
})();
