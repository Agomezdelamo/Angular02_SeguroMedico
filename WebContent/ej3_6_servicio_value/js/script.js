/*
 * QUE ES UN SERVICIO
 * 
 * TIPOS: Constantes Valores Servicios Factorias Proveedores
 * 
 * ES UN OBJETO JAVASCRIPT QUE NOS PERMITE OBTENER INFORMACION. 
 * 
 * Aparentemente nada nuevo que entender, sera por ejemplo un DAO en Java o un servicios de
 * Java. Lo importante de �sto es que un servicio... 
 * 
 * 1) NUNCA INTERACCIONA CON LA PROPIA PAGINA, solo con otros servicios o con un servidor de datos que pueda
 * estar en otro Host(huesped). 
 */


/**
 * Un VALUE es un servicio al que le pasamos directamente el valor de dicho
 * servicio. Se define llamando al método value de un módulo.A dicho método le
 * pasaremos el nombre y su valor.
 * 
 * ¿Cuál es entonces la diferencia entre constant y value? Que como ya hemos
 * comentado en 3.4 Tipos de servicios los servicio de tipo constant se pueden
 * inyectar en bloque config y en los provider mientras que los value no pueden.
 */

var app = angular.module("app", []);

app.value("idioma", "es-es");

app.value("matematicas_simples", {
	sumar : function(a, b) {
		return a + b;
	},
	restar : function(a, b) {
		return a - b;
	}
});

app.value("radio", 10);

app.value("area", function(radio) {
	return 3.1416 * radio * radio;
})

app.controller("PruebaController", [ "$scope", "idioma", "matematicas_simples",
		"radio", "area",
		function($scope, idioma, matematicas_simples, radio, area) {
			$scope.idioma = idioma;
			$scope.suma = matematicas_simples.sumar(3, 6);
			$scope.area = area(radio);
		} ]);