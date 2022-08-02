import { Component, OnInit, ChangeDetectionStrategy, Injector, Inject, ViewChild, ViewContainerRef, ChangeDetectorRef, OnDestroy, HostBinding, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicComponentMetadata, DynamicComponentRenderer, DYNAMIC_COMPONENT_METADATA, DYNAMIC_COMPONENT_RENDERER, LazyService, PropertyEntry } from 'form-core';
import { activeComponent, selectActiveComponentId } from 'form-designer/state-store';
import * as _ from 'lodash';
import { SubSink } from 'subsink';

@Component({
  selector: 'qflow-form-designer-component-design-wrapper',
  templateUrl: './component-design-wrapper.component.html',
  styleUrls: ['./component-design-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentDesignWrapperComponent implements OnInit, OnDestroy {


  @PropertyEntry('metadata.id')
  public readonly id: string;
  @PropertyEntry('metadata.type')
  public readonly type: string;
  @HostBinding('class.actived')
  public actived: boolean;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  public readonly container: ViewContainerRef;
  @LazyService(DYNAMIC_COMPONENT_METADATA)
  public readonly metadata: DynamicComponentMetadata;
  @LazyService(DYNAMIC_COMPONENT_RENDERER)
  private readonly componentRenderer: DynamicComponentRenderer;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(Store)
  private readonly store: Store;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    const ref = await this.componentRenderer.render(this.injector, this.metadata, this.container);
    this.subs.sink = this.store.select(selectActiveComponentId)
      .subscribe(id => {
        this.actived = this.id === id;
        this.cdr.markForCheck();
      });
    this.cdr.markForCheck();
  }

  @HostListener('click', ['$event'])
  onActive(event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(activeComponent({ id: this.id, source: ComponentDesignWrapperComponent.name }));
  }
}
