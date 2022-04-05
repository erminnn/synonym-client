import axios from 'axios';
const WORD_BASE_PATH = '/api/word';

const WordService = {
    addWord(payload) {
        return axios.post(WORD_BASE_PATH, payload);
    },
    getWords() {
        return axios.get(WORD_BASE_PATH);
    },
};

export default WordService;
