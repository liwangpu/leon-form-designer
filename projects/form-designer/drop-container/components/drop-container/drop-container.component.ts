import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostBinding, ElementRef, ViewChild, ChangeDetectorRef, Injector, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Renderer2 } from '@angular/core';
import * as _ from 'lodash';
import { DropContainerOpsatService } from '../../services/drop-container-opsat.service';
import { SubSink } from 'subsink';
import SortableJs from 'sortablejs';
import { DynamicComponent, DynamicComponentMetadata, DynamicComponentRegistry, DYNAMIC_COMPONENT, DYNAMIC_COMPONENT_REGISTRY, LazyService, UNIQUE_ID } from 'form-core';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { addNewComponent, selectChildComponents } from 'form-designer/state-store';
import { ComponentDesignWrapperComponent } from '../component-design-wrapper/component-design-wrapper.component';

@Component({
  selector: 'qflow-form-designer-drop-container',
  templateUrl: './drop-container.component.html',
  styleUrls: ['./drop-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropContainerComponent extends DynamicComponent implements OnInit, OnDestroy {

  @HostBinding('class.actived')
  actived?: boolean;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  private readonly container: ViewContainerRef;
  @ViewChild('dropContainer', { static: true })
  private readonly dropContainer: ElementRef;
  private subs = new SubSink();
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
  @LazyService(DYNAMIC_COMPONENT_REGISTRY)
  private readonly dynamicComponentRegistry: DynamicComponentRegistry;
  private components = new Map<string, ComponentRef<ComponentDesignWrapperComponent>>();
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    SortableJs.create(this.dropContainer.nativeElement, {
      group: {
        name: 'form-designer'
      },
      onAdd: async (evt: SortableJs.SortableEvent) => {
        // console.log('add:', evt);
        const dragEvt: DragEvent = (evt as any).originalEvent;
        const metadataStr = dragEvt.dataTransfer.getData('Text');
        if (!metadataStr) { return; }
        let metadata: DynamicComponentMetadata = JSON.parse(metadataStr);
        const des = await this.dynamicComponentRegistry.getComponentDescription(metadata.type);
        if (typeof des.bodyProvider === 'function') {
          metadata.body = des.bodyProvider();
        }
        this.store.dispatch(addNewComponent({ metadata: { ...metadata, id: uuidv4() }, parentId: this.metadata.id, index: evt.newIndex, source: DropContainerComponent.name }));
      },
    });

    this.subs.sink = this.store.select(selectChildComponents(this.metadata.id))
      .subscribe(async components => {
        // console.log('components:',components);
        for (let index = 0; index < components.length; index++) {
          const md = components[index];
          if (!this.components.has(md.id)) {
            const fac = this.cfr.resolveComponentFactory(ComponentDesignWrapperComponent);
            const ij = Injector.create({
              providers: [
                { provide: UNIQUE_ID, useValue: md.id },
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
