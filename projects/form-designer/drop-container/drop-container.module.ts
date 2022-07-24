import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropContainerComponent } from './components/drop-container/drop-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    DropContainerComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    DropContainerComponent
  ]
})
export class DropContainerModule { }
