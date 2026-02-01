import { Layout } from './Layout';

export const HomePage = () => {
  return (
    <Layout title="HTMX + Hono + Bun">
      <h1>Welcome to HTMX + Hono + Bun!</h1>

      <div class="container">
        <h2>Click Counter</h2>
        <button hx-post="/api/click" hx-target="#click-result" hx-indicator="#loading">
          Click me!
        </button>
        <div id="loading" class="htmx-indicator">
          Loading...
        </div>
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
          class="fade-in"
        >
          Load Content
        </button>
        <div id="dynamic-content">
          <p>Click the button to load dynamic content</p>
        </div>
      </div>

      <div class="container">
        <h2>Form Example</h2>
        <form hx-post="/api/form" hx-target="#form-result">
          <input type="text" name="name" placeholder="Enter your name" required />
          <button type="submit">Submit</button>
        </form>
        <div id="form-result"></div>
      </div>
    </Layout>
  );
};
