import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostBinding, ElementRef, ViewChild, ChangeDetectorRef, Inject, Injector, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Renderer2 } from '@angular/core';
import * as _ from 'lodash';
import * as faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import { DropContainerOpsatService } from '../../services/drop-container-opsat.service';
import { DropContainer } from '../../models/drop-container';
import { SubSink } from 'subsink';
import SortableJs from 'sortablejs';
import { DynamicComponent, DynamicComponentMetadata, DynamicComponentRenderer, DYNAMIC_COMPONENT, DYNAMIC_COMPONENT_METADATA, DYNAMIC_COMPONENT_RENDERER, LazyService } from 'form-core';
import { Store } from '@ngrx/store';
import { addNewComponent, selectChildComponents } from 'form-designer/state-store';
import { ComponentDesignWrapperComponent } from '../component-design-wrapper/component-design-wrapper.component';

@Component({
  selector: 'qflow-form-designer-drop-container',
  templateUrl: './drop-container.component.html',
  styleUrls: ['./drop-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropContainerComponent implements OnInit, OnDestroy {

  @HostBinding('class.actived')
  actived?: boolean;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  private readonly container: ViewContainerRef;
  @ViewChild('dropContainer', { static: true })
  private readonly dropContainer: ElementRef;
  private subs = new SubSink();
  @LazyService(DYNAMIC_COMPONENT)
  private readonly dc: DynamicComponent;
  @LazyService(ComponentFactoryResolver)
  private readonly cfr: ComponentFactoryResolver;
  @LazyService(DropContainerOpsatService)
  private readonly opsat: DropContainerOpsatService;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(Renderer2)
  private readonly renderer: Renderer2;
  @LazyService(Store)
  private readonly store: Store;
  private components = new Map<string, ComponentRef<ComponentDesignWrapperComponent>>();
  constructor(
    protected injector: Injector
  ) {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    SortableJs.create(this.dropContainer.nativeElement, {
      group: {
        name: 'form-designer'
      },
      onAdd: (evt: SortableJs.SortableEvent) => {
        const dragEvt: DragEvent = (evt as any).originalEvent;
        const metadataStr = dragEvt.dataTransfer.getData('Text');
        const metadata: DynamicComponentMetadata = JSON.parse(metadataStr);
        this.store.dispatch(addNewComponent({ id: uuidv4(), componentType: metadata.type, parentId: this.dc.id, index: evt.newIndex, source: DropContainerComponent.name }));
      },
    });

    this.subs.sink = this.store.select(selectChildComponents(this.dc.id))
      .subscribe(async components => {
        for (let index = 0; index < components.length; index++) {
          const md = components[index];
          if (!this.components.has(md.id)) {
            const fac = this.cfr.resolveComponentFactory(ComponentDesignWrapperComponent);
            const ij = Injector.create({
              providers: [
                { provide: DYNAMIC_COMPONENT_METADATA, useValue: md }
              ],
              parent: this.injector
            });
            const ref = this.container.createComponent(fac, index, ij);
            this.renderer.addClass(ref.location.nativeElement, 'drop-item');
            this.components.set(md.id, ref);
          }
        }
        this.cdr.markForCheck();
      });
  }

}
