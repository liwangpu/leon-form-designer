import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, Injector, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { DynamicComponent, DYNAMIC_COMPONENT, DYNAMIC_COMPONENT_METADATA, LazyService } from 'form-core';
import { DropContainerComponent, DropContainerOpsatService } from 'form-designer/drop-container';
import { SubSink } from 'subsink';


@Component({
  selector: 'qflow-form-designer-page-presentation',
  templateUrl: './page-presentation.component.html',
  styleUrls: ['./page-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DYNAMIC_COMPONENT, useExisting: forwardRef(() => PagePresentationComponent) }
  ]
})
export class PagePresentationComponent implements OnInit {
  // id: string = 'page';
  // type: string = 'page';
  dropContainers: string[] = [];
  @ViewChild('container', { static: true, read: ViewContainerRef })
  protected container: ViewContainerRef;
  @LazyService(DropContainerOpsatService)
  private readonly opsat: DropContainerOpsatService;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(ComponentFactoryResolver)
  protected cfr: ComponentFactoryResolver;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    const fac = this.cfr.resolveComponentFactory(DropContainerComponent);
    const ij = Injector.create({
      providers: [
        { provide: DYNAMIC_COMPONENT_METADATA, useValue: { id: 'page', type: 'page' } }
      ],
      parent: this.injector
    });
    this.container.createComponent(fac, null, ij);
  }

}

