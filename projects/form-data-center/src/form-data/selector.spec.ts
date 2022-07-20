import * as fromSelector from './selector';

describe('form-data-center form-data selectors', () => {

    it('a', () => {
        const data = fromSelector.selectFormData('aaa').projector({});
        console.log('data:',data);
        expect(1).toBe(1);
    });
});