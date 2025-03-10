<template>
  <v-container>
    <div v-if="!isLoaded">
      <v-progress-linear
        v-model="progress"
        color="blue-grey"
        height="25"
      >
        <template v-slot:default="{ value }">
          <strong>{{ Math.ceil(value) }}%</strong>
        </template>
      </v-progress-linear>
      <p>Loading... Please wait</p>
    </div>
    <div v-else>
      <h1>The answer is: {{ answer }}</h1>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoaded = ref(false)
const answer = ref('')
const progress = ref(0)

const fetchAnswer = async () => {
  const answerValue = route.query.answer || 'No answer provided'
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return answerValue
}

const setResult = (value) => {
  answer.value = value
  isLoaded.value = true
}

onMounted(async () => {
  const interval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += 10
    }
  }, 200)

  try {
    const answerValue = await fetchAnswer()
    clearInterval(interval)
    progress.value = 100
    setResult(answerValue)
  } catch (error) {
    console.error('Error:', error)
    clearInterval(interval)
    progress.value = 100
    setResult('Error fetching the answer')
  }
})
</script>
