import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Injector } from '@angular/core';
import { OptionalComponentDefinition, OptionalComponentGroup } from '../../models';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { SubSink } from 'subsink';
import * as _ from 'lodash';
import { DropContainerOpsatService } from 'form-designer/drop-container';
import { DynamicComponentGroup, DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY, LazyService } from 'form-core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'qflow-form-designer-optional-component-panel',
  templateUrl: './optional-component-panel.component.html',
  styleUrls: ['./optional-component-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionalComponentPanelComponent implements OnInit, OnDestroy {

  componentGroups?: OptionalComponentGroup[] = [];
  dropContainers: string[] = [];
  @LazyService(DropContainerOpsatService)
  private readonly opsat: DropContainerOpsatService;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(DYNAMIC_COMPONENT_REGISTRY)
  private readonly dynamicComponentRegistry: DynamicComponentRegistry;
  @LazyService(TranslateService)
  private readonly translater: TranslateService;
  private draging$ = new Subject<CdkDragMove<any>>();
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
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


    const des = await this.dynamicComponentRegistry.getComponentDescriptions();
    const groupTypes = Object.keys(DynamicComponentGroup).map(x => DynamicComponentGroup[x]);
    groupTypes.forEach(gt => {
      const components: OptionalComponentDefinition[] = des.filter(x => x.group === gt).map(x => ({ type: x.type, title: x.title }));
      this.componentGroups.push({
        title: this.translater.instant(`dynamicComponentGroup.${gt}`),
        components
      });
    });
    this.cdr.markForCheck();
  }

}
