

import { InjectionToken } from '@angular/core';
import { FormFieldType } from '../enums/form-field-type';

export interface FormFieldRegistry {
  getFieldFactory(type: FormFieldType): any;
}

export const FORMFIELD_REGISTRY = new InjectionToken<FormFieldRegistry>('form field registry');