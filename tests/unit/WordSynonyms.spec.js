import { mount } from '@vue/test-utils';
import WordSynonyms from '@/components/WordSynonyms.vue';

const factory = (props) => {
    return mount(WordSynonyms, { props });
};

describe('WordSynonyms.vue', () => {
    it('Verify that title will be All words if passed word is empty string', () => {
        const wrapper = factory({ word: '', synonyms: [] });
        const title = wrapper.find('.p-card-title');
        expect(title.text()).toMatch('All words');
    });
    it('Verify that title will match a word which is passed in props', () => {
        const wrapper = factory({ word: 'Wash', synonyms: [] });
        const title = wrapper.find('.p-card-title');
        expect(title.text()).toMatch('Wash');
    });
    it('Verify that proper info message for synonyms will appear if passed word is empty string, and synonyms is empty array', () => {
        const message = 'There is no words in database';
        const wrapper = factory({ word: '', synonyms: [] });
        const title = wrapper.find('#synonymsInfoMessage');
        expect(title.text()).toMatch(message);
    });
    it('Verify that proper info message for synonyms will appear if passed word is not empty string, and synonyms is empty array', () => {
        const message = 'Sorry, there is no synonyms';
        const wrapper = factory({ word: 'Wash', synonyms: [] });
        const title = wrapper.find('#synonymsInfoMessage');
        expect(title.text()).toMatch(message);
    });

    it('Verify that synonyms will be rendered, and have size of passed synonym array', () => {
        const synonyms = ['Clean', 'Wipe'];
        const wrapper = factory({ word: 'Wash', synonyms: synonyms });
        const components = wrapper.findAllComponents({ name: 'Chip' });

        expect(components).toBeDefined();
        expect(components.length).toBe(synonyms.length);
    });
});
