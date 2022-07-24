import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { OptionalComponentGroup } from '../../models';
import * as faker from 'faker';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { SubSink } from 'subsink';
import { distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'qflow-form-designer-optional-component-panel',
  templateUrl: './optional-component-panel.component.html',
  styleUrls: ['./optional-component-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionalComponentPanelComponent implements OnInit, OnDestroy {

  public componentGroups?: OptionalComponentGroup[];
  private draging$ = new Subject<CdkDragMove<any>>();
  private subs = new SubSink();
  public constructor() { }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public ngOnInit(): void {
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

    this.subs.sink = this.draging$
      // .pipe(debounceTime(80))
      .pipe(distinctUntilChanged((pre, cur) => _.isEqual(pre.event.target, cur.event.target)))
      .subscribe(it => {
        console.log('item:', it);
        // const evt: HTMLElement = it.event.target as any;
        const ps = (it.event as MouseEvent).composedPath();
        let containerDom: HTMLElement | null = null;
        for (let i = 0; i < ps.length - 1; i++) {
          const e: HTMLElement = ps[i] as any;
          if (typeof e.getAttribute === 'function') {
            // containerDom = e;
            const key = e.getAttribute('qflow-designer-drop-container');
            if (key) {
              console.log('key:', key);
              break;
            }
          }
        }
        // // console.log('path:', Array.isArray(ps));
        // console.log('containerDom:', containerDom);
        // evt.getAttribute('isDropContainer');
        // it.event.target.p
        // console.log('item:', (it.event.target as any)['isDropContainer']);
        // console.log('item:', (it.event.target as any).getAttribute('drop-container'));
      });
  }

  public onDraging(item: CdkDragMove<any>): void {
    // console.log('draging:', item);
    this.draging$.next(item);
  }
}
