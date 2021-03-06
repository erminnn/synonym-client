<template>
    <Dialog :visible="modalDisplay" :modal="true" :closable="false" class="p-col-12 p-sm-6 p-md-6 p-lg-6">
        <template #header>
            <h3 class="p-m-1">Add word with synonyms</h3>
        </template>
        <Message severity="info" :closable="false">After entering synonym press enter or comma (,) to add synonym.</Message>

        <div class="p-fluid p-grid p-mt-1">
            <div class="input-form p-col-12 p-mt-4">
                <div class="p-float-label">
                    <InputText id="word" type="text" v-model.trim="word" class="text-box" />
                    <label for="word">Word</label>
                    <span class="p-error" v-if="v$.word.$error">
                        {{ v$.word.$errors[0].$message }}
                    </span>
                </div>
            </div>
            <div class="input-form p-col-12 p-mt-3">
                <div class="p-float-label">
                    <Chips id="synonyms" v-model="synonyms" separator="," />
                    <label for="synonyms">Synonyms</label>
                    <span class="p-error" v-if="v$.synonyms.$error">
                        {{ v$.synonyms.$errors[0].$message }}
                    </span>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="p-d-flex">
                <div class="p-ml-auto">
                    <Button id="btn-close" label="Close" icon="pi pi-times" @click="closeModal()" class="p-button-outlined p-button-danger p-mr-2" />
                    <Button id="btn-save" class="p-button-outlined p-button-success" label="Save" @click="save()" icon="pi pi-check" :disabled="isSaveButtonDisabled" />
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script>
import WordService from '@/services/WordService';
import useValidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
export default {
    emits: ['onWordAdded'],
    data() {
        return {
            toast: useToast(),
            v$: useValidate(),
            modalDisplay: false,
            word: null,
            synonyms: null,
            isSaveButtonDisabled: false,
        };
    },
    validations() {
        return {
            word: {
                required,
                minLength: minLength(3),
            },
            synonyms: {
                required,
            },
        };
    },
    methods: {
        openModal() {
            this.modalDisplay = true;
        },
        save() {
            if (this.validateInputs()) {
                this.isSaveButtonDisabled = true;
                WordService.addWord({ word: this.word, synonyms: this.synonyms })
                    .then(() => {
                        this.$emit('onWordAdded');
                        this.toast.success('Word added successfully', {
                            position: 'top-right',
                            timeout: 3000,
                        });
                        this.closeModal();
                        this.isSaveButtonDisabled = false;
                    })
                    .catch(() => {
                        this.closeModal();
                        this.toast.error('An error occured while adding word', {
                            position: 'top-right',
                            timeout: 3000,
                        });
                        this.isSaveButtonDisabled = false;
                    });
            } else {
                this.isSaveButtonDisabled = false;
            }
        },
        closeModal() {
            this.v$.$reset();
            this.modalDisplay = false;
            this.resetInputs();
        },
        validateInputs() {
            this.v$.$validate();
            return !this.v$.word.$error && !this.v$.synonyms.$error;
        },
        resetInputs() {
            this.word = '';
            this.synonyms = [];
            this.v$.$reset();
        },
    },
};
</script>
