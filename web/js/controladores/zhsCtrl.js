app.controller('zhsCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile){

                console.log("zhsCtrl...");

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
                $scope.dtOptions = DTOptionsBuilder.fromSource('/api/nszhs.json?order_by[id]=ASC')
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
                                            title: "Está seguro de activar la Zhs?",
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
                                                    $http.put('/api/nszhs/'+id+'.json',data).success(function(data){              
                                                    blockUI.stop();  
                                                    SweetAlert.swal("Activado!", "La Zhs ha sido activada", "success");
                                                    $state.go('index.zhsInicial');  
                                                    reloadData();             
                                                    });
                                            }else{

                                            }
                                         });
                            }
 
 
                            $scope.editar = function(id,codigo){  
                              console.log(codigo);
                              var obj = {id: id,codigo:codigo};                            
                              $state.go('index.wizardEditar.step_one',{id: id,codigo:codigo});
                              // $state.go('index.wizardEditar.step_one');
                            }

                            // Arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                            $scope.eliminar = function(id){
                                  SweetAlert.swal({
                                            title: "Está seguro de borrar el zhs?",
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
                                               $http.put('/api/nszhs/'+id+'.json',data).success(function(data){              
                                               blockUI.stop(); 
                                               SweetAlert.swal("Borrado!", "El zhs ha sido eliminado", "success");               
                                               $state.go('index.zhsInicial');
                                               reloadData();
                                               });
                                            }
                                         });
                            }
}]);
//Editar 1
app.controller('zhsStepOneEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams','miServicio', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams,miServicio)
{
 
        var idZhs     = $stateParams.id;
        var CodigoZhs = $stateParams.codigo;

        $http.post('busca_sector_rubro',{id:idZhs}).success(function(data1){
            console.log(data1);
            console.log("esto es una vez");
            $scope.items1     = data1;
            $scope.zhsSector1 = $scope.items1;                   
        });

        $scope.listarChosenSector = function(){
          if(typeof $scope.zhsSector1 != 'undefined'){
            $http.post('busca_rubros',{idSector: $scope.zhsSector1.id, idNsZhs:idZhs}).success(function(data2){
                $scope.items2    = data2;    
                $scope.zhsRubro1 = $scope.items2;
            });
          }
        } 

        $http.post('busca_temporada',{idNsZhs:idZhs})
        .success(function(data3){
            console.log("Regreso de la temporada");
            $scope.itemsTem = data3;
            $scope.zhsTemp1 = $scope.itemsTem;                   
        });

        $scope.listarChosenTemporadasVersiones = function(){
          if(typeof $scope.zhsTemp1 != 'undefined'){
              var idTemp = $scope.zhsTemp1.id; 
              $http.post('busca_temporada_version',{idTemporada:idTemp, idNsZhs:idZhs}).success(function(data1){
                $scope.itemsTemVer = data1;
                $scope.zhsTempVer1 = $scope.itemsTemVer[0];                   
              });
          }
        } 

        $scope.pasarAlDos = function(){
         miServicio.setTempId($scope.zhsTemp1.id);
         miServicio.setTempVerId($scope.zhsTempVer1.id);
         miServicio.setTempNombre($scope.zhsTemp1.temporada);
         miServicio.setTempVerNombre($scope.zhsTempVer1.temporadaVersion);
         miServicio.setSectorId($scope.zhsSector1.id);
         miServicio.setRubroId($scope.zhsRubro1.id);
         miServicio.setRubroNombre($scope.zhsRubro1.nombre);
         miServicio.setNsZhsId(idZhs);
         miServicio.setNsZhsCodigo(CodigoZhs);
         $state.go('index.wizardEditar.step_two');
        }
}]);

