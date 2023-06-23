<script setup>
import DocumentForm from '../components/DocumentForm.vue';
import AlertMessage from '../components/AlertMessage.vue';
import { getDocumento } from '../services/api/backend.js';
import { useRoute } from 'vue-router';
import { ref, reactive } from 'vue';

const route = useRoute();
const documento = ref(null);
const alert = reactive({
  message: '',
  alertType: '',
  value: false
})
const getDocumentoClient = async () => {
    const { id } = route.params;
    try {
        const { data } = await getDocumento(id);
        documento.value = data;
        return data;
    } catch (error) {
        alert.value = true
        alert.alertType = 'error'
        alert.message = error?.response?.data?.message ? error.response.data.message : 'Error al obtener el documento'
    }
}

getDocumentoClient()
</script>

<template>
    <main>
        <v-container>
            <h1>Editar documento</h1>
            <DocumentForm :documento="documento" />
        </v-container>
        <AlertMessage v-model="alert.value" :message="alert.message" :alertType="alert.alertType" />
    </main>
</template>