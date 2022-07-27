import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostBinding, ElementRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import * as faker from 'faker';
import Sortable from 'sortablejs';

@Component({
  selector: 'qflow-form-designer-drop-container',
  templateUrl: './drop-container.component.html',
  styleUrls: ['./drop-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropContainerComponent implements OnInit, OnDestroy {

  @HostBinding('attr.qflow-designer-drop-container')
  public key?: string;

  @ViewChild('container', { static: true })
  private container!: ElementRef
  constructor(

  ) {
    this.key = faker.datatype.uuid();
  }

  public ngOnDestroy(): void {

  }

  public ngOnInit(): void {
    console.log('title:', this.container.nativeElement);
    new Sortable(this.container.nativeElement, {
      group: {
        name: 'form-designer',
      },
      ghostClass: "sortable-ghost", 
      sort: false,
      animation: 150,
      onEnd(evt) {
        console.log('onEnd:', evt);
      },
      onAdd: function (/**Event*/evt) {
        console.log('add:', evt);
      },
      onChoose: function (/**Event*/evt) {
        console.log('onChoose:', evt);
      },
      onUnchoose: function(/**Event*/evt) {
        console.log('onUnchoose:', evt);
      },
      onUpdate: function (/**Event*/evt) {
        console.log('onUpdate:', evt);
      },
      onMove: function (/**Event*/evt) {
        console.log('onUpdate:', evt);
      },
      onChange: function(/**Event*/evt) {
        console.log('onChange:', evt);
      },
      onRemove: function (/**Event*/evt) {
        console.log('onRemove:', evt);
      },
    });
  }

}