//editar 2
app.controller('zhsStepTwoEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams','$q','miServicio','$resource', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams,$q,miServicio,$resource){
            
            if(miServicio.getNsZhsId()==0){
            $state.go('index.zhsInicial');
            }

            $scope.volverUno = function(){              
            if(miServicio.getNsZhsId()==0){
            $state.go('index.zhsInicial');
            }
            else{
              $state.go('index.wizardEditar.step_one',{id:miServicio.getNsZhsId()});
            }  
            }

            $scope.Eliminados=[];
            var id1=miServicio.getRubroId();
            var id2=miServicio.getNsZhsId();
            $scope.tablaSacs=[];
            $http.post('busca_sacs',{idRubro: id1,idNsZhs: id2})
            .success(function(data1){ 
              for(var i = 0; i < data1.length; i++){
              $scope.tablaSacs.push({idSrz:data1[i].idSrz,id:data1[i].id, codigo:data1[i].idSac,nombre:data1[i].sac,region:data1[i].region,comuna:data1[i].comuna,rubro:data1[i].rubro});     
              }
            });

            blockUI.start();  
            $http.get('/api/genregions.json?order_by[orden]=ASC').success(function(data5){                    
              $scope.items5     = data5;    
              $scope.zhsRegion1 =  $scope.items5;                             
            });
            blockUI.stop();

            $scope.listarChosenComunas = function(){ 
               if(typeof $scope.zhsRegion1 != 'undefined'){
                   $http.get('/api/gencomunas.json?filters[idGenRegion]='+$scope.zhsRegion1.id+'').success(function(data6){                       
                      $scope.items6     = data6;    
                      $scope.zhsComuna1 = $scope.items6; 
                   });              
                }
            }

            var language = {
            "sEmptyTable": "No se encontraron resultados",
            "sInfo": "Mostrando _END_ de _TOTAL_ resultados",
            "sInfoPostFix": "",
            "sInfoThousands": ",",
            "sLengthMenu": "Mostrar _MENU_ resultados",
            "sSearch": "Buscar:",
            "sZeroRecords": "No se encontraron resultados",
            "sLoadingRecords": '<img src="https://media.tenor.com/images/779781883952778b25974baa3cf7679c/tenor.gif">',
            "sProcessing":     '<img src="https://media.tenor.com/images/779781883952778b25974baa3cf7679c/tenor.gif">',
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
            $scope.dtOptions = DTOptionsBuilder.fromFnPromise(promiseFunc())
            .withOption('stateSave', true)
            .withPaginationType('full_numbers')
            .withLanguage(language)
            .withOption('createdRow', createdRow)
            .withOption('rowCallback', function(nRow, aData, iDisplayIndex, iDisplayIndexFull){                          
                return nRow;
            });
            
            function promiseFunc(){
                var deferred = $q.defer();
                $http.get('/api/gensacs.json?limit=0').then(function(data){
                deferred.resolve(data.data);
                });
                return deferred.promise;
            };
              
            $scope.deleteRqst = function(id,idSrz){
                var index = -1;
                console.log(id);
                console.log(idSrz);
                $scope.Eliminados.push({id:id,idSrz:idSrz});
                for( var i = 0; i < $scope.tablaSacs.length; i++ ){
                      if( $scope.tablaSacs[i].id === id ) {
                          index = i;
                          break;
                       }
                }   
                if( index === -1 ) {
                  alert( "Something gone wrong" );
                }
                  $scope.tablaSacs.splice( index, 1 );  
            }

            $scope.dtColumns = [ DTColumnBuilder.newColumn(null).withTitle('codigo').notSortable().renderWith(codigoHtml),                     
                               DTColumnBuilder.newColumn(null).withTitle('Sac').notSortable().renderWith(nombresacHtml),
                               DTColumnBuilder.newColumn(null).withTitle('Region').notSortable().renderWith(nombreRegionHtml),
                               DTColumnBuilder.newColumn(null).withTitle('Comuna').notSortable().renderWith(nombreComunaHtml),
                               DTColumnBuilder.newColumn(null).withTitle('Rubro').notSortable().renderWith(nombreRubroHtml),
                               DTColumnBuilder.newColumn(null).withTitle('Agregar').notSortable().renderWith(actionsHtml)];

            function createdRow(row, data, dataIndex){
            $compile(angular.element(row).contents())($scope);
            }

            function codigoHtml(data, type, full, meta){
            return data.codigo;              
            }

            function nombresacHtml(data, type, full, meta){
            return data.nombre;              
            }

            function nombreComunaHtml(data, type, full, meta){
            return data.id_gen_comuna.nombre;              
            }

            function nombreRegionHtml(data, type, full, meta){
            return data.id_gen_comuna.id_gen_region.nombre;              
            }

            function nombreRubroHtml(data, type, full, meta){
            return miServicio.getRubroNombre();              
            }
            
            function actionsHtml(data, type, full, meta){
            
            console.log(data);
            var arreglo = [];
            arreglo[0]  = data.id;
            arreglo[1]  = data.codigo;
            var elvalor = data.nombre.replace(/,/gi,".");
            arreglo[2]  = elvalor;
            if(data.id_gen_comuna.id_gen_region.nombre === "Región del Libertador General Bernardo O'Higgins"){
            arreglo[3] = "Región del Libertador General Bernardo OHiggins";
            }else{
            arreglo[3] = data.id_gen_comuna.id_gen_region.nombre;
            }
            arreglo[4] = data.id_gen_comuna.nombre;
            arreglo[5] = miServicio.getRubroNombre();
            arreglo[6] = data.idSrz;
            return '<button class="btn btn-success" ng-click="agregarALista(\''+arreglo+'\')">' +
                   '<i class="fa fa-plus"></i>' +
                   '</button>';
            }

            $scope.agregarALista = function(arreglo){

              var str = arreglo;
              var res = str.split(",");
              var pos = true;
              for(var i = 0; i < $scope.tablaSacs.length; i++){
                  if($scope.tablaSacs[i].id == res[0]) {
                  pos=false;
                  }
              }

              if(pos){
                $scope.tablaSacs.push({
                id:res[0],
                codigo:res[1],
                nombre:res[2],
                region:res[3],
                comuna:res[4],
                rubro:res[5],
                idSrz:res[6]});    
              }else{
               SweetAlert.swal("Ya está ingresado");
              }
            }

            $scope.changeData = function(){
               console.log("Cambió");
               var url='/api/gensacs.json?limit=1';
               if(typeof $scope.zhsComuna1!= 'undefined'){
               url='api/gensacs.json?filters[idGenComuna]='+$scope.zhsComuna1.id+'';    
            }

            $scope.dtInstance.changeData(function(){
               return $resource(url).query().$promise;
               });
            }

            $scope.newSource1 = function(){ 
              var url='/api/gensacs.json?limit=1';
              if(typeof $scope.zhsComuna1!= 'undefined'){
              url='api/gensacs.json?filters[idGenComuna]='+$scope.zhsComuna1.id+'';    
            }

            $scope.dtInstance.changeData(function(){
              return $resource(url).query().$promise;
            });
            }

            $scope.pasarAlTres = function(){
             miServicio.setTablaSacs($scope.tablaSacs);
             miServicio.setTablaEliminados($scope.Eliminados);
             $state.go('index.wizardEditar.step_three');
            }

            $scope.tablaNoVacia = function(){
              if($scope.tablaSacs.length > 0){
              return true;
              }else{ 
              return false;
              }
            }

}]);

