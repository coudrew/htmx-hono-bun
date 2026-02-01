import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { HomePage } from './components/HomePage'
import { ClickResult } from './components/ClickResult'
import { DynamicContent } from './components/DynamicContent'

const app = new Hono()

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './public' }))

// Click counter state (in a real app, you'd use a database)
let clickCount = 0

// Main route - serves the JSX page with HTMX
app.get('/', (c) => {
  return c.html(<HomePage />)
})

// API Routes
app.post('/api/click', (c) => {
  clickCount++
  return c.html(<ClickResult count={clickCount} />)
})

app.get('/api/content', (c) => {
  const randomFacts = [
    "HTMX allows you to access AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML.",
    "Hono is a lightweight, ultrafast web framework for the Edge.",
    "Bun is a fast all-in-one JavaScript runtime & toolkit designed for speed.",
    "This combination creates powerful, interactive web applications with minimal JavaScript.",
    "HTMX encourages a more server-centric approach to web development."
  ]

  const randomFact = randomFacts[Math.floor(Math.random() * randomFacts.length)]
  const timestamp = new Date().toLocaleTimeString()

  return c.html(<DynamicContent fact={randomFact} timestamp={timestamp} />)
})

app.post('/api/form', async (c) => {
  const body = await c.req.formData()
  const name = body.get('name') as string

  if (!name) {
    return c.html(
      <div style={{ color: 'red' }} class="fade-in">
        <p>Please enter a name!</p>
      </div>
    )
  }

  return c.html(
    <div style={{ color: 'green' }} class="fade-in">
      <p>Hello, {name}! Form submitted successfully.</p>
    </div>
  )
})

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// 404 handler
app.notFound((c) => {
  return c.html(
    <html>
      <head>
        <title>404 - Not Found</title>
        <style>{`
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        `}</style>
      </head>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/">Go back home</a>
      </body>
    </html>,
    404
  )
})

const port = process.env.PORT || 3000

console.log(`🚀 Server starting on port ${port}`)

export default {
  port,
  fetch: app.fetch,
}
