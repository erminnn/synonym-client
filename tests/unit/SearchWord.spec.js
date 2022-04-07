import { mount } from '@vue/test-utils';
import SearchWord from '@/components/SearchWord.vue';
import WordService from '@/services/WordService';

jest.mock('@/services/WordService');

const factory = () => {
    return mount(SearchWord);
};

const factoryWithData = () => {
    return mount(SearchWord, {
        data() {
            return {
                word: 'Wash',
            };
        },
    });
};

WordService.searchWord = jest.fn(() =>
    Promise.resolve({
        data: 'ermin',
    })
);
describe('SearchWord.vue', () => {
    // afterEach(() => {
    //     WordService.searchWord.mockReset();
    // });
    it('Verify that input will be rendered', () => {
        const wrapper = factory();
        expect(wrapper.findComponent({ name: 'InputText' })).toBeDefined();
    });
    it('Verify that button will be rendered', () => {
        const wrapper = factory();
        expect(wrapper.findComponent({ name: 'Button' })).toBeDefined();
    });

    it('Verify that validateInput function will return true if word is not empty string', () => {
        const wrapper = factoryWithData();
        expect(wrapper.vm.word).toMatch('Wash');
        expect(wrapper.vm.validateInput()).toBe(true);
    });
    it('Verify that validateInput function will return false if word is empty string', () => {
        const wrapper = factory();
        expect(wrapper.vm.validateInput()).toBe(false);
    });

    it('Verify that searchWord function will be called after button is clicked', async () => {
        const wrapper = factory();
        const searchWord = jest.spyOn(wrapper.vm, 'searchWord');
        await wrapper.find('.p-button ').trigger('click');
        expect(searchWord).toHaveBeenCalled();
    });

    it('Verify that validateInput function will be called after button is clicked and before sending API call', async () => {
        const wrapper = factory();
        const validateInput = jest.spyOn(wrapper.vm, 'validateInput');
        await wrapper.find('.p-button ').trigger('click');
        expect(validateInput).toHaveBeenCalled();
    });

    it('Verify that isSearchButtonDisabled is set to true if validation returns true', async () => {
        const wrapper = factoryWithData();
        wrapper.find('.p-button ').trigger('click');
        expect(wrapper.vm.isSearchButtonDisabled).toBe(true);
    });
    it('Verify that isSearchButtonDisabled is set to false if validation returns false', async () => {
        const wrapper = factory();
        await wrapper.find('.p-button ').trigger('click');
        expect(wrapper.vm.isSearchButtonDisabled).toBe(false);
    });

    it('Verify that searchWord function from WordService is called', async () => {
        const wrapper = factoryWithData();
        await wrapper.find('.p-button ').trigger('click');
        expect(WordService.searchWord).toBeCalled();
    });

    it('Verify that searchWord function from WordService is called', async () => {
        const wrapper = factoryWithData();
        await wrapper.find('.p-button ').trigger('click');
        expect(WordService.searchWord).toBeCalled();
    });

    it('Verify that data will be emitted if WordService.searchWord resolves data', async () => {
        const wrapper = factoryWithData();
        const emitWord = jest.spyOn(wrapper.vm, 'emitDataFromSearchWord');
        await wrapper.find('.p-button ').trigger('click');
        expect(emitWord).toBeCalled();
    });

    it('Verify that resetInput function will be called if WordService.searchWord resolves data', async () => {
        const wrapper = factoryWithData();
        const resetInput = jest.spyOn(wrapper.vm, 'resetInput');
        await wrapper.find('.p-button ').trigger('click');
        expect(resetInput).toBeCalled();
    });

    it('Verify that isSearchButtonDisabled set to false if searchWord function fails', async () => {
        const wrapper = factoryWithData();
        WordService.searchWord.mockReset();
        WordService.searchWord = jest.fn(() => {
            return Promise.reject();
        });
        expect(wrapper.vm.isSearchButtonDisabled).toBe(false);
    });
});
