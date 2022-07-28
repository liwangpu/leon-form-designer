import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, Injector } from '@angular/core';
import { DynamicComponent, DYNAMIC_COMPONENT } from 'form-core';
import { DropContainerOpsatService } from 'form-designer/drop-container';
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
export class PagePresentationComponent extends DynamicComponent implements OnInit {
  id: string = 'page';
  type: string = 'page';
  dropContainers: string[] = [];
  private subs = new SubSink();
  constructor(
    private opsat: DropContainerOpsatService,
    private cdr: ChangeDetectorRef,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // this.subs.sink = this.opsat.containers$
    // .subscribe(keys => {
    //   this.dropContainers = keys;
    //   console.log('container:', keys);
    //   this.cdr.markForCheck();
    // });
  }

}

