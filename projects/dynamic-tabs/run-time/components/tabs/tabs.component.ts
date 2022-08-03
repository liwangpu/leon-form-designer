import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { DynamicComponent, DynamicComponentMetadata, PropertyEntry } from 'form-core';

@Component({
  selector: 'qflow-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent extends DynamicComponent implements OnInit {

  @PropertyEntry('metadata.body')
  tabs: DynamicComponentMetadata[];
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // this.id = `${+new Date()}`;
    // console.log('tabs metadata:', this.metadata);
    // console.log('tabs:', this.tabs);
  }

  trackById(index: number, it: DynamicComponentMetadata): any {
    return it.id;
  }

}
