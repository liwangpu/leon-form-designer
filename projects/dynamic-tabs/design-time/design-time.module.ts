import { ComponentFactoryResolver, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigPanelComponent } from './components/config-panel/config-panel.component';
import { ComponentDesignPanelRegistry, COMPONENT_DESIGN_PANEL_REGISTRY } from 'form-core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConfigPanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DesignTimeModule {
  constructor(
    @Inject(COMPONENT_DESIGN_PANEL_REGISTRY)
    designPanelRegistry: ComponentDesignPanelRegistry,
    cfr: ComponentFactoryResolver
  ) {
    designPanelRegistry.registry({
      type: 'tabs',
      fac: cfr.resolveComponentFactory(ConfigPanelComponent)
    });
  }
}
