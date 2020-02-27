import { Component } from '@angular/core';
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




}
