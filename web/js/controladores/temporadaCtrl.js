app.controller('temporadaCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$modal', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$modal){
        
                console.log("temporadaCtrl...");
                var vm = this;               
                var language = {
                  "sEmptyTable": "No se encontraron resultados",
                  "sInfo": "Mostrando _END_ de _TOTAL_ resultados",
                  "sInfoPostFix": "",
                  "sInfoThousands": ",",
                  "sLengthMenu": "Mostrar _MENU_ resultados",
                  "sSearch": "Buscar:",
                  "sZeroRecords": "No se encontraron resultados",
                  "sLoadingRecords": '<img src="https://beacardinal.lamar.edu/_files/images/loading.png">',
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
                $scope.dtOptions = DTOptionsBuilder.fromSource('/api/gentemporadas.json?order_by[id]=ASC')
                                  .withPaginationType('simple_numbers') 
                                  .withLanguage(language)
                                  .withOption('createdRow', createdRow)
                                  .withOption('responsive', true)
                                  .withButtons([
                                    {
                                      text: '<i class="fa fa-lg fa-file-excel-o"></i> Excel',
                                      extend: 'excel',
                                      className: 'btn btn-xs btn-secondary p-5 m-0 width-35 assets-export-btn export-xls ttip',
                                      extension: '.xls'
                                    }, 
                                    {
                                      text: '<i class="fa fa-lg fa-file-pdf-o"></i> Pdf',
                                      extend: 'pdf',
                                      className: 'btn btn-xs btn-secondary p-5 m-0 width-35 assets-export-btn export-pdf ttip',
                                      extension: '.pdf'
                                    },
                                    {
                                      text: '<i class="fa fa-lg fa-print"></i> Imprimir',
                                      extend: 'print',
                                      className: 'btn btn-xs btn-secondary p-5 m-0 width-35 assets-export-btn export-pdf ttip',
                                    }
                                  ])
                                  .withOption('rowCallback', function(nRow, aData, iDisplayIndex, iDisplayIndexFull){                          
                                      return nRow;
                                  });

                $scope.dtColumns = [ 
                                 DTColumnBuilder.newColumn('temporada').withTitle('Temporada'),                     
                                 DTColumnBuilder.newColumn(null).withTitle('Fecha inicio').notSortable().renderWith(formatoFechaInicio).withClass('foo-class'),
                                 DTColumnBuilder.newColumn(null).withTitle('Fecha termino').notSortable().renderWith(formatoFechaTermino),
                                 DTColumnBuilder.newColumn(null).withTitle('Versiones').notSortable().renderWith(versionesTemporada),
                                 DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)
                                 ];

                            function actionsHtml(data, type, full, meta) { 
                              if(parseFloat(data.activo)==parseFloat(-1)){

                              return '<button class="btn btn-primary btn-xs" ng-click="activar(\''+data.id+'\')">' +
                              '   <i class="fa fa-trash-o"></i> Activar' +
                              '</button>';

                              }else{

                              return '<button class="btn btn-warning btn-xs" ng-click="editar(\''+data.id+'\')">' +
                              '   <i class="fa fa-edit"></i> Editar' +
                              '</button>&nbsp;' +
                              '<button class="btn btn-danger btn-xs" ng-click="eliminar(\''+data.id+'\')">' +
                              '   <i class="fa fa-trash-o"></i> Eliminar' +
                              '</button>';

                              }
                            }

                            function createdRow(row, data, dataIndex) {
                            // Recompiling so we can bind Angular directive to the DT
                            if(parseFloat(data.activo)==parseFloat(-1)){
                            $(row).css("background-color", "#DF0101");
                            $compile(angular.element(row).contents())($scope);
                            }else{
                            $compile(angular.element(row).contents())($scope);
                            }                                                                                 
                            }


                            function reloadData () {
                            $scope.dtInstance.reloadData();
                            }

                              $scope.activar = function(id){
                                         SweetAlert.swal({
                                            title: "Está seguro de activar la temporada?",
                                            type: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#1ab394",confirmButtonText: "Si",
                                            cancelButtonText: "No",
                                            closeOnConfirm: true,
                                            closeOnCancel: true }, 
                                                                                                                           
                                         function(isConfirm){
                                            if(isConfirm){
                                                    var data = {
                                                    id: id,
                                                    activo: 1
                                                    };

                                                    blockUI.start();
                                                    $http.put('/api/gentemporadas/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Activado!", "La temporada ha sido activado", "success");
                                                    $state.go('index.temporadaInicial');  
                                                    reloadData();            
                                                    });
                                            }else{

                                            }
                                         });
                            }

                            function formatoFechaInicio(data) 
                            {
                            var obj1 = moment(data.fecha_inicio).format('DD/MM/YYYY');
                            return obj1;
                            }

                            function formatoFechaTermino(data) {
                            var obj2 = moment(data.fecha_termino).format('DD/MM/YYYY');
                            return obj2;
                            }
                           
                            function versionesTemporada(data){
                            return '<button class="btn btn-info btn-xs" href ng-click="show(\''+data.id+'\',\''+data.temporada+'\',$modal)" >' +
                            '   <i class="fa fa-pencil"></i> Versiones' +
                            '</button>&nbsp;';
                            }

                            //con este nos vamos a la temporada version modal de una temporada  
                            $scope.show = function(id,temporada) {                             
                                var modalInstance = $modal.open({
                                    templateUrl : 'modal.html',
                                    controller : 'ModalInstanceCtrl',
                                    resolve: {
                                      valorId: function () {
                                          return data ={
                                            id:id,
                                            temporada:temporada
                                          };
                                      }
                                    },
                                    size : 'lg',
                                });
                            }

 
                            $scope.editar = function(id){
                              $state.go('index.temporadaEditar',{id:id});
                            }

                            //Arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                            $scope.eliminar = function(id){
                                SweetAlert.swal({
                                          title: "Está seguro de borrar la Temporada?",
                                          type: "warning",
                                          showCancelButton: true,
                                          confirmButtonColor: "#DD6B55",confirmButtonText: "Si",
                                          cancelButtonText: "No",
                                          closeOnConfirm: false,
                                          closeOnCancel: true }, 
                                       function(isConfirm){ 
                                          if (isConfirm) {  
                                                   var data = {
                                                   id: id,
                                                   activo: -1
                                                   };
                                                    blockUI.start();
                                                  $http.put('/api/gentemporadas/'+id+'.json',data).success(function(data){              
                                                    console.log(data);
                                                    blockUI.stop();
                                                    SweetAlert.swal("Borrado!", "La temporada ha sido eliminada", "success");                
                                                    $state.go('index.temporadaInicial'); 
                                                    reloadData();
                                                  });
                                          }
                                       });
                            }
                            
                            $scope.secActivo=false;
                            $scope.agregarNuevo = function()
                            {

                            var valorActivo=0;
                            if($scope.temActivo){
                              valorActivo=1;
                            }

                            console.log("esto es un agregar nuevo");
                            console.log($scope.temDaterange);

                            var obj1    = moment($scope.temDaterange.startDate);
                            var fecha1  = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
                            var fechaIni = fecha1.toString();
                            var obj2    = moment($scope.temDaterange.endDate);
                            var fecha2  = obj2.year() + "-" + (obj2.month() + 1) + "-" + obj2.date();
                            var fechaTer = fecha2.toString();

                            var data = {
                            temporada:parseInt($scope.temTemporada),
                            fechaInicio:fechaIni,
                            fechaTermino:fechaTer,
                            activo:valorActivo
                            }
                                                   
                            blockUI.start();
                            $http.post('/api/gentemporadas.json', data )
                                      .success(function(data){      
                                        if(data){      
                                           $scope.temTemporada = "";
                                           $scope.temDaterange = ""; 
                                           $scope.temActivo = false;
                                           blockUI.stop();
                                           SweetAlert.swal("Agregado", "Ingresado con éxito!", "success");
                                           $state.go('index.temporadaInicial');
                                        }else{
                                           SweetAlert.swal("Cancelado", "Algo ha ocurrido", "error");
                                        }
                                      })
                                       .error(function(data){
                                           $scope.temTemporada = "";
                                           $scope.temDaterange = ""; 
                                           $scope.temActivo = false;
                                           blockUI.stop();
                                           SweetAlert.swal("Cacelado", "La temporada ya se encuentra registrada", "error");
                                      });
                            }
}]);

