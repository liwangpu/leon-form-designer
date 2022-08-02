import { ComponentFactoryResolver, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentGroup, DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY } from 'form-core';
import { TabsComponent } from './components/tabs/tabs.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TabComponent } from './components/tab/tab.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NzTabsModule
  ]
})
export class RunTimeModule {
  constructor(
    @Inject(DYNAMIC_COMPONENT_REGISTRY)
    componentRegistry: DynamicComponentRegistry,
    cfr: ComponentFactoryResolver,
    translater: TranslateService
  ) {
    componentRegistry.registry({
      type: 'tabs',
      title: translater.instant(`dynamicComponent.tabs`),
      group: DynamicComponentGroup.container,
      fac: cfr.resolveComponentFactory(TabsComponent)
    });
  }
}
