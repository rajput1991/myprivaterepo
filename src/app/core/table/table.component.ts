import { Component, OnChanges, Input } from '@angular/core';
import { TableCommonSetting, ColumnMap } from './TableCommonSetting';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
  @Input() records: any[];
  @Input() caption: string;

  @Input() settings: TableCommonSetting[];
  // used when there is no ColumnMap Class
  columnMaps: TableCommonSetting[];

  columnMapsData: ColumnMap [];
    keys: string[];
    ngOnChanges() {
     // this.keys = Object.keys(this.records[0]);
      if (this.settings) { // when settings provided
       // this.columnMaps = this.settings;
       this.columnMapsData = this.settings
       .map( col => new ColumnMap(col) );
    } else { // no settings, create column maps with defaults
        // this.columnMaps = Object.keys(this.records[0])
        //     .map( key => {
        //          return {
        //              primaryKey: key,
        //              header: key.slice(0, 1).toUpperCase() +
        //                 key.replace(/_/g, ' ' ).slice(1)
        //     }
        // });
        this.columnMapsData = Object.keys(this.records[0])
                .map( key => {
                    return new ColumnMap( { primaryKey: key });
            });
    }
}
    }

