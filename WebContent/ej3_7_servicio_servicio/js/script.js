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
 * Hemos visto por ahora 2 tipos de servicio , las constant y los value. En
 * ambos casos le pasábamos directamente el valor que debía tener el servicio.
 * Con el tipo SERVICE le debemos pasar una clase JavaScript y será AngularJS el
 * que cree internamente una instancia de la clase.
 */

// Pero aun así, yo veo una ventaja de un SERVICE sobre un VALUE cuando es un
// objeto de una clase. SI UN SERVICIO NUNCA SE VA A USAR , ANGULARJS NO LO
// INICIALIZARÁ POR LO TANTO USANDO UN SERVICE, NOS PODRÍAMOS AHORRAR EL GASTO
// DE CREAR LA INSTANCIA SI NO LLEGARA A USARSE o al menos retrasarlo hasta que
// se use, mientras que con un value siempre se crearía.
var app = angular.module("app", []);

// servicio value con el que vamos a establecer los valores para el constructor
app.value("tamanyoInicialRectangulo", {
	ancho : 2,
	alto : 3
});

// funcion que define el cuerpo de la clase javascript.
function Rectangulo(tamanyoInicial) {
	this.ancho = tamanyoInicial.ancho;
	this.alto = tamanyoInicial.alto;

	this.setAncho = function(ancho) {
		this.ancho = ancho;
	}

	this.setAlto = function(alto) {
		this.alto = alto;
	}

	this.getArea = function() {
		return this.ancho * this.alto;
	}
}

// Y ahora nos queda inyectar el value “tamanyoInicialRectangulo” en el
// constructor de “Rectangulo” y AngularJS por suerte ya tiene esa funcionalidad
// programada

// Vemos que junto al nombre del constructor que es Cuadrado hemos incluido el
// típico array de AngularJS con el nombre de los servicios a inyectar, que en
// nuestro caso es el value llamado tamanyoInicialRectangulo
// En resumen, creo el servicio rectangulo, y le paso el parametro para el
// constructor y la clase javascrit.
app.service("rectangulo", [ 'tamanyoInicialRectangulo', Rectangulo ]);

app.controller("PruebaController", [ "$scope", "rectangulo",
		function($scope, rectangulo) {
			$scope.area = rectangulo.getArea();
		} ]);