<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

const logOut = async () => {
    await store.dispatch('signOut')
    router.push('/')
}
</script>

<template>
    <v-app-bar>
        <v-btn to="/documentos/todos">
            Ver todos
        </v-btn>
        <v-btn to="/documentos/crear">
            Agregar
        </v-btn>
        <v-btn @click="logOut">
            Cerrar sesión
        </v-btn>
    </v-app-bar>
    <div class="my-6" />
    <router-view></router-view>
</template>