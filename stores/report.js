import { defineStore } from 'pinia'

export const useReportStore = defineStore('report', {
  state: () => ({
    report: null,
  }),
  actions: {
    setReport(data) {
      this.report = data
    },
    resetReport() {
      this.report = null
    },
  },
})
