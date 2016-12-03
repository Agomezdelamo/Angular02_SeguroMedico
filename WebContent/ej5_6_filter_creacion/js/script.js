var app=angular.module("app",[]);
  
function mayusculasFilter(valor,length) {
  
  if (typeof (valor)==="string") {
    
    if (angular.isNumber(length) && length>=0) {
      return valor.substr(0,length).toUpperCase()+valor.substr(length);
    } else {
      return valor.toUpperCase();
    }
    
    
  } else if (angular.isArray(valor)) {
    var newValue=[];
    
    for(var i=0;i<valor.length;i++) {
      if (typeof (valor[i])==="string") {
        if (angular.isNumber(length) && length>=0) {
        	//Línea 6: En ese caso se aplica la función toUpperCase a los primeros length caracteres.
        	// con substr, decimos desde la posición que queremos y cuantos carácteres hay que pillar.
          newValue.push(valor[i].substr(0,length).toUpperCase()+valor[i].substr(length));
          
          //creo que substr solo con un valor,recorta el string desde ese valor al final
          console.log("QUE ES LENGHT",length, valor[i].substr(length));
        } else {
          newValue.push(valor[i].toUpperCase());
        }
      } else {
        newValue.push(valor[i]);
      }
    }
    
    return newValue;
  } else {
    return valor;
  }
}

// crear un filtro es tan sencillo como devolver con una funcion de angular 
// la funcion filtro, y los parametros que recibe.
app.filter("mayusculas",['$log',function ($log) {
  $log.log("Creando el filtro");
  return mayusculasFilter;
}]);


app.controller("PruebaController",['$scope',function($scope) {
    $scope.valorEscalar="hola mundo";
    $scope.valorArray=['lunes','martes',3.1416,'miercoles','jueves'];
}]);

