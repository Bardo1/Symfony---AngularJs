app.controller('companiaCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile){

                $scope.checkOne= true;
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
                $scope.dtOptions = DTOptionsBuilder.fromSource('/api/gencompanias.json?order_by[id]=ASC')
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
                                 DTColumnBuilder.newColumn('nombre').withTitle('Nombre'),
                                 DTColumnBuilder.newColumn(null).withTitle('Rut').notSortable().renderWith(armaRut),
                                 DTColumnBuilder.newColumn('sigla').withTitle('Sigla'),
                                 DTColumnBuilder.newColumn('razon_social').withTitle('Razon Social'),
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

                            function armaRut(data) {                             
                            var elRut= data.id+"-"+data.dv; 
                            return elRut;
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
                                            title: "Está seguro de activar la Compañia?",
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
                                                    $http.put('/api/gencompanias/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Activado!", "La compañia ha sido activado", "success");
                                                    $state.go('index.companiaInicial');  
                                                    reloadData();                
                                                    });
                                            }else{

                                            }
                                         });
                            }
 
                            $scope.editar = function(id){
                              $state.go('index.companiaEditar',{id:id});
                            }

                            // arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                            $scope.eliminar = function(id){
                                  SweetAlert.swal({
                                            title: "Está seguro de borrar una Compañia?",
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
                                                    blockUI.start();
                                                    $http.put('/api/gencompanias/'+id+'.json',data).success(function(data){              
                                                       blockUI.stop();  
                                                       SweetAlert.swal("Borrado!", "La Compañia se ha sido eliminado", "success");                                                        
                                                       $state.go('index.companiaInicial');  
                                                       reloadData(); 
                                                    });
                                                } 

                                         });
                            }
                            
                            $scope.secActivo=false;
                            $scope.agregarNuevo = function(){
                           
                            var valorActivo=0;
                            if($scope.comActivo){
                               valorActivo=1;
                            }

                            var str   = $scope.comRut.toString();
                            var largo = str.length;
                            console.log(largo);
                            console.log(str.substr(0,largo-1));
                            console.log(str.substr(largo-1,largo));
                                        
                             var data = {
                             id: parseInt(str.substr(0,largo-1)),
                             dv: str.substr(largo-1,largo),
                             sigla: $scope.comSigla,
                             nombre:  $scope.comNombre,
                             razonSocial: $scope.comRazonSocial,
                             activo: valorActivo
                             };

                             blockUI.start();
                             $http.post('/api/gencompanias.json',data)
                                      .success(function(data){
                                        blockUI.stop();
                                        if(data){
                                          $state.go('index.companiaInicial'); 
                                          SweetAlert.swal("Agregado", "Ingresado con éxito!", "success"); 
                                        }else{
                                           SweetAlert.swal("Cancelado", "Algo ha ocurrido", "error");
                                        }
                                      })                                      
                                       .error(function(data){
                                           blockUI.stop();
                                           $scope.comRut         = ""; 
                                           $scope.comSigla       = ""; 
                                           $scope.comNombre      = ""; 
                                           $scope.comRazonSocial = ""; 
                                           $scope.secActivo      = false;
                                           SweetAlert.swal("Cacelado", "La Compañia ya se encuentra registrada", "error");
                                      });
                            }

}]);

app.controller('companiaEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){

         blockUI.start();
         $http.get('/api/gencompanias/'+$stateParams.id+'.json' ).success(function(data){ 
             var elrut =data.id.toString() + data.dv;
             $scope.comRut         = elrut;
             $scope.comDv          = data.dv;
             $scope.comSigla       = data.sigla;
             $scope.comNombre      = data.nombre;
             $scope.comRazonSocial = data.razon_social;

             if(data.activo == 1){
             $scope.comActivo = true;
             }else{
             $scope.comActivo = false;
             }
             
             blockUI.stop();
         });


        $scope.modificarCompania = function(){
              var valorActivo = 0;
              if($scope.comActivo){
                 valorActivo = 1;
              }
              
              var str   = $scope.comRut.toString();
              var largo = str.length;              
              var data  = {
              id: parseInt(str.substr(0,largo-1)),
              dv: str.substr(largo-1,largo),
              sigla: $scope.comSigla,
              nombre:  $scope.comNombre,
              razonSocial: $scope.comRazonSocial,
              activo: valorActivo
              };
              blockUI.start();
              $http.put('/api/gencompanias/'+$stateParams.id+'.json',data)               
               .success(function(data){ 
                blockUI.stop();      
                SweetAlert.swal("Modificado","Modificado con éxito!","success");   
                $state.go('index.companiaInicial');        
               })
               .error(function(data){
               blockUI.stop();
               SweetAlert.swal("Cacelado","La compañia ya se encuentra registrada","error");
              });
          }

}]);





 

    