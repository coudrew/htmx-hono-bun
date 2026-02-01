import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { html } from 'hono/html'

const app = new Hono()

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './public' }))

// Main route - serves the HTML page with HTMX
app.get('/', (c) => {
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>HTMX + Hono + Bun</title>
      <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          line-height: 1.6;
        }
        .container {
          background: #f4f4f4;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        button {
          background: #007cba;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          margin: 5px;
        }
        button:hover {
          background: #005a87;
        }
        .loading {
          opacity: 0.6;
        }
        .fade-in {
          animation: fadeIn 0.5s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      </style>
    </head>
    <body>
      <h1>Welcome to HTMX + Hono + Bun!</h1>

      <div class="container">
        <h2>Click Counter</h2>
        <button
          hx-post="/api/click"
          hx-target="#click-result"
          hx-indicator="#loading">
          Click me!
        </button>
        <div id="loading" class="htmx-indicator">Loading...</div>
        <div id="click-result">
          <p>Clicks: 0</p>
        </div>
      </div>

      <div class="container">
        <h2>Dynamic Content</h2>
        <button
          hx-get="/api/content"
          hx-target="#dynamic-content"
          hx-trigger="click"
          class="fade-in">
          Load Content
        </button>
        <div id="dynamic-content">
          <p>Click the button to load dynamic content</p>
        </div>
      </div>

      <div class="container">
        <h2>Form Example</h2>
        <form hx-post="/api/form" hx-target="#form-result">
          <input type="text" name="name" placeholder="Enter your name" required>
          <button type="submit">Submit</button>
        </form>
        <div id="form-result"></div>
      </div>
    </body>
    </html>
  `)
})

// Click counter state (in a real app, you'd use a database)
let clickCount = 0

// API Routes
app.post('/api/click', (c) => {
  clickCount++
  return c.html(`<p class="fade-in">Clicks: ${clickCount}</p>`)
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

  return c.html(`
    <div class="fade-in">
      <h3>Dynamic Fact</h3>
      <p>${randomFact}</p>
      <small>Generated at: ${new Date().toLocaleTimeString()}</small>
    </div>
  `)
})

app.post('/api/form', async (c) => {
  const body = await c.req.formData()
  const name = body.get('name') as string

  if (!name) {
    return c.html(`
      <div style="color: red;" class="fade-in">
        <p>Please enter a name!</p>
      </div>
    `)
  }

  return c.html(`
    <div style="color: green;" class="fade-in">
      <p>Hello, ${name}! Form submitted successfully.</p>
    </div>
  `)
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
  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>404 - Not Found</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
      </style>
    </head>
    <body>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go back home</a>
    </body>
    </html>
  `, 404)
})

const port = process.env.PORT || 3000

console.log(`🚀 Server starting on port ${port}`)

export default {
  port,
  fetch: app.fetch,
}
