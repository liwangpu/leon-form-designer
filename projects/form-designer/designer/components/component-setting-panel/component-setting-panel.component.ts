import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'qflow-form-designer-component-setting-panel',
  templateUrl: './component-setting-panel.component.html',
  styleUrls: ['./component-setting-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentSettingPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
