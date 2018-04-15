app.controller('resolucionCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile){
   
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
            $scope.dtOptions  = DTOptionsBuilder.fromSource('busca_resolucion')
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
                             DTColumnBuilder.newColumn('nombre').withTitle('Compañia'),
                             DTColumnBuilder.newColumn('mesInformado').withTitle('Mes informado'),
                             DTColumnBuilder.newColumn('resolucion').withTitle('Resolucion'),
                             DTColumnBuilder.newColumn(null).withTitle('Fecha resolución').notSortable().renderWith(formatoFechaResolucion),
                             DTColumnBuilder.newColumn('ufPago').withTitle('Uf pago').notSortable().renderWith(formatoUfPago),
                             DTColumnBuilder.newColumn(null).withTitle('Fecha pago').notSortable().renderWith(formatoFechaPago),
                             DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)
                            ];


                      function formatoUfPago(data){

                        var ufPago    = String(data);
                        var numeros   = ufPago.split(".");
                        var amount    = numeros[0];
                        var elDecimal = numeros[1];
                        var decimals  = 0;
                        amount += ''; // por si pasan un numero en vez de un string
                        amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto
                        decimals = decimals || 0; // por si la variable no fue fue pasada
                        // si no es un numero o es igual a cero retorno el mismo cero
                        if (isNaN(amount) || amount === 0) 
                            return parseFloat(0).toFixed(decimals);
                        // si es mayor o menor que cero retorno el valor formateado como numero
                        amount = '' + amount.toFixed(decimals);
                        var amount_parts = amount.split('.'),
                            regexp = /(\d+)(\d{3})/;
                        while (regexp.test(amount_parts[0]))
                            amount_parts[0] = amount_parts[0].replace(regexp, '$1' + '.' + '$2');
                             if(elDecimal == undefined)
                            {
                               return amount_parts.join('.');
                            }else{
                              return amount_parts.join('.')+","+elDecimal; 
                            }
                        }

                        
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

                        function formatoFechaResolucion(data) {                      
                        if(data.fechaResolucion!=null){
                        var resfe   = data.fechaResolucion.split("-");
                        var lafecha = resfe[2]+"/"+resfe[1]+"/"+resfe[0];
                        return lafecha;
                        }else{
                        return "No fecha";
                        }                      
                        }

                        function formatoFechaPago(data) {
                        if(data.fechaPago!=null){
                        var fepa    = data.fechaPago.split("-");
                        var lafecha = fepa[2]+"/"+fepa[1]+"/"+fepa[0];
                        return lafecha;
                        }else{
                        return "No fecha";
                        }    
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
                                      title: "Está seguro de activar la Resolucion?",
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
                                              $http.put('/api/genresolucions/'+id+'.json',data).success(function(data){              
                                              blockUI.stop();  
                                              SweetAlert.swal("Activado!", "La resolucion ha sido activado", "success");
                                              $state.go('index.resolucionInicial');  
                                              reloadData();                
                                              });
                                      }else{

                                      }
                                   });
                        }
 
                        $scope.editar = function(id){
                          $state.go('index.resolucionEditar',{id:id});
                        }

                        // arreglar validación que no se pueden ingresar dos campos iguales en la columna codigo
                        $scope.eliminar = function(id){
                                     SweetAlert.swal({
                                        title: "Está seguro de borrar una Resolución?",
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
                                                $http.put('/api/genresolucions/'+id+'.json',data).success(function(data){              
                                                blockUI.stop(); 
                                                SweetAlert.swal("Borrado!", "El sector ha sido eliminado", "success");                                                                   
                                                $state.go('index.resolucionInicial');
                                                reloadData();
                                                });
                                        } 
                                     });
                        } 
}]);

