import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit{
  @Input() label: string;
  @Input() functionCall: string;
  @Output() onClick = new EventEmitter<any>();
  ngOnInit(): void{}
  onClickButton(event){
      console.log(this.label+" button clicked, Event Generated is of type : "+event.type);
      this.onClick.emit(event);
    }
}
