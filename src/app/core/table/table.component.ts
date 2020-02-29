import {
  Component,
  OnChanges,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { TableMetaData } from './TableCommonSetting';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges, OnInit {
  @Input() settings: TableMetaData;

  originalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };

  ngOnInit(): void {}
  addRow() {
    this.settings.series.push(
      this.settings.headers.reduce(function(acc, curr) {
        acc[curr] = '';
        return acc;
      }, {})
    );
  }

  push() {
    const table = document.getElementById('datatable') as HTMLTableElement;
    const rowCount = table.rows.length;
    alert(rowCount);
    alert(this.settings.series.length);

    for (let j = 0; j < this.settings.series.length; j++) {
      const oCells = table.rows[j].cells;
      console.dir(oCells);
      const resource = {};
      this.settings.headers.forEach(function (value, i)
      {

        console.log(value + "==" + i+"==="+ oCells.item(i + 1));
        resource[value] = oCells.item(i + 1).innerHTML;
      });
      console.dir('Row Object is' + resource);
      this.settings.series[j] = resource;
    }
  }

  deleteRow(index) {
    if (this.settings.series.length === 1) {
      alert('Can\'t delete this row , as it is default data!');
      return false;
    } else {
      alert('this is index' + index);
      this.settings.series.splice(index, 1);
      alert('Row deleted successfully!');
      return true;
    }
  }

  ngOnChanges() {
    if (this.settings.headers) {
      //
    } else {
      //
    }
  }
}
