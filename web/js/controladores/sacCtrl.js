app.controller('sacCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile){
      
        console.log("sacCtrl...");
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
        $scope.dtOptions = DTOptionsBuilder.fromSource('/api/gensacs.json?order_by[id]=ASC')
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
                         DTColumnBuilder.newColumn('codigo').withTitle('codigo'),                     
                         DTColumnBuilder.newColumn('nombre').withTitle('Sac'),
                         DTColumnBuilder.newColumn('id_gen_comuna.nombre').withTitle('Comuna'),
                         DTColumnBuilder.newColumn('iddac').withTitle('iddac'),
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
                                            title: "Está seguro de activar el Sac?",
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
                                                    $http.put('/api/gensacs/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Activado!", "El Sac ha sido activado", "success");
                                                    $state.go('index.sacInicial'); 
                                                    reloadData();               
                                                    });
                                            }else{

                                            }
                                         });
                            }
 
                          $scope.editar = function(id){
                            $state.go('index.sacEditar',{id:id});
                          }

                           $scope.agregar = function(){
                            $state.go('index.sacAgregar');
                          }         
                          
                          // arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                          $scope.eliminar = function(id){
                                SweetAlert.swal({
                                          title: "Está seguro de borrar un Sac?",
                                          type: "warning",
                                          showCancelButton: true,
                                          confirmButtonColor: "#DD6B55",confirmButtonText: "Si",
                                          cancelButtonText: "No",
                                          closeOnConfirm: false,
                                          closeOnCancel: true },                                                                  
                                       function(isConfirm){    
                                          if(isConfirm){ 
                                                  var data = {
                                                  id: id,
                                                  activo: -1
                                                  };          
                                                  blockUI.start();                                          
                                                  $http.put('/api/gensacs/'+id+'.json',data).success(function(data){              
                                                  blockUI.stop();  
                                                  SweetAlert.swal("Borrado!", "El Sac ha sido eliminado", "success");                
                                                  $state.go('index.sacInicial'); 
                                                  reloadData(); 
                                                  });
                                          }     
                                       });   
                              }                               
}]);

app.controller('sacEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){
          
          console.log("Sac Editar");       
          blockUI.start();
          var idComuna;
          var idRegion;
          $http.get('/api/gensacs/'+$stateParams.id+'.json' )
          .success(function(data){
          $scope.sacCodigo = data.codigo; 
          $scope.sacNombre = data.nombre; 
          $scope.sacIddac  = data.iddac;
          idComuna         = data.id_gen_comuna.id; 
          idRegion         = data.id_gen_comuna.id_gen_region.id; 
          console.log("este es el data");
          console.log(data.activo);
          if(data.activo  == 1){
          $scope.sacActivo = true;
          }else{
          $scope.sacActivo = false;
          }
              
              $http.get('/api/genregions.json')
              .success(function(data3){ 

                  var laRegion;
                  for(var k in data3) {
                    if (data3[k].id == idRegion) {   
                        laRegion= k;
                        break;                      
                    }
                  }


              $scope.items3     = data3;    
              $scope.sacRegion1 =  $scope.items3[laRegion]; 
              console.log("esto es antes de las comunas");
                      $http.get('/api/gencomunas.json?filters[idGenRegion]='+idRegion+'')
                        .success(function(data1){ 
                        var laComuna;
                          for(var k in data1) {
                            if (data1[k].id == idComuna) {   
                                laComuna= k;
                                console.log("entra al asunto de la Comuna");
                                console.log(laComuna);
                                break;                      
                            }
                          }
                          $scope.items1     = data1;  
                          $scope.sacComuna1 = $scope.items1[laComuna];                               
                      });                          
              });                    
          });
          blockUI.stop();

          $scope.listarChosenComunas = function(){
            blockUI.start();
            console.log("el editar no funcionó");
            if(typeof $scope.sacRegion1 != 'undefined'){
              console.log($scope.sacRegion1.id);
               $http.get('/api/gencomunas.json?filters[idGenRegion] ='+$scope.sacRegion1.id+'').success(function(data1){                       
                  $scope.items1     = data1;    
                  $scope.sacComuna1 = $scope.items1[0];  
               });
            }
            blockUI.stop();
          }
          
          $scope.modificarSac = function(){
              var valorActivo = 0;
              if($scope.sacActivo){
              valorActivo     = 1;
              }

              var data = {
              id: $stateParams.id,
              codigo:$scope.sacCodigo,
              nombre:$scope.sacNombre,
              iddac:$scope.sacIddac,
              idGenComuna:$scope.sacComuna1.id,
              activo:valorActivo
              };

              blockUI.start();
              $http.put('/api/gensacs/'+$stateParams.id+'.json',data)
              .success(function(data){
                SweetAlert.swal("Modificado", "Modificado con éxito!", "success");
                blockUI.stop(); 
                $state.go('index.sacInicial');
              })
              .error(function(data){
                blockUI.stop();
                SweetAlert.swal("Cacelado", "el código ya se encuentra registrado", "error");
              });
          }
}]);


app.controller('sacAgregarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){

          console.log("entro en el agregar");    
          blockUI.start();  
          $http.get('/api/genregions.json' ).success(function(data3){                    
            $scope.items3    = data3;    
            $scope.sacRegion1 =  $scope.items3; //$scope.items3[0];                            
          });
          blockUI.stop();

          $scope.listarChosenComunas = function(){            
           console.log($scope.sacRegion1);
           if(typeof $scope.sacRegion1 != 'undefined'){
               $http.get('/api/gencomunas.json?filters[idGenRegion]='+$scope.sacRegion1.id+'').success(function(data1){                       
                  $scope.items1     = data1;    
                  $scope.sacComuna1 = $scope.items1[0]; 
               });              
            }
          }
          
          $scope.sacActivo=false;
          $scope.agregarNuevo = function(){
                    
                    var valorActivo = 0;
                    if($scope.sacActivo){
                    valorActivo = 1;
                    }else{
                    valorActivo = 0;
                    }  

                    var data = {
                    codigo:$scope.sacCodigo,
                    nombre:$scope.sacNombre,
                    iddac:$scope.sacIddac,
                    idGenComuna:$scope.sacComuna1.id,
                    activo:valorActivo                
                    };

                    blockUI.start();
                    $http.post('/api/gensacs.json',data)
                    .success(function(data){
                      blockUI.stop();
                      if(data){                 
                          $scope.sacCodigo = ""; 
                          $scope.sacNombre = ""; 
                          $scope.sacIddac  = "";
                          SweetAlert.swal("Agregado", "Ingresado con éxito!", "success");   
                          $state.go('index.sacInicial'); 
                      }else{
                         SweetAlert.swal("Cancelado", "Algo ha ocurrido", "error");
                      }
                    })
                     .error(function(data){
                          blockUI.stop();
                          $scope.sacCodigo = ""; 
                          $scope.sacNombre = ""; 
                          $scope.sacIddac  = ""; 
                          SweetAlert.swal("Cacelado", "el codigo ya se encuentra registrado", "error");
                    });        
          }

}]);








 

    
