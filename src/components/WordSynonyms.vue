<template>
    <Card class="p-col-12 p-mt-3">
        <template #title>{{ word ? word : 'All words' }}</template>
        <template #content>
            <h3 v-if="word">Word synonyms</h3>
            <div v-if="synonyms.length" class="p-d-flex p-flex-wrap">
                <div class="demo-container p-p-2" v-for="synonym in synonyms" :key="synonym">
                    <Chip :label="synonym" class="custom-chip" />
                </div>
            </div>
            <h4 id="synonymsInfoMessage" v-else>{{ word ? 'Sorry, there are no synonyms' : 'There are no words in database' }}</h4>
        </template>
    </Card>
</template>
<script>
import Chip from 'primevue/chip';
export default {
    components: { Chip },
    props: {
        synonyms: Array,
        word: String,
    },
};
</script>
<style scoped>
.custom-chip {
    background: #f59e0b;
    color: #ffffff;
}
</style>
