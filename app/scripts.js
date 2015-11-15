angular.module('app', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "home.html"
    })
    .state('about', {
      url: "/about",
      templateUrl: "about.html"
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "contact.html"
    });
})


.controller('MyCtrl', MyCtrl);
function MyCtrl($scope){
  this.hello = 'hello';
}