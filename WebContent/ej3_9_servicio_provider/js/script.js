// Un provider es como un factory pero permite que se configure antes de crear
// el valor del servicio.
// El provider viene en nuestra ayuda creando un objeto previo que permite
// configurar el factory antes de que cree el valor del servicio. Este nuevo
// objeto se llama Provider y en un bloque config podremos acceder a él para
// poder configurar nuestro servicio

/**
 * Un provider está compuesto de 2 partes:
 * 
 * 
 * El provider que es una clase JavaScript de la que se crea un único objeto ,
 * el cual permite llamar en un bloque config antes de que se llame al
 * factory-provider y asi poder configurar el factory-provider.
 * 
 * El factory-provider, el cual crea el valor del servicio. Es prácticamente
 * como la función factory del tema anterior y la llamamos factory-provider
 */


/****************** 0 *****************************/
/****************** 0 *****************************/
/****************** 0 *****************************/
var app=angular.module("app",[]);
//definimos la constante algoritmo
app.constant("algoritmo","SHA-1");


/****************** 1 *****************************/
/****************** 1 *****************************/
/****************** 1 *****************************/
// Definimos la clase HashProvider. Posteriormente AngularJS creará una
// instancia de esta clase
function HashProvider() {
	  // Se define la propiedad privada algoritmo la cual contendrá el
		// algoritmo a usar.
		var _algoritmo="";
	  // Método público que nos permite establecer el algoritmo a usar antes
		// de crear la función de hash.
	  this.setAlgoritmo=function(algoritmo) {
	    _algoritmo=algoritmo;
	  };
	  
	  /**
		 * Método público que es realmente el factory que creará el valor del
		 * servicio.
		 * 
		 * En toda clase Provider es obligatorio que exista este método público
		 * llamado $get.
		 * 
		 * Es una obligación que impone AngularJS para que él sepa cuál es el
		 * método factory. Podemos ver que este método es exactamente igual al
		 * del tema anterior de factory excepto que ahora usa la propiedad
		 * privada _algoritmo en vez de llamar al servicio algoritmo.
		 * 
		 * Éste es el método que en el tema 3.4 Tipos de servicios llamábamos
		 * “factory-provider”.
		 */ 
	  this.$get=function() {
	    var hashFunction;
	  
	    if (_algoritmo==="MD5") {
	      hashFunction=CryptoJS.MD5;
	    } else  if (_algoritmo==="SHA-1") {
	      hashFunction=CryptoJS.SHA1;
	    } else  if (_algoritmo==="SHA-2-256") {
	      hashFunction=CryptoJS.SHA256;
	    } else  if (_algoritmo==="SHA-2-512") {
	      hashFunction=CryptoJS.SHA512;
	    } else {
	      throw Error("El tipo de algoritmo no es válido:"+_algoritmo);
	    }
	  
	    var hash=function(message) {
	      var objHashResult=hashFunction(message);
	      
	      var strHashResult=objHashResult.toString(CryptoJS.enc.Base64);
	    
	      return strHashResult;
	    }
	  
	    return hash;
	  }
	}

/****************** 2 *****************************/
/****************** 2 *****************************/
/****************** 2 *****************************/
/****************** 2 *****************************/
// Definimos el provider con el nombre hash y le pasamos como argumento el
// nombre de la clase HashProvider
app.provider("hash",HashProvider);




/****************** 3 *****************************/
/****************** 3 *****************************/
/****************** 3 *****************************/
/****************** 3 *****************************/
/****************** 3 *****************************/
// Ya tenemos definido el provider pero ahora es necesario poder configurarlo
// para establecer cuál es el algoritmo a usar. Los bloques config son los
// únicos que permiten configurar el provider.

// En el bloque config será necesario inyectar el provider , no el
// factory-provider para poder configurarlo.
// Inyectamos el provider en la función de config, y también la constante. 

// Config nos obliga a pasar la clase previa al provider, el provider es "hash" y la clase con la que se crea es "hashProvider"
// como lo que queremos es configurar un provider ya hecho, modificamos la clase previa, no el provider en si mismo.
app.config(["hashProvider","algoritmo",function(hashProvider,algoritmo) {
	  hashProvider.setAlgoritmo(algoritmo);
	}]);



// Una vez configurado el provider en el bloque config ya podremos inyectar el
// servicio donde queramos, en un controlador, en otro servicio, en un bloque
// run, etc.
// Un bloque config sólo existe para poder configurar un provider y ninguno de
// los servicios está aún creado
// Mientras que en un bloque run todos los servicios ya está configurados y se
// pueden usar. Por ello el bloque run es más parecido a un método Main mientras
// que el bloque config es más parecido a un trozo de código de
// preinicialización de la aplicación.





/**
 * Ya hemos dicho que un provider está definido por 2 funciones:
 * 
 * 1. La función constructora de la clase que permite la configuración, que
 * llamamos provider 
 * 
 * 2. La función factory que crea el valor del servicio, que
 * llamamos factory-provider. AngularJS nos permite en ambas funciones que
 * podamos inyectar dependencias aunque en cada uno de ellos de tipos distintos.
 * 
 * Veamos qué podemos inyectar en cada uno de ellos:
 * 
 * provider: Podemos inyectar sólo constant y otros providers pero definidos en
 * otros módulos. 
 * 
 * factory-provider: Podemos inyectar constant, value, service,
 * factory y factory-provide.
 */


app.constant("provincia","Madrid");
app.factory("municipio",function() {
  return "Mostoles";
});


//al provider solo podemos inyectarle la constant direccion.
app.provider("direccion",['provincia',function(provincia) {
  //al factory-provider le inyectamos un factory, pero podriamos inyectarle lo que quisieramos.	
  this.$get=['municipio',function(municipio) {
    return provincia+","+municipio;
  }]
}]);

app.controller("PruebaController",["$scope","hash",function($scope,hash) {
	  $scope.password="s3cret";
	  $scope.getHash=function(message) {
	    var hashResult=hash(message);
	    return hashResult;
	  }
	}]);

