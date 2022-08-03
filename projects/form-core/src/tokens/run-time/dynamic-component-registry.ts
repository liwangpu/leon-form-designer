import { ComponentFactory, InjectionToken, Injector } from '@angular/core';
import { DynamicComponentGroup } from '../../enums/dynamic-component-group';
import { LazyService, PropertyEntry } from '../../utils/common-decorator';

export interface DynamicComponentMetadata {
  id: string;
  type: string;
  title?: string;
  configuration?: { [key: string]: any };
  body?: DynamicComponentMetadata[];
}

export const DYNAMIC_COMPONENT_METADATA = new InjectionToken<DynamicComponent>('dynamic component metadata');

export abstract class DynamicComponent {
  @PropertyEntry('metadata.id')
  id: string;
  @PropertyEntry('metadata.type')
  type: string;
  @LazyService(DYNAMIC_COMPONENT_METADATA)
  metadata: DynamicComponentMetadata;
  constructor(
    public injector: Injector
  ) { }
}

export const DYNAMIC_COMPONENT = new InjectionToken<DynamicComponent>('dynamic component');

export interface ComponentDescription {
  type: string;
  title: string;
  fac: ComponentFactory<DynamicComponent>;
  group?: DynamicComponentGroup;
  icon?: string;
  bodyProvider?: () => DynamicComponentMetadata[];
}

export interface DynamicComponentRegistry {
  registry(des: ComponentDescription): void;
  getComponentDescription(type: string): Promise<ComponentDescription>;
  getComponentDescriptions(): Promise<Array<ComponentDescription>>;
}

export const DYNAMIC_COMPONENT_REGISTRY: InjectionToken<DynamicComponentRegistry> = new InjectionToken<DynamicComponentRegistry>('dynamic component registry');