import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostBinding, ElementRef, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import * as _ from 'lodash';
import * as faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import { DropContainerOpsatService } from '../../services/drop-container-opsat.service';
import { DropContainer } from '../../models/drop-container';
import { SubSink } from 'subsink';
import SortableJs from 'sortablejs';
import { DynamicComponent, DYNAMIC_COMPONENT } from 'form-core';

@Component({
  selector: 'qflow-form-designer-drop-container',
  templateUrl: './drop-container.component.html',
  styleUrls: ['./drop-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropContainerComponent implements DropContainer, OnInit, OnDestroy {

  @HostBinding('attr.qflow-designer-drop-container')
  readonly key: string;
  @HostBinding('class.actived')
  actived?: boolean;
  @ViewChild('container', { static: true })
  private readonly container!: ElementRef;
  private subs = new SubSink();
  constructor(
    @Inject(DYNAMIC_COMPONENT)
    private dc: DynamicComponent,
    private opsat: DropContainerOpsatService,
    private cdr: ChangeDetectorRef
  ) {
    this.key = uuidv4();
  }

  ngOnDestroy(): void {
    // this.subs.unsubscribe();
    // this.opsat.deRegistryContainer(this.key);
  }

  ngOnInit(): void {
    // this.opsat.registryContainer(this.key, this);
    // this.subs.sink = this.opsat.activeContainer$
    //   .subscribe(key => {
    //     this.actived = this.key === key;
    //     this.cdr.markForCheck();
    //   });
    SortableJs.create(this.container.nativeElement, {
      group: {
        name: 'form-designer'
      },
      onAdd: function (/**Event*/evt) {
        // same properties as onEnd
        console.log('add:', evt);
      },
    });
  }

}
