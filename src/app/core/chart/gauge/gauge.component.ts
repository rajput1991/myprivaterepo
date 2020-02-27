import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeChartComponent implements OnInit
{

  // items: any = [
  //   {
  //     'id': '0', 'name': 'Bangalore',
  //     'children': [{'id': '0', 'name': 'type1',}, {'id': '1', 'name': 'type2',}]

  //   },
  //   {
  //     'id': '1', 'name': 'ngNodeB1',
  //     'children': [{'id': '0', 'name': 'type1',}, {'id': '1', 'name': 'type2',}]

  //   },
  //   {
  //     'id': '2', 'name': 'Cell1',
  //     'children': [{'id': '0', 'name': 'type1',}, {'id': '1', 'name': 'type2',}]

  //   },

  // ]
  // onRootItemSelect(val)
  // {
  //   alert("coming" + val);
  // }

  public options:any = {
    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 100,
                useHTML: true
            }
        }
    },
    series : [{
      name: 'RPM',
      data: [1],
      dataLabels: {
         format: '<div style = "text-align:center"> <span style = "font-size:25px;color:' +
            ('black') +
            '">{y:.1f}</span><br/>' +
            '<span style = "font-size:12px;color:silver">* 1000 / min</span></div>'
      },
      tooltip: {
         valueSuffix: ' revolutions/min'
      }
   }]
};



ngOnInit(): void
{
  Highcharts.chart('gaugeChartContainer', this.options);
}
}
