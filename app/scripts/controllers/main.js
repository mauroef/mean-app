'use strict';

angular.module('meanappApp')
  .controller('MainCtrl', function ($scope, $http) {
    
    var loadData = function() {

      $http.get('/lista_partido').success(function(response) {

        console.log(response);
        $scope.lista_partido = response;
  
      });

    };

    $scope.login = function(user) {
      console.log(user);

      $http.post('/verificarUsuario', user).success(function(res) {
        console.log(res);

        if(res == "ok") {
          window.location.href = "#/main";

        }
      });
    }

    $scope.registrarPartido = function(partido) {
      
      $http.post('/registrarPartido', partido).success(function(res) {
        
        console.log(res);
        //limpiar valores
        txtNombreEquipo1.value = "";
        txtMarcador1.value = "";
        txtNombreEquipo2.value = "";
        txtMarcador2.value = "";
        loadData();

      });

    };

    $scope.EliminarPartido = function(partido) {
      // console.log(partido);
      $http.post('/EliminarPartido', {'id' : partido._id }).success(function(res) {
        console.log(res);
        loadData();
      });
    };

    $scope.actualizarPartido = function(partido) {

      // console.log(partido);
      $http.post('/actualizarPartido', partido).success(function(res) {
        console.log(res);
      });

    };

    $scope.copy = {};
    $scope.editing = false;

    $scope.editar = function(partido) {
      //guarda posicion de la fila que se esta editando dentro de lista_partido
      $scope.editing = $scope.lista_partido.indexOf(partido);
      //guarda la copia del objeto anted de editar
      $scope.copy = angular.copy(partido);
    };

    $scope.cancelar = function(index) {
      //si ejecutan cancela se reestablece el obj guardado antes de editar
      $scope.lista_partido[$scope.editing] = $scope.copy;
    };

    //iniciar aplicacion
    loadData();

  });
