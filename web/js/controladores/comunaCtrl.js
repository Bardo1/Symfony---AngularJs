app.controller('comunaCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile){

              console.log("comunaCtrl...");
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
          $scope.dtOptions = DTOptionsBuilder.fromSource('/api/gencomunas.json?order_by[activo]=ASC')
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
                         
                          // codigo, nombre, ide, provincia, zonaExtrema, resolucion, fecharesolucion, idGenRegion
          $scope.dtColumns = [  
                             DTColumnBuilder.newColumn('codigo').withTitle('Código'),
                             DTColumnBuilder.newColumn('nombre').withTitle('Nombre'),
                             DTColumnBuilder.newColumn('provincia').withTitle('Provincia'),
                             DTColumnBuilder.newColumn('zona_extrema').withTitle('Zona Extrema'),
                             DTColumnBuilder.newColumn(null).withTitle('Resolucion').notSortable().renderWith(formatoResolucion),
                             DTColumnBuilder.newColumn('id_gen_region.nombre').withTitle('Region'),
                             DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)
                             ];

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

                            function formatoResolucion(data) {
                            if(data.resolucion!=null){
                            return data.resolucion;
                            }else{
                            return "No ingresada";
                            }
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
 
                            $scope.editar = function(id){
                            $state.go('index.comunaEditar',{id:id});
                            }

                            $scope.activar = function(id){
                                         SweetAlert.swal({
                                            title: "Está seguro de activar la comuna?",
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
                                                    $http.put('/api/gencomunas/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Activado!", "La comuna ha sido activado", "success");
                                                    $state.go('index.comunaInicial');   
                                                    reloadData(); 
                                                    });
                                            }else{

                                            }
                                         });
                            }


                            // arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                            $scope.eliminar = function(id){
                                  SweetAlert.swal({
                                            title: "Está seguro de borrar esa comuna?",
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
                                                    $http.put('/api/gencomunas/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Borrado!", "La comuna ha sido eliminada", "success");
                                                    $state.go('index.comunaInicial'); 
                                                    reloadData();   
                                                    });
                                            }else{

                                            }
                                         });
                            }                           
}]);

app.controller('comunaAgregarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){
   
                  console.log("variedad agregar ctrl");
                  blockUI.start();
                  $http.get('/api/genregions.json?limit=1000&order_by[orden]=ASC')
                  .success(function(data1){                 
                    $scope.items1  = data1;    
                    $scope.comReg1 = $scope.items1;                          
                  });
                  blockUI.stop();
                            //hay que inicializar el valor del checkbox antes de mandarlo 
                            $scope.varActivo=false;
                               $scope.agregarNuevo = function(){
                               var valorActivo=0;
                               if($scope.varActivo){
                                   valorActivo=1;
                               }

                               var obj1    = moment($scope.comFechRes);
                               var fecha1  = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
                               var fechare = fecha1.toString();

                               console.log(fechare);

                              var data = {
                                  codigo:$scope.comCod,
                                  nombre:$scope.comCom,
                                  ide:$scope.comIde,
                                  provincia:$scope.comProv,
                                  zonaExtrema:$scope.comZonEx,
                                  resolucion:$scope.comRes,
                                  fechaResolucion:fechare,
                                  idGenRegion:$scope.comReg1.id,
                                  activo:valorActivo
                              }; 
                               
                               console.log("Eso fué el data");
                               console.log(data);
                                  blockUI.start();
                                  $http.post('/api/gencomunas.json',data)
                                  .success(function(data){
                                    blockUI.stop();
                                    if(data){
                                      SweetAlert.swal("Agregado", "Ingresado con éxito!", "success");                         
                                      $state.go('index.comunaInicial');  
                                    }else{
                                      SweetAlert.swal("Cancelado", "Algo ha ocurrido", "error");
                                    }
                                  })
                                   .error(function(data){
                                      blockUI.stop();
                                      SweetAlert.swal("Cacelado", "el codigo ya se encuentra registrado", "error");
                                  });                                
                            }
}]);

app.controller('comunaEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){

         blockUI.start();
         $http.get('/api/gencomunas/'+$stateParams.id+'.json' ).success(function(data){
                      
                      console.log(data);
                      $scope.comCod     = data.codigo;
                      $scope.comNom     = data.nombre;
                      $scope.comIde     = data.ide;
                      $scope.comProv    = data.provincia;
                      $scope.comZonEx   = data.zona_extrema;
                      $scope.comRes     = data.resolucion;
                      $scope.comFechRes = data.fecha_resolucion;
                      var idRegion      = data.id_gen_region.id;

                      if(data.activo==1){
                      $scope.comActivo=true;
                      }
                      else{
                      $scope.comActivo=false;
                      } 

               $http.get('/api/genregions.json?limit=1000&order_by[orden]=ASC')
                  .success(function(data1){                 
                   
                    var laRegion;
                    for(var k in data1) {
                      if (data1[k].id == idRegion) {   
                          laRegion= k;
                          break;                      
                      }
                    }
                    
                    $scope.items1  = data1;    
                    $scope.comReg1 = $scope.items1[laRegion];                                         
              });

             blockUI.stop();
         });

          $scope.modificarComuna = function(){

                var valorActivo = 0;
                if($scope.comActivo){
                   valorActivo = 1;
                }

                var obj1    = moment($scope.comFechRes);
                var fecha1  = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
                var fechare = fecha1.toString();

                var data = {
                    codigo:$scope.comCod,
                    nombre:$scope.comCom,
                    ide:$scope.comIde,
                    provincia:$scope.comProv,
                    zonaExtrema:$scope.comZonEx,
                    resolucion:$scope.comRes,
                    fechaResolucion:fechare,
                    idGenRegion:$scope.comReg1.id,
                    activo:valorActivo
                }; 

                blockUI.start();
                $http.put('/api/gencomunas/'+$stateParams.id+'.json',data)               
                 .success(function(data){ 
                  blockUI.stop();      
                  SweetAlert.swal("Modificado","Modificado con éxito!","success");   
                  $state.go('index.comunaInicial');        
                 })
                 .error(function(data){
                 blockUI.stop();
                 SweetAlert.swal("Cacelado","La compañia ya se encuentra registrada","error");
                });
          }
}]);