import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartResponse } from './chartresponse';
import { ChartConfig } from './chartconfig';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit
{
  @Input()
  chartData: ChartResponse;
  @Input()
  chartConfig: ChartConfig;

  public options: any = {
    chart: {
      type: this.chartConfig.type
  },

  title: {
      text: this.chartConfig.title
  },

  xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
  },

  yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
          text: 'Number of fruits'
      }
  },

  tooltip: {
      formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
              this.series.name + ': ' + this.y + '<br/>' +
              'Total: ' + this.point.stackTotal;
      }
  },

  plotOptions: {
      column: {
          stacking: 'normal'
      }
  },

    series: this.chartData.series
  };

  ngOnInit(): void {
  }
  renderChart(containerId: string, options: any){  Highcharts.chart(containerId,options);}
}
