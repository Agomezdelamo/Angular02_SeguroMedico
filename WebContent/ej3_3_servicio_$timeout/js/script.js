/*
 * QUE ES UN SERVICIO
 * 
 * TIPOS: Constantes Valores Servicios Factorias Proveedores
 * 
 * Es un objeto JavaScript que nos permite obtener informaci�n. Aparentemente
 * nada nuevo que entender, ser�a por ejemplo un DAO en Java o un servicios de
 * Java. Lo importante de �sto es que un servicio nunca 
 * 
 * 1) interacciona con la propia pagina, solo con otros servicios o con un servidor de datos que pueda
 * estar en otro Host(huesped). 
 * 
 * Un artefacto es por ejemplo una directiva o un controlador , 
 * teniendo que definir estos artefactos en modulos de AngularJS.
 */
/**
 * El servicio de $timeout es como el método setTimeout() de JavaScript. La
 * principal diferencia , a parte de que es un servicio, es que al igual que 3.2
 * $http se actualiza la vista al actualizar el modelo desde $timeout.
 */

var app = angular.module("app", []);

app.controller("PruebaController", [ '$scope', '$timeout',
		function($scope, $timeout) {
			$scope.producidoEvento = "NO";

			$timeout(function() {
				$scope.producidoEvento = "SIIIIII";
			}, 3000);

		} ]);