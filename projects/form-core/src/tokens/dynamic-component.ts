import { InjectionToken, Injector } from '@angular/core';

export interface DynamicComponentMetadata {
  id: string;
  type: string;
}

export abstract class DynamicComponent {
  abstract id: string;
  abstract type: string;
  constructor(
    public injector: Injector
  ) { }
}

export const DYNAMIC_COMPONENT = new InjectionToken<DynamicComponent>('dynamic component');