<script setup>
import { reactive, ref, watch } from 'vue';
import { getTipoDocs, getProcesos, postDocumento, updateDocumento } from '@/services/api/backend.js'
import AlertMessage from './AlertMessage.vue';

const props = defineProps({
    documento: {
        type: Object,
        required: false,
        default: null
    },
})
const alert = reactive({
  message: '',
  alertType: '',
  value: false
})

const documento = reactive({
    nombre: '',
    contenido: '',
    proceso: null,
    tipoDoc: null,
})

if (props.documento) {
    documento.nombre = props.documento.nombre
    documento.contenido = props.documento.contenido
    documento.proceso = props.documento.pro_procesos_id
    documento.tipoDoc = props.documento.tip_tipo_docs_id
}

watch (props, () => {
    if (!props.documento) return;
    documento.nombre = props.documento.nombre
    documento.contenido = props.documento.contenido
    documento.proceso = props.documento.pro_procesos_id
    documento.tipoDoc = props.documento.tip_tipo_docs_id
}, { deep: true })

const proProcesos = ref([])
const tipTipoDocs = ref([])

const getTipoDocClient = () => {
    getTipoDocs()
        .then((res) => {
            tipTipoDocs.value = [...res.data, {
                nombre: 'Selecciona un valor',
                id: null
            }]
        })
        .catch((err) => {
            alert.value = true
            alert.alertType = 'error'
            alert.message = err?.response?.data?.message ? err.response.data.message : 'Error al obtener los tipos de documento'
            setTimeout(() => {
                alert.value = false
            }, 3000)
        })
}

const getProcesosClient = () => {
    getProcesos()
        .then((res) => {
            proProcesos.value = [...res.data, {
                nombre: 'Selecciona un valor',
                id: null
            }]
        })
        .catch((err) => {
            alert.value = true
            alert.alertType = 'error'
            alert.message = err?.response?.data?.message ? err.response.data.message : 'Error al obtener los procesos'
            setTimeout(() => {
                alert.value = false
            }, 3000)
        })
}

const crearDocumentoClient = () => {
    postDocumento({
        nombre: documento.nombre,
        contenido: documento.contenido,
        pro_procesos_id: documento.proceso,
        tip_tipo_docs_id: documento.tipoDoc
    })
        .then((res) => {
            alert.value = true
            alert.alertType = 'success'
            alert.message = 'Documento creado correctamente'
            setTimeout(() => {
                alert.value = false
            }, 3000)
        })
        .catch((err) => {
            alert.value = true
            alert.alertType = 'error'
            alert.message = err?.response?.data?.message ? err.response.data.message : 'Error al crear el documento'
            setTimeout(() => {
                alert.value = false
            }, 3000)
        })
}

const editarDocumentoClient = () => {
    updateDocumento({
        nombre: documento.nombre,
        contenido: documento.contenido,
        pro_procesos_id: documento.proceso,
        tip_tipo_docs_id: documento.tipoDoc
    }, props.documento.id)
        .then((res) => {
            alert.value = true
            alert.alertType = 'success'
            alert.message = 'Documento editado correctamente'
            setTimeout(() => {
                alert.value = false
            }, 3000)
        })
        .catch((err) => {
            alert.value = true
            alert.alertType = 'error'
            alert.message = err?.response?.data?.message ? err.response.data.message : 'Error al editar el documento'
            setTimeout(() => {
                alert.value = false
            }, 3000)
        })
}

const handleSubmit = () => {
    if (props.documento) {
        editarDocumentoClient()
    } else {
        crearDocumentoClient()
    }
}

getProcesosClient()
getTipoDocClient()

</script>

<template>
    <v-form>
        <v-text-field 
            v-model="documento.nombre"
            label="Nombre"
        />
        <v-textarea 
            v-model="documento.contenido"
            label="Contenido"
        />
        <v-select 
            v-model="documento.tipoDoc"
            :items="tipTipoDocs"
            item-title="nombre"
            item-value="id"
            label="Tipo de documento"
        />
        <v-select 
            v-model="documento.proceso"
            :items="proProcesos"
            item-title="nombre"
            item-value="id"
            label="Proceso"
        />
        <v-btn @click="handleSubmit">
            Guardar
        </v-btn>
        <AlertMessage v-model="alert.value" :message="alert.message" :alertType="alert.alertType" />
    </v-form>
</template>