import { Directive, ElementRef, OnInit } from '@angular/core';
import SortableJs from 'sortablejs';

@Directive({
  selector: '[qflowOptionalComponents]'
})
export class QflowOptionalComponentsDirective implements OnInit {

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    console.log('el:', this.el.nativeElement);
    SortableJs.create(this.el.nativeElement, {
      group: {
        name: 'form-designer',
        pull: 'clone',
        put: false
      },
      sort: false,
      onStart: function (/**Event*/evt) {
        // evt.oldIndex;  // element index within parent
        console.log('stat:', evt);
      },
      onMove: function (/**Event*/evt, /**Event*/originalEvent) {
        // // Example: https://jsbin.com/nawahef/edit?js,output
        // evt.dragged; // dragged HTMLElement
        // evt.draggedRect; // DOMRect {left, top, right, bottom}
        // evt.related; // HTMLElement on which have guided
        // evt.relatedRect; // DOMRect
        // evt.willInsertAfter; // Boolean that is true if Sortable will insert drag element after target by default
        // originalEvent.clientY; // mouse position
        // // return false; — for cancel
        // // return -1; — insert before target
        // // return 1; — insert after target
        // // return true; — keep default insertion point based on the direction
        // // return void; — keep default insertion point based on the direction
        console.log('move:', evt);
      },
      onChange: function (/**Event*/evt) {
        // evt.newIndex // most likely why this event is used is to get the dragging element's current index
        // same properties as onEnd
        console.log('change:', evt);
      }
    });
  }


}
