app.controller('primaCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile){

                console.log("primaCtrl...");
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
          $scope.dtOptions = DTOptionsBuilder.fromSource('lista_primas')
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
                         

         //tipoPrima, rutBeneficiario, moneda, descripcion,tipoValor,valor1, valor2, 
         $scope.dtColumns = [ 
                             DTColumnBuilder.newColumn('tipoPrima').withTitle('Tipo prima'),
                             DTColumnBuilder.newColumn(null).withTitle('Nombre beneficiario').notSortable().renderWith(formatoBeneficiario),
                             DTColumnBuilder.newColumn('moneda').withTitle('Moneda'),
                             DTColumnBuilder.newColumn('rubro').withTitle('Rubro'),
                             DTColumnBuilder.newColumn(null).withTitle('Tipo valor').notSortable().renderWith(formatoTipoValor),
                             DTColumnBuilder.newColumn('valor1').withTitle('valor 1'),
                             DTColumnBuilder.newColumn('valor2').withTitle('valor 2'),
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

                            function reloadData(){
                            $scope.dtInstance.reloadData();
                            }
          
                            function actionsHtml(data, type, full, meta){ 
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
                                            title: "Está seguro de activar la prima?",
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
                                                    $http.put('/api/genprimas/'+id+'.json',data).success(function(data){            
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Activado!", "La prima ha sido activado", "success");
                                                    $state.go('index.primaInicial');  
                                                    reloadData();             
                                                    });
                                            }else{

                                            }
                                         });
                            }
                                                        

                            function formatoBeneficiario(data, type, full, meta) {                             
                               if(!data.nombreBeneficiario){
                                  return 'Sin Beneficiario';
                               }else{
                                  return data.nombreBeneficiario;
                               }
                            }

                            function formatoTipoValor(data){                       
                                if(data.tipoValor=='F'){
                                  return 'Fija';
                                }
                                if(data.tipoValor=='R'){
                                  return 'Rango';
                                }
                            }
                            
                            $scope.editar = function(id){
                            $state.go('index.primaEditar',{id:id});
                            }

                            // arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                            $scope.eliminar = function(id){
                                  SweetAlert.swal({
                                            title: "Está seguro de borrar la prima?",
                                            type: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#DD6B55",confirmButtonText: "Si",
                                            cancelButtonText: "No",
                                            closeOnConfirm: true,
                                            closeOnCancel: true }, 
                                                                                                                           
                                         function(isConfirm){
                                            if(isConfirm){
                                                    var data1= {
                                                    id: id,
                                                    activo:-1
                                                    }

                                                    blockUI.start();
                                                    $http.put('/api/genprimas/'+id+'.json',data1).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Borrado!", "La prima ha sido eliminada", "success");
                                                    $state.go('index.primaInicial'); 
                                                    reloadData();               
                                                    });
                                            }else{

                                            }
                                         });
                            }
}]);


