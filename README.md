# HTMX and Hono on a Bun

A modern web application built with HTMX for dynamic frontend interactions, Hono's type-safe JSX components for server-side rendering, and Bun as the JavaScript runtime.

## Features

- 🚀 **Fast**: Built with Bun for lightning-fast performance
- 🪶 **Lightweight**: Hono provides minimal overhead
- ⚡ **Interactive**: HTMX enables dynamic interactions without heavy JavaScript
- 📦 **TypeScript**: Full TypeScript support for better development experience
- 🎨 **Clean**: Modern, responsive UI with CSS animations

## Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) (v1.0.0 or later)

## Installation

1. Clone or navigate to the project directory
2. Install dependencies:

```bash
bun install
```

## Usage

### Development

Start the development server with hot reload:

```bash
bun run dev
```

The server will start on `http://localhost:3000`

### Production

Build and start the production server:

```bash
bun run build
bun run start
```

## Project Structure

```
htmx/
├── src/
│   ├── index.tsx         # Main server file with Hono JSX routes
│   └── views/            # HTML templates (for future expansion)
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.json        # ESLint rules
├── .prettierrc           # Prettier formatting
└── README.md             # This file
```

## Available Endpoints

### Web Pages
- `GET /` - Main application page with HTMX examples

### API Endpoints
- `POST /api/click` - Increment click counter
- `GET /api/content` - Load dynamic content
- `POST /api/form` - Handle form submissions
- `GET /health` - Health check endpoint

## Features Demonstrated

### 1. Click Counter
Interactive button that updates the click count without page reload.

### 2. Dynamic Content Loading
Load random facts dynamically with smooth animations.

### 3. Form Handling
Submit forms asynchronously with validation and feedback.

### 4. CSS Animations
Smooth fade-in animations using CSS and HTMX.

## Technologies Used

- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[Hono](https://hono.dev/)** - Lightweight web framework
- **[HTMX](https://htmx.org/)** - High power tools for HTML
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## JSX Configuration

This project uses Hono's built-in JSX support for type-safe, server-side rendered components:

### Key Configuration Points

- **File Extensions**: JSX components use `.tsx` extension
- **TypeScript Config**: Configured with `"jsx": "react-jsx"` and `"jsxImportSource": "hono/jsx"`
- **No React Dependency**: Uses Hono's JSX implementation, not React
- **HTMX Attributes**: Full support for HTMX attributes in JSX (e.g., `hx-get`, `hx-post`)

### JSX Syntax Notes

- Use `class` instead of `className` for CSS classes
- HTMX attributes work directly: `<button hx-post="/api/endpoint">Click</button>`
- Components are simple functions returning JSX elements
- Props are typed with TypeScript interfaces
- No need to import `React` or use `FC` types

### Example Component

```typescript
interface ButtonProps {
  endpoint: string;
  children: string;
}

export const HTMXButton = ({ endpoint, children }: ButtonProps) => {
  return (
    <button hx-post={endpoint} hx-target="#result" class="btn-primary">
      {children}
    </button>
  );
};
```

## Development Scripts

```bash
# Development with hot reload
bun run dev

# Production build
bun run build

# Start production server
bun run start

# Lint code
bun run lint

# Format code
bun run format
```

## HTMX Concepts Demonstrated

- **hx-get/hx-post**: Making HTTP requests
- **hx-target**: Specifying where to insert responses
- **hx-trigger**: Customizing when requests are made
- **hx-indicator**: Showing loading states
- **CSS Animations**: Smooth transitions with HTMX

## Extending the Project

### Adding New Routes

Add routes to `src/index.tsx`:

```typescript
import { NewComponent } from './components/NewComponent'

app.get('/new-route', (c) => {
  return c.html(<NewComponent />)
})
```

### Adding Static Files

Place files in the `public/` directory and they'll be served at `/static/*`.

### Database Integration

For persistent data, consider adding:
- SQLite with Bun's built-in SQLite support
- PostgreSQL with a client like `postgres`
- Or any database of your choice

### JSX Component Tips

- Use TypeScript interfaces for prop validation
- Leverage HTMX attributes directly in JSX (`hx-get`, `hx-post`, etc.)
- Create reusable layout components for consistent styling
- Utilize the `class` attribute (not `className`) for CSS classes in Hono JSX
- Components are functions that return JSX, no need for `FC` type imports

## Performance Notes

This setup is optimized for:
- Fast cold starts with Bun
- Minimal JavaScript bundle size
- Server-side rendering with dynamic updates
- Low memory usage with Hono

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `bun run lint` and `bun run format`
5. Submit a pull request

## License

MIT License - feel free to use this project as a template for your own applications.
