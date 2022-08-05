import { ComponentFactoryResolver, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentGroup, DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY } from 'form-core';
import { TabsComponent } from './components/tabs/tabs.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TabComponent } from './components/tab/tab.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TabWrapperComponent } from './components/tab-wrapper/tab-wrapper.component';
import { v4 as uuidv4 } from 'uuid';

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
    TabWrapperComponent
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
      fac: cfr.resolveComponentFactory(TabsComponent),
      metadataProvider: () => ({
        body: [
          {
            id: uuidv4(),
            type: 'tab',
            title: '页签1'
          }
        ]
      })
    });

    componentRegistry.registry({
      type: 'tab',
      title: translater.instant(`dynamicComponent.tab`),
      fac: cfr.resolveComponentFactory(TabComponent)
    });
  }
}
