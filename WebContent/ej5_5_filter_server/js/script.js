var app=angular.module("app",[]);
  
app.controller("PruebaController",['$scope','$filter',function($scope,$filter) {

// hacemos el filter en el servidor
// inyectamos filter y recuperamos el filtro preestablecido currency
  var filtroCurrency=$filter("currency");

  // a "nuestro" filter currency le pasamos la cantidad a formatear
  $scope.importeFormateado=filtroCurrency(2.5231);
  
  // inyectamos filter y recuperamos el filter preestablecido date.
  var filtroDate=$filter("date");
  
//  le pasamos los argumentos a "nuestro filtro"
  $scope.fechaFormateada=filtroDate(new Date(),"fullDate");
//  $scope.fechaFormateada=filtroDate(new Date(),"ddmmyyyy");

}]);