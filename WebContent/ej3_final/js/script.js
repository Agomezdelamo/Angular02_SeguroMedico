
//constante con la url de donde bajaremos los datos.
//La constante vale el valor ”.” porque los datos a bajar están en la misma ruta que nuestra página web.
app.constant("baseUrl",".");

//El provider tendrá un único método para configurarlo llamado setBaseUrl por lo que tendremos el siguiente bloque config:
app.config(['baseUrl','remoteResourceProvider',function(baseUrl,remoteResourceProvider){
  remoteResourceProvider.setBaseUrl(baseUrl);
}]);


//definimos el provider.
function RemoteResourceProvider() {
	var _baseUrl;
	this.setBaseUrl(baseUrl) {
		_baseUrl=baseUrl;
	}
	//defino el factory-provider y además le inyecto el http para que no se haga en el controlador directamente,
	//encapsulamos la inyección del http.
	this.$get=['http',function($http) {
		return new RemoteResource($http,_baseUrl);
	}];
}

//creo el provider.
app.provider("remoteResource",RemoteResourceProvider);