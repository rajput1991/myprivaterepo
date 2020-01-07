import { Directive, ElementRef, Input, Renderer, OnInit } from '@angular/core';
@Directive({ selector: '[tablecellstyle]' })

export class TableCellStyleDirective implements OnInit {
@Input() tablecellstyle: string;
constructor(private el: ElementRef,private renderer: Renderer) { }
ngOnInit() {
 if (this.tablecellstyle === undefined) {
     this.renderer.setElementStyle(
          this.el.nativeElement,
          'color',
       '#dcdcdc');

     this.renderer.setElementStyle(
          this.el.nativeElement,
          'text-align',
          'center');
 }
 if (typeof this.tablecellstyle === 'number') {
     this.renderer.setElementStyle(
          this.el.nativeElement,
          'text-align',
          'right');
 }
}
}
