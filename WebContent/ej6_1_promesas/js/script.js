var app = angular.module("app", []);

app.controller("PruebaController", ["$scope", "$http",function($scope, $http) {

    $scope.importeTotal = 0;
    $scope.mensajeFinal = "";
    
    $http({method: 'GET',url: 'fichero1.json'}).success(function(data, status, headers, config) {
      $scope.importeTotal = $scope.importeTotal + data.importe;
      $http({method: 'GET',url: 'fichero2.json'}).success(function(data, status, headers, config) {
        $scope.importeTotal = $scope.importeTotal + data.importe;
        $http({method: 'GET',url: 'fichero3.json'}).success(function(data, status, headers, config) {
          $scope.importeTotal = $scope.importeTotal + data.importe;
          $http({method: 'GET',url: 'fichero4.json'}).success(function(data, status, headers, config) {
            $scope.importeTotal = $scope.importeTotal + data.importe;
            $scope.mensajeFinal = "Ya hemos finalizado la lista de cálculos";
          });
        });
      });
    });

    $scope.importeTotalPromesas = 0;
    $scope.mensajeFinalPromesas="";
    
    //el servicio http puede utilizar el success error, o una promesa que es "then".
    //con una promesa, puedes hacer una petición, y tiene una funcion de callback
    //en ella podemos operar con los datos, y retornar otra petición http
    //de esta forma podemos encadenar peticiones en función del resultado de la primera.
    $http({ method: 'GET',url: 'fichero1.json'}).then(function(resultado) {
      $scope.importeTotalPromesas = $scope.importeTotalPromesas + resultado.data.importe;
      return $http({method: 'GET',url: 'fichero2.json'})
    }).then(function(resultado) {
      $scope.importeTotalPromesas = $scope.importeTotalPromesas + resultado.data.importe;
      return $http({method: 'GET',url: 'fichero3.json'})
    }).then(function(resultado) {
      $scope.importeTotalPromesas = $scope.importeTotalPromesas + resultado.data.importe;
      return $http({method: 'GET',url: 'fichero4.json'})
    }).then(function(resultado) {
      $scope.importeTotalPromesas = $scope.importeTotalPromesas + resultado.data.importe;
      $scope.mensajeFinalPromesas = "Ya hemos finalizado la lista de cálculos con promesas";
    })
    
}]);