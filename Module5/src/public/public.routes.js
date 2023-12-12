(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    
    //TODO: Create sign up view and information view. [Done]
    //Also figure out why it requires **two** clicks to go to the signup menu???
    /** [FIXED] - For some reason, because the below URL resembled the /menu/{category}
     * format it really screwed with the app by making it think the signUp and
     * user info menus are... Well... *food* menus. Easily fixxed by just not formatting
     * the url like that.
    */
    .state('public.menuSignUp',{
      url: '/sign-up',
      templateUrl:'src/public/menu-signUp/signUp.html',
      controller: 'signUp as control',
    })

    /**TODO: Display user information if it exists, otherwise provide link to sign-up
     * view. [done]
     *     Display user favorite menu item, including name, description, *and* image.
     * Image can be fetched locally from image/ folder.
     * 
     * Note to self, again, always define controller nickname for html useage.
     * For some reason the view wouldn't properly update when the controller's
     * values are updated.
     */
    .state('public.menuInfo',{
      url: '/user-information',
      templateUrl: 'src/public/menu-info/info.html',
      controller: 'info as control',
      //resolve: ['MenuService','$http', (service, $http)=>{}]
    });
}
})();
