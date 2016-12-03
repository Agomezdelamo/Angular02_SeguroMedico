var app = angular.module("app", []);

app.controller("PruebaController", [ "$scope", function($scope) {
	$scope.filtroNombreProvincia = "";

	$scope.provincias = [ {
		idProvincia : 1,
		nombre : "Palencia",
		comunidadAutonoma : "Castilla-Leon",
		idiomasCooficiales : false
	}, {
		idProvincia : 2,
		nombre : "Castellón",
		comunidadAutonoma : "Valencia",
		idiomasCooficiales : true
	}, {
		idProvincia : 3,
		nombre : "Alicante",
		comunidadAutonoma : "Valencia",
		idiomasCooficiales : true
	} ];

	/**
	 * En este caso no ponemos un valor booleano como true o false sino el
	 * nombre de una función creada por nosotros en el $scope y a la que se le
	 * pasarán 2 argumentos. El primer argumento es el valor de la propiedad y
	 * el segundo argumento es el texto a buscar. Si la función retorna true es
	 * que son iguales y si retorna false es que son distintos.
	 */
	$scope.comparator = function(actual, expected) {
		if (actual.indexOf(expected) === 0) {
			return true;
		} else {
			return false;
		}
	};

	/**
	 * En ese caso al filtro filter se le pasa un único parámetro con el nombre
	 * de una función creada por nosotros en el $scope . Dicha función acepta un
	 * único parámetro con un elemento de array y deberemos retornar true en
	 * caso de que queramos que ese elemento se muestre y false si no queremos
	 * que se muestre.
	 */
	$scope.consultaPersonalizada = function(value) {
		if ((value.idiomasCooficiales === true) || (value.idProvincia > 2)) {
			return true;
		} else {
			return false;
		}
	}
} ]);