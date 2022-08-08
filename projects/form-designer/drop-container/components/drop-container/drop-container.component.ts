import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostBinding, ElementRef, ViewChild, ChangeDetectorRef, Injector, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Renderer2 } from '@angular/core';
import * as _ from 'lodash';
import { DropContainerOpsatService } from '../../services/drop-container-opsat.service';
import { SubSink } from 'subsink';
import SortableJs from 'sortablejs';
import { ComponentIdGenerator, COMPONENT_ID_GENERATOR, DynamicComponent, DynamicComponentMetadata, DynamicComponentRegistry, DYNAMIC_COMPONENT, DYNAMIC_COMPONENT_REGISTRY, LazyService, UNIQUE_ID } from 'form-core';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { addNewComponent, moveComponent, selectFirstLevelBodyComponents, selectComponentMetadata, selectFirstLevelBodyComponentIds } from 'form-designer/state-store';
import { ComponentDesignWrapperComponent } from '../component-design-wrapper/component-design-wrapper.component';
import { first, take } from 'rxjs/operators';
import Sortable from 'sortablejs';

@Component({
  selector: 'qflow-form-designer-drop-container',
  templateUrl: './drop-container.component.html',
  styleUrls: ['./drop-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropContainerComponent extends DynamicComponent implements OnInit, OnDestroy {

  @HostBinding('class.actived')
  actived?: boolean;
  components: DynamicComponentMetadata[] = [];
  // @ViewChild('container', { static: true, read: ViewContainerRef })
  // private readonly container: ViewContainerRef;
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
  @LazyService(COMPONENT_ID_GENERATOR)
  private readonly idGenerator: ComponentIdGenerator;
  @LazyService(DYNAMIC_COMPONENT_REGISTRY)
  private readonly dynamicComponentRegistry: DynamicComponentRegistry;
  // private components = new Map<string, ComponentRef<ComponentDesignWrapperComponent>>();

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // console.log('e:',this.dropContainer.nativeElement);
    SortableJs.create(this.dropContainer.nativeElement, {
      group: {
        name: 'form-designer'
      },
      // swapThreshold: 0,
      fallbackOnBody: true,
      easing: "cubic-bezier(1, 0, 0, 1)",
      setData: async (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl: HTMLElement) => {
        const id = dragEl.id;
        const metadata = await this.store.select(selectComponentMetadata(id)).pipe(first()).toPromise();
        dataTransfer.setData('Text', JSON.stringify({ id, type: metadata.type }));

        const crt = document.createElement('div');
        crt.style.backgroundColor = "black";
        crt.style.width = "200px";
        crt.style.height = "200px";
        // crt.style.backgroundColor="linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(9,9,121,1) 100%, rgba(0,212,255,1) 100%) !important";
        // document.body.appendChild(crt);
        dataTransfer.setDragImage(crt, 0, 0);

      },
      onAdd: async (evt: SortableJs.SortableEvent) => {
        // console.log('add:', evt);
        const dragEvt: DragEvent = (evt as any).originalEvent;
        const metadataStr = dragEvt.dataTransfer.getData('Text');
        // console.log('metadataStr:', metadataStr);
        if (!metadataStr) { return; }
        let metadata: DynamicComponentMetadata = JSON.parse(metadataStr);
        if (metadata.id) { return; }
        const des = await this.dynamicComponentRegistry.getComponentDescription(metadata.type);
        if (typeof des.metadataProvider === 'function') {
          const partialMetadata = await des.metadataProvider(metadata);
          metadata = { ...metadata, ...partialMetadata };
        }
        const componetId = await this.idGenerator.generate(metadata.type);
        this.store.dispatch(addNewComponent({ metadata: { ...metadata, id: componetId }, parentId: this.metadata.id, index: evt.newIndex, source: DropContainerComponent.name }));
      },
      onStart: (evt: SortableJs.SortableEvent) => {
        const dragEvt: DragEvent = (evt as any).originalEvent;
      },
      onEnd: async (evt: SortableJs.SortableEvent) => {
        var itemEl = evt.item;  // dragged HTMLElement
        // console.log('end:', evt);
        const containerId = evt.to.getAttribute('container-id');
        if (!containerId) { return; }
        const dragEvt: DragEvent = (evt as any).originalEvent;
        const metadataStr = dragEvt.dataTransfer.getData('Text');
        if (!metadataStr) { return; }
        const metadata: DynamicComponentMetadata = JSON.parse(metadataStr);
        // console.log('end:', metadata);
        if (evt.from !== evt.to) {
          itemEl.parentElement.removeChild(itemEl);
        }
        this.store.dispatch(moveComponent({ id: metadata.id, parentId: containerId, index: evt.newIndex, source: DropContainerComponent.name }));
      }
    });

    this.subs.sink = this.store.select(selectFirstLevelBodyComponents(this.metadata.id))
      .subscribe(async components => {
        this.components = components;
        this.cdr.markForCheck();
      });
  }

  trackById(index: number, it: DynamicComponentMetadata): any {
    return index;
  }

  private generate(): Sortable {
    return SortableJs.create(this.dropContainer.nativeElement, {
      group: {
        name: 'form-designer'
      },
      setData: async (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl: HTMLElement) => {
        const id = dragEl.id;
        const metadata = await this.store.select(selectComponentMetadata(id)).pipe(first()).toPromise();
        dataTransfer.setData('Text', JSON.stringify({ id, type: metadata.type }));
        console.log('set data:', { id, type: metadata.type });
      },
      onAdd: async (evt: SortableJs.SortableEvent) => {
        console.log('add:', evt);
        const dragEvt: DragEvent = (evt as any).originalEvent;
        const metadataStr = dragEvt.dataTransfer.getData('Text');
        // console.log('metadataStr:', metadataStr);l
        if (!metadataStr) { return; }
        let metadata: DynamicComponentMetadata = JSON.parse(metadataStr);
        const des = await this.dynamicComponentRegistry.getComponentDescription(metadata.type);
        if (typeof des.metadataProvider === 'function') {
          const partialMetadata = await des.metadataProvider(metadata);
          metadata = { ...metadata, ...partialMetadata };
        }
        this.store.dispatch(addNewComponent({ metadata: { ...metadata, id: uuidv4() }, parentId: this.metadata.id, index: evt.newIndex, source: DropContainerComponent.name }));
      },
      onEnd: (evt: any) => {
        var itemEl = evt.item;  // dragged HTMLElement
        // console.log('end:', evt);
        const dragEvt: DragEvent = (evt as any).originalEvent;
        const metadataStr = dragEvt.dataTransfer.getData('Text');
        console.log('end:', metadataStr);
        if (!metadataStr) { return; }
        const metadata: DynamicComponentMetadata = JSON.parse(metadataStr);
        // console.log('change metadataStr:', metadataStr);
        itemEl.parentElement.removeChild(itemEl);
        this.store.dispatch(moveComponent({ id: metadata.id, parentId: this.metadata.id, index: evt.newIndex, source: DropContainerComponent.name }));
      },
      onChange(/**Event*/evt): void {
        // evt.newIndex // most likely why this event is used is to get the dragging element's current index
        // // same properties as onEnd
        // console.log('change evt:', evt);
        // const dragEvt: DragEvent = (evt as any).originalEvent;
        // const metadataStr = dragEvt.dataTransfer.getData('Text');
        // console.log('change metadataStr:', metadataStr);
      }
    });
  }
}
