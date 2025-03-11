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
      <v-card v-if="report" class="pa-4">
        <v-card-title class="text-h4">Site Audit: {{ report.website }}</v-card-title>
        <v-divider class="my-4"></v-divider>

        <v-row>
          <v-col cols="12" sm="6">
            <v-card outlined class="pa-4">
              <v-card-title class="text-h6">SEO Score</v-card-title>
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
              <v-card-title class="text-h6">Monthly Traffic</v-card-title>
              <v-card-subtitle>
                <p class="text-h5 text-center"><strong>{{ report.organicMonthlyTraffic }}</strong></p>
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
            <p class="text-h5 text-center"><strong>{{ report.pagesDiscovered }}</strong> pages</p>
          </v-card-subtitle>
        </v-card>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from '#app'
import { useReportStore } from '@/stores/report'

const router = useRouter()
const reportStore = useReportStore()

const isLoaded = ref(false)
const report = ref(reportStore.report || null)
const progress = ref(0)

const goBack = () => {
  reportStore.resetReport()
  router.push('/')
}

onMounted(() => {
  if (!reportStore.report) {
    console.error('No report found.')
    router.push('/') // Redirect if no report
    return
  }

  const interval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += 10
    }
  }, 200)

  setTimeout(() => {
    clearInterval(interval)
    progress.value = 100
    isLoaded.value = true
  }, 2000)
})
</script>
