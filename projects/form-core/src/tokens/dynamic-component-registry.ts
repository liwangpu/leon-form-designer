import { ComponentFactory, InjectionToken } from '@angular/core';
import { DynamicComponentGroup } from '../enums/dynamic-component-group';
import { DynamicComponent } from './dynamic-component';

export interface ComponentDescription {
  type: string;
  title: string;
  fac: ComponentFactory<DynamicComponent>;
  group?: DynamicComponentGroup;
  icon?: string;
}

export interface DynamicComponentRegistry {
  registry(des: ComponentDescription): void;
  getComponentDescription(type: string): Promise<ComponentDescription>;
  getComponentDescriptions(): Promise<Array<ComponentDescription>>;
}

export const DYNAMIC_COMPONENT_REGISTRY: InjectionToken<DynamicComponentRegistry> = new InjectionToken<DynamicComponentRegistry>('dynamic component registry');