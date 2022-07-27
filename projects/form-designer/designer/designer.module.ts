import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './components/designer/designer.component';
import { DesignerRoutingModule } from './designer-routing.module';
import { OptionalComponentPanelComponent } from './components/optional-component-panel/optional-component-panel.component';
import { PagePresentationComponent } from './components/page-presentation/page-presentation.component';
import { DropContainerModule } from 'form-designer/drop-container';
import { ComponentSettingPanelComponent } from './components/component-setting-panel/component-setting-panel.component';
import { SortablejsModule } from 'ngx-sortablejs';

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
    SortablejsModule
  ]
})
export class DesignerModule { }
