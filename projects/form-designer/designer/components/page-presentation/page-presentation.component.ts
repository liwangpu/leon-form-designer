import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DropContainerOpsatService } from 'form-designer/drop-container';
import { SubSink } from 'subsink';


@Component({
  selector: 'qflow-form-designer-page-presentation',
  templateUrl: './page-presentation.component.html',
  styleUrls: ['./page-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagePresentationComponent implements OnInit {

  dropContainers: string[] = [];
  private subs = new SubSink();
  constructor(
    private opsat: DropContainerOpsatService,
    private cdr: ChangeDetectorRef
  ) { }

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


  drop(event: CdkDragDrop<string[]>) {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex,
    //   );
    // }
    console.log('drop:', event);

  }
}

