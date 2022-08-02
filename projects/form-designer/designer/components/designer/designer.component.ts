import { Component, OnInit, ChangeDetectionStrategy, Injector, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyService } from 'form-core';
import { DropContainerOpsatService } from 'form-designer/drop-container';
import { selectFormDesignerState } from 'form-designer/state-store';
import { debounceTime } from 'rxjs/operators';
import { SubSink } from 'subsink';

const designerDraft = 'formDesignerDraf';

@Component({
  selector: 'qflow-form-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DropContainerOpsatService
  ]
})
export class DesignerComponent implements OnInit, OnDestroy {

  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(Store)
  private readonly store: Store;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
    if (sessionStorage.getItem(designerDraft)) {

    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.store.select(selectFormDesignerState)
      .pipe(debounceTime(120))
      .subscribe(state => {
        sessionStorage.setItem(designerDraft, JSON.stringify(state));
      });
  }

}
