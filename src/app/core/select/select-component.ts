import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from './Option.wrapper';

@Component({
  selector: 'app-select',
  templateUrl: './select-component.html',
  styleUrls: ['./select-component.css']
})
export class SelectComponent implements OnInit
{
  @Input()
  options: Option[];
  @Output()
  selectedOption: Option;
  @Output() onSelect = new EventEmitter<any>();
  constructor() { }
  ngOnInit(){
    this.selectedOption = (this.options.length > 0 ) ? this.options[0] : {'id':'0', 'name':'None'};
  }
  OnSelect(selectedOption: Option)
  {
    alert("emmiting event");
    this.onSelect.emit(event);
   // this.onSelect.emit(selectedOption);
    alert("post emitting event");
    console.log('---Selected dropdown Object id is:' + selectedOption.id + ' and value is:' + selectedOption.name);
  }
}
