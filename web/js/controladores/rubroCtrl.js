app.controller('rubroCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile)
{
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
                $scope.dtOptions = DTOptionsBuilder.fromSource('/api/genrubros.json?order_by[id]=ASC')
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
                                   DTColumnBuilder.newColumn('nombre').withTitle('Rubro'),
                                   DTColumnBuilder.newColumn('id_gen_sector.nombre').withTitle('Sector'),
                                   DTColumnBuilder.newColumn('codigo').withTitle('Codigo'),
                                   DTColumnBuilder.newColumn('categoria').withTitle('Categoria'),
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
                                            title: "Está seguro de activar el Rubro ?",
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
                                                    $http.put('/api/genrubros/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Activado!", "El Rubro ha sido activado", "success");
                                                    $state.go('index.rubroInicial');
                                                    reloadData();                
                                                    });
                                            }else{

                                            }
                                         });
                            }

                            $scope.editar = function(id){
                              $state.go('index.rubroEditar',{id:id});
                            }

                            $scope.agregar = function(id){
                              $state.go('index.rubroAgregar',{id:id});
                            }
                            // arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                            $scope.eliminar = function(id){
                                  SweetAlert.swal({
                                            title: "Está seguro de borrar un Rubro?",
                                            type: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#DD6B55",confirmButtonText: "Si",
                                            cancelButtonText: "No",
                                            closeOnConfirm: true,
                                            closeOnCancel: true },                                                                                                                           
                                         function(isConfirm){ 
                                            if (isConfirm){
                                                    
                                                    var data = {
                                                    id: id,
                                                    activo: -1
                                                    };

                                                    blockUI.start();
                                                    $http.put('/api/genrubros/'+id+'.json',data).success(function(data){              
                                                      blockUI.stop();  
                                                      SweetAlert.swal("Borrado!", "El rubro ha sido eliminado", "success");               
                                                      $state.go('index.rubroInicial');
                                                      reloadData(); 
                                                    });
                                            }   
                                         });
                            }
}]);

app.controller('rubroEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){
        
         console.log("entra en el editar");
         console.log($stateParams.id);
         blockUI.start();
         var idSector=0;
         $http.get('/api/genrubros/'+$stateParams.id+'.json' ).success(function(data){
                       
                       $scope.rubCodigo    = data.codigo;
                       idSector            = data.id_gen_sector.id;
                       $scope.rubNombre    = data.nombre;
                       $scope.rubOrden     = data.orden;
                       $scope.rubCategoria = data.categoria;
                       var idSector        = data.id_gen_sector.id;

                       if(data.activo==1)
                       {
                         $scope.rubActivo=true;
                       }else{
                         $scope.rubActivo=false;
                       }

                    $http.get('/api/gensectors.json?limit=1500' ).success(function(data){                 
                        $scope.items = data;
                        var pos=0;
                        for (var i = 0; i < data.length; i++) {
                          if(data[i].id==idSector){
                          pos=i;
                          }
                        }

                        $scope.rubSector1 = $scope.items[pos];           
                        blockUI.stop();
                    });
          });

          $scope.modificarRubro = function(){
            
                   var valorActivo=0;
                   if($scope.rubActivo){
                       valorActivo=1;
                   }

                   var data = {
                   id: $stateParams,
                   codigo: $scope.rubCodigo,
                   idGenSector: $scope.rubSector1.id,
                   nombre: $scope.rubNombre,
                   orden: $scope.rubOrden,
                   categoria: $scope.rubCategoria,
                   activo:valorActivo
                   };

              blockUI.start();              
              $http.put('/api/genrubros/'+$stateParams.id+'.json',data)              
              .success(function(data){ 
                 blockUI.stop(); 
                 SweetAlert.swal("Modificado", "Modificado con éxito!", "success");
                 $state.go('index.rubroInicial');                
               })
              .error(function(data){
                 blockUI.stop();
                 SweetAlert.swal("Cacelado", "el codigo ya se encuentra registrado", "error");
              });  
          }

}]);


app.controller('rubroAgregarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){
   
       blockUI.start();
       $http.get('/api/gensectors.json' ).success(function(data){                 
                  $scope.items= data;    
                  $scope.rubSector1 = $scope.items;           
                  blockUI.stop();
        });
                            //hay que inicializar el valor del checkbox antes de mandarlo 
                            $scope.rubActivo=false;
                            $scope.agregarNuevo = function(){
                             var valorActivo=0;
                             if($scope.rubActivo){
                                 valorActivo=1;
                             }
                               var data = {
                               codigo: $scope.rubCodigo,
                               idGenSector: $scope.rubSector1.id,
                               nombre: $scope.rubNombre,
                               orden: $scope.rubOrden,
                               categoria: $scope.rubCategoria,
                               activo:valorActivo
                               };              
                                blockUI.start();
                             $http.post('/api/genrubros.json', data )
                                      .success(function(data){
                                        blockUI.stop();
                                        if(data){
                                            SweetAlert.swal("Agregado", "Ingresado con éxito!", "success");                         
                                            $state.go('index.rubroInicial');  
                                        }else{
                                           SweetAlert.swal("Cancelado", "Algo ha ocurrido", "error");
                                        }
                                      })
                                       .error(function(data){
                                           blockUI.stop();
                                            $scope.rubCodigo = ""; 
                                            $scope.rubNombre = ""; 
                                            $scope.rubOrden = ""; 
                                            $scope.rubCategoria = ""; 
                                            $scope.secActivo=false;
                                           SweetAlert.swal("Cacelado", "el codigo ya se encuentra registrado", "error");
                                      });                                
                            }
}]);














  


 

    