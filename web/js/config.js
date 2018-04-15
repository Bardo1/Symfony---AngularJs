function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/index/main");
    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.login', {
            url: "/login",
            controller: "tableChosenCtrl",
            templateUrl: "views/login.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: "/minor",
            controller: "tableChosenCtrl",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })
        /* .state('index.recarga', {
            url: "/recarga",
            controller: 'pruebaCtrl',
            templateUrl: "views/recarga.html",
            data: { pageTitle: 'Vista de recarga' }
        })*/
        .state('index.sectorInicial', { // despliegue inicial
            url: "/sectorInicial",
            templateUrl: "views/crudSector/Inicial.html",
            controller: "sectorCtrl",
            data: { pageTitle: 'Crud Sector Inicial' }
        }) 
        .state('index.sectorAgregar', {// Agregar
            url: "/sectorAgregar",
            templateUrl: "views/crudSector/Agregar.html",
            controller: "sectorCtrl",
            data: { pageTitle: 'Crud Sector Agregar' }
        })
        .state('index.sectorEditar', {// Editar
            url: "/sectorEditar/:id",
            templateUrl: "views/crudSector/Editar.html",
            controller:'sectorEditarCtrl',
            data: { pageTitle: 'crud Sector Editar'}
        })
        .state('index.sectorEliminar', {// Eliminar
            url: "/sectorEliminar/:id",
            templateUrl: "views/crudSector/Eliminar.html",
            controller:'sectorEliminarCtrl',
            data: { pageTitle: 'crud Sector Eliminar' }
        })
        // CrudCompania
        .state('index.companiaInicial', { // despliegue inicial
            url: "/companiaInicial",
            templateUrl: "views/crudCompania/Inicial.html",
            controller: "companiaCtrl",
            data: { pageTitle: 'Crud Compania Inicial' }
        }) 
        .state('index.companiaAgregar', {// Agregar
            url: "/companiaAgregar",
            templateUrl: "views/crudCompania/Agregar.html",
            controller: "companiaCtrl",
            data: { pageTitle: 'Crud Compania Agregar' }
        })
        .state('index.companiaEditar', {// Editar
            url: "/companiaEditar/:id",
            templateUrl: "views/crudCompania/Editar.html",
            controller:'companiaEditarCtrl',
            data: { pageTitle: 'crud Compania'}
        })
        .state('index.companiaEliminar', {// Eliminar
            url: "/companiaEliminar",
            templateUrl: "views/crudCompania/Eliminar.html",
            data: { pageTitle: 'crud Compania' }
        })
        // CrudResolucion
        .state('index.resolucionInicial', { // despliegue inicial
            url: "/resolucionInicial",
            templateUrl: "views/crudResolucion/Inicial.html",
            controller: "resolucionCtrl",
            data: { pageTitle: 'Crud Resolucion Inicial' }
        }) 
        .state('index.resolucionAgregar', {// Agregar
            url: "/resolucionAgregar",
            templateUrl: "views/crudResolucion/Agregar.html",
            controller: "resolucionAgregarCtrl",
            data: { pageTitle: 'Crud Resolucion Agregar' }
        })
        .state('index.resolucionEditar', {// Editar
            url: "/resolucionEditar/:id",
            templateUrl: "views/crudResolucion/Editar.html",
            controller:'resolucionEditarCtrl',
            data: { pageTitle: 'crud Resolucion'}
        })
        .state('index.resolucionEliminar', {// Eliminar
            url: "/resolucionEliminar",
            templateUrl: "views/crudResolucion/Eliminar.html",
            data: { pageTitle: 'crud Resolucion' }
        })
        // crudRubro
        .state('index.rubroInicial', { // despliegue inicial
            url: "/rubroInicial",
            templateUrl: "views/crudRubro/Inicial.html",
            controller: "rubroCtrl",
            data: { pageTitle: 'Crud Rubro Inicial' }
        }) 
        .state('index.rubroAgregar', {// Agregar
            url: "/rubroAgregar",
            templateUrl: "views/crudRubro/Agregar.html",
            controller: "rubroAgregarCtrl",
            data: { pageTitle: 'Crud Rubro Agregar' }
        })
        .state('index.rubroEditar', {// Editar
            url: "/rubroEditar/:id",
            templateUrl: "views/crudRubro/Editar.html",
            controller:'rubroEditarCtrl',
            data: { pageTitle: 'crud Rubro Editar'}
        })
        .state('index.rubroEliminar', {// Eliminar
            url: "/rubroEliminar",
            templateUrl: "views/crudRubro/Eliminar.html",
            data: { pageTitle: 'crud Rubro' }
        })
        // crudsac
        .state('index.sacInicial', { // despliegue inicial
            url: "/sacInicial",
            templateUrl: "views/crudSac/Inicial.html",
            controller: "sacCtrl",
            data: { pageTitle: 'Crud Sac Inicial' }
        }) 
        .state('index.sacAgregar', {// Agregar
            url: "/sacAgregar",
            templateUrl: "views/crudSac/Agregar.html",
            controller: "sacAgregarCtrl",
            data: { pageTitle: 'Crud Sac Agregar' }
        })
        .state('index.sacEditar', {// Editar
            url: "/sacEditar/:id",
            templateUrl: "views/crudSac/Editar.html",
            controller:'sacEditarCtrl',
            data: { pageTitle: 'crud Sac'}
        })
        .state('index.sacEliminar', {// Eliminar
            url: "/sacEliminar",
            templateUrl: "views/crudSac/Eliminar.html",
            data: { pageTitle: 'crud Sac' }
        })
        // crudSacRubrozhs
        .state('index.sacrubrozhsInicial', { // despliegue inicial
            url: "/sacrubrozhsInicial",
            templateUrl: "views/crudSacRubroZhs/Inicial.html",
            controller: "sacrubrozhsCtrl",
            data: { pageTitle: 'Crud SacRubroZhs Inicial' }
        }) 
        .state('index.sacrubrozhsAgregar', {// Agregar
            url: "/sacrubrozhsAgregar",
            templateUrl: "views/crudSacRubroZhs/Agregar.html",
            controller: "sacrubrozhsAgregarCtrl",
            data: { pageTitle: 'Crud SacRubroZhs Agregar' }
        })
        .state('index.sacrubrozhsEditar', {// Editar
            url: "/sacrubrozhsEditar/:id",
            templateUrl: "views/crudSacRubroZhs/Editar.html",
            controller:'sacrubrozhsEditarCtrl',
            data: { pageTitle: 'crud SacRubroZhs'}
        })
        .state('index.sacrubrozhsEliminar', {// Eliminar
            url: "/sacrubrozhsEliminar",
            templateUrl: "views/crudSacRubroZhs/Eliminar.html",
            data: { pageTitle: 'crud SacRubroZhs' }
        })
        // crudTemporada
        .state('index.temporadaInicial', { // despliegue inicial
            url: "/temporadaInicial",
            templateUrl: "views/crudTemporada/Inicial.html",
            controller: "temporadaCtrl",
            data: { pageTitle: 'Crud Temporada Inicial' }
        }) 
        .state('index.temporadaAgregar', {// Agregar
            url: "/temporadaAgregar",
            templateUrl: "views/crudTemporada/Agregar.html",
            controller: "temporadaCtrl",
            data: { pageTitle: 'Crud Temporada Agregar' }
        })
        .state('index.temporadaEditar', {// Editar
            url: "/temporadaEditar/:id",
            templateUrl: "views/crudTemporada/Editar.html",
            controller:'temporadaEditarCtrl',
            data: { pageTitle: 'crud Temporada'}
        })
        .state('index.temporadaEliminar', {// Eliminar
            url: "/temporadaEliminar",
            templateUrl: "views/crudTemporada/Eliminar.html",
            data: { pageTitle: 'crud Temporada' }
        })
        
        // crudTemporadaVersion
        .state('index.temporadaversionInicial', { // despliegue inicial
            url: "/temporadaversionInicial",
            templateUrl: "views/crudTemporadaVersion/Inicial.html",
            controller: "temporadaversionCtrl",
            data: { pageTitle: 'Crud Temporada Version Inicial' }
        }) 
        .state('index.temporadaversionAgregar', {// Agregar
            url: "/temporadaversionAgregar",
            templateUrl: "views/crudTemporadaVersion/Agregar.html",
            controller: "temporadaversionCtrl",
            data: { pageTitle: 'Crud Temporada Version Agregar' }
        })
        .state('index.temporadaversionEditar', {// Editar
            url: "/temporadaversionEditar/:id",
            templateUrl: "views/crudTemporadaVersion/Editar.html",
            controller:'temporadaversionEditarCtrl',
            data: { pageTitle: 'crud Temporada Version'}
        })
        .state('index.temporadaversionEliminar', {// Eliminar
            url: "/temporadaversionEliminar",
            templateUrl: "views/crudTemporadaVersion/Eliminar.html",
            data: { pageTitle: 'crud Temporada Version' }
        })
         // crudZhs
        .state('index.zhsInicial', { // despliegue inicial
            url: "/zhsInicial",
            templateUrl: "views/crudZhs/Inicial.html",
            controller: "zhsCtrl",
            data: { pageTitle: 'Crud Zhs Inicial' }
        }) 
        .state('index.zhsAgregar', {// Agregar
            url: "/zhsAgregar",
            templateUrl: "views/crudZhs/Agregar.html",
            controller: "zhsCtrl",
            data: { pageTitle: 'Crud Zhs Agregar' }
        })
        .state('index.zhsEditar', {// Editar
            url: "/zhsEditar/:id",
            templateUrl: "views/crudZhs/Editar.html",
            controller:'zhsEditarCtrl',
            data: { pageTitle: 'crud zhs'}
        })
        .state('index.zhsEliminar', {// Eliminar
            url: "/zhsEliminar",
            templateUrl: "views/crudZhs/Eliminar.html",
            data: { pageTitle: 'crud Zhs' }
        })

        .state('index.wizard', {
            url: '/wizard',
            templateUrl: 'views/crudZhs/wizard/wizard.html',
            data: { pageTitle: 'formulario wizard zhs' }
        })  
        .state('index.wizard.step_one', {
            url: '/step_one',
            templateUrl: 'views/crudZhs/wizard/step_one.html',
            controller:"zhsStepOneCtrl", 
            data: { pageTitle: 'formulario wizard zhs' }
        })
        .state('index.wizard.step_two', {
            url: '/step_two',
            templateUrl: 'views/crudZhs/wizard/step_two.html',
            controller:"zhsStepTwoCtrl",
            data: { pageTitle: 'formulario wizard zhs' }
        })
        .state('index.wizard.step_three', {
            url: '/step_three',
            templateUrl: 'views/crudZhs/wizard/step_three.html',
            controller:"zhsStepThreeCtrl",
            data: { pageTitle: 'formulario wizard zhs' }
        })
        .state('index.wizardEditar', {
            url: '/wizardEditar',
            templateUrl: 'views/crudZhs/wizardEditar/wizard.html',
            data: { pageTitle: 'formulario wizard zhs' }
        })  
        .state('index.wizardEditar.step_one', {
            url: '/step_one/:id',
            templateUrl: 'views/crudZhs/wizardEditar/step_one.html',
            controller:"zhsStepOneEditarCtrl",
            params: { id:'',codigo:''}
        })
        .state('index.wizardEditar.step_two', {
            url: '/step_two',
            templateUrl: 'views/crudZhs/wizardEditar/step_two.html',
            controller:"zhsStepTwoEditarCtrl",
            data: { pageTitle: 'formulario wizard zhs' }
        })
        .state('index.wizardEditar.step_three', {
            url: '/step_three',
            templateUrl: 'views/crudZhs/wizardEditar/step_three.html',
            controller:"zhsStepThreeEditarCtrl",
            data: { pageTitle: 'formulario wizard zhs' }
        })
        // crudZhsVariedad
        .state('index.variedadInicial', { // despliegue inicial
            url: "/variedadInicial",
            templateUrl: "views/crudVariedad/Inicial.html",
            controller: "variedadCtrl",
            data: { pageTitle: 'Crud Variedad Inicial' }
        }) 
        .state('index.variedadAgregar', {// Agregar
            url: "/variedadAgregar",
            templateUrl: "views/crudVariedad/Agregar.html",
            controller: "variedadAgregarCtrl",
            data: { pageTitle: 'Crud Variedad Agregar' }
        })
        .state('index.variedadEditar', {// Editar
            url: "/variedadEditar/:id",
            templateUrl: "views/crudVariedad/Editar.html",
            controller:'variedadEditarCtrl',
            data: { pageTitle: 'crud variedad'}
        })
        .state('index.variedadEliminar', {// Eliminar
            url: "/variedadEliminar",
            templateUrl: "views/crudVariedad/Eliminar.html",
            data: { pageTitle: 'crud Variedad' }
        })
         // crudProducto
        .state('index.productoInicial', { // despliegue inicial
            url: "/productoInicial",
            templateUrl: "views/crudProducto/Inicial.html",
            controller: "productoCtrl",
            data: { pageTitle: 'Crud Producto Inicial' }
        }) 
        .state('index.productoAgregar', {// Agregar
            url: "/productoAgregar",
            templateUrl: "views/crudProducto/Agregar.html",
            controller: "productoAgregarCtrl",
            data: { pageTitle: 'Crud Producto Agregar' }
        })
        .state('index.productoEditar', {// Editar
            url: "/productoEditar/:id",
            templateUrl: "views/crudProducto/Editar.html",
            controller:'productoEditarCtrl',
            data: { pageTitle: 'crud producto'}
        })
        .state('index.productoEliminar', {// Eliminar
            url: "/productoEliminar",
            templateUrl: "views/crudProducto/Eliminar.html",
            data: { pageTitle: 'crud Producto' }
        })
        // crudComuna
        .state('index.comunaInicial', { // despliegue inicial
            url: "/comumaInicial",
            templateUrl: "views/crudComuna/Inicial.html",
            controller: "comunaCtrl",
            data: { pageTitle: 'Crud Comuna Inicial' }
        }) 
        .state('index.comunaAgregar', {// Agregar
            url: "/comunaAgregar",
            templateUrl: "views/crudComuna/Agregar.html",
            controller: "comunaAgregarCtrl",
            data: { pageTitle: 'Crud Comuna Agregar' }
        })
        .state('index.comunaEditar', {// Editar
            url: "/comunaEditar/:id",
            templateUrl: "views/crudComuna/Editar.html",
            controller:'comunaEditarCtrl',
            data: { pageTitle: 'crud comuna'}
        })
        .state('index.comunaEliminar', {// Eliminar
            url: "/comunaEliminar",
            templateUrl: "views/crudComuna/Eliminar.html",
            data: { pageTitle: 'crud Comuna' }
        })
         // crudRegion
        .state('index.regionInicial', {//Despliegue inicial
            url: "/regionInicial",
            templateUrl: "views/crudRegion/Inicial.html",
            controller: "regionCtrl",
            data: { pageTitle: 'Crud Region Inicial' }
        }) 
        .state('index.regionAgregar', {//Agregar
            url: "/regionAgregar",
            templateUrl: "views/crudRegion/Agregar.html",
            controller: "regionAgregarCtrl",
            data: { pageTitle: 'Crud Region Agregar' }
        })
        .state('index.regionEditar', {//Editar
            url: "/regionEditar/:id",
            templateUrl: "views/crudRegion/Editar.html",
            controller:'regionEditarCtrl',
            data: { pageTitle: 'crud region Editar'}
        })
        .state('index.regionEliminar', {// Eliminar
            url: "/regionEliminar",
            templateUrl: "views/crudRegion/Eliminar.html",
            data: { pageTitle: 'crud Region Eliminar' }
        })
        // crudVector
        .state('index.vectorInicial', {//Despliegue inicial
            url: "/vectorInicial",
            templateUrl: "views/crudVector/Inicial.html",
            controller: "vectorCtrl",
            data: { pageTitle: 'Crud Vector Inicial' }
        }) 
        .state('index.vectorAgregar', {//Agregar
            url: "/vectorAgregar",
            templateUrl: "views/crudVector/Agregar.html",
            controller: "vectorAgregarCtrl",
            data: { pageTitle: 'Crud Vector Agregar' }
        })
        .state('index.vectorEditar', {//Editar
            url: "/vectorEditar/:id",
            templateUrl: "views/crudVector/Editar.html",
            controller:'vectorEditarCtrl',
            data: { pageTitle: 'crud vector Editar'}
        })
        .state('index.vectorEliminar', {// Eliminar
            url: "/vectorEliminar",
            templateUrl: "views/crudVector/Eliminar.html",
            data: { pageTitle: 'crud Vector Eliminar' }
        })
        // crudPrima
        .state('index.primaInicial', {//Despliegue inicial
            url: "/primaInicial",
            templateUrl: "views/crudPrima/Inicial.html",
            controller: "primaCtrl",
            data: { pageTitle: 'Crud Prima Inicial' }
        }) 
        .state('index.primaAgregar', {//Agregar
            url: "/primaAgregar",
            templateUrl: "views/crudPrima/Agregar.html",
            controller: "primaAgregarCtrl",
            data: { pageTitle: 'Crud Prima Agregar' }
        })
        .state('index.primaEditar', {//Editar
            url: "/primaEditar/:id",
            templateUrl: "views/crudPrima/Editar.html",
            controller:'primaEditarCtrl',
            data: { pageTitle: 'crud prima Editar'}
        })
        .state('index.primaEliminar', {// Eliminar
            url: "/primaEliminar",
            templateUrl: "views/crudPrima/Eliminar.html",
            data: { pageTitle: 'crud Prima Eliminar' }
        });
}

