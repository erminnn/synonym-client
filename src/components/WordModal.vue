<template>
    <Dialog :visible="modalDisplay" :modal="true" :closable="false" class="p-col-6">
        <template #header>
            <h3 class="p-m-1">Add word with synonyms</h3>
        </template>
        <div class="p-fluid p-grid">
            <div class="input-form p-col-12 p-mt-4">
                <div class="p-float-label">
                    <InputText id="word" type="text" v-model.trim="word" class="text-box" />
                    <label for="word">Word</label>
                    <!-- <span class="p-invalid" v-if="v$.vendor.name.$error">
            {{ v$.vendor.name.$errors[0].$message }}
          </span> -->
                </div>
            </div>
            <div class="input-form p-col-12 p-mt-3">
                <div class="p-float-label">
                    <Chips id="synonyms" v-model="synonyms" separator="," />

                    <label for="synonyms">Synonyms</label>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="p-d-flex">
                <div class="p-ml-auto">
                    <Button id="btn-close" label="Close" icon="pi pi-times" @click="close()" class="p-button p-button-danger p-mr-2" />
                    <Button id="btn-save" class="p-button p-button-success" label="Save" @click="save()" icon="pi pi-check" />
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script>
import WordService from '@/services/WordService';
export default {
    data() {
        return {
            modalDisplay: true,
            word: null,
            synonyms: null,
        };
    },
    methods: {
        save() {
            console.log('Word', this.word);
            console.log('Synonyms', this.synonyms);
            WordService.addWord({ word: this.word, synonyms: this.synonyms }).then((res) => {
                console.log(res);
            });
        },
        close() {
            this.modalDisplay = false;
        },
    },
    created() {
        WordService.getWords().then((res) => {
            console.log(res);
        });
    },
};
</script>
