import { Component, Input } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'text-area',
    templateUrl: './textarea.component.html'
  })
  export class TextAreaComponent {
      @Input() dataTodisplay: string;

  }