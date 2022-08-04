import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropContainerComponent } from './components/drop-container/drop-container.component';
import { QflowOptionalComponentsDirective } from './directives/qflow-optional-components.directive';
import { ComponentDesignWrapperComponent } from './components/component-design-wrapper/component-design-wrapper.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    DropContainerComponent,
    QflowOptionalComponentsDirective,
    ComponentDesignWrapperComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    DropContainerComponent,
    QflowOptionalComponentsDirective
  ]
})
export class DropContainerModule { }