//editar 3
app.controller('zhsStepThreeEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams','miServicio', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams,miServicio){

             
            var idTemp         = miServicio.getTempId();
            var idTempVer      = miServicio.getTempVerId();
            $scope.zhsTemp1    = miServicio.getTempNombre().toString();
            $scope.zhsTempVer1 = miServicio.getTempVerNombre();

            if(miServicio.getNsZhsId()==0){
            $state.go('index.zhsInicial');
            }
            if(miServicio.getTablaSacs().length==0){
            $state.go('index.zhsInicial');
            }
            if(miServicio.getNsZhsCodigo()==undefined){
            $scope.zhsCodigo = "prueba1";
            }else{
               $scope.zhsCodigo = miServicio.getNsZhsCodigo()
            }

  $scope.IngresarNuevosDatos = function(){

  $scope.contador=0;
  $scope.recursividad = function(){     
    if($scope.contador< miServicio.getTablaSacs().length){

          var laNueva    = miServicio.getTablaSacs();
          var idNsZhs    = miServicio.getNsZhsId();
          var idGenRubro = miServicio.getRubroId();
          var idGenSac   = parseInt(laNueva[$scope.contador].id);
          
          $http.get('/api/gensacrubrozhs.json?filters[idNsZhs]='+idNsZhs+'&filters[idGenRubro]='+idGenRubro+'&filters[idGenSac]='+idGenSac+'')
          .success(function(data,status){
                if(status==200){
                  console.log("pasa por el 200");
                          var dataV = { 
                          idNsZhs:miServicio.getNsZhsId(),
                          idGenRubro:miServicio.getRubroId(),
                          idGenSac:idGenSac,
                          activo:1
                          };
                          $http.put('/api/gensacrubrozhs/'+data[0].id+'.json',dataV) 
                          .success(function(data1,status){
                                    if(data1){
                                        var idgSrz=data[0].id;
                                        $http.post('busca_idSrzTemporada',{idgSrz:idgSrz})
                                        .success(function(data,status){
                                                      var elvalor=parseInt(data[0].idSrzTemp);
                                                      var data2 = {
                                                      idGenSacRubroZhs: data[0].idSrz,           
                                                      idGenTemporadaVersion:miServicio.getTempVerId()
                                                      };
                                                      //Acá es donde tiene que ver si la temporada version es la misma 
                                                      blockUI.start();
                                                      $http.put('/api/gensacrubrozhstemporadas/'+elvalor+'.json',data2)
                                                      .success(function(data2){  
                                                      console.log("ingresó un nuevo sacrubrozhs---Temporada de repetido");                          
                                                      });
                                                      blockUI.stop();
                                        });
                                    }
                          });
                } 

                if(status==204){
                  console.log("pasa por el 204");
                                var data = { 
                                idNsZhs:miServicio.getNsZhsId(),
                                idGenRubro:miServicio.getRubroId(),
                                idGenSac:idGenSac,
                                activo:1
                                };
                                // Ya que no está en la base de datos, debe ser ingresado el nuevo
                                $http.post('/api/gensacrubrozhs.json',data)
                                .success(function(data1){             
                                        if(data1){
                                            var data2 = {            
                                            idGenTemporadaVersion:miServicio.getTempVerId(),
                                            idGenSacRubroZhs:data1.id
                                            };

                                            blockUI.start();
                                            $http.post('/api/gensacrubrozhstemporadas.json',data2)
                                            .success(function(data2){  
                                            console.log("ingresó un nuevo sacrubrozhs---Temporada del nuevo");                          
                                            });
                                            blockUI.stop();
                                        }
                                });
                }     
          })
          .error(function(data,status){
          console.log("Se supone que esta no la encontró");
          }); 
      //Se vuelve a llamar la recursividad
      $scope.contador++;
      $scope.recursividad($scope.contador);
    }
  } 
  $scope.recursividad($scope.contador);

   var id1           = miServicio.getRubroId();
   var id2           = miServicio.getNsZhsId();
   var tablaEliminar = miServicio.getTablaEliminados();
   // Eliminamos          
   for(var i = 0; i < tablaEliminar.length; i++){
   var idSrz      = tablaEliminar[i].idSrz;
   var elidSac    = tablaEliminar[i].id;
   var idNsZhs    = miServicio.getNsZhsId();
   var idGenRubro = miServicio.getRubroId();
   var data = {
   idGenSac:elidSac, 
   idNsZhs:idNsZhs,
   idGenRubro:idGenRubro,
   activo:-1
   };

   $http.put('/api/gensacrubrozhs/'+idSrz+'.json', data)              
   .success(function(data){
   console.log("Si fué exitosamente eliminado");
   })
   .error(function(data){
   console.log("No fué exitoso, salio error");
   });  

}
}
            $scope.volverDos = function(){                              
            $state.go('index.wizardEditar.step_two');
            }
}]);