var app = angular
    .module('inspinia',[
        'ui.bootstrap',
        'ui.bootstrap.modal',
        'ui.router',
        'datatables',
        'datatables.buttons',
        'blockUI',
        'ngResource',
        'oitozero.ngSweetAlert',
        'oc.lazyLoad',
        'platanus.rut',
        'ngIdle',
        'pascalprecht.translate',
        'datePicker',
        'daterangepicker',
        'localytics.directives'])
    .config(config)


app.factory('miServicio', function () {
        var NsZhsCodigo     = "";
        var RubroNombre     = "";
        var TempVerNombre   = "";
        var TempNombre      = "";
        var RubroId         = 0;
        var NsZhsId         = 0;
        var SectorId        = 0;                   
        var VarId           = 0;           
        var RegionId        = 0;           
        var ComunaId        = 0;
        var TempId          = 0;
        var TempVerId       = 0;           
        var tablaSacs       = [];
        var tablaEliminados = [];

        return {
            getTempId: function () {
                return TempId;
            },
            setTempId: function(value) {
                TempId = value;
            },
            getTempNombre: function () {
                return TempNombre;
            },
            setTempNombre: function(value) {
                TempNombre = value;
            },
            getTempVerId: function () {
                return TempVerId;
            },
            setTempVerId: function(value) {
                TempVerId = value;
            },
            getTempVerNombre: function () {
                return TempVerNombre;
            },
            setTempVerNombre: function(value) {
                TempVerNombre = value;
            },
            getNsZhsId: function () {
                return NsZhsId;
            },
            setNsZhsId: function(value) {
                NsZhsId = value;
            },
            getNsZhsCodigo: function () {
                return NsZhsCodigo;
            },
            setNsZhsCodigo: function(value) {
                NsZhsCodigo = value;
            },
            getRubroNombre: function () {
                return RubroNombre;
            },
            setRubroNombre: function(value) {
                RubroNombre = value;
            },
            getRubroId: function () {
                return RubroId;
            },
            setRubroId: function(value) {
                RubroId = value;
            },
            getSectorId: function () {
                return SectorId;
            },
            setSectorId: function(value) {
                SectorId = value;
            },
            getRubroId: function () {
                return RubroId;
            },
            setRubroId: function(value) {
                RubroId = value;
            },
            getRegionId: function () {
                return RegionId;
            },
            setRegionId: function(value) {
                RegionId = value;
            },
            getComunaId: function () {
                return ComunaId;
            },
            setComunaId: function(value) {
                ComunaId = value;
            },
            getTablaSacs: function () {
                return tablaSacs;
            },
            setTablaSacs: function(value) {
                tablaSacs = value;
            },
            getTablaEliminados: function () {
                return tablaEliminados;
            },
            setTablaEliminados: function(value) {
                tablaEliminados = value;
            }

        };
    });
