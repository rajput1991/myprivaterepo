import { Component } from '@angular/core';
import { TableCommonSetting } from '../../core/table/TableCommonSetting';
import { Option } from '../../core/select/Option.wrapper';


@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent
{
  latitude = -28.68352;
  longitude = -147.20785;
  mapType = 'satellite';

  functioncall(event){
    console.log("Event "+event.type+"  is captured in SubHeaderComponent" );
  }

  technologies: Option []=[
    { 'id': '0', 'name': '2G' },
    { 'id': '1', 'name': '3G' },
    { 'id': '2', 'name': '4G' },
    { 'id': '3', 'name': '5G' }
  ]

  networkelementTypes: Option []=[
    { 'id': '0', 'name': 'Cluster' },
    { 'id': '1', 'name': 'gNodeB' },
    { 'id': '2', 'name': 'Cell' },
  ]

  vendors: Option []=[
    { 'id': '0', 'name': 'ZTE' },
    { 'id': '1', 'name': 'NOKIA' },
    { 'id': '2', 'name': 'HUAWEI' },
    { 'id': '3', 'name': 'ERICSSON' },
  ]



  projectSettings: TableCommonSetting [] =
  [
      {
          primaryKey: 'name',
          header: 'Name'
      },
      {
        primaryKey: 'first_launch',
        header: 'First launch',
        alternativeKeys: ['launch', 'first_flight']
      },
      {
          primaryKey: 'cost',
          header: 'Cost'
      }
  ];
    PROJECTS: any [] = [
    {
        id: 1,
        name: 'Mercury',
        cost: 277000000,
        first_flight: 'September 9, 1959',
        status: 'Complete'
    },
    {
        id: 2,
        name: 'Gemini',
        cost: 1300000000,
        first_flight: 'April 8, 1964',
        status: 'Complete'
    },
    {
        id: 3,
        name: 'Apollo',
        cost: 25400000000,
        first_flight: 'February 26, 1966',
        status: 'Complete'
    },
    {
        id: 4,
        name: 'Skylab',
        launch: 'May 14, 1973',
        status: 'Complete'
    },
    {
        id: 5,
        name: 'Apollo-Soyuz',
        launch: 'July 15, 1975',
        status: 'Complete'
    },
    {
        id: 6,
        name: 'Space Shuttle',
        total_cost: 196000000000,
        first_flight: 'August 12, 1977',
        status: 'Complete'
    }

];
  PERSONNEL: any [] = [
    {
        id: 151,
        name: 'Alan B',
        job: 'Astronaut',
        year: 1959,
        missions: ['MR-3', 'Apollo 14']
    },
    {
        id: 152,
        name: 'Virgil',
        job: 'Astronaut',
        year: 1959,
        missions: ['MR-4', 'Apollo 1']
    },
    {
        id: 153,
        name: 'John H',
        job: 'Astronaut',
        year: 1959,
        missions: ['MA-6','STS-95']
    },
    {
        id: 154,
        name: 'M. Scott',
        job: 'Astronaut',
        year: 1959,
        missions: ['MA-7']
    }
];
}
