import { Inject, InjectionToken, Injector } from '@angular/core';

export interface DynamicComponentMetadata {
  id: string;
  type: string;
  title?: string;
}

export abstract class DynamicComponent {
  id: string;
  type: string;
  constructor(
    public injector: Injector
  ) { }
}

export const DYNAMIC_COMPONENT = new InjectionToken<DynamicComponent>('dynamic component');