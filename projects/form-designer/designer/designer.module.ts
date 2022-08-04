import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './components/designer/designer.component';
import { DesignerRoutingModule } from './designer-routing.module';
import { OptionalComponentPanelComponent } from './components/optional-component-panel/optional-component-panel.component';
import { PagePresentationComponent } from './components/page-presentation/page-presentation.component';
import { DropContainerModule } from 'form-designer/drop-container';
import { ComponentSettingPanelComponent } from './components/component-setting-panel/component-setting-panel.component';
import { StateStoreModule } from 'form-designer/state-store';
import { DynamicComponentRegistryService } from './services/dynamic-component-registry.service';
import { COMPONENT_DESIGN_PANEL_REGISTRY, CUSTOM_RENDER_PROVIDER, DYNAMIC_COMPONENT_REGISTRY, DYNAMIC_COMPONENT_RENDERER } from 'form-core';
import { DynamicComponentRendererService } from './services/dynamic-component-renderer.service';
import { ComponentDesignPanelRegistryService } from './services/component-design-panel-registry.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CustomRenderProviderService } from './services/custom-render-provider.service';

@NgModule({
  declarations: [
    DesignerComponent,
    OptionalComponentPanelComponent,
    PagePresentationComponent,
    ComponentSettingPanelComponent
  ],
  imports: [
    CommonModule,
    DesignerRoutingModule,
    DropContainerModule,
    NzButtonModule,
    StateStoreModule
  ],
  providers: [
    { provide: CUSTOM_RENDER_PROVIDER, useClass: CustomRenderProviderService },
    { provide: DYNAMIC_COMPONENT_REGISTRY, useClass: DynamicComponentRegistryService },
    { provide: DYNAMIC_COMPONENT_RENDERER, useClass: DynamicComponentRendererService },
    { provide: COMPONENT_DESIGN_PANEL_REGISTRY, useClass: ComponentDesignPanelRegistryService },
  ]
})
export class DesignerModule { }
