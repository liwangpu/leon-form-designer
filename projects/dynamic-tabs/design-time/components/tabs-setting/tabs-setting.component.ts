import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Injector, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentIdGenerator, COMPONENT_ID_GENERATOR, LazyService } from 'form-core';
import { filter } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { v4 as uuidv4 } from 'uuid';

interface TabSetting {
  id: string;
  type: string;
  title: string;
}

interface FormValue {
  tabs: TabSetting[]
}

@Component({
  selector: 'qflow-tabs-setting',
  templateUrl: './tabs-setting.component.html',
  styleUrls: ['./tabs-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabsSettingComponent),
      multi: true
    }
  ]
})
export class TabsSettingComponent implements ControlValueAccessor, OnInit {

  disabled: boolean;
  form: FormGroup;
  private controlAdding: boolean;
  @LazyService(FormBuilder)
  private readonly fb: FormBuilder;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(COMPONENT_ID_GENERATOR)
  private readonly idGenerator: ComponentIdGenerator;
  private onChangeFn: (val: any) => any;
  private onTouchedFn: () => any;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
    this.form = this.fb.group({
      tabs: this.fb.array([])
    });
  }

  get tabs(): FormArray {
    return this.form.controls['tabs'] as any;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.form.valueChanges
      .pipe(filter(() => !this.controlAdding))
      .subscribe((val: FormValue) => {
        // console.log('vvv:', val);
        if (typeof this.onChangeFn === 'function') {
          this.onChangeFn(val.tabs);
        }
      });
  }

  writeValue(obj: TabSetting[] = []): void {
    obj?.forEach(it => this.addTab(it, false));
    this.cdr.markForCheck();
  }

  async addTab(item: any = null, emitEvent: boolean = true): Promise<void> {
    if (!emitEvent) {
      this.controlAdding = true;
    }
    const f: FormGroup = this.fb.group(item || {
      id: await this.idGenerator.generate('tab'),
      type: 'tab',
      title: `页签 ${this.tabs.length + 1}`
    });
    this.tabs.push(f);
    if (!emitEvent) {
      this.controlAdding = false;
    }
    // console.log('title:', this.tabs.controls);
    // console.log('tabs:', this.tabs.length);
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
