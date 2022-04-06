import { mount } from '@vue/test-utils';
import WordSynonyms from '@/components/WordSynonyms.vue';

describe('WordSynonyms.vue', () => {
    it('All words if no word is passed', () => {
        const wrapper = mount(WordSynonyms, { props: { word: '', synonyms: [] } });
        expect(wrapper.text()).toContain('All words');
    });
});
