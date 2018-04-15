app.controller('sectorCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile){

        console.log("sectorCtrl...");
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
         // listaprueba
         // $scope.dtOptions = DTOptionsBuilder.fromSource('/api/gensectors.json?order_by[id]=ASC')
         $scope.dtOptions = DTOptionsBuilder.fromSource('listaprueba')
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
                           DTColumnBuilder.newColumn('items.codigo').withTitle('Código'),
                           DTColumnBuilder.newColumn('items.nombre').withTitle('Sector'),
                           DTColumnBuilder.newColumn('items.tipo_riesgo').withTitle('Tipo Riesgo'),
                           DTColumnBuilder.newColumn('items.nombre_tipo_riesgo').withTitle('Nombre Tipo Riesgo'),
                           DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)
                           ];

                            function createdRow(row, data, dataIndex) {
                            // Recompiling so we can bind Angular directive to the DT
                            console.log("El data");
                            console.log(data);
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

                              $scope.activar = function(id){
                                         SweetAlert.swal({
                                            title: "Está seguro de activar el Sector?",
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
                                                    $http.put('/api/gensectors/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Activado!", "El sector ha sido activado", "success");
                                                    $state.go('index.sectorInicial');     
                                                    reloadData();           
                                                    });
                                            }else{

                                            }
                                         });
                            }
 
                            $scope.editar = function(id){
                            $state.go('index.sectorEditar',{id:id});
                            }

                            // arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                            $scope.eliminar = function(id){
                                  SweetAlert.swal({
                                            title: "Está seguro de borrar un sector?",
                                            type: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#DD6B55",confirmButtonText: "Si",
                                            cancelButtonText: "No",
                                            closeOnConfirm: true,
                                            closeOnCancel: true }, 
                                                                                                                           
                                         function(isConfirm){
                                            if(isConfirm){
                                                    var data = {
                                                    id: id,
                                                    activo: -1
                                                    };
                                                    blockUI.start();
                                                    $http.put('/api/gensectors/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Borrado!", "El sector ha sido eliminado", "success");
                                                    $state.go('index.sectorInicial');    
                                                    reloadData();             
                                                    });
                                            }else{

                                            }
                                         });
                            }
                            
                            $scope.secActivo=false;
                            $scope.agregarNuevo = function(){
                             var valorActivo=0;
                             if($scope.secActivo){
                                 valorActivo=1;
                             }
                             
                             var data = {
                             codigo: $scope.secCodigo,
                             nombre: $scope.secNombre,
                             orden: $scope.secOrden,
                             tipoRiesgo:$scope.secTipoRiesgo,
                             nombreTipoRiesgo:$scope.secNombreTipoRiesgo,
                             activo: valorActivo
                             };
                             blockUI.start();
                             $http.post('/api/gensectors.json', data )
                                      .success(function(data){
                                        blockUI.stop();
                                        if(data){                                         
                                           SweetAlert.swal("Agregado", "Ingresado con éxito!", "success");
                                           $state.go('index.sectorInicial');   
                                        }else{
                                           SweetAlert.swal("Cancelado", "Algo ha ocurrido", "error");
                                        }
                                      })
                                       .error(function(data){
                                           blockUI.stop();
                                           $scope.secCodigo           = ""; 
                                           $scope.secNombre           = ""; 
                                           $scope.secOrden            = ""; 
                                           $scope.secTipoRiesgo       = ""; 
                                           $scope.secNombreTipoRiesgo = "";
                                           $scope.secActivo           = false;
                                           SweetAlert.swal("Cacelado", "el codigo ya se encuentra registrado", "error");
                                      });
                            }
}]);

app.controller('sectorEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){

         blockUI.start();
         $http.get('/api/gensectors/'+$stateParams.id+'.json' ).success(function(data){

                       $scope.secCodigo           = data.codigo; 
                       $scope.secNombre           = data.nombre; 
                       $scope.secOrden            = data.orden; 
                       $scope.secTipoRiesgo       = data.tipo_riesgo; 
                       $scope.secNombreTipoRiesgo = data.nombre_tipo_riesgo; 
                       
                       console.log(data.activo);
                       if(data.activo==1){
                        $scope.secActivo = true;
                       }else{
                        $scope.secActivo = false;
                       }
                   
                    blockUI.stop();
          });

          $scope.modificarSector = function(){
                console.log("si entro el metodo de modificar");
                console.log($stateParams);

                   var valorActivo=0;
                   if($scope.secActivo){
                       console.log($scope.secActivo);
                       valorActivo=1;
                   }

                var data = {
                   id: $stateParams,
                   codigo: $scope.secCodigo,
                   nombre: $scope.secNombre,
                   orden: $scope.secOrden,
                   tipoRiesgo:$scope.secTipoRiesgo,
                   nombreTipoRiesgo:$scope.secNombreTipoRiesgo,
                   activo: valorActivo
                };

              console.log("debe mandar el -1");
                blockUI.start();
              $http.put('/api/gensectors/'+$stateParams.id+'.json',data)  
               .success(function(data){ 
                SweetAlert.swal("Modificado", "Modificado con éxito!", "success");
                blockUI.stop();
                $state.go('index.sectorInicial');
               })
               .error(function(data){
                blockUI.stop();
                SweetAlert.swal("Cacelado", "el codigo ya se encuentra registrado", "error");
               });  
         }

}]);





 

    