export class TableMetaData {

  headers: string[];
  label?: string;
  defaultRow?: any [];

}


export class ColumnMap {
  primaryKey: string;
  private _header: string;
  private _format: string;
  alternativeKeys?: string[];
  label?: string;
  defaultRow?: object;
  metaData: TableMetaData;

 // defaultData: object;
  constructor(metadata: TableMetaData )
  {  console.log('----- This is meta data---')
    //console.dir(metadata.headers);
     // this.primaryKey = metadata.headers[0].primaryKey;
      //this._header = metadata.headers[0].header;
    //this.format = metadata.headers[0].format;
    this.metaData = metadata;


  //this.defaumetadata.defaultRow;
  //this.label = metadata.label;

      //this.defaultData = settings.defaultData;
  }
  set header(setting: string) {
      this._header = setting ?
          setting :
          this.primaryKey.slice(0, 1).toUpperCase() +
              this.primaryKey.replace(/_/g, ' ' ).slice(1)
  }
  get header() {
      return this._header;
  }
  set format(setting: string) {
      this._format = setting ? setting : 'default';
  }
  get format() {
      return this._format;
  }
access = function ( object: any ) {
      if (object[this.primaryKey] || !this.alternativeKeys) {
          return this.primaryKey;
      }
      for (let key of this.alternativeKeys) {
          if (object[key]) {
              return key;
          }
      }
      return this.primaryKey;
  }
}
