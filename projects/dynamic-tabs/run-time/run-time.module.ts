import { ComponentFactoryResolver, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentIdGenerator, COMPONENT_ID_GENERATOR, DynamicComponentGroup, DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY, PartialComponentMetadata } from 'form-core';
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
    @Inject(COMPONENT_ID_GENERATOR)
    idGenerator: ComponentIdGenerator,
    cfr: ComponentFactoryResolver,
    translater: TranslateService
  ) {

    componentRegistry.registry({
      type: 'tabs',
      title: translater.instant(`dynamicComponent.tabs`),
      group: DynamicComponentGroup.container,
      fac: cfr.resolveComponentFactory(TabsComponent),
      metadataProvider: async (partial: PartialComponentMetadata) => ({
        body: [
          {
            id: await idGenerator.generate('tab', partial.id),
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
