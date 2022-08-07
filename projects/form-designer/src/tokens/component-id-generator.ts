import { ComponentFactory, InjectionToken, Injector } from '@angular/core';

export interface ComponentIdGenerator {

}

export const COMPONENT_ID_GENERATOR = new InjectionToken<ComponentIdGenerator>('component id generator');
