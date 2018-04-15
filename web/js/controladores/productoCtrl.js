app.controller('productoCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile){

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
          $scope.dtOptions = DTOptionsBuilder.fromSource('/api/genproductos.json?order_by[id]=ASC')
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
                             
                            // codigo, nombre, categoria,resolucion, fecharesolucion,idgenrubro                      
          $scope.dtColumns = [  
                             DTColumnBuilder.newColumn('codigo').withTitle('Código'),
                             DTColumnBuilder.newColumn('nombre').withTitle('Nombre'),
                             DTColumnBuilder.newColumn('categoria').withTitle('Categoria'),
                             DTColumnBuilder.newColumn(null).withTitle('Resolucion').notSortable().renderWith(formatoResolucion),
                             DTColumnBuilder.newColumn(null).withTitle('Fecha resolución').notSortable().renderWith(formatoFechaResolucion),
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
                            return "Null";
                            }
                            }

                            function formatoFechaResolucion(data) {
                            if(data.fecha_resolucion!=null){
                            var resfe   = data.fecha_resolucion.split("-");
                            var lafecha = resfe[2]+"/"+resfe[1]+"/"+resfe[0];
                            return lafecha;
                            }else{
                            return "No fecha";
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

                              $scope.activar = function(id){
                                         SweetAlert.swal({
                                            title: "Está seguro de activar la producto?",
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
                                                    $http.put('/api/genproductos/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop(); 
                                                   //$state.go('index.productoInicial');  
                                                    SweetAlert.swal("Activado!", "El producto ha sido activado", "success");   
                                                    $state.go('index.productoInicial'); 
                                                    reloadData();      
                                                    });
                                            }else{

                                            }
                                         });
                            }
 
                            $scope.editar = function(id){
                            $state.go('index.productoEditar',{id:id});
                            }

                            // arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                            $scope.eliminar = function(id){
                                  SweetAlert.swal({
                                            title: "Está seguro de borrar un Producto?",
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
                                                    $http.put('/api/genproductos/'+id+'.json',data).success(function(data){ 
                                                    console.log("El modificado");
                                                    console.log(data);             
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Borrado!", "El sector ha sido eliminado", "success");
                                                    $state.go('index.productoInicial');    
                                                    reloadData();                
                                                    });
                                            }else{
                                            }
                                         });
                            }
                             
}]);


app.controller('productoAgregarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){
   
              console.log("entra al controller agregar");
                  blockUI.start();
                  $http.get('/api/gensectors.json?limit=1000')
                  .success(function(data1){                  
                    $scope.items1  = data1;    
                    $scope.proSec1 = $scope.items1;                            
                  });
                  blockUI.stop();

                  $scope.listarChosenSector = function(){
                    if(typeof $scope.proSec1 != 'undefined'){
                      blockUI.start();
                      $http.get('/api/genrubros.json?filters[idGenSector]='+$scope.proSec1.id+'').success(function(data2){                  
                        $scope.items     = data2;    
                        $scope.proRubro1 = $scope.items[1];  
                        blockUI.stop();
                      });
                    }
                  } 
                        
                            //hay que inicializar el valor del checkbox antes de mandarlo 
                            $scope.proActivo=false;
                               $scope.agregarNuevo = function(){
                               var valorActivo=0;
                               if($scope.proActivo){
                                   valorActivo=1;
                               }
                               
                               var obj1    = moment($scope.proFech);
                               var fecha1  = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
                               var fechare = fecha1.toString();

                               var data = {
                               codigo: $scope.proCod,
                               nombre: $scope.proNom,
                               categoria: $scope.proCat,
                               idGenRubro: $scope.proRubro1.id,
                               resolucion: $scope.proRes,
                               fechaResolucion: fechare,
                               activo:valorActivo
                               }; 

                                  blockUI.start();
                                  $http.post('/api/genproductos.json',data)
                                  .success(function(data){
                                    blockUI.stop();
                                    if(data){
                                      SweetAlert.swal("Agregado", "Ingresado con éxito!", "success");                         
                                      $state.go('index.productoInicial');  
                                    }else{
                                      SweetAlert.swal("Cancelado", "Algo ha ocurrido", "error");
                                    }
                                  })
                                   .error(function(data){
                                      blockUI.stop();
                                      $scope.proCod= "";
                                      $scope.proNom= "";
                                      $scope.proCat= "";
                                      $scope.proRes= "";
                                      SweetAlert.swal("Cacelado", "el codigo ya se encuentra registrado", "error");
                                  });                                
                            }
}]);


