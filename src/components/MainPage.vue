<template>
    <WordModal ref="wordModal" @onWordAdded="onWordAdded" />
    <div class="p-d-flex p-jc-center p-ai-center p-flex-column">
        <div class="p-col-6">
            <SearchWord @searchWord="searchWord" />
            <div class="p-mt-5">
                <div class="p-d-flex p-col-12 p-m-0 p-p-0">
                    <Button id="allWordsBtn" label="All words" class="p-button-outlined p-button-help" @click="initializeWords()" />
                    <div class="p-ml-auto">
                        <Button id="addWordBtn" label="Add new word" class="p-button-outlined p-button-help" @click="openAddWordModal" />
                    </div>
                </div>
                <WordSynonyms :synonyms="synonyms" :word="word" />
            </div>
        </div>
    </div>
</template>

<script>
import WordModal from '@/components/WordModal.vue';
import WordService from '@/services/WordService';
import WordSynonyms from '@/components/WordSynonyms.vue';
import SearchWord from '@/components/SearchWord.vue';
export default {
    components: { WordModal, WordSynonyms, SearchWord },
    data() {
        return {
            word: '',
            synonyms: [],
        };
    },
    methods: {
        initializeWords() {
            WordService.getWords().then(({ data }) => {
                this.word = '';
                this.synonyms = data.data.map((word) => word.name);
            });
        },
        searchWord(data) {
            const { word, synonyms } = data;
            this.word = word;
            this.synonyms = synonyms;
        },
        openAddWordModal() {
            if (this.$refs.wordModal) {
                this.$refs.wordModal.openModal();
            }
        },
        onWordAdded() {
            this.initializeWords();
        },
    },
    mounted() {
        this.initializeWords();
    },
};
</script>
