import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropContainerComponent } from './components/drop-container/drop-container.component';
import { QflowOptionalComponentsDirective } from './directives/qflow-optional-components.directive';


@NgModule({
  declarations: [
    DropContainerComponent,
    QflowOptionalComponentsDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DropContainerComponent,
    QflowOptionalComponentsDirective
  ]
})
export class DropContainerModule { }
