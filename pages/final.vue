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
      <v-btn color="primary" class="mb-4" @click="goBack">
        Back
      </v-btn>
      <v-card class="pa-4">
        <v-card-title class="text-h4">Site Audit for: {{ report.website }}</v-card-title>
        <v-divider class="my-4"></v-divider>

        <v-row class="mb-4">
          <v-col cols="12" sm="6">
            <v-card outlined class="pa-4">
              <v-card-title class="text-h6">On-Page SEO Score</v-card-title>
              <v-card-subtitle>
                <v-progress-linear
                  v-model="report.onPageSeoScore"
                  color="blue-grey"
                  height="10"
                  rounded
                ></v-progress-linear>
                <p class="mt-2 text-h5 text-center"><strong>{{ report.onPageSeoScore }}%</strong></p>
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card outlined class="pa-4 h-100">
              <v-card-title class="text-h6">Organic Monthly Traffic</v-card-title>
              <v-card-subtitle>
                <p class="text-h5 text-center"><strong>{{ report.organicMonthlyTraffic.toLocaleString() }}</strong> visitors</p>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mb-4">
          <v-col cols="12" sm="6">
            <v-card outlined class="pa-4">
              <v-card-title class="text-h6">Organic Keywords</v-card-title>
              <v-card-subtitle>
                <p class="text-h5 text-center"><strong>{{ report.organicKeywords.toLocaleString() }}</strong> keywords</p>
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card outlined class="pa-4">
              <v-card-title class="text-h6">Backlinks</v-card-title>
              <v-card-subtitle>
                <p class="text-h5 text-center"><strong>{{ report.backlinks.toLocaleString() }}</strong> backlinks</p>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card outlined class="pa-4">
              <v-card-title class="text-h6">Load Time</v-card-title>
              <v-card-subtitle>
                <p class="text-h5 text-center"><strong>{{ report.loadTime }}</strong></p>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <v-card class="pa-4 mb-4">
          <v-card-title class="text-h6">SEO Issues Discovered</v-card-title>
          <v-card-subtitle>
            <ul>
              <li v-for="(issue, index) in report.seoIssuesDiscovered" :key="index">
                {{ issue }}
              </li>
            </ul>
          </v-card-subtitle>
        </v-card>

        <v-card outlined class="pa-4">
          <v-card-title class="text-h6">Total Pages Discovered</v-card-title>
          <v-card-subtitle>
            <p class="text-h5 text-center"><strong>{{ report.pagesDiscovered.toLocaleString() }}</strong> pages</p>
          </v-card-subtitle>
        </v-card>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isLoaded = ref(false)
const report = ref({})
const progress = ref(0)

const fetchAnswer = async () => {
  const answerValue = JSON.parse(decodeURIComponent(route.query.data)) || 'No answer provided'
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return answerValue
}

const setResult = (value) => {
  report.value = value
  isLoaded.value = true
}

const goBack = () => {
  router.back();
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


<style scoped>
.text-center {
  text-align: center;
}

.text-h5 {
  font-weight: bold;
}
</style>
