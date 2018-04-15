app.controller('vectorCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile){

        console.log("vectorCtrl...");
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
          $scope.dtOptions = DTOptionsBuilder.fromSource('/api/nsvectors.json?order_by[id]=ASC')
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
                         
                         // nombre,columna,prioridad,ns, operador, idGenRubro
          $scope.dtColumns = [  
                           DTColumnBuilder.newColumn('nombre').withTitle('nombre'),
                           DTColumnBuilder.newColumn('columna').withTitle('columna'),
                           DTColumnBuilder.newColumn(null).withTitle('Prioridad').notSortable().renderWith(formatoPrioridad),
                           DTColumnBuilder.newColumn('ns').withTitle('Ns'),
                           DTColumnBuilder.newColumn(null).withTitle('Operador').notSortable().renderWith(formatoOperador),
                           DTColumnBuilder.newColumn('id_gen_rubro.nombre').withTitle('Rubro'),
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

                            function formatoPrioridad(data) {
                            if(data.prioridad!=null){
                            return data.prioridad;
                            }else{
                            return "No ingresada";
                            }
                            }

                            function formatoOperador(data) {
                            if(data.operador!=null){
                            return data.operador;
                            }else{
                            return "No ingresado";
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
                                            title: "Está seguro de activar el vector?",
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
                                                    $http.put('/api/nsvectors/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Activado!", "El vector ha sido activado", "success");
                                                    $state.go('index.vectorInicial'); 
                                                    reloadData();              
                                                    });
                                            }else{

                                            }
                                         });
                            }
 
                            $scope.editar = function(id){
                            $state.go('index.vectorEditar',{id:id});
                            }

                            // arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                            $scope.eliminar = function(id){
                                  SweetAlert.swal({
                                            title: "Está seguro de borrar un vector?",
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
                                                    $http.put('/api/nsvectors/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Borrado!", "El sector ha sido eliminado", "success");
                                                    $state.go('index.vectorInicial'); 
                                                    reloadData();               
                                                    });
                                            }else{

                                            }
                                         });
                            }
                            
                        
}]);


app.controller('vectorAgregarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){

          console.log("entra al controller agregar");
          blockUI.start();
          $http.get('/api/gensectors.json')
          .success(function(data1){                  
                $scope.items      = data1;    
                $scope.vecSector1 = $scope.items;                            
          });         
     
          blockUI.stop();         
          $scope.cambiarRubro = function(){
                if(typeof $scope.vecSector1 != 'undefined'){
                    blockUI.start();
                    $http.get('/api/genrubros.json?filters[idGenSector]='+$scope.vecSector1.id+'').success(function(data2){                       
                      $scope.items1    = data2;
                      $scope.vecRubro1 = $scope.items1[1];  
                      blockUI.stop();  
                    });
                }
          } 

                            //hay que inicializar el valor del checkbox antes de mandarlo 
                            $scope.vecActivo=false;
                               $scope.agregarNuevo = function(){
                               var valorActivo=0;
                               if($scope.vecActivo){
                                   valorActivo=1;
                               }

                               var data = {
                                nombre:$scope.vecNom,
                                columna:$scope.vecCol,
                                prioridad:$scope.vecPrio,
                                ns:$scope.vecNs,
                                operador:$scope.vecOper,
                                idGenRubro:$scope.vecRubro1.id,
                                activo:valorActivo
                               }; 

                               console.log("esto es el data");
                               console.log(data);
                                  blockUI.start();
                                  $http.post('/api/nsvectors.json',data)
                                  .success(function(data){
                                    blockUI.stop();
                                    if(data){
                                    SweetAlert.swal("Agregado", "Ingresado con éxito!", "success");                         
                                    $state.go('index.vectorInicial');  
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


app.controller('vectorEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){

          console.log("entra al controller editar");         
  
         blockUI.start();
         $http.get('/api/nsvectors/'+$stateParams.id+'.json' ).success(function(data){
              
              console.log(data);

              if(data.activo == 1){
              $scope.vecActivo = true;
              }else{
              $scope.vecActivo = false;
              }

              $scope.vecNom  = data.nombre;
              $scope.vecCol  = data.columna;
              $scope.vecPrio = data.prioridad;
              $scope.vecNs   = data.ns;
              $scope.vecOper = data.operador;
              idRubro        = data.id_gen_rubro.id; 
              idSector       = data.id_gen_rubro.id_gen_sector.id; 
                  
                  $http.get('/api/gensectors.json?limit=1000')
                  .success(function(data3){                  
                            var elSector;
                              for(var k in data3) {
                                if (data3[k].id == idSector) {   
                                    elSector= k;
                                    break;                      
                                }
                              }

                  $scope.items     = data3;    
                  $scope.vecSector1 =  $scope.items[elSector];

                          $http.get('/api/genrubros.json?filters[idGenSector]='+idSector+'&limit=1000')
                            .success(function(data1){ 
                              console.log(data1);
                              var elRubro;
                              for(var k in data1) {
                                if (data1[k].id == idRubro) {   
                                    elRubro= k;
                                    break;                      
                                }
                              }
                              $scope.items1     = data1;  
                              $scope.vecRubro1 = $scope.items1[elRubro];                               
                          });                          
                  });                
             blockUI.stop();
         });

        $scope.cambiarRubro = function(){
          if(typeof $scope.vecSector1 != 'undefined'){
              blockUI.start();
              $http.get('/api/genrubros.json?filters[idGenSector]='+$scope.vecSector1.id+'').success(function(data2){                       
                $scope.items1    = data2;
                $scope.vecRubro1 = $scope.items1[1];  
                blockUI.stop();  
              });
          }
        } 


        $scope.modificarVector = function(){
              var valorActivo = 0;
              if($scope.vecActivo){
              valorActivo=1;
              }

              var data = {
              nombre:$scope.vecNom,
              columna:$scope.vecCol,
              prioridad:$scope.vecPrio,
              ns:$scope.vecNs,
              operador:$scope.vecOper,
              idGenRubro:$scope.vecRubro1.id,
              activo:valorActivo
              }; 

              blockUI.start();
              $http.put('/api/nsvectors/'+$stateParams.id+'.json',data)               
               .success(function(data){ 
                blockUI.stop();      
                SweetAlert.swal("Modificado","Modificado con éxito!","success");   
                $state.go('index.vectorInicial');        
               })
               .error(function(data){
               blockUI.stop();
               SweetAlert.swal("Cacelado","El vector ya se encuentra registrado","error");
              });
          }

}]);
