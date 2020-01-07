import { Component, OnInit, Input, Output } from '@angular/core';
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
  constructor() { }
  ngOnInit(){
    this.selectedOption = (this.options.length > 0 ) ? this.options[0] : {'id':'0', 'name':'None'};
  }
  OnSelect(selectedOption: Option){
    console.log('---Selected dropdown Object id is:' + selectedOption.id + ' and value is:' + selectedOption.name);
  }
}
