<script setup>
import AlertMessage from '../components/AlertMessage.vue';
import { getDocumento, deleteDocumento } from '../services/api/backend.js';
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive } from 'vue';

const route = useRoute();
const router = useRouter();
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
    } catch (error) {
        alert.value = true
        alert.alertType = 'error'
        alert.message = error?.response?.data?.message ? error.response.data.message : 'Error al obtener el documento'
    }
}

const eliminarDocumento = async () => {
    try {
        await deleteDocumento(documento.value.id);
        alert.value = true
        alert.alertType = 'success'
        alert.message = 'Documento eliminado correctamente'
        setTimeout(() => {
            alert.value = false
            router.push('/documentos/todos')
        }, 3000)
    } catch (error) {
        alert.value = true
        alert.alertType = 'error'
        alert.message = error?.response?.data?.message ? error.response.data.message : 'Error al eliminar el documento'
        setTimeout(() => {
            alert.value = false
        }, 3000)
    }
}

getDocumentoClient()
</script>

<template>
    <main>
        <v-container>
            <div class="my-2" />
            <v-card v-if="documento">
                <v-card-title>
                    <h1>Documento - {{ documento.codigo }}</h1>
                </v-card-title>
                <v-card-text>
                    <h2>{{ documento.nombre }}</h2>
                    <h3>{{ documento.codigo }}</h3>
                    <h5>{{ documento.tip_tipo_doc.nombre }}</h5>
                    <h5>{{ documento.pro_proceso.nombre }}</h5>
                    <p>{{ documento.contenido }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="eliminarDocumento" color="red">
                        Eliminar
                    </v-btn>
                    <v-btn :to="`/documentos/editar/${documento.id}`">
                        Editar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
        <AlertMessage v-model="alert.value" :message="alert.message" :alertType="alert.alertType" />
    </main>
</template>