//Agregar 1
app.controller('zhsStepOneCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams','$resource','$q','miServicio', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams,$resource,$q, miServicio){
         
            console.log("esta es una vez por fuera"); 
            blockUI.start();
            $http.get('/api/gensectors.json')
            .success(function(data1){  
            console.log("esta es una vez");                  
                  $scope.items1    = data1;    
                  $scope.zhsSector1 = $scope.items1;                            
            });
            blockUI.stop();

            $scope.listarChosenSector = function(){
              if(typeof $scope.zhsSector1 != 'undefined'){
                $http.get('/api/genrubros.json?filters[idGenSector]='+$scope.zhsSector1.id+'').success(function(data2){                       
                    $scope.items2   = data2;    
                    $scope.zhsRubro1 = $scope.items2[1]; 
                });
              }
            } 

            $scope.pasarAlDos = function(){
              miServicio.setSectorId($scope.zhsSector1.id);
              miServicio.setRubroId($scope.zhsRubro1.id);
              miServicio.setRubroNombre($scope.zhsRubro1.nombre);
              $state.go('index.wizard.step_two');
            }

}]);

app.controller('zhsStepTwoCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams','$resource','$q','miServicio', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams,$resource,$q, miServicio){
            

            if(miServicio.getRubroId()==0){
              $state.go('index.zhsInicial');
            }
             // Para validar que no esté vacia
            $scope.tablaNoVacia = function(){
              if(miServicio.getTablaSacs().length == 0){
              return true;
              }else{ 
              return false;
              }
            }

            // Acá son los del segundo paso
            $scope.tablaSacs=[]; 
            blockUI.start();  
            $http.get('/api/genregions.json?order_by[orden]=ASC').success(function(data5){                    
              $scope.items5     = data5;    
              $scope.zhsRegion1 =  $scope.items5;                             
            });
            blockUI.stop();

            $scope.listarChosenComunas = function(){ 
               if(typeof $scope.zhsRegion1 != 'undefined'){
                   $http.get('/api/gencomunas.json?filters[idGenRegion]='+$scope.zhsRegion1.id+'').success(function(data6){                       
                      $scope.items6     = data6;    
                      $scope.zhsComuna1 = $scope.items6; 
                   });              
                }
            }

            var language = {
            "sEmptyTable": "No se encontraron resultados",
            "sInfo": "Mostrando _END_ de _TOTAL_ resultados",
            "sInfoPostFix": "",
            "sInfoThousands": ",",
            "sLengthMenu": "Mostrar _MENU_ resultados",
            "sSearch": "Buscar:",
            "sZeroRecords": "No se encontraron resultados",
            "sLoadingRecords": '<img src="https://media.tenor.com/images/779781883952778b25974baa3cf7679c/tenor.gif">',
            "sProcessing":     '<img src="https://media.tenor.com/images/779781883952778b25974baa3cf7679c/tenor.gif">',
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
            $scope.dtOptions  = DTOptionsBuilder.fromFnPromise(promiseFunc())
            .withOption('stateSave', true)
            .withPaginationType('full_numbers')
            .withLanguage(language)
            .withOption('createdRow', createdRow)
            .withOption('rowCallback', function(nRow, aData, iDisplayIndex, iDisplayIndexFull){                          
                return nRow;
            });
            
            function promiseFunc(){
                 var deferred = $q.defer();
                 $http.get('/api/gensacs.json?limit=0').then(function(data){
                 deferred.resolve(data.data);
                 });
                return deferred.promise;
            };
              
            $scope.deleteRqst = function(id){
            var index = -1;
            console.log($scope.tablaSacs.length);
            for( var i = 0; i < $scope.tablaSacs.length; i++)
               {
                  if($scope.tablaSacs[i].id === id ) {
                      index = i;
                      break;
               }
            }
            if( index === -1 ) {
                 alert( "Something gone wrong" );
            }
            $scope.tablaSacs.splice( index, 1 );
            }

            $scope.dtColumns = [ DTColumnBuilder.newColumn(null).withTitle('codigo').notSortable().renderWith(codigoHtml),                     
                                 DTColumnBuilder.newColumn(null).withTitle('Sac').notSortable().renderWith(nombresacHtml),
                                 DTColumnBuilder.newColumn(null).withTitle('Region').notSortable().renderWith(nombreRegionHtml),
                                 DTColumnBuilder.newColumn(null).withTitle('Comuna').notSortable().renderWith(nombreComunaHtml),
                                 DTColumnBuilder.newColumn(null).withTitle('Rubro').notSortable().renderWith(nombreRubroHtml),
                                 DTColumnBuilder.newColumn(null).withTitle('Agregar').notSortable().renderWith(actionsHtml)];

            function createdRow(row, data, dataIndex){
            $compile(angular.element(row).contents())($scope);
            }

            function codigoHtml(data, type, full, meta){
            return data.codigo;              
            }

            function nombresacHtml(data, type, full, meta){
            return data.nombre;              
            }

            function nombreComunaHtml(data, type, full, meta){
            return data.id_gen_comuna.nombre;              
            }

            function nombreRegionHtml(data, type, full, meta){
            return data.id_gen_comuna.id_gen_region.nombre;              
            }

            function nombreRubroHtml(data, type, full, meta){
            return miServicio.getRubroNombre();              
            }

            function actionsHtml(data, type, full, meta){

            var arreglo = [];
            arreglo[0]  = data.id;
            arreglo[1]  = data.codigo;
            var elvalor = data.nombre.replace(/,/gi,".");
            arreglo[2]  = elvalor;
            if(data.id_gen_comuna.id_gen_region.nombre==="Región del Libertador General Bernardo O'Higgins"){
            arreglo[3] = "Región del Libertador General Bernardo OHiggins";
            }else{
            arreglo[3] = data.id_gen_comuna.id_gen_region.nombre;
            }
            arreglo[4] = data.id_gen_comuna.nombre;
            arreglo[5] = miServicio.getRubroNombre();

            return '<button class="btn btn-success" ng-click="agregarALista(\''+arreglo+'\')">' +
                   '<i class="fa fa-plus"></i>' +
                   '</button>';
            }

            $scope.agregarALista = function(arreglo){

              var str = arreglo;
              var res = str.split(",");
              var pos=true;
              for(var i = 0; i < $scope.tablaSacs.length; i++){
                  if($scope.tablaSacs[i].id == res[0]) {
                  pos=false;
                  }
              }

              var idComunda = res[3]; // el id de la comuna
              if (pos) {
                $scope.tablaSacs.push({
                id:res[0],
                codigo:res[1],
                nombre:res[2],
                region:res[3],
                comuna:res[4],
                rubro:res[5]});
              }else{
               SweetAlert.swal("Ya está ingresado");
              }
            }

            $scope.changeData = function(){
             console.log("changedddd");
             var url='/api/gensacs.json?limit=1';
             if(typeof $scope.zhsComuna1!= 'undefined'){
             console.log("agregó el filtro");
             url='api/gensacs.json?filters[idGenComuna]='+$scope.zhsComuna1.id+'';    
            }

            $scope.dtInstance.changeData(function(){
             return $resource(url).query().$promise;
             });
            }

            $scope.newSource1 = function(){ 
            var url='/api/gensacs.json?limit=1';
            if(typeof $scope.zhsComuna1!= 'undefined'){
            console.log("agregó el filtro");
            url='api/gensacs.json?filters[idGenComuna]='+$scope.zhsComuna1.id+'';    
            }

            $scope.dtInstance.changeData(function(){
            return $resource(url).query().$promise;
            });
            }

            $scope.tablaNoVacia = function(){
              if($scope.tablaSacs.length > 0){   
              console.log("es mayor a 0");
              return true;
              }else{ 
              console.log("No es mayor a 0");
              return false;
              }
            }

            $scope.pasarAlTres = function(){
             miServicio.setRegionId($scope.zhsRegion1.id);           
             miServicio.setComunaId($scope.zhsComuna1.id); 
             miServicio.setTablaSacs($scope.tablaSacs);
             $state.go('index.wizard.step_three');
            }
}]);


