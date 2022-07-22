import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './components/designer/designer.component';
import { DesignerRoutingModule } from './designer-routing.module';
import { OptionalComponentPanelComponent } from './components/optional-component-panel/optional-component-panel.component';

@NgModule({
  declarations: [
    DesignerComponent,
    OptionalComponentPanelComponent
  ],
  imports: [
    CommonModule,
    DesignerRoutingModule
  ]
})
export class DesignerModule { }