app.controller('temporadaEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){

         console.log($stateParams.id);
         blockUI.start();
         $http.get('/api/gentemporadas/'+$stateParams.id+'.json' ).success(function(data){
   
                       $scope.temTemporada = data.temporada;
                       $scope.temDaterange = {startDate: data.fecha_inicio, endDate: data.fecha_termino};
                       $scope.options = {
                                        locale: {
                                          applyLabel: "Selecciona",
                                          fromLabel: "Desde",
                                          format: "DD-MM-YYYY",
                                          toLabel: "Hasta",
                                          cancelLabel: 'Cancela'
                                        }
                                       }

                       if(data.activo==1)
                       {
                        $scope.temActivo=true;
                       }else{
                        $scope.temActivo=false;
                       }

                  blockUI.stop();
          });

          $scope.modificarTemporada = function(){

                var valorActivo=0;
                if($scope.temActivo){
                  valorActivo=1;
                }

                console.log($scope.temDaterange);
                console.log($scope.temDaterange.startDate);
                console.log($scope.temDaterange.endDate);

                var obj1     = moment($scope.temDaterange.startDate);
                var fecha1   = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
                var fechaIni = fecha1.toString();
                var obj2     = moment($scope.temDaterange.endDate);
                var fecha2   = obj2.year() + "-" + (obj2.month() + 1) + "-" + obj2.date();
                var fechaTer = fecha2.toString();
                var data = {
                temporada:parseInt($scope.temTemporada),
                fechaInicio:fechaIni,
                fechaTermino:fechaTer,
                activo:valorActivo
                }

               blockUI.start();
               $http.put('/api/gentemporadas/'+$stateParams.id+'.json',data)
               .success(function(data){ 
               blockUI.stop();   
               SweetAlert.swal("Modificado", "Modificado con éxito!", "success");    
               $state.go('index.temporadaInicial');
               })               
               .error(function(data){
               blockUI.stop();
               SweetAlert.swal("Cacelado", "La temporada ya se encuentra registrada", "error");
               });  
          }
}]);


