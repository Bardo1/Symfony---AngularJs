
function MainCtrl() {
    this.userName        = 'Esto es el nombre del usuario';
    this.helloText       = 'Bienvenido a proyecto Normas';
    this.variablePrueba  = 'Esta es una variable de prueba';
    this.descriptionText = 'Esta es la descripción de un texto ...Donde puede ser instanciada en una variable asignada en el controlador';
};

    // Traemos el modulo de app.js
    /* var app = angular.module('inspinia',['ui.bootstrap','ui.router','datatables', 'ngSanitize','ngResource','ngSanitize']);
    */
    // Controlador MainCtrl
    // app.controller('MainCtrl', MainCtrl);

   app.controller('MainCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','$q','$timeout','$resource','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder, $scope, $state, $http, $q, $timeout,$resource,blockUI,$compile){
        
        $http.get('/buscanombre').success(function(data){  
        $scope.userName= data;    
        });

    }]);


    app.controller('tableChosenCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','$q','$timeout','$resource','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder, $scope, $state, $http, $q, $timeout,$resource,blockUI,$compile){

           blockUI.start();
           $http.get('/api/gensectors.json' ).success(function(data){    
                      $scope.items = data;    
                      $scope.srzSector1 = $scope.items;           
                      blockUI.stop();
            });

           blockUI.start();
           $http.get('/api/gentemporadas.json' ).success(function(data){
                      $scope.items2 = data;    
                      $scope.srzTemporada1 = $scope.items2;           
                      blockUI.stop();
            });

            $scope.listarChosenSector = function(){
              if(typeof $scope.srzSector1 != 'undefined'){
                blockUI.start();
                $http.get('/api/genrubros.json?filters[idGenSector]='+$scope.srzSector1.id+'').success(function(data1){                       
                    $scope.items1   = data1;    
                    $scope.srzRubro1 = $scope.items1; 
                    blockUI.stop();
                });
              }
            }

            $scope.listarChosenTemporada = function(){
              if(typeof $scope.srzTemporada1 != 'undefined'){
                blockUI.start();
                 $http.get('/api/gentemporadaversions.json?filters[idGenTemporada]='+$scope.srzTemporada1.id+'').success(function(data1){                       
                    $scope.items3   = data1;    
                    $scope.srzVersion1= $scope.items3; 
                    blockUI.stop();
                 });
              }
            }               
          

            var vm = this;
            var language = {
                  "sEmptyTable": "No se encontraron resultados",
                  "sInfo": "Mostrando _END_ de _TOTAL_ resultados",
                  "sInfoPostFix": "",
                  "sInfoThousands": ",",
                  "sLengthMenu": "Mostrar _MENU_ resultados",
                  "sSearch": "Buscar:",
                  "sZeroRecords": "No se encontraron resultados",
                  "oPaginate":{
                    "sFirst": "Primero",
                    "sLast": "Ultimo",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                  },
                  "oAria":{
                    "sSortAscending": ": activate to sort column ascending",
                    "sSortDescending": ": activate to sort column descending"
                  }
            } 

            $scope.dtInstance = {};
            function promiseFunc(){
                 var deferred = $q.defer();
                 $http.get('informe_sacrubrozhs').then(function(data){
                  console.log("este es el data de symfony");
                  console.log(data.data);
                 deferred.resolve(data.data);
                 });
                return deferred.promise;
            };

            $scope.dtOptions = DTOptionsBuilder.fromFnPromise(promiseFunc()).withPaginationType('full_numbers')
                                               .withLanguage(language)
                                               .withOption('rowCallback', function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                                                $('td', nRow).bind('click', function() {
                                                    $scope.$apply(function(){
                                                    });
                                                });
                                                return nRow;
                                                });

            $scope.dtColumns = [ DTColumnBuilder.newColumn('id_gen_rubro.codigo').withTitle('Código Rubro'), 
                                                         DTColumnBuilder.newColumn('id_gen_rubro.nombre').withTitle('Nombre Rubro'),
                                                         DTColumnBuilder.newColumn('id_ns_zhs.codigo').withTitle('Codigo ZHS'),
                                                         DTColumnBuilder.newColumn('id_gen_sac.codigo').withTitle('Codigo Sac'),
                                                         DTColumnBuilder.newColumn('id_gen_sac.nombre').withTitle('Nombre Sac')
                                                         ];

             $scope.changeData = function(){
             console.log("changedddd");
             var url='/api/gensacrubrozhs.json?limit=5';
             if(typeof $scope.srzRubro1!= 'undefined'){
             console.log("entro en el rubro");
             url='api/gensacrubrozhs.json?filters[idGenRubro]='+$scope.srzRubro1.id+'';    
             }
   
            /* srzSector
            srzTemporada
            srzRubro
            srzVersion*/
 
             /* $scope.dtInstance.changeData($resource(url).query().$promise);*/
             console.log("aaaaapaso");
             //$scope.dtInstance.changeData(url);
             //$scope.dtInstance.changeData(url);

             $scope.dtInstance.changeData(function() {
             console.log("entra a la promesa");
             return $resource(url).query().$promise;
             });

           }




            
 
    }]);

 



 


    