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
    .state('portfolio', {
      url: "/portfolio",
      templateUrl: "portfolio.html"
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "contact.html"
    });
})


.controller('MyCtrl', MyCtrl);
function MyCtrl($scope){
  this.portfolio = [
    {name:"HabitRPG", url:'https://habitica.com', img: '/portfolio/habitrpg.png'},
    {name:"Dynamk", url:'https://habitica.com', img: '/portfolio/habitrpg.png'},
    {name:"HabitRPG", url:'https://habitica.com', img: '/portfolio/habitrpg.png'},
  ];
}