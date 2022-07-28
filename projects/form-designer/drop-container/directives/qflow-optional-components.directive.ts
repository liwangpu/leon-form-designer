import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import SortableJs from 'sortablejs';

@Directive({
  selector: '[qflowOptionalComponents]'
})
export class QflowOptionalComponentsDirective implements OnInit {

  @Input('qflowOptionalComponents')
  list?: any[];
  @Input()
  dragItemClass!: string;
  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    console.log('el:', this.el.nativeElement);
    console.log('list:', this.list);
    SortableJs.create(this.el.nativeElement, {
      group: {
        name: 'form-designer',
        pull: 'clone',
        put: false
      },
      sort: false,
      setData: (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl: HTMLElement) => {
        console.log('set data dragEl:', dragEl);
        // console.log('set data dataTransfer:', dataTransfer);
        // // dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
        // dataTransfer.setData('Text', '1235453'); // `dataTransfer` object of HTML5 DragEvent
        console.log('set data dragEl:', dragEl.parentNode);
        const arr = dragEl.parentNode?.querySelectorAll(`.${this.dragItemClass}`)
        // console.log('this:',this.dragItemClass);
        console.log('arr:', arr);
      },
      onStart: function (/**Event*/evt) {
        // evt.oldIndex;  // element index within parent
        // console.log('stat:', evt);
      },
      onEnd(e: any) {
        var itemEl = e.item;  // dragged HTMLElement
        // e.to;    // target list
        // e.from;  // previous list
        // e.oldIndex;  // element's old index within old parent
        // e.newIndex;  // element's new index within new parent
        // e.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
        // e.newDraggableIndex; // element's new index within new parent, only counting draggable elements
        // e.clone // the clone element
        // e.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
        console.log('end:', (e.originalEvent as DragEvent).dataTransfer?.getData('Text'));
        console.log('itemEl:', itemEl);
        let condition = true // Your condition here
        if (condition) {
          const items = e.from.querySelectorAll(':scope > div') // You can change this if needed (example: draggable: '.my-item' change to :scope > .my-item)
          e.from.insertBefore(e.item, items[e.oldIndex + (e.oldIndex > e.newIndex)])
          return false
        }
        return true;
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
        // console.log('move:', evt);
      },
      onChange: function (/**Event*/evt) {
        // evt.newIndex // most likely why this event is used is to get the dragging element's current index
        // same properties as onEnd
        // console.log('change:', evt);
      }
    });
  }


}
