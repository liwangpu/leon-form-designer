import { Directive, ElementRef, OnInit } from '@angular/core';
import Sortable from 'sortablejs';

@Directive({
  selector: '[qflowDropList]'
})
export class QfDropListDirective implements OnInit {

  public constructor(
    private el: ElementRef
  ) { }

  public ngOnInit(): void {
    // console.log('el:', this.el.nativeElement);
    new Sortable(this.el.nativeElement, {
      group: {
        name: 'form-designer',
        pull: 'clone',
        put: false
      },
      sort: false,
      animation: 150,
      // onEnd(evt) {
      //   console.log('onEnd:', evt);
      // },
      // onAdd: function (/**Event*/evt) {
      //   console.log('add:', evt);
      // },
      // onChoose: function (/**Event*/evt) {
      //   console.log('onChoose:', evt);
      // },
      // onUnchoose: function(/**Event*/evt) {
      //   console.log('onUnchoose:', evt);
      // },
      // onUpdate: function (/**Event*/evt) {
      //   console.log('onUpdate:', evt);
      // },
      // onMove: function (/**Event*/evt) {
      //   console.log('onUpdate:', evt);
      // },
      // onChange: function(/**Event*/evt) {
      //   console.log('onChange:', evt);
      // },
      // onRemove: function (/**Event*/evt) {
      //   console.log('onRemove:', evt);
      // },
    });
  }

}
