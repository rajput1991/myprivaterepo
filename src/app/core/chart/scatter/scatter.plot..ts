import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subscription, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter.plot.html',
  styleUrls: ['./scatter.plot.css']
})
export class ScatterPlotComponent implements OnInit
{
  subscription: Subscription;
  constructor(private http: HttpClient) { }

  public options: any = {
    chart: {
      type: 'scatter',
      height: 700
    },
    title: {
      text: 'HPE 5G Monitoring Solution'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) +

 'y: ' + this.y.toFixed(2);
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%e %b %y', this.value);
        }
      }
    },
    series: [
      {
        name: 'Normal',
        turboThreshold: 500000,
        data: []
      },
      {
        name: 'Abnormal',
        turboThreshold: 500000,
        data: []
      }
    ]
  }
  ngOnInit(){
    // Set 10 seconds interval to update data again and again
    const source = interval(10000);

    // Sample API
    const apiLink = 'https://api.myjson.com/bins/13lnf4';

    this.subscription = source.subscribe(val => this.getApiResponse(apiLink).then(
      data => {
        const updated_normal_data = [];
        const updated_abnormal_data = [];
        data.forEach(row => {
          const temp_row = [
            new Date(row.timestamp).getTime(),
            row.value
          ];
          row.Normal === 1 ? updated_normal_data.push(temp_row) : updated_abnormal_data.push(temp_row);
        });
        this.options.series[0]['data'] = updated_normal_data;
        this.options.series[1]['data'] = updated_abnormal_data;
        Highcharts.chart('scatterChartContainer', this.options);
      },
      error => {
        console.log('Something went wrong.');
      })
    );
  }

  getApiResponse(url) {
    return this.http.get<any[]>(url, {})
      .toPromise().then(res => {
        return res;
      });
  }
}
