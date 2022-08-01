import { ComponentRef, Inject, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { DynamicComponent, DynamicComponentMetadata, DynamicComponentRegistry, DynamicComponentRenderer, DYNAMIC_COMPONENT_REGISTRY } from 'form-core';

@Injectable()
export class DynamicComponentRendererService implements DynamicComponentRenderer {

  constructor(
    @Inject(DYNAMIC_COMPONENT_REGISTRY)
    private registry: DynamicComponentRegistry
  ) { }
  async render(parent: Injector, metadata: DynamicComponentMetadata, container: ViewContainerRef): Promise<ComponentRef<DynamicComponent>> {
    const ij = Injector.create({
      providers: [],
      parent
    });
    const des = await this.registry.getComponentDescription(metadata.type);
    return container.createComponent(des.fac, null, ij);
  }
}
