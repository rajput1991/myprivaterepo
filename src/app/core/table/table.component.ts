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
    this.settings.defaultRow.push(
      this.settings.headers.reduce(function(acc, curr) {
        acc[curr] = '';
        return acc;
      }, {})
    );
  }

  push() {
    const table = document.getElementById('datatable') as HTMLTableElement;
    const rowCount = table.rows.length;
    for (let j = 1; j <= this.settings.defaultRow.length; j++) {
      const oCells = table.rows[j].cells;
      const resource = {};
      Object.keys(this.settings.defaultRow[0]).forEach(function(value, i) {
        resource[value] = oCells.item(i + 1).innerHTML;
      });
      console.dir('Row Object is' + resource);
      this.settings.defaultRow[j - 1] = resource;
    }
  }

  deleteRow(index) {
    if (this.settings.defaultRow.length === 1) {
      alert('Can\'t delete this row , as it is default data!');
      return false;
    } else {
      alert('this is index' + index);
      this.settings.defaultRow.splice(index, 1);
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
