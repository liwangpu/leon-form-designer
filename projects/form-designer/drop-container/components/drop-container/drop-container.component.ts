import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostBinding, ElementRef, ViewChild, ChangeDetectorRef, Inject, Injector } from '@angular/core';
import * as _ from 'lodash';
import * as faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import { DropContainerOpsatService } from '../../services/drop-container-opsat.service';
import { DropContainer } from '../../models/drop-container';
import { SubSink } from 'subsink';
import SortableJs from 'sortablejs';
import { DynamicComponent, DynamicComponentMetadata, DYNAMIC_COMPONENT, LazyService } from 'form-core';
import { Store } from '@ngrx/store';
import { addNewComponent } from 'form-designer/state-store';

@Component({
  selector: 'qflow-form-designer-drop-container',
  templateUrl: './drop-container.component.html',
  styleUrls: ['./drop-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropContainerComponent implements OnInit, OnDestroy {

  @HostBinding('class.actived')
  actived?: boolean;
  @ViewChild('container', { static: true })
  private readonly container!: ElementRef;
  private subs = new SubSink();
  @LazyService(DYNAMIC_COMPONENT)
  private readonly dc: DynamicComponent;
  @LazyService(DropContainerOpsatService)
  private readonly opsat: DropContainerOpsatService;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(Store)
  private readonly store: Store;
  constructor(
    protected injector: Injector
  ) {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    SortableJs.create(this.container.nativeElement, {
      group: {
        name: 'form-designer'
      },
      onAdd: (evt: SortableJs.SortableEvent) => {
        const dragEvt: DragEvent = (evt as any).originalEvent;
        const metadataStr = dragEvt.dataTransfer.getData('Text');
        const metadata: DynamicComponentMetadata = JSON.parse(metadataStr);
        this.store.dispatch(addNewComponent({ id: uuidv4(), componentType: metadata.type, parentId: this.dc.id, source: DropContainerComponent.name }));
      },
    });
  }

}
