import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'qflow-designer-shared-config-item',
  templateUrl: './config-item.component.html',
  styleUrls: ['./config-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigItemComponent {
  @Input()
  title: string;
}
