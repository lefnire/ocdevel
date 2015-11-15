angular.module('app', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  ['home', 'portfolio', 'contact'].forEach(function(state){
    $stateProvider.state(state, {url:'/'+state, templateUrl: state+'.html'});
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