import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropContainerComponent } from './components/drop-container/drop-container.component';
import { QfDropListDirective } from './directives/qf-drop-list.directive';


@NgModule({
  declarations: [
    DropContainerComponent,
    QfDropListDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DropContainerComponent,
    QfDropListDirective
  ]
})
export class DropContainerModule { }
