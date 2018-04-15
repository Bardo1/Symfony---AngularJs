app.controller('regionCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile){

        console.log("regionCtrl...");
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
          $scope.dtOptions = DTOptionsBuilder.fromSource('/api/genregions.json?order_by[id]=ASC')
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
                         
                          //codigo, nombre,romano, orden
          $scope.dtColumns = [  
                           DTColumnBuilder.newColumn('nombre').withTitle('Nombre'),
                           DTColumnBuilder.newColumn('romano').withTitle('Numero'),
                           DTColumnBuilder.newColumn('orden').withTitle('Orden'),
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
                                            title: "Está seguro de activar la Region?",
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
                                                    $http.put('/api/genregions/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();
                                                    SweetAlert.swal("Activado!", "La region ha sido activado", "success");
                                                    $state.go('index.regionInicial'); 
                                                    reloadData();                
                                                    });
                                            }else{

                                            }
                                         });
                            }
 
                            $scope.editar = function(id){
                            $state.go('index.regionEditar',{id:id});
                            }

                            // arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                            $scope.eliminar = function(id){
                                     SweetAlert.swal({
                                        title: "Está seguro de borrar una Region?",
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
                                                $http.put('/api/genregions/'+id+'.json',data).success(function(data){              
                                                blockUI.stop(); 
                                                SweetAlert.swal("Borrado!", "La Region ha sido eliminada", "success");                                                                   
                                                $state.go('index.regionInicial');
                                                reloadData();
                                                });
                                        } 
                                     });
                            } 
}]);




app.controller('regionAgregarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){
   
      console.log("entra al controller agregar");  

           $scope.regActivo=false;
           $scope.agregarNuevo = function(){
           var valorActivo=0;
           if($scope.regActivo){
               valorActivo=1;
           }
           
            var data = {
            codigo:$scope.regCod,
            nombre:$scope.regNom,
            romano:$scope.regRomano,
            orden:$scope.regOrd,
            activo:valorActivo
            }; 

            blockUI.start();
            $http.post('/api/genregions.json',data)
            .success(function(data){
              blockUI.stop();
              if(data){
                SweetAlert.swal("Agregado", "Ingresado con éxito!", "success");                         
                $state.go('index.regionInicial');  
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


app.controller('regionEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){


          console.log("region  Editar");       
          blockUI.start();
          var idSector;
          var idRubro;
          $http.get('/api/genregions/'+$stateParams.id+'.json' )
          .success(function(data){
          console.log(data);
          $scope.regCod    = data.codigo;
          $scope.regNom    = data.nombre;
          $scope.regRomano = data.romano;
          $scope.regOrd    = data.orden;
          if(data.activo  == 1){
          $scope.regActivo = true;
          }else{
          $scope.regActivo = false;
          }

          });

          blockUI.stop();

        $scope.modificarRegion = function(){
         
             var valorActivo=0;
             if($scope.proActivo){
                 valorActivo=1;
             }
               
             var obj1    = moment($scope.proFech);
             var fecha1  = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
             var fechare = fecha1.toString();
             var data = {
             codigo:$scope.regCod,
             nombre:$scope.regNom,
             romano:$scope.regRomano,
             orden:$scope.regOrd,
             activo:valorActivo
             }; 

              blockUI.start();
              $http.put('/api/genregions/'+$stateParams.id+'.json',data)               
               .success(function(data){ 
                blockUI.stop();      
                SweetAlert.swal("Modificado","Modificado con éxito!","success");   
                $state.go('index.regionInicial');        
               })
               .error(function(data){
               blockUI.stop();
               SweetAlert.swal("Cacelado","La region ya se encuentra registrada","error");
              });
          }

}]);


