import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './components/designer/designer.component';
import { DesignerRoutingModule } from './designer-routing.module';
import { OptionalComponentPanelComponent } from './components/optional-component-panel/optional-component-panel.component';
import { ComponentGroupComponent } from './components/component-group/component-group.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PagePresentationComponent } from './components/page-presentation/page-presentation.component';
import { DropContainerModule } from 'form-designer/drop-container';

@NgModule({
  declarations: [
    DesignerComponent,
    OptionalComponentPanelComponent,
    ComponentGroupComponent,
    PagePresentationComponent
  ],
  imports: [
    CommonModule,
    DesignerRoutingModule,
    DragDropModule,
    DropContainerModule
  ]
})
export class DesignerModule { }
