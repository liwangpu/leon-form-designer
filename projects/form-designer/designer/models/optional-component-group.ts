import { DynamicComponent } from 'dynamic-form';

export interface OptionalComponentDefinition {
    type: any;
    title: string;
}

export interface OptionalComponentGroup {
    title: string;
    components: OptionalComponentDefinition[];
}
