import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { ComponentDescription, DynamicComponent, DynamicComponentRegistry } from 'form-core';
import { TabsComponent } from '../component/tabs/tabs.component';

@Injectable()
export class DynamicComponentRegistryService implements DynamicComponentRegistry {

  constructor(
    private cfr: ComponentFactoryResolver
  ) { }
  getComponentDescriptions(): ComponentDescription[] {
    return [
      {
        title: '页签',
        type: 'tabs'
      }
    ];
  }
  getComponentFactory(type: string): ComponentFactory<DynamicComponent> {
    let fac: ComponentFactory<DynamicComponent> = null;
    switch (type) {
      case 'tabs':
        fac = this.cfr.resolveComponentFactory(TabsComponent);
        break;
      default:
        break;
    }
    return fac;
  }
}
