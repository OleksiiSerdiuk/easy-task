<template>
  <v-container>
    <v-form ref="form" class="pa-4" v-model="isValid" @submit.prevent="handleSubmit">
      <v-text-field
        v-model="hostname"
        label="Hostname"
        required
      />
      <v-btn
        :disabled="!isValid || !hostname"
        color="primary"
        class="mt-4"
        type="submit"
      >
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from '#app'
import { useReportStore } from '@/stores/report'

const router = useRouter()
const reportStore = useReportStore()

const form = ref(null)
const isValid = ref(false)
const hostname = ref('')

const handleSubmit = async () => {
  try {
    const isFormValid = form.value?.validate()
    if (!isFormValid) {
      console.warn('Form validation failed.')
      return
    }

    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hostname: hostname.value }),
    })

    const result = await response.json()
    reportStore.setReport(result)
    router.push({ path: '/final' })
  } catch (error) {
    console.error('Error:', error)
  }
}

const resetState = () => {
  hostname.value = ''
  isValid.value = false
  form.value?.reset()
}

onMounted(() => {
  resetState()
})
</script>
