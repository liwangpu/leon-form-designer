import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormDataCenterState, selectFormData } from 'form-data-center';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDetailComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  public constructor(
    private store: Store<FormDataCenterState>
  ) { }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public ngOnInit(): void {
    this.subs.sink = this.store.select(selectFormData('f1')).subscribe(formData => {
      console.log('f1 form data:', formData);
    });
  }

}
