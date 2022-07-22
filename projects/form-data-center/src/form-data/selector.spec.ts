import { FormDataCenterState, DATA_CENTER_INITIAL_STATE } from '../data-center-state';
import * as fromSelector from './selector';

describe('Form Data Center Selectors', () => {

    it('空表单数据状态', () => {
        const formdata = fromSelector.selectFormData('f1').projector(DATA_CENTER_INITIAL_STATE);
        expect(formdata).toEqual({});
    });

    it('实际存在的表单数据', () => {
        const initialState: FormDataCenterState = {
            data: {
                f1: { name: 'leon' }
            }
        };
        const formdata = fromSelector.selectFormData('f1').projector(initialState);
        expect(formdata).toEqual({ name: 'leon' });
    });
});