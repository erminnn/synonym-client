import { mount } from '@vue/test-utils';
import MainPage from '@/components/MainPage.vue';
import WordService from '@/services/WordService';
jest.mock('@/services/WordService');

const factory = () => {
    return mount(MainPage);
};

WordService.getWords = jest.fn(() =>
    Promise.resolve({
        data: {
            data: [{ name: 'Wash' }, { name: 'Clean' }],
        },
    })
);

describe('MainPage.vue', () => {
    it('Verify that component for adding words is defined', () => {
        const wrapper = factory();
        const wordModal = wrapper.findComponent({ name: 'WordModal' });
        expect(wordModal.exists()).toBeTruthy();
    });

    it('Verify that search word component is defined', () => {
        const wrapper = factory();
        const searchWord = wrapper.findComponent({ name: 'SearchWord' });
        expect(searchWord.exists()).toBeTruthy();
    });
    it('Verify that all words button is defined', () => {
        const wrapper = factory();
        const allWordsBtn = wrapper.find('#allWordsBtn');
        expect(allWordsBtn.exists()).toBeTruthy();
    });
    it('Verify that add new word button is defined', () => {
        const wrapper = factory();
        const addWordBtn = wrapper.find('#addWordBtn');
        expect(addWordBtn.exists()).toBeTruthy();
    });
    it('Verify that component for listing word synoynms is defined', () => {
        const wrapper = factory();
        const wordSynonyms = wrapper.findComponent({ name: 'WordSynonyms' });
        expect(wordSynonyms.exists()).toBeTruthy();
    });

    it('Verify that initializeWords method is called', () => {
        const initializeWords = jest.spyOn(MainPage.methods, 'initializeWords');
        factory();
        expect(initializeWords).toHaveBeenCalled();
    });
    it('Verify that when initializeWords method is synonyms will have length of 2', async () => {
        const wrapper = factory();
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.synonyms.length).toBe(2);
    });
    it('Verify that initializeWords method will be called if all words button is clicked', async () => {
        const wrapper = factory();
        const initializeWords = jest.spyOn(wrapper.vm, 'initializeWords');
        await wrapper.find('#allWordsBtn').trigger('click');
        expect(initializeWords).toBeCalled();
    });
});
