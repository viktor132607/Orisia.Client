# Orisia Next.js FE

Static Next.js export client configured to connect to the matching ASP.NET Core Web API backend.

## Frontend styling rule

**Tailwind CSS is mandatory for all frontend styling in this repository.**

- Use Tailwind utility classes for components, pages, layouts, responsive behavior, light/dark themes and state styling.
- Do not add CSS Modules or page/component-specific `.css` files.
- Do not add `styled-jsx`, CSS-in-JS, or React inline style objects for normal UI styling.
- `src/app/globals.css` is reserved only for Tailwind directives and minimal global/base utilities that cannot reasonably live in component class names.
- New UI work and refactors must preserve this Tailwind-only rule.

## Local run

```bash
npm install
npm run dev
```

Local API env:

```env
NEXT_PUBLIC_API_URL=http://localhost:10000/api
```

## Static build

```bash
npm run build
```

Output folder:

```txt
out
```

## Render Static Site

Build command:

```bash
npm install && npm run build
```

Publish directory:

```txt
out
```

Environment variable:

```env
NEXT_PUBLIC_API_URL=https://orisia-api.onrender.com/api
```

This FE is configured for Render Static Site and does not use API routes, SSR, middleware, server actions, or optimized `next/image`.
