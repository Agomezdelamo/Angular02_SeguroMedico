//¿�qué es un módulo? Podr�amos verlo como un paquete de Java.
// Un artefacto es por ejemplo una directiva o un controlador , teniendo que definir estos artefactos en  módulos de AngularJS.
//Un módulo es donde se a�aden los distintos artefactos que usaremos en nuestra aplicaci�n.
// artefactos: directivas, controladores, providers, servicios...


/*
 * QUE ES UN SERVICIO
 * 
 * TIPOS: Constantes Valores Servicios Factorias Proveedores
 * 
 * Es un objeto JavaScript que nos permite obtener informaci�n. Aparentemente
 * nada nuevo que entender, ser�a por ejemplo un DAO en Java o un servicios de
 * Java. Lo importante de �sto es que un servicio nunca 1) interacciona con la
 * propia p�gina, s�lo con otros servicios o con un servidor de datos que pueda
 * estar en otro Host. Un artefacto es por ejemplo una directiva o un
 * controlador , teniendo que definir estos artefactos en m�dulos de AngularJS.
 */

// Una caracter�stica importante de los servicios es que s�lo hay una �nica
// instancia de ellos aunque los usemos m�s de una vez,es decir que son un
// singleton.
var app = angular.module("app", []);

app.controller("SeguroController", [ '$scope', '$log', '$http',
		function($scope, $log, $http) {

			$log.debug("Inicio de crear el $scope");

			$scope.seguro = {
				nif : "",
				nombre : "",
				ape1 : "",
				edad : undefined,
				sexo : "",
				casado : false,
				numHijos : undefined,
				embarazada : false,
				coberturas : {
					oftalmologia : false,
					dental : false,
					fecundacionInVitro : false
				},
				enfermedades : {
					corazon : false,
					estomacal : false,
					rinyones : false,
					alergia : false,
					nombreAlergia : ""
				},
				fechaCreacion : new Date()
			}

			$log.debug("Acabamos de crear el $scope");

			/**
			 * $http acepta como parámetro un único objeto llamado config con
			 * todas las propiedades que necesita para la petición.
			 * 
			 * Veamos ahora alguna de las propiedades:
			 * 
			 * METHOD: El método HTTP para hacer la petición. Sus posibles
			 * valores son: GET, POST, PUT, DELETE, etc.
			 * 
			 * URL: La URL de donde queremos obtener los datos.
			 * 
			 * data: Si usamos el método POST o PUT aquí pondremos los datos a
			 * mandar en el body de la petición HTTP
			 * 
			 * params: Un objeto que se pondrá como parámetros de la URL.
			 */

			var config = {
				method : "GET",
				url : "js/datos.json"
			}

			var response = $http(config);

			/**
			 * Si todo ha funcionado correctamente podremos obtener el objeto
			 * JavaScript correspondiente al String JSON que nos han pasado.
			 * Para ello llamaremos a la función success(fn) que acepta como
			 * único parámetro una función nuestra que será llamada cuando se
			 * obtengan los datos.
			 * 
			 * La función que le pasaremos tendrá 4 argumentos que son los
			 * siguientes:
			 * 
			 * data: Un objeto JavaScript correspondiente a los datos JSON que
			 * ha recibido
			 * 
			 * status: Es el estado HTTP que ha retornado. Su valor siempre será
			 * entre 200 y 299 ya que si se llama a esta función significa que
			 * la petición ha tenido éxito.
			 * 
			 * headers:Es una función que acepta como único parámetro el nombre
			 * de una cabecera HTTP y nos responde su valor.
			 * 
			 * config: El mismo objeto config que usamos para configurar la
			 * petición.
			 */

			response.success(function(data, status, headers, config) {
				// Esta línea tiene mucha más importancia de la que parece,
				// sólo que AngularJS nos lo hace todo muy sencillo. Como ya
				// hemos dicho, el parámetro data contiene el objeto con los
				// datos del servidor. Al asignárselo a la propiedad
				// $scope.seguro modificamos nuestro modelo de datos por lo que
				// automáticamente se modificarán los tag <input> de la página
				// HTML ya que el formato del objeto es exactamente el mismo que
				// el que tenemos en $scope.seguro.
				// El que se actualice automáticamente el modelo es lo que hace
				// que tengamos que usar $http. Si hubiéramos usado directamente
				// el objeto XMLHttpRequest o el método ajax() de JQuery ,
				// AngularJS no se habría enterado de los cambios y no se habría
				// actualizado la página HTML.
				$scope.seguro = data;
				$log.debug("esto es el headers", headers);
			});

			response.error(function(data, status, headers, config) {
				alert("Ha fallado la petición. Estado HTTP:" + status);
			});

			// la versión corta de una llamada al servicio $http es:
			/**
			 * $http({ method: 'GET', url: 'datos.json'
			 * }).success(function(data, status, headers, config) {
			 * $scope.seguro=data; }).error(function(data, status, headers,
			 * config) { alert("Ha fallado la petición. Estado HTTP:"+status);
			 * });
			 */

		} ]);