app.controller('resolucionAgregarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile)
{
          blockUI.start();
          $http.get('/api/gencompanias.json?limit=1500' ).success(function(data2){                 
               $scope.items2 = data2;  
               $scope.resCom1 = $scope.items2;                
          });

          blockUI.stop();
          //Para cargar el año en agregar
          var jsonArr = [];
          var year = new Date().getFullYear();
          for (var i = 0; i < 120; i++) {            
          jsonArr.push({
          id: i,
          anio: year - i
          });
          }
          
          $scope.items1=jsonArr
          $scope.resAnio=$scope.items1;
          // Para cargar el mes en el agregar
          $scope.items = [{"id":"01","mes":"Enero"}, 
          {"id":"02","mes":"Febrero"}, 
          {"id":"03","mes":"Marzo"}, 
          {"id":"04","mes":"Abril"}, 
          {"id":"05","mes":"Mayo"}, 
          {"id":"06","mes":"Junio"}, 
          {"id":"07","mes":"Julio"}, 
          {"id":"08","mes":"Agosto"}, 
          {"id":"09","mes":"Septiembre"}, 
          {"id":"10","mes":"Octubre"}, 
          {"id":"11","mes":"Noviembre"}, 
          {"id":"12","mes":"Diciembre"} ];
          $scope.resMes=$scope.items; 

                 $scope.agregarNuevo = function(){

                        var AnioMes = $scope.resAnio1.anio + "" + $scope.resMes1.id;                              
                        var obj1    = moment($scope.resFechaRes);
                        var fecha1  = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
                        var fechare = fecha1.toString();
                        var obj2    = moment($scope.resFechapago);
                        var fecha2  = obj1.year() + "-" + (obj1.month() + 1) + "-" + obj1.date();
                        var fechapa = fecha2.toString();
                        
                        // este es el rut de la compañia
                        var data = {
                        rutCompania:$scope.resCom1.id,
                        mesInformado:parseInt(AnioMes),
                        resolucion:$scope.resResolucion,
                        fechaResolucion:fechare,
                        ufPago:$scope.resUfpago,
                        fechaPago:fechapa };

                        blockUI.start();
                        $http.post('/api/genresolucions.json', data )
                                  .success(function(data){
                                    blockUI.stop();
                                    if(data){
                                          $scope.resRutCompania = "";
                                          $scope.resAnio        = $scope.items1;
                                          $scope.resMes         = $scope.items; 
                                          $scope.resResolucion  = "";  
                                          $scope.resUfpago      = "";
                                          $scope.resFechapago   = "";
                                          $scope.resFechaRes    = "";
                                          SweetAlert.swal("Agregado", "Ingresado con éxito!", "success"); 
                                          $state.go('index.resolucionInicial');  
                                    }else{
                                          SweetAlert.swal("Cancelado", "Algo ha ocurrido", "error");
                                    }
                                  })
                                  .error(function(data){
                                    blockUI.stop();
                                          $scope.resRutCompania  = "";
                                          $scope.resMesInformado = ""; 
                                          $scope.resResolucion   = "";  
                                          $scope.resUfpago       = "";
                                          $scope.resFechapago    = "";
                                          $scope.resFechaRes     = "";
                                          SweetAlert.swal("Cacelado", "la resolución ya se encuentra registrado", "error");
                                  });
                  }
         
}]);


