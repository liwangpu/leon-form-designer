import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DropContainerOpsatService } from 'form-designer/drop-container';

@Component({
  selector: 'qflow-form-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DropContainerOpsatService
  ]
})
export class DesignerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
