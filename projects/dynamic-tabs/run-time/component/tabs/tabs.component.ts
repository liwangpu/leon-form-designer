import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { DynamicComponent } from 'form-core';

@Component({
  selector: 'qflow-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent extends DynamicComponent implements OnInit {
  id: string;
  type: string = 'tabs';

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}