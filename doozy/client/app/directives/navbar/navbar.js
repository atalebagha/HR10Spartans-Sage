angular.module('directives.navbar', [])

.directive('navbar', function() {
  return {
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav'
  };
})
//.controller('navbarController', function )
