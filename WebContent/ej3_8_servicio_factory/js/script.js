/**
 * EL SERVICIO DE FACTORY. La principal diferencia es que al método factory le
 * pasamos ahora una función para que ésta retorne ahora el valor del servicio.
 * Es decir que tenemos una función JavaScript que actúa como factoría,
 * retornando la propia función de factoría el valor del servicio.
 * 
 * Para que se entienda, vamos a ver los ejemplos que teníamos con el value
 * ahora como un factory.
 */

var app = angular.module("app", []);
var app = angular.module("app", []);

// como valor una funcion anonima devuelve un string
app.factory("idioma", function() {
	return "es-es";
});

// como valor una funcion anonima devuelve un objeto
app.factory("matematicas_simples", function() {
	return {
		sumar : function(a, b) {
			return a + b;
		},
		restar : function(a, b) {
			return a - b;
		}
	}
});

// como valor una funcion anonima devuelve un int
app.factory("radio", function() {
	return 10;
});

// como valor una funcion anonima devuelve una función
app.factory("area", function() {
	return function(radio) {
		return 3.1416 * radio * radio;
	}
});

// para el controlador este servicio factory es igual que el resto, su
// implementación es transparente.
app.controller("PruebaController", [ "$scope", "idioma", "matematicas_simples",
		"radio", "area",
		function($scope, idioma, matematicas_simples, radio, area) {
			$scope.idioma = idioma;
			$scope.suma = matematicas_simples.sumar(3, 6);
			$scope.area = area(radio);
		} ]);

// *****//
// *****//
// EJEMPLO INYECTANDO DEPENDENCIAS
// *****//
// *****//
// CREAMOS UN VALUE
app.value("tamanyoInicialRectangulo", {
	ancho : 2,
	alto : 3
});

// DEFINIMOS UN OBJETO
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
// DEFINIMOS UN SERVICIO FACTORY, E INYECTAMOS LA DEPENDENCIA, CREANDO UN ARRAY,
// Y DENTRO DE ESE ARRAY PRIMERO DECLARANDO LA DEPENDENCIA
// Y LUEGO PASANDOLA COMO ARGUMENTO.
app.factory("rectangulo", [ 'tamanyoInicialRectangulo',
		function(tamanyoInicialRectangulo) {
			var rectangulo = new Rectangulo(tamanyoInicialRectangulo);

			return rectangulo;
		} ]);
//se lo pasamos al controlador ya el servicio rectangulo
app.controller("PruebaController2", [ "$scope", "rectangulo",
		function($scope, rectangulo) {
			$scope.area = rectangulo.getArea();
		} ]);



//*********************************************************************************************//
//*********************************************************************************************//
//*********************************************************************************************//
//*********************************************************************************************//
//********************** NECESIDAD DEL FACTORY CON EJEMPLO *********************************//
//*********************************************************************************************//
//*********************************************************************************************//
//*********************************************************************************************//

/**
 * Vamos a suponer que necesitamos enviar el hash de una contraseña a un
 * servidor. Vamos a tener un servicio de AngularJS llamado hash que es una
 * función. Esta función aceptará como parámetro un String y nos retornará el
 * hash en formato Base64. Pero queremos que este servicio sea reutilizable por
 * lo que va a soportar varios tipos de funciones de Hash: MD5, SHA1, SHA2-256 y
 * SHA-2-512.
 */


//Para implementar las distintas funciones de Hash vamos a usar la librería CryptoJS. 


