import { config } from '@vue/test-utils';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Chips from 'primevue/chips';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import PrimeVue from 'primevue/config';
import Chip from 'primevue/chip';

config.global.components = {
    Card: Card,
    Chip: Chip,
    Button: Button,
    InputText: InputText,
    Chips,
    Message,
    Dialog,
};
config.global.plugins = { PrimeVue };
