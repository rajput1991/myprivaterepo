import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'formatCell' })
export class TableCellFormatPipe implements PipeTransform {
    transform(value: any) {
        if ( value === undefined ) {
          //  return 'Not Available';
          return ' ';
        }
        return value;
    }
}
