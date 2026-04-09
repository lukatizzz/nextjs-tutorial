# Next.js Shop — Full-Stack E-commerce Tutorial

A full-stack e-commerce application built with **Next.js 16**, **React 19**, and **TypeScript**. Features authentication, product management, and a persistent shopping cart.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript 5 |
| UI | React 19, shadcn/ui, Radix UI |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Theming | next-themes |
| Notifications | Sonner |
| Icons | Lucide React |

---

## Features

- **Authentication** — Register, login, logout with session token via cookies
- **Product listing** — Browse all products with image, name, price
- **Product management** — Create, edit, delete your own products
- **Shopping cart** — Add/remove items, adjust quantity, persistent via `localStorage`
- **Dark/light mode** — System-aware theme toggle
- **SSR + CSR** — Server-side rendering with seamless client hydration

---

## Project Structure

```
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page
│   │   └── register/       # Register page
│   ├── api/                # Internal API routes (proxy)
│   ├── products/
│   │   ├── page.tsx        # Product listing
│   │   ├── [id]/           # Product detail
│   │   ├── add/            # Add new product
│   │   ├── me/             # My products
│   │   └── cart/           # Shopping cart
│   │       └── components/ # Cart-specific components
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
│
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── app-provider.tsx    # Global state context (user, cart)
│   ├── header.tsx
│   ├── nav-menu.tsx
│   ├── product-card..tsx
│   ├── cart-button.tsx
│   └── ...
│
├── apiRequests/            # API client functions
├── schemaValidations/      # Zod schemas
└── lib/                    # Utilities, HTTP client
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running backend API (default: `http://localhost:4000`)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Environment

The app proxies API requests to a backend server. Configure the backend URL in [proxy.ts](proxy.ts) if needed.

---

## Key Implementation Notes

- **Cart persistence** — Cart state is stored in `localStorage` and rehydrated on the client. A `mounted` guard prevents SSR/CSR hydration mismatches.
- **Session management** — Session tokens are stored in HTTP-only cookies and forwarded to the backend via a Next.js proxy route.
- **Route protection** — Auth state is checked server-side in `layout.tsx` using `cookies()`.
- **Theme** — `next-themes` applies the user's preferred color scheme before React hydrates to avoid flash.