app.controller('productoEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){

          

          console.log("producto Editar");       
          blockUI.start();
          var idSector;
          var idRubro;
          $http.get('/api/genproductos/'+$stateParams.id+'.json' )
          .success(function(data){

          $scope.proCod  = data.codigo;
          $scope.proNom  = data.nombre;
          $scope.proCat  = data.categoria;
          $scope.proRes  = data.resolucion;
          $scope.proFech = data.fecha_resolucion;
          idRubro        = data.id_gen_rubro.id; 
          idSector       = data.id_gen_rubro.id_gen_sector.id; 

          if(data.activo  == 1){
          $scope.proActivo = true;
          }else{
          $scope.proActivo = false;
          }
              
              $http.get('/api/gensectors.json?limit=1000')
              .success(function(data3){                  
                        var elSector;
                          for(var k in data3) {
                            if (data3[k].id == idSector) {   
                                elSector= k;
                                console.log("entra al asunto de la rubros");
                                console.log(elSector);
                                break;                      
                            }
                          }

              $scope.items1     = data3;    
              $scope.proSec1 =  $scope.items1[elSector]; 
              console.log(data3);
              console.log("esto es antes de los rubros");
                      $http.get('/api/genrubros.json?filters[idGenSector]='+idSector+'')
                        .success(function(data1){ 
                          console.log(data1);
                        var elRubro;
                          for(var k in data1) {
                            if (data1[k].id == idRubro) {   
                                elRubro= k;
                                console.log("entra al asunto de la rubros");
                                console.log(elRubro);
                                break;                      
                            }
                          }

                          $scope.items     = data1;  
                          $scope.proRubro1 = $scope.items[elRubro];                               
                      });                          
              });                    
          });
          blockUI.stop();


          $scope.listarChosenSector = function(){
                if(typeof $scope.proSec1 != 'undefined'){
                  blockUI.start();
                  $http.get('/api/genrubros.json?filters[idGenSector]='+$scope.proSec1.id+'').success(function(data2){                  
                    $scope.items     = data2;    
                    $scope.proRubro1 = $scope.items[1];  
                    blockUI.stop();
                  });
                }
          } 

        $scope.modificarProducto = function(){
         
               var valorActivo=0;
               if($scope.proActivo){
                   valorActivo=1;
               }
               
               console.log("esta deberia ser la fecha cambiada");
               console.log($scope.proFech);
               console.log($scope.proFech);
               var obj1    = moment($scope.proFech);
               var fecha1  = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
               var fechare = fecha1.toString();
               console.log(fechare);

               var data = {
               id:$stateParams.id,
               codigo: $scope.proCod,
               nombre: $scope.proNom,
               categoria: $scope.proCat,
               idGenRubro: $scope.proRubro1.id,
               resolucion: $scope.proRes,
               fechaResolucion: fechare,
               activo:valorActivo
               }; 

              blockUI.start();
              $http.put('/api/genproductos/'+$stateParams.id+'.json',data)               
               .success(function(data){ 
                blockUI.stop();      
                SweetAlert.swal("Modificado","Modificado con éxito!","success");   
                $state.go('index.productoInicial');        
               })
               .error(function(data){
               blockUI.stop();
               SweetAlert.swal("Cacelado","La compañia ya se encuentra registrada","error");
              });
          }

}]);





