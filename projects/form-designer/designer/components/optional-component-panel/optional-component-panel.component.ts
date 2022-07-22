import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'qflow-form-designer-optional-component-panel',
  templateUrl: './optional-component-panel.component.html',
  styleUrls: ['./optional-component-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionalComponentPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
