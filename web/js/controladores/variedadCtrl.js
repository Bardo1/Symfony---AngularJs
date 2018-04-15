app.controller('variedadCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile){

        console.log("variedadCtrl...");
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
          $scope.dtOptions = DTOptionsBuilder.fromSource('/api/genvariedads.json?order_by[id]=ASC')
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
                           DTColumnBuilder.newColumn('codigo').withTitle('Codigo'),
                           DTColumnBuilder.newColumn('nombre').withTitle('Nombre'),
                           DTColumnBuilder.newColumn(null).withTitle('Fecha nuevo producto').notSortable().renderWith(formatoFecha),
                           DTColumnBuilder.newColumn('id_gen_producto.nombre').withTitle('Producto'),
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

                            function formatoFecha(data) {
                            // console.log(data.fecha_producto_nuevo);
                            if(data.fecha_producto_nuevo!=null){
                            var obj1 = moment(data.fecha_producto_nuevo).format('DD/MM/YYYY');
                            return obj1;
                            }else{
                            return "No fecha";
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
                                            title: "Está seguro de activar la Variedad?",
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
                                                    $http.put('/api/genvariedads/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Activado!", "La Variedad ha sido activado", "success");
                                                    $state.go('index.variedadInicial');  
                                                    reloadData();             
                                                    });
                                            }else{

                                            }
                                         });
                            }
 
                            $scope.editar = function(id){
                            $state.go('index.variedadEditar',{id:id});
                            }

                            // arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                            $scope.eliminar = function(id){
                                  SweetAlert.swal({
                                            title: "Está seguro de borrar una Variedad?",
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
                                                    $http.put('/api/genvariedads/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Borrado!", "La variedad ha sido eliminada", "success");
                                                    $state.go('index.variedadInicial'); 
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

app.controller('variedadAgregarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){
   
  console.log("variedad agregar ctrl");

                  blockUI.start();
                  $http.get('/api/genproductos.json?limit=1000')
                  .success(function(data1){                  
                    $scope.items1  = data1;    
                    $scope.varPro1 = $scope.items1;                            
                  });
                  blockUI.stop();
   
                            //hay que inicializar el valor del checkbox antes de mandarlo 
                            $scope.varActivo=false;
                               $scope.agregarNuevo = function(){
                               var valorActivo=0;
                               if($scope.varActivo){
                                   valorActivo=1;
                               }

                               var obj1    = moment($scope.varFech);
                               var fecha1  = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
                               var fechare = fecha1.toString();

                               var data = {
                               codigo: $scope.varCod,
                               nombre: $scope.varNom,
                               fechaProductoNuevo:fechare,
                               idGenProducto:$scope.varPro1.id,
                               activo:valorActivo
                               }; 
                               
                               console.log("Eso fué el data");
                               console.log(data);
                                  blockUI.start();
                                  $http.post('/api/genvariedads.json',data)
                                  .success(function(data){
                                    blockUI.stop();
                                    if(data){
                                      SweetAlert.swal("Agregado", "Ingresado con éxito!", "success");                         
                                      $state.go('index.variedadInicial');  
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

app.controller('variedadEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){

         blockUI.start();
         $http.get('/api/genvariedads/'+$stateParams.id+'.json' ).success(function(data){
             console.log(data);
             //var elrut      = data.id.toString() + data.dv;
             $scope.varCod    = data.codigo;
             $scope.varNom    = data.nombre;
             $scope.varFech   = data.fecha_producto_nuevo;
             //id_gen_producto
             idProducto = data.id_gen_producto.id;
             console.log("el id");
             console.log(data.id_gen_producto.id);
             $scope.varPro1   = data.nombre;
             if(data.activo   == 1){
             $scope.varActivo = true;
             }else{
             $scope.varActivo = false;
             }
             blockUI.stop();

             $http.get('/api/genproductos.json?limit=1000')
              .success(function(data3){ 
                var elProducto;
                for(var k in data3) {
                  if (data3[k].id == idProducto) {   
                      elProducto= k;
                      break;                      
                  }
                }

              console.log("Esta es la posición");
              console.log(elProducto);
              $scope.items1  = data3;    
              $scope.varPro1 =  $scope.items1[elProducto]; 

             });
         });
  $scope.modificarVariedad = function(){
     
        var valorActivo = 0;
        if($scope.varActivo){
           valorActivo = 1;
        }
        console.log($scope.varFech);
                                
        var data  = {
        id:$stateParams.id,
        codigo:$scope.varCod,
        nombre:$scope.varNom,
        fechaProductoNuevo:$scope.varFech,
        idGenProducto:$scope.varPro1.id,
        activo:valorActivo
        };

        blockUI.start();
        $http.put('/api/genvariedads/'+$stateParams.id+'.json',data)               
         .success(function(data){ 
          blockUI.stop();      
          SweetAlert.swal("Modificado","Modificado con éxito!","success");   
          $state.go('index.variedadInicial');        
         })
         .error(function(data){
         blockUI.stop();
         SweetAlert.swal("Cacelado","La compañia ya se encuentra registrada","error");
        });
  }
}]);