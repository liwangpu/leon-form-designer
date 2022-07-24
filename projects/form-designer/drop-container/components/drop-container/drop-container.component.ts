import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostBinding } from '@angular/core';
import * as _ from 'lodash';
import * as faker from 'faker';
@Component({
  selector: 'qflow-form-designer-drop-container',
  templateUrl: './drop-container.component.html',
  styleUrls: ['./drop-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropContainerComponent implements OnInit, OnDestroy {

  @HostBinding('attr.qflow-designer-drop-container')
  public key?: string;
  constructor() {
    this.key = faker.datatype.uuid();
  }

  public ngOnDestroy(): void {

  }

  public ngOnInit(): void {
  }

}
