<script setup>
import { reactive, ref, watch } from 'vue';
import { getTipoDocs, getProcesos, getDocumentos, deleteDocumento } from '@/services/api/backend.js'
import AlertMessage from '@/components/AlertMessage.vue'
import Menu from '@/components/Menu.vue'

const searchFilters = reactive({
  tipoDoc: null,
  proceso: null,
  search: null
})
const tipTipoDocs = ref([])
const proProcesos = ref([])
const documentos = ref([])
const alert = reactive({
  message: '',
  alertType: '',
  value: false
})
const loader = ref(true)
const headersDocumentos = ref([
    {
        name: 'Nombre',
    },
    {
        name: 'Código',
    },
    {
        name: 'Proceso',
    },
    {
        name: 'Tipo de documento',
    },
    {
        name: ''
    }
])

watch(searchFilters, () => {
    setTimeout(() => {
        getDocumentosClient()
    }, 350);
}, { deep: true })

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

const getDocumentosClient = () => {
    loader.value = true
    getDocumentos(searchFilters)
        .then((res) => {
            documentos.value = res.data
        })
        .catch((err) => {
            alert.value = true
            alert.alertType = 'error'
            alert.message = err?.response?.data?.message ? err.response.data.message : 'Error al obtener los documentos'
            setTimeout(() => {
                alert.value = false
            }, 3000)
        })
        .finally(() => {
            loader.value = false
        })
}

const deleteDocumentoClient = (id) => {
    deleteDocumento(id)
        .then(() => {
            alert.value = true
            alert.alertType = 'success'
            alert.message = 'Documento eliminado correctamente'
            getDocumentosClient()
        })
        .catch((err) => {
            alert.value = true
            alert.alertType = 'error'
            alert.message = err?.response?.data?.message ? err.response.data.message : 'Error al eliminar el documento'
        })
        .finally(() => {
            setTimeout(() => {
                alert.value = false
            }, 3000)
        })
}

getTipoDocClient();
getProcesosClient();
getDocumentosClient();

</script>

<template>
  <main>
    <v-container>
        <h1>Filtrar documentos</h1>
        <v-col>
            <v-text-field
                v-model="searchFilters.search"
                label="Buscar por nombre"
                type="text" 
            />
            <v-select 
                v-model="searchFilters.tipoDoc"
                :items="tipTipoDocs"
                item-title="nombre"
                item-value="id"
                label="Tipo de documento"
            />
            <v-select 
                v-model="searchFilters.proceso"
                :items="proProcesos"
                item-title="nombre"
                item-value="id"
                label="Proceso"
            />
        </v-col>
        <v-col>
            <v-table
                fixed-header
                height="300px"
            >
                <thead>
                    <tr class="text-left"> 
                        <div>
                            <h3>Documentos</h3> 
                        </div>
                    </tr>
                    <tr>
                        <th 
                            v-for="item, index in headersDocumentos"
                            :key="index"
                            class="text-left"
                        >
                            {{ item.name }}
                        </th>
                    </tr>
                </thead>
                <tbody v-if="documentos.length">
                    <tr
                        v-for="item, index in documentos"
                        :key="index"
                    >
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.codigo }}</td>
                        <td>{{ item.pro_proceso.nombre }}</td>
                        <td>{{ item.tip_tipo_doc.nombre }}</td>
                        <td>
                            <Menu
                                :items="[
                                { title: 'Ver detalles', link: `/documentos/ver/${item.id}` },
                                { title: 'Editar', link: `/documentos/editar/${item.id}` },
                                { title: 'Eliminar', event: 'deleteItem' },]" 
                                @deleteItem="deleteDocumentoClient(item.id)" 
                            />
                        </td>
                    </tr>
                </tbody>
                <tbody v-else-if="loader">
                    cargando...
                </tbody>
                <tbody v-else>
                    no se encontraron resultados
                </tbody>
            </v-table>
        </v-col>
    </v-container>
    <AlertMessage v-model="alert.value" :message="alert.message" :alertType="alert.alertType" />
  </main>
</template>