app.controller('resolucionEditarCtrl',['DTOptionsBuilder','DTColumnBuilder','$scope','$state','$http','SweetAlert','blockUI','$compile','$stateParams', function(DTOptionsBuilder, DTColumnBuilder,$scope,$state,$http, SweetAlert, blockUI,$compile,$stateParams){

        function number_format(amount, decimals) {
          amount += ''; // por si pasan un numero en vez de un string
          amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto
          decimals = decimals || 0; // por si la variable no fue fue pasada
          // si no es un numero o es igual a cero retorno el mismo cero
          if (isNaN(amount) || amount === 0) 
          return parseFloat(0).toFixed(decimals);
          // si es mayor o menor que cero retorno el valor formateado como numero
          amount = '' + amount.toFixed(decimals);
          var amount_parts = amount.split('.'),
              regexp = /(\d+)(\d{3})/;
          while (regexp.test(amount_parts[0]))
              amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
          return amount_parts.join('.');
        }

         blockUI.start();       
         //$scope.onlyNumbers = "/^[0-9]+$/";


         $http.get('/api/genresolucions/'+$stateParams.id+'.json' ).success(function(data){

              $scope.resRutCompania = data.rut_compania;
              $scope.resResolucion  = data.resolucion;
              $scope.resUfpago      = data.uf_pago;
              $scope.resFechapago   = data.fecha_pago;
              $scope.resFechaRes    = data.fecha_resolucion;
              var elvalorrut        = data.rut_compania;
              $http.get('/api/gencompanias.json?limit=1500').success(function(data2){                 
              $scope.items2 = data2; 
              //Para desplegar el nombre de la compañia en la posición correcta
              var posrut;
              for(var i = 0; i < data2.length; i++) {
              if(data2[i].id == elvalorrut) {
              posrut=i;
              }
              }

              $scope.resCom1 = $scope.items2[posrut];
              });
              
              var mesin             = data.mes_informado;
              var mesins            = mesin.toString();
              var anio              = mesins.substr(0, 4);
              var mes               = mesins.substr(4, 6);
              
              var jsonArr = [];
              var year = new Date().getFullYear();
              for (var i = 0; i < 120; i++) {
              var a = (year - i).toString();
              jsonArr.push({
              anio: year - i,
              id: a
              });
              }

              $scope.items1 = jsonArr
              $scope.items = [{"id":"01","mes":"Enero"}, 
              {"id":"02","mes":"Febrero"}, 
              {"id":"03","mes":"Marzo"}, 
              {"id":"04","mes":"Abril"}, 
              {"id":"05","mes":"Mayo"}, 
              {"id":"06","mes":"Junio"}, 
              {"id":"07","mes":"Julio"}, 
              {"id":"08","mes":"Agosto"}, 
              {"id":"09","mes":"Septiembre"}, 
              {"id":"10","mes":"Octubre"}, 
              {"id":"11","mes":"Noviembre"}, 
              {"id":"12","mes":"Diciembre"}];
              
              var elMes = parseInt(mes)-1;                          
              var anioId;
              for(var i = 0; i < jsonArr.length; i++) {
              if(jsonArr[i].anio == 2012) {
              anioId=i;
              }
              }
              
              //asignamos el año y el mes exacto de la entidad
              $scope.resAnio1=$scope.items1[anioId];
              $scope.resMes1=$scope.items[elMes]; 
              // asignamos el activo
              if(data.activo==1)
              {
              $scope.resActivo=true;
              }else{
              $scope.resActivo=false;
              }
              blockUI.stop();
          });

           console.log("es acá donde se imprime el numero");
           console.log(number_format($scope.resUfpago,1));

            $scope.cambio = function(){
                console.log($scope.resFechaRes);
                console.log($scope.resFechaRes._i);
                console.log($scope.resFechaRes._d);
                console.log($scope.resFechaRes.value);
            }

           $scope.options = {
                            locale: {
                              applyLabel: "Selecciona",
                              fromLabel: "Desde",
                              format: "DD-MM-YYYY",
                              toLabel: "Hasta",
                              cancelLabel: 'Cancela'
                            }
                           }

          $scope.modificarResolucion = function(){

                var valorActivo = 0;
                if($scope.resActivo){
                 valorActivo = 1;
                } 
                console.log("Fecha res");
                console.log($scope.resFechaRes.date);
                console.log($scope.resFechaRes._i);
                console.log($scope.resFechaRes._d);
                console.log($scope.resFechaRes.value);
                console.log($scope.resFechaRes.options);
                console.log("Fecha pago");
                console.log($scope.resFechapago);

                console.log("entro por el asunto de la modificación");
                console.log($stateParams.id);
                var AnioMes =$scope.resAnio1.anio + "" + $scope.resMes1.id;
                var data = {                
                id: $stateParams.id,
                rutCompania:$scope.resRutCompania,
                mesInformado:parseInt(AnioMes),
                resolucion:$scope.resResolucion,
                fechaResolucion:$scope.resFechaRes,
                ufPago:$scope.resUfpago,
                fechaPago:$scope.resFechapago,
                activo: valorActivo
                };

              blockUI.start();
              $http.put('/api/genresolucions/'+$stateParams.id+'.json',data)
               .success(function(data){ 
                 blockUI.stop();  
                 SweetAlert.swal("Modificado", "Modificado con éxito!", "success"); 
                 $state.go('index.resolucionInicial');                                         
              })
               .error(function(data){
                 blockUI.stop();
                 SweetAlert.swal("Cacelado", "el codigo ya se encuentra registrado", "error");
              });  
          }

}]);







 

    