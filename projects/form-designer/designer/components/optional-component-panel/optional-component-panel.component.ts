import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { OptionalComponentGroup } from '../../models';
import * as faker from 'faker';
import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { SubSink } from 'subsink';
import { distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';
import { DropContainerOpsatService } from 'form-designer/drop-container';

@Component({
  selector: 'qflow-form-designer-optional-component-panel',
  templateUrl: './optional-component-panel.component.html',
  styleUrls: ['./optional-component-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionalComponentPanelComponent implements OnInit, OnDestroy {

  componentGroups?: OptionalComponentGroup[];
  dropContainers: string[] = [];
  optionalComponentOption = {
    group: {
      name: 'form-designer',
      pull: 'clone',
      put: false
    },
  };
  private draging$ = new Subject<CdkDragMove<any>>();
  private subs = new SubSink();
  constructor(
    private opsat: DropContainerOpsatService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // this.componentGroups = [];
    // for (let i = 0; i < 10; i++) {
    //     const components = [];
    //     for (let j = 0; j < 10; j++) {
    //         components.push({
    //             type: faker.datatype.string(5),
    //             title: faker.random.words(1)
    //         });
    //     }
    //     this.componentGroups?.push({
    //         title: faker.random.words(1),
    //         components
    //     });
    // }

    this.componentGroups = [
      {
        title: '基础字段',
        components: [
          {
            type: 'a',
            title: '文本'
          },
          {
            type: 'b',
            title: '数字'
          },
          {
            type: 'c',
            title: '电话'
          },
          {
            type: 'd',
            title: '邮箱'
          },
          {
            type: 'e',
            title: '单选'
          },
          {
            type: 'f',
            title: '多选'
          }
        ]
      },
      {
        title: '容器',
        components: [
          {
            type: 'tab',
            title: '选项卡'
          },
          {
            type: 'split',
            title: '分栏面板'
          }
        ]
      }
    ];

    this.subs.sink = this.opsat.containers$
      .subscribe(keys => {
        this.dropContainers = keys;
        console.log('container:', keys);
        // this.cdr.markForCheck();
        this.cdr.detectChanges();
      });

    this.subs.sink = this.draging$
      .pipe(distinctUntilChanged((pre, cur) => _.isEqual(pre.event.target, cur.event.target)))
      .subscribe(it => {
        const ps = (it.event as MouseEvent).composedPath();
        let containerKey: string | null = null;
        for (let i = 0; i < ps.length - 1; i++) {
          const e: HTMLElement = ps[i] as any;
          if (typeof e.getAttribute === 'function') {
            // containerDom = e;
            const key = e.getAttribute('qflow-designer-drop-container');
            if (key) {
              containerKey = key;
              break;
            }
          }
        }
        if (containerKey) {
          this.opsat.activeContainer(containerKey);
        }
      });
  }

  onDraging(item: CdkDragMove<any>): void {
    // console.log('draging:', item);
    this.draging$.next(item);
  }

  onRelease(event: CdkDragRelease): void {
    this.opsat.activeContainer();
  }
}