app.controller('primaAgregarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){
   
          console.log("entra al controller agregar");
          blockUI.start();
          $http.get('/api/gencompanias.json?limit=1500').success(function(data2){                 
               $scope.items2  = data2;  
               $scope.priCam1 = $scope.items2;                
          });
          $http.get('/api/gensectors.json')
          .success(function(data1){                  
                $scope.items      = data1;    
                $scope.priSector1 = $scope.items;                            
          });         
          blockUI.stop();
         
          $scope.cambiarRubro = function(){
                if(typeof $scope.priSector1 != 'undefined'){
                    blockUI.start();
                    $http.get('/api/genrubros.json?filters[idGenSector]='+$scope.priSector1.id+'').success(function(data2){                       
                      $scope.items1    = data2;
                      $scope.priRubro1 = $scope.items1[1];  
                      blockUI.stop();  
                    });
                }
          } 
                            //hay que inicializar el valor del checkbox antes de mandarlo 
                               $scope.priActivo=false;
                               $scope.agregarNuevo = function(){
                               var valorActivo=0;
                               if($scope.priActivo){
                                   valorActivo=1;
                               }

                               var obj1    = moment($scope.priFeRe);
                               var fecha1  = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
                               var fechare = fecha1.toString();
                               
                               var data = {
                               tipoPrima: $scope.priTipPri1,
                               rutBeneficiario: $scope.priRutBe,
                               moneda: $scope.priMon1,
                               descripcion: $scope.priDes,
                               tipoValor:$scope.priTipVal1,
                               valor1:$scope.priVal1,
                               valor2:$scope.priVal2,
                               resolucion:$scope.priRes,
                               fechaResolucion:fechare,
                               idGenRubro:$scope.priRubro1.id,
                               idGenCompania:$scope.priCam1.id,
                               activo:valorActivo
                               }; 

                               console.log("esto es el data");
                               console.log(data);

                                  blockUI.start();
                                  $http.post('/api/genprimas.json',data)
                                  .success(function(data){
                                    blockUI.stop();
                                    if(data){
                                    SweetAlert.swal("Agregado", "Ingresado con éxito!", "success");                         
                                    $state.go('index.primaInicial');  
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


app.controller('primaEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){

        console.log("entra al controller editar"); 
         $scope.cambiarRubro = function(){
                if(typeof $scope.priSector1 != 'undefined'){
                    blockUI.start();
                    $http.get('/api/genrubros.json?filters[idGenSector]='+$scope.priSector1.id+'').success(function(data2){                       
                      $scope.items1    = data2;
                      $scope.priRubro1 = $scope.items1[1];  
                      blockUI.stop();  
                    });
                }
          } 

          //moneda
          $scope.items4 = [{"id":"01","nombre":"UF"},  
                          {"id":"02","nombre":"UD"}];
          //Tipo Prima
          $scope.items5 = [{"id":"01","nombre":"Prima Fija"},  
                          {"id":"02","nombre":"Prima Neta Minima"}];
          //Tipo Valor
          $scope.items6 = [{"id":"01","nombre":"Rango"},  
                          {"id":"02","nombre":"Fija"}];

          blockUI.start();
          $http.get('/api/genprimas/'+$stateParams.id+'.json' ).success(function(data){

          var valMon;
          var valTipPri;
          var valTipVal;   
          if(data.moneda =="UF"){
            valMon=0; 
          }
          if(data.moneda =="UD"){
            valMon=1;
          }
          if(data.tipo_prima=="PF"){
            valTipPri=0;
          }
          if(data.tipo_prima=="PNM"){
            valTipPri=1;
          }
          if(data.tipo_valor=="R"){
             valTipVal=0;
          }          
          if(data.tipo_valor=="F"){
             valTipVal=1;
          }

          
          $scope.priTipPri1 = $scope.items5[valTipPri];
          $scope.priMon1    = $scope.items4[valMon];
          $scope.priTipVal1 = $scope.items6[valTipVal];

          idCompania        = data.id_gen_compania.id;
               $http.get('/api/gencompanias.json')
                .success(function(data1){
                  var laCompania;
                              for(var k in data1) {
                                if (data1[k].id == idCompania) {   
                                    laCompania= k;
                                    break;                      
                                }
                              }

                  $scope.items2  = data1;       
                  $scope.priCam1 = $scope.items2[laCompania]; 
                });

             var obj1          = moment(data.fecha_resolucion);
             var fecha1        = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
             var fechare       = fecha1.toString();

             $scope.priRutBe   = data.rut_beneficiario,
             $scope.priDes     = data.descripcion;
             $scope.priVal1    = data.valor1;
             $scope.priVal2    = data.valor2;
             $scope.priRes     = data.resolucion;
             $scope.priFeRe    = fechare;

             idRubro           = data.id_gen_rubro.id; 
             idSector          = data.id_gen_rubro.id_gen_sector.id;
             idCompania        = data.id_gen_compania.id;
                  
              $http.get('/api/gensectors.json?limit=1000')
                  .success(function(data3){                  
                            var elSector;
                              for(var k in data3) {
                                if (data3[k].id == idSector) {   
                                    elSector= k;
                                    break;                      
                                }
                              }

                  $scope.items      = data3;    
                  $scope.priSector1 = $scope.items[elSector];

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

                              $scope.items1    = data1;  
                              $scope.priRubro1 = $scope.items1[elRubro];                               
                          });                          
                  });  

             blockUI.stop();
         });


        $scope.modificarPrima = function(){

               var valorActivo = 0;
               if($scope.priActivo){
                 valorActivo = 1;
               }

               var obj1    = moment($scope.priFeRe);
               var fecha2  = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
               var fechare = fecha2.toString();
               var valMon;
               var valTipPri;
               var valTipVal;  
              
               console.log("La moneda");
               console.log($scope.priMon1.nombre);
               console.log("el tipo prima");
               console.log($scope.priTipPri1.nombre);

               if($scope.priMon1.nombre=="UF"){
                valMon="UF"; 
               }
               if($scope.priMon1.nombre=="UD"){
                valMon="UD";
               }
               if($scope.priTipPri1.nombre=="Prima Fija"){
                valTipPri="PF";
               }
               if($scope.priTipPri1.nombre=="Prima Neta Minima"){
                valTipPri="PNM";
               }
               if($scope.priTipVal1.nombre=="Rango"){
                 valTipVal="R";
               }          
               if($scope.priTipVal1.nombre=="Fija"){
                 valTipVal="F";
               }

               var data = {
               tipoPrima: valTipPri,
               rutBeneficiario: $scope.priRutBe,
               moneda: valMon,
               descripcion: $scope.priDes,
               tipoValor:valTipVal,
               valor1:$scope.priVal1,
               valor2:$scope.priVal2,
               resolucion:$scope.priRes,
               fechaResolucion:fechare,
               idGenRubro:$scope.priRubro1.id,
               idGenCompania:$scope.priCam1.id,
               activo:valorActivo
               }; 

               console.log("Esto es el data");
               console.log(data);

               blockUI.start(); 
               $http.put('/api/genprimas/'+$stateParams.id+'.json',data)               
               .success(function(data){ 
                blockUI.stop();      
                SweetAlert.swal("Modificado","Modificado con éxito!","success");   
                $state.go('index.primaInicial');        
               })
               .error(function(data){
               blockUI.stop();
               SweetAlert.swal("Cacelado","La prima ya se encuentra registrada","error");
              });
          }

}]);