app.controller('zhsStepThreeCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams','miServicio', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams,miServicio)
{

        if(miServicio.getTablaSacs().length==0){
              $state.go('index.zhsInicial');
        }

        blockUI.start();
        $http.get('/api/gentemporadas.json').success(function(data1){                    
            $scope.items1 = data1; 
            console.log(data1);
            $scope.zhsTemp1 = $scope.items1;                            
        });
        blockUI.stop();

        $scope.listarChosenSector = function(){
          if(typeof $scope.zhsTemp1 != 'undefined'){
            $http.get('/api/gentemporadaversions.json?filters[idGenTemporada]='+$scope.zhsTemp1.id+'').success(function(data2){                       
                $scope.items2      = data2;    
                $scope.zhsTempVer1 = $scope.items2[0]; 
            });
          }
        } 

      $scope.agregarNuevoSac = function(){
        
        var SecotorId = miServicio.getSectorId();           
        var RubroId   = miServicio.getRubroId();                     
        var RegionId  = miServicio.getRegionId();           
        var ComunaId  = miServicio.getComunaId();           
        var tablaSacs = miServicio.getTablaSacs();
        var nzZhs     = $scope.zhsCodigo;
        var idTemp    = $scope.zhsTemp1.id;
        var idTempVer = $scope.zhsTempVer1.id;
        var valida    = true;

        if(SecotorId==0){ 
          console.log("entra a la SectoriId ");
        valida = false;
        }
        if(RubroId==0){
          console.log("entra a la RubroId");
        valida = false; 
        }
        if(ComunaId==0){ 
          console.log("entra a la ComunaId");
        valida = false;
        }
        if(tablaSacs==""){
          console.log("entra a la tablaSacs");
        valida = false; 
        }
        if(typeof $scope.zhsTemp1 == 'undefined'){
          console.log("entra a la tablaSacs");
        valida = false; 
        }
        if(typeof $scope.zhsTempVer1 == 'undefined'){
          console.log("entra a la tablaSacs");
        valida = false; 
        }

        if(valida){
                        var data = {            
                        codigo:$scope.zhsCodigo
                        };

                        blockUI.start();
                        // Esta es la primera inserción 
                        $http.post('/api/nszhs.json',data)
                        .success(function(data){
                          console.log("se supone que ingreso zhs");
                          var idZhs = data.id;
                          if(data){
                                    for( var i = 0; i < tablaSacs.length; i++ ){

                                                  var data1 = {            
                                                  idNsZhs:idZhs,
                                                  idGenRubro:RubroId,
                                                  idGenSac:tablaSacs[i].id,
                                                  activo:1 
                                                  };

                                                  blockUI.start();
                                                  // Esta es la segunda inserción 
                                                  $http.post('/api/gensacrubrozhs.json',data1)
                                                      .success(function(data1){
                                                        if(data1){
                                                            var data2 = {            
                                                            idGenTemporadaVersion:$scope.zhsTempVer1.id,
                                                            idGenSacRubroZhs:data1.id
                                                            };

                                                            blockUI.start();
                                                            $http.post('/api/gensacrubrozhstemporadas.json',data2)
                                                            .success(function(data2){  
                                                                console.log("se supone que ingreso sacrubrozhs temporada");                          
                                                            });
                                                            blockUI.stop();
                                                        }
                                                  });
                                                  blockUI.stop();
                                    }
                          }
                          blockUI.stop();
                          SweetAlert.swal("Agregado", "Ingresado con éxito!", "success");

                        })
                        .error(function(data){
                          blockUI.stop();
                          SweetAlert.swal("Cacelado","el zhs ya se encuentra registrado", "error");
                        });  
         $state.go('index.zhsInicial');
        }else{
        SweetAlert.swal("Cacelado","faltan datos en las secciones anteriores");
        }

      }                       
}]);