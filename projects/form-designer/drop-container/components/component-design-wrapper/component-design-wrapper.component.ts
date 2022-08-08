import { Component, OnInit, ChangeDetectionStrategy, Injector, Inject, ViewChild, ViewContainerRef, ChangeDetectorRef, OnDestroy, HostBinding, HostListener, Input, NgZone, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicComponentMetadata, DynamicComponentRenderer, DYNAMIC_COMPONENT_RENDERER, LazyService, UNIQUE_ID } from 'form-core';
import { activeComponent, selectActiveComponentId, selectComponentMetadata } from 'form-designer/state-store';
import * as _ from 'lodash';
import { distinctUntilChanged } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'qflow-form-designer-component-design-wrapper',
  templateUrl: './component-design-wrapper.component.html',
  styleUrls: ['./component-design-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentDesignWrapperComponent implements OnInit, OnDestroy {

  @Input()
  metadata: DynamicComponentMetadata;
  @HostBinding('class.actived')
  actived: boolean;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  readonly container: ViewContainerRef;

  @LazyService(DYNAMIC_COMPONENT_RENDERER)
  private readonly componentRenderer: DynamicComponentRenderer;
  @LazyService(ElementRef)
  private readonly el: ElementRef;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(NgZone)
  private readonly zone: NgZone;
  @LazyService(Store)
  private readonly store: Store;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    this.subs.sink = this.store.select(selectComponentMetadata(this.metadata.id))
      .pipe(distinctUntilChanged(_.isEqual))
      .subscribe(metadata => {
        this.renderComponent(metadata);
      });
    this.subs.sink = this.store.select(selectActiveComponentId)
      .subscribe(id => {
        this.actived = this.metadata.id === id;
        this.cdr.markForCheck();
      });

    // this.subs.sink=
    const nel: HTMLElement = this.el.nativeElement;
  }

  @HostListener('click', ['$event'])
  onActive(event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(activeComponent({ id: this.metadata.id, source: ComponentDesignWrapperComponent.name }));
  }

  private async renderComponent(metadata: DynamicComponentMetadata): Promise<void> {
    if (this.container.length) { this.container.clear(); }
    const ref = await this.componentRenderer.render(this.injector, metadata, this.container);
    this.cdr.markForCheck();
  }
}
