<template>
    <div class="p-col-12 p-mt-3 p-pl-0 p-pr-0">
        <div class="p-inputgroup">
            <InputText type="text" v-model="word" placeholder="Keyword" class="p-col-12" />
            <Button icon="pi pi-search" class="p-button-warning" @click="searchWord()" :disabled="isSearchButtonDisabled" />
        </div>
    </div>
</template>
<script>
import WordService from '@/services/WordService';
import useValidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
export default {
    emits: ['searchWord'],
    data() {
        return {
            v$: useValidate(),
            word: '',
            isSearchButtonDisabled: false,
        };
    },
    validations() {
        return {
            word: {
                required,
                minLength: minLength(3),
            },
        };
    },
    methods: {
        searchWord() {
            if (this.validateInput()) {
                this.isSearchButtonDisabled = true;
                WordService.searchWord(this.word)
                    .then(({ data }) => {
                        const { data: result } = data;
                        this.emitDataFromSearchWord(result);
                        this.resetInput();
                        this.isSearchButtonDisabled = false;
                    })
                    .catch(() => {
                        this.isSearchButtonDisabled = false;
                    });
            }
        },
        resetInput() {
            this.word = '';
        },
        emitDataFromSearchWord(data) {
            const wordWithSynonyms = {
                word: this.word.toUpperCase(),
                synonyms: !data ? [] : data.synonyms.synonyms.filter((synonym) => synonym !== data.name),
            };
            this.$emit('searchWord', wordWithSynonyms);
        },
        validateInput() {
            this.v$.$validate();
            return !this.v$.word.$error;
        },
    },
};
</script>
