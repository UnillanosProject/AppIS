 var options;
 var chart;
$(function () {
    options={
        chart: {
            renderTo: 'grafica',
            zoomType: 'x'
        },
        title: {
            text: 'Pred Finance'
        }, 
        subtitle: {
            text: document.ontouchstart === undefined ?
                    '' :
                    'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime',
            minRange: 14 * 24 * 3600000 // fourteen days
        },
        yAxis: {
            title: {
                text: 'Exchange rate'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'USD to EUR',
            pointInterval: 24 * 3600 * 1000,
            pointStart: Date.UTC(2006, 0, 1),
            data: []
        }]
    };
    //chart = new Highcharts.Chart(options);
});

function cambiarData(data) {
      options.series = [{
            type: 'area',
            name: 'Facebook Inc',
            pointInterval: 24 * 3600 * 1000,
            pointStart: Date.UTC(2006, 0, 1),
            data: data
                }];
      chart = new Highcharts.Chart(options);
}

var empresa;
var yqlCallback = function(datos) {
        //alert(datos.query.count);
        options.title.text=empresa;
        //alert(options.series[0].data[4]);
        options.series = [{
            type: 'area',
            name: empresa,
            pointInterval: 24 * 3600 * 1000,
            pointStart: Date.UTC(2013, 11, 26),
            data: []
                }];
//        options.series.push({
//            type: 'area',
//            name: empresa,
//            pointInterval: 24 * 3600 * 1000,
//            pointStart: Date.UTC(2013, 11, 26),
//            data: []
//                });
            
    //options.series[0].data=new Array(datos.query.count);
     for (i = datos.query.count-1; i >=0; i--) {
//            if (i<100) {
//                console.log(i+" : "+datos.query.results.quote[i].Close);
//            }     
             //options.series[0].data[i]=datos.query.results.quote[i].Close;
            options.series[0].data.push(parseFloat(datos.query.results.quote[i].Adj_Close));
            //alert(options.series[0].data[i]);
        }
        //alert(options.series[0].data[datos.query.count-1]);
        chart = new Highcharts.Chart(options);
        localStorage.graficoCargado="true";
      };

var dataDefault=[
    0,0.0980,0.1951,0.2903,0.3827,0.4714,0.5556,0.6344,0.7071,0.7730,0.8315,0.8819,0.9239,0.9569,0.9808,0.9952,1.0000,0.9952,0.9808,0.9569,0.9239,0.8819,0.8315,0.7730,0.7071,0.6344,0.5556,0.4714,0.3827,0.2903,0.1951,0.0980,0.0000,-0.0980,-0.1951,-0.2903,-0.3827,-0.4714,-0.5556,-0.6344,-0.7071,-0.7730,-0.8315,-0.8819,-0.9239,-0.9569,-0.9808,-0.9952,-1.0000,-0.9952,-0.9808,-0.9569,-0.9239,-0.8819,-0.8315,-0.7730,-0.7071,-0.6344,-0.5556,-0.4714,-0.3827,-0.2903,-0.1951,-0.0980,0.0000,0.0980,0.1951,0.2903,0.3827,0.4714,0.5556,0.6344,0.7071,0.7730,0.8315,0.8819,0.9239,0.9569,0.9808,0.9952,1.0000,0.9952,0.9808,0.9569,0.9239,0.8819,0.8315,0.7730,0.7071,0.6344,0.5556,0.4714,0.3827,0.2903,0.1951,0.0980,0.0000,-0.0980,-0.1951,-0.2903,-0.3827,-0.4714,-0.5556,-0.6344,-0.7071,-0.7730,-0.8315,-0.8819,-0.9239,-0.9569,-0.9808,-0.9952,-1.0000,-0.9952,-0.9808,-0.9569,-0.9239,-0.8819,-0.8315,-0.7730,-0.7071,-0.6344,-0.5556,-0.4714,-0.3827,-0.2903,-0.1951,-0.0980,0.0000,0.0000
    ];

function cargarDatosFinance(sigla,nombreEmpresa) {
    // Build url params and make the ad call
    //empresa = nombreEmpresa.replace("%20"," ");
//    alert(empresa);
    empresa=nombreEmpresa;
    //alert(sigla+":"+empresa);
    if(sigla===""){
        options.series[0].data=dataDefault;
        chart = new Highcharts.Chart(options);
        //localStorage.graficoCargado="true";
    }
//    else if(empresa==="YHOO"){
//        options.series[0].data=[58.3,125.4,23.7,26.4,7.85,9.65,2.32];
//        chart = new Highcharts.Chart(options);
//    }
    else{
    var fechaInicio="2013-11-26";
    var fechaFinal="2014-11-26";
    
//    var insert = document.getElementById("script").src = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20%28%22"+empresa+"%22%29&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=yqlCallback";  
    //var insert = document.getElementById("script").src = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22"+sigla+"%22%20and%20startDate%20%3D%20%22"+fechaInicio+"%22%20and%20endDate%20%3D%20%22"+fechaFinal+"%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=yqlCallback";
    //alert(document.getElementById("script").src);
     var url ="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22"+sigla+"%22%20and%20startDate%20%3D%20%22"+fechaInicio+"%22%20and%20endDate%20%3D%20%22"+fechaFinal+"%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";
        $.getJSON( url, {
            format: "json"
            })
            .done(function( data ) {
                yqlCallback(data);
            });
}
}

