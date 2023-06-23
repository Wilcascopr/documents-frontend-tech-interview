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
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Documentos</v-toolbar-title>
        <v-spacer></v-spacer>
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
    <v-spacer>
    </v-spacer>
    <router-view></router-view>
</template>