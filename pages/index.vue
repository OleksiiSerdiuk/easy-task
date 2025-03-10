<template>
  <v-container>
    <v-form ref="form" class="pa-4" v-model="isValid">
      <v-text-field v-model="hostname" label="Hostname" required />
      <v-btn
        :disabled="!isValid"
        color="primary"
        class="mt-4"
        @click="handleSubmit"
      >
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isValid = ref(true)
const hostname = ref('')
const router = useRouter()

const handleSubmit = async () => {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hostname: hostname.value}),
    })
    const result = await response.json()

    router.push({ path: '/final', query: { data: encodeURIComponent(JSON.stringify(result)) } })
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
