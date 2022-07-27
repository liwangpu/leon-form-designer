import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostBinding, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';
import * as faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import { DropContainerOpsatService } from '../../services/drop-container-opsat.service';
import { DropContainer } from '../../models/drop-container';
import { SubSink } from 'subsink';

@Component({
  selector: 'qflow-form-designer-drop-container',
  templateUrl: './drop-container.component.html',
  styleUrls: ['./drop-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropContainerComponent implements DropContainer, OnInit, OnDestroy {

  @HostBinding('attr.qflow-designer-drop-container')
  readonly key: string;
  @HostBinding('class.actived')
  actived?: boolean;
  private container!: ElementRef;
  private subs = new SubSink();
  constructor(
    private opsat: DropContainerOpsatService,
    private cdr: ChangeDetectorRef
  ) {
    this.key = uuidv4();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.opsat.deRegistryContainer(this.key);
  }

  ngOnInit(): void {
    this.opsat.registryContainer(this.key, this);
    this.subs.sink = this.opsat.activeContainer$
      .subscribe(key => {
        this.actived = this.key === key;
        this.cdr.markForCheck();
      });
  }

}
