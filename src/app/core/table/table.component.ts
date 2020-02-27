import {
  Component,
  OnChanges,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { ColumnMap, TableMetaData } from './TableCommonSetting';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges, OnInit{

 @Input() settings: TableMetaData;


  ngOnInit(): void {}

  addRow(rowArray)
  {
   // alert(index);
   alert(rowArray.length);
   // rowArray.push({});
    console.dir(rowArray);
   // var newObj = {};
   //this.settings.headers.forEach(key => newObj[key] = "");
  this.settings.defaultRow.push(this.settings.headers.reduce(function(acc, curr) {
    acc[curr] = '';
    return acc;
  }, {}));
  }

  somecontrol(i, records) {
    const table = document.getElementById('empTable') as HTMLTableElement;
    const rowCount = table.rows.length;
    console.dir(records);
    for (let j = 1; j <= records.length; j++) {
      const oCells = table.rows[j].cells;
      const resource = {};
      Object.keys(records[0]).forEach(function (value, i) {
      //  console.log('%d: %s', i, value);
        resource[value] = oCells.item(i+1).innerHTML;
      });
      console.dir('Row Object is' +resource);
      this.settings.defaultRow[j - 1] = resource;
    }
  }




  deleteRow(index) {
    // if you want to keep sample one row data , then use ==1
    if (  this.settings.defaultRow.length === 0) {
      alert('Can\'t delete the row when there is only one rowWarning');
      return false;
    } else {
      alert('this is index' + index);
      this.settings.defaultRow.splice(index, 1);
      alert('Row deleted successfully Delete row');
      return true;
    }
  }

  ngOnChanges()
  {
    console.log('--- From table component----');
    alert("Hello"+this.settings);
    if (this.settings.headers) {
      // alert("coming inside")
      // // alert('settings defined'+this.settings);
      // this.columnMapsData = this.settings.headers.map(col => new ColumnMap(this.settings));
      // correct this mapping anyhow
      // do proper mapping here
      // console.log('-----yo');
      // console.dir(this.columnMapsData);
    } else {
      // // alert('no settings defined'+this.settings);
      // this.columnMapsData = Object.keys(this.records[0]).map(key => {
      //   return new ColumnMap({ primaryKey: key });
      // });
    }
  }
}