app.controller('ModalInstanceCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams','$modalInstance','valorId','$modal','$q', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams,$modalInstance,valorId,$modal,$q)
{
            console.log("modal instante ctrlssssss");
            console.log("id");
            console.log(valorId.id);
            console.log("temporada");
            console.log(valorId.temporada);

            var vm = this;
            var language = {
              "sEmptyTable": "No se encontraron resultados",
              "sInfo": "",
              "sInfoPostFix": "",
              "sInfoThousands": ",",
              "sLengthMenu": "",
              "sSearch": "",
              "sZeroRecords": "No se encontraron resultados",
               "sLoadingRecords": '<img src="https://media.tenor.com/images/779781883952778b25974baa3cf7679c/tenor.gif">',
               "sProcessing":     '<img src="https://media.tenor.com/images/779781883952778b25974baa3cf7679c/tenor.gif">',
               "oPaginate":"",
              "oAria":{
                "sSortAscending": ": activate to sort column ascending",
                "sSortDescending": ": activate to sort column descending"
              }
            }
                   $scope.aniotemp=valorId.temporada;
                   $scope.dtOptions1 = DTOptionsBuilder.fromFnPromise(function() {
                                 var defer = $q.defer();
                                      $http.get('/api/gentemporadaversions.json?filters[idGenTemporada]='+valorId.id+'').then(function(result) {
                                          defer.resolve(result.data);
                                      });
                                      return defer.promise;
                                  })
                                .withLanguage(language)
                                .withOption("bAutoWidth", true)
                                .withOption("bDeferRender", true)
                                .withOption("width", "20%")
                                .withOption("bPaginate", false)
                                .withOption("bFilter", false)
                                .withOption('createdRow', createdRow)
                                .withOption('rowCallback', function(nRow, aData, iDisplayIndex, iDisplayIndexFull)
                                {
                                    return nRow;
                                });

                                 $scope.dtColumns1 = [                    
                                 DTColumnBuilder.newColumn('temporada_version').withTitle('Version temporada'),
                                 DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)
                                 ];

                            function formatofecha(data) {
                              return data;
                            }

                            function createdRow(row, data, dataIndex) {
                            $compile(angular.element(row).contents())($scope);
                            }

                            $scope.editartv = function(id){
                            $state.go('index.temporadaversionEditar',{id:id});
                            }
                            
                            function actionsHtml(data, type, full, meta){
                            return '<button class="btn btn-danger" ng-click="eliminarTV(\''+data.id+'\')">' +
                            '   <i class="fa fa-trash-o"></i>' +
                            '</button>';
                            }

            //arreglar cuando el valor trae la lista vacia ..osea erroroneo para ingresar el primero
            $scope.dtInstance1 = {};
            $scope.reloadData = reloadData;
            $scope.ingresarTV = function(){
                      blockUI.start();
                      $http.get('/api/gentemporadaversions.json?filters[idGenTemporada]='+valorId.id+'&order_by[temporadaVersion]=DESC&limit=1')
                      .success(function(data,status,c,d){
                       
                        if(status==200 || status==204){    
                              var nuevaTempo=0;
                              if(status==200){
                              console.log("entro en el 200");
                              nuevaTempo=parseInt(data[0].temporada_version)+1;
                              }
                              if(status==204){
                              console.log("entro en el 204");
                              nuevaTempo=1;
                              }
                              var data1 = {
                              idGenTemporada:parseInt(valorId.id),
                              temporadaVersion:nuevaTempo,                              
                              activo:0   
                              };
                                     $http.post('/api/gentemporadaversions.json',data1)
                                              .success(function(data1){
                                                blockUI.stop();
                                                if(data1){
                                                   SweetAlert.swal("Agregado", "Temporada version agregada con éxito!", "success");
                                                   reloadData();
                                                }else{
                                                   SweetAlert.swal("Cancelado", "Algo ha ocurrido", "error");
                                                }
                                              })
                                              .error(function(data1){
                                                   blockUI.stop();
                                                   SweetAlert.swal("Cacelado", "La temporada version ya se encuentra registrada", "error");
                                              });
                        }else{
                           SweetAlert.swal("Cancelado", "Algo ha ocurrido", "error");
                           blockUI.stop();
                        }

                      });
            }


            function reloadData () {
              $scope.dtInstance1.reloadData();
            };

            function callback(json) {
                console.log(json);
            }

            $scope.eliminarTV = function (id) {
                              SweetAlert.swal({
                                      title: "Está seguro de borrar una versión de temporada?",
                                      type: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#DD6B55",confirmButtonText: "Si",
                                      cancelButtonText: "No",
                                      closeOnConfirm: true,
                                      closeOnCancel: true }, 
                                                                                                                     
                                   function(isConfirm){ 
                                      if (isConfirm) {
                                              var data = {
                                              id: id,
                                              activo: -1
                                              };
                                              console.log("debe mandar el -1");
                                              blockUI.start();
                                              $http.put('/api/gentemporadaversions/'+id+'.json',data).success(function(data){
                                                blockUI.stop();   
                                                SweetAlert.swal("Borrado!", "La temporada versión ha sido eliminado", "success");             
                                                reloadData();
                                              });
                                      } else {
                                              SweetAlert.swal("Cancelado", "No se borró la temporada versión", "error");
                                      }
                                      
                                   });
            }

            $scope.ok = function(){
            $modalInstance.close();
            }

            $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
            }
     
}]);
         