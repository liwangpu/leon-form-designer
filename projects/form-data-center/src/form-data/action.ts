import { createAction, props } from '@ngrx/store';

export const setFormData = createAction('[form data center] 设置表单初始值', props<{ formKey: string, data: { [key: string]: any } }>());