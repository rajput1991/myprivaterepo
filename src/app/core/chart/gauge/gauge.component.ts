import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeChartComponent
{

  items: any = [
    {
      'id': '0', 'name': 'Bangalore',
      'children': [{'id': '0', 'name': 'type1',}, {'id': '1', 'name': 'type2',}]

    },
    {
      'id': '1', 'name': 'ngNodeB1',
      'children': [{'id': '0', 'name': 'type1',}, {'id': '1', 'name': 'type2',}]

    },
    {
      'id': '2', 'name': 'Cell1',
      'children': [{'id': '0', 'name': 'type1',}, {'id': '1', 'name': 'type2',}]

    },

  ]
  onRootItemSelect(val)
  {
    alert("coming" + val);
  }


}
