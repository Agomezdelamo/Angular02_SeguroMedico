//un módulo, por ahora solo piensa que es como un paquete en Java
var app = angular.module("app", []);
// forma nueva de crear un controller
app.controller("PruebaController", function($scope) {
	/**
	 * El $scope es LA VARIABLE de Angular donde debemos guardar toda la
	 * información de JavaScript de nuestra página. Ya no vamos a crear nuevas
	 * variable de la forma: var i=5; sino que ahora deberemos hacer siempre:
	 * $scope.i=5;
	 */
	$scope.mensaje = "Hola mundo";
	// ¿Por qué hacer ésto? Porque angular sólo muestra la información en el
	// HTML mediante {{ }} de aquellas propiedades
	// del $scope y no de cualquier variable de JavaScript.
	// angular está monitorizando el $scope para ver si cambia algo y de esa
	// forma actualizar el HTML
	$scope.cambioMensaje = function() { 
		$scope.mensaje = "Adios mundo";
	};
	
	
});

/**
 * El Data-binding es el concepto mas importante de angular y lo que hace es
 * relacionar el HTML con nuestro modelo de datos. Es lo que acabamos de ver de
 * poner las {{ }} en el HTML y que se transforme con los datos del JavaScript
 * ¿Qué hace Angular? Une la información del modelo y de la plantilla para
 * generar el HTML que ve finalmente el usuario
 */

// forma antigua de formar un controlador
/*
 * function PruebaController($scope) { $scope.mensaje="Hola Mundo"; }
 */