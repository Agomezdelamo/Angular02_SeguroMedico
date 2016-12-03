//¿qué es un módulo? Podríamos verlo como un paquete de Java.
// Un artefacto es por ejemplo una directiva o un controlador , teniendo que definir estos artefactos en módulos de AngularJS.
//Un módulo es donde se añaden los distintos artefactos que usaremos en nuestra aplicación.
// artefactos: directivas, controladores, providers, servicios...
var app=angular.module("app",[]);

app.controller("SeguroController", function($scope) {
  $scope.seguro={
    nif:"",
    nombre:"",
    ape1:"",
    edad:undefined,
    sexo:"",
    casado:false,
    numHijos:undefined,
    embarazada:false,
    coberturas: {
      oftalmologia:false,
      dental:false,
      fecundacionInVitro:false
    },
    enfermedades:{
      corazon:false,
      estomacal:false,
      rinyones:false,
      alergia:false,
      nombreAlergia:"" 
    },
    fechaCreacion:new Date()
  }
}

/*
 * QUE ES UN SERVICIO
 * 
 * TIPOS: Constantes Valores Servicios Factorias Proveedores
 * 
 * Es un objeto JavaScript que nos permite obtener información. Aparentemente
 * nada nuevo que entender, sería por ejemplo un DAO en Java o un servicios de
 * Java. Lo importante de ésto es que un servicio nunca 1) interacciona con la
 * propia página, sólo con otros servicios o con un servidor de datos que pueda
 * estar en otro Host. Un artefacto es por ejemplo una directiva o un
 * controlador , teniendo que definir estos artefactos en módulos de AngularJS.
 */

// Una característica importante de los servicios es que sólo hay una única
// instancia de ellos aunque los usemos más de una vez,es decir que son un
// singleton.


// En angular los servicios y otros artefactos empiezan siempre sus nombres por
// “$”. La razón de ello simplemente es evitar que choque el nombre de los
// servicios de Angular con los servicios creados por nosotros mismos o por
// terceras librerías.

