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
 * 
 * Una constant es un servicio al que le pasamos directamente el valor de dicho
 * servicio. Su principal característica es que se puede inyectar en cualquier
 * sitio. Se define llamando al método constant de un módulo.A dicho método le
 * pasaremos el nombre de la constante y su valor.
 *
 * ¿Cuál es entonces la diferencia entre constant y value? Que como ya hemos
 * comentado en 3.4 Tipos de servicios los servicio de tipo constant se pueden
 * inyectar en bloque config y en los provider mientras que los value no pueden.

 *
 */
var app = angular.module("app", []);

// definimos el servicio constant con nombre idioma y valor "es-es"
app.constant("idioma", "es-es");

app.constant("matematicas_simples", {
	sumar : function(a, b) {
		return a + b;
	},
	restar : function(a, b) {
		return a - b;
	}
});

app.constant("radio", 10);

app.constant("area", function(radio) {
	return 3.1416 * radio * radio;
})

//inyectamos el servicio constant "idioma"
app.controller("PruebaController", [ "$scope", "idioma", "matematicas_simples",
		"radio", "area",
		function($scope, idioma, matematicas_simples, radio, area) {
			// lo asociamos a un valor del scope del controlador
			$scope.idioma = idioma;
			$scope.suma = matematicas_simples.sumar(3, 6);
			$scope.area = area(radio);
		} ]);