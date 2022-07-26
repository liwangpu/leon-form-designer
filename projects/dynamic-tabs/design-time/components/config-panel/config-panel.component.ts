import { Component, OnInit, ChangeDetectionStrategy, Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentDesignPanel, LazyService } from 'form-core';
import { SubSink } from 'subsink';

@Component({
  selector: 'qflow-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigPanelComponent extends ComponentDesignPanel implements OnInit, OnDestroy {


  public form: FormGroup;
  @LazyService(FormBuilder)
  protected fb: FormBuilder;
  private subs = new SubSink();
  constructor(
    injector: Injector
  ) {
    super(injector);
    this.form = this.fb.group({
      title: [],
      body: []
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // console.log('panel:', this.configuration);
    this.form.patchValue(this.configuration, { emitEvent: false });
    this.subs.sink = this.form.valueChanges
      .subscribe(val => {
        // console.log('ccc:', val);
        this.onChangeFn(val);
      });
  }

}
