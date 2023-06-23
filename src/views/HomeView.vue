<script setup>
import { reactive } from 'vue';
import { logIn } from '@/services/api/auth.js'
import AlertMessage from '@/components/AlertMessage.vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

const store = useStore()
const user = reactive({
  email: '',
  password: ''
})
const alert = reactive({
  message: '',
  alertType: '',
  value: false
})
const router = useRouter()

const login = () => {
  logIn(user)
    .then(() => {
      router.push('/documentos')
    })
    .catch((err) => {
      alert.value = true
      alert.alertType = 'error'
      alert.message = err?.response?.data?.message ? err.response.data.message : 'Error al iniciar sesion'
      setTimeout(() => {
        alert.value = false
      }, 3000)
    })
}

</script>

<template>
  <main>
    <v-container>
      <v-col align="center">
        <h3 class="my-2">
          Log in
        </h3>
        <v-text-field
          v-model="user.email"
          label="Correo electronico"
          type="email"
        />
        <v-text-field
          v-model="user.password"
          label="Contraseña"
          type="password"
        />
        <v-btn @click="login" :disabled="user.email === '' || user.password === ''" class="mx-auto">
          Iniciar sesion
        </v-btn>
      </v-col>
    </v-container>
    <AlertMessage v-model="alert.value" :message="alert.message" :alertType="alert.alertType" />
  </main>
</template>
