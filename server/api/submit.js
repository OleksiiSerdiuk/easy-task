export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { hostname } = body

  console.log('Data received:', { hostname })

  // Mock
  // Replace the following mock object with a real API call
  // Suggestion for ChatGPT prompt:
  //  - On-page SEO Score
  //  - Organic Monthly Traffic
  //  - Organic Keywords
  //  - Backlinks
  //  - Load Time
  //  - Major SEO Issues Discovered
  //  - Total Pages Discovered`

  // Replace below mock with ChatGPT or real analysis output
  const mockResponse = {
    website: hostname,
    onPageSeoScore: 78, // In percentage
    organicMonthlyTraffic: 15000, // Approx
    organicKeywords: 320,
    backlinks: 125,
    loadTime: '1.8s',
    seoIssuesDiscovered: [
      'Missing meta descriptions on 15 pages',
      'Page titles too long on 5 pages',
      'Broken links detected on 3 pages',
    ],
    pagesDiscovered: 134,
  }

  return mockResponse
})
