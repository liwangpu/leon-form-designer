import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { DynamicComponent } from 'form-core';

@Component({
  selector: 'qflow-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends DynamicComponent implements OnInit {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
