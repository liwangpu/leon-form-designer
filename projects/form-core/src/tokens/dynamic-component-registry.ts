import { ComponentFactory, InjectionToken } from '@angular/core';
import { DynamicComponent } from './dynamic-component';

export interface ComponentDescription {
  group?: string;
  title: string;
  type: string;
  icon?: string;
}

export interface DynamicComponentRegistry {
  getComponentDescriptions(): Array<ComponentDescription>;
  getComponentFactory(type: string): ComponentFactory<DynamicComponent>;
}

export const COMPONENT_REGISTRY: InjectionToken<DynamicComponentRegistry> = new InjectionToken<DynamicComponentRegistry>('dynamic component registry');