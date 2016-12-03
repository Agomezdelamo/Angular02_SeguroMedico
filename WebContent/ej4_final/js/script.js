var app = angular.module("app", []);

// objeto para servicio provider
function RemoteResource($http, baseUrl) {
	//función de exito y error callback
  this.get = function(fnOK, fnError) {
    $http({
      method: 'GET',
      url: baseUrl + '/datos.json'
    }).success(function(data, status, headers, config) {
    	//recibe unafunción callback para ejecutar cuando se tiene exito...
      fnOK(data);
    }).error(function(data, status, headers, config) {
    	// o error
      fnError(data, status);
    });
  }
  this.list = function(fnOK, fnError) {
    $http({
      method: 'GET',
      url: baseUrl + '/listado_seguros.json'
    }).success(function(data, status, headers, config) {
      fnOK(data);
    }).error(function(data, status, headers, config) {
      fnError(data, status);
    });
  }
}

// objeto que modela el servicio provider, adjuntando el objeto que es el core en el $get
function RemoteResourceProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  }
  this.$get = ['$http',
    function($http) {
      return new RemoteResource($http, _baseUrl);
    }
  ];
}

//new del provider
app.provider("remoteResource", RemoteResourceProvider);

//constante con la url de mis json
app.constant("baseUrl", "js");
//configuración del provider una vez creado pero no usado
app.config(['baseUrl', 'remoteResourceProvider',
  function(baseUrl, remoteResourceProvider) {
    remoteResourceProvider.setBaseUrl(baseUrl);
  }
]);

//valor que añado al rootscope para que todos los scope lo tengan
app.value("urlLogo", "http://www.cursoangularjs.es/lib/exe/fetch.php?cache=&media=unidades:04_masdirectivas:medical14.png");
app.run(["$rootScope", "urlLogo",function($rootScope, urlLogo) {
    $rootScope.urlLogo = urlLogo;
}]);

//creamos el filtro i18n, inyectando el servicio filter para hacer un filter
app.filter("filteri18n",["$filter",function($filter) {
  var filterFn=$filter("filter");
   
  /** Transforma el texto quitando todos los acentos diéresis, etc. **/
  function normalize(texto) {
    texto = texto.replace(/[áàäâ]/g, "a");
    texto = texto.replace(/[éèëê]/g, "e");
    texto = texto.replace(/[íìïî]/g, "i");
    texto = texto.replace(/[óòôö]/g, "o");
    texto = texto.replace(/[úùüü]/g, "u");
    texto = texto.toUpperCase();
    return texto;
  }
    
  /** Esta función es el comparator en el filter **/
  function comparator(actual, expected) {
      if (normalize(actual).indexOf(normalize(expected))>=0) {
        return true;
      } else {
        return false;
      }
  }
   
  /** Este es realmente el filtro, el filtro inyectado de angular guardado por nosotros **/
  function filteri18n(array,expression) {
    //Lo único que hace es llamar al filter original pero pasado
    //la nueva función de comparator
    return filterFn(array,expression,comparator)
  }
   
  return filteri18n;
   
}]);

//controlador
app.controller("DetalleSeguroController", ['$scope', 'remoteResource',function($scope, remoteResource) {

    $scope.filtro = {
      ape1: ""
    }

    //ng-options
    $scope.sexos = [{
      codSexo: "H",
      descripcion: "Hombre"
    }, {
      codSexo: "M",
      descripcion: "Mujer"
    }];

//    ng-modelo
    $scope.seguro = {
      nif: "",
      nombre: "",
      ape1: "",
      edad: undefined,
      sexo: "",
      casado: false,
      numHijos: undefined,
      embarazada: false,
      coberturas: {
        oftalmologia: false,
        dental: false,
        fecundacionInVitro: false
      },
      enfermedades: {
        corazon: false,
        estomacal: false,
        rinyones: false,
        alergia: false,
        nombreAlergia: ""
      },
      fechaCreacion: new Date()
    }
    
    //llamo al servicio pasandole funciones de exito y error
    remoteResource.get(function(seguro) {
      $scope.seguro = seguro;
    }, function(data, status) {
      alert("Ha fallado la petición. Estado HTTP:" + status);
    });

}]);

app.controller("ListadoSeguroController", ['$scope', 'remoteResource',function($scope, remoteResource) {
    $scope.seguros = [];

    //llamo al servicio pasandole funciones de exito y error
    remoteResource.list(function(seguros) {
      $scope.seguros = seguros;
    }, function(data, status) {
      alert("Ha fallado la petición. Estado HTTP:" + status);
    });

}]);

app.controller("MainController", ['$scope',function($scope) {

}]);