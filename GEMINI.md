# GEMINI.md - Development Guide

## 🛠 Critical Commands
**CRITICAL:** Never run `npm` on your host machine. Always use the `node-util` container to ensure native modules (like `better-sqlite3`) are compiled for the Linux container environment.

### Package Management & Build
- **Install package:** `docker compose --profile util run --rm node-util npm install <package>`
- **Rebuild native modules:** `docker compose --profile util run --rm node-util npm rebuild better-sqlite3`
- **Build production:** `docker compose --profile util run --rm node-util npm run build`
- **Re-sync environment:** `docker compose build web && docker compose up -d`

### Dev & Quality Control
- **Start Dev Server:** `docker compose up` (Exposed at `http://localhost:3000`)
- **Lint Code:** `docker compose --profile util run --rm node-util npm run lint`
- **Type Check:** `docker compose --profile util run --rm node-util npx tsc --noEmit`
- **Database Studio:** `docker compose --profile util run --rm node-util npx drizzle-kit studio`

---

## 📦 Tech Stack
- **Framework:** Next.js 15+ (App Router, Server Components by default)
- **Styling:** Tailwind CSS v4 (Utility-first)
- **Database:** `better-sqlite3` (Local), Drizzle ORM
- **Security:** Cloudflare Turnstile (Bot protection)
- **Animations:** Framer Motion

---

## 🎨 Code Style & Examples

### React Components
Use TypeScript, functional components, and Tailwind v4. Prefer Server Components.
```tsx
// src/components/Example.tsx
import { db } from "@/lib/db";

export default async function ServerComponent() {
  const data = await db.query.posts.findMany(); // Drizzle query
  
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {data.map(item => (
        <div key={item.id} className="rounded-xl border border-zinc-200 p-4">
          <h2 className="text-xl font-bold text-zinc-900">{item.title}</h2>
        </div>
      ))}
    </section>
  );
}
```

### Drizzle Schema
```typescript
// src/lib/db.ts example
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
});
```

---

## 📂 Project Structure
- `app/` - Next.js App Router (Pages & API)
- `src/components/` - UI components (Atomic/Reusable)
- `src/lib/` - DB config, Drizzle schemas, shared utils
- `public/` - Static assets
- `compose.yaml` - Docker infrastructure

---

## 🚦 Boundaries & Rules
- ✅ **Always:** Use `--profile util` for any `npm` or `npx` command.
- ✅ **Always:** Organize Tailwind classes: Layout → Typography → Interactive states.
- ✅ **Always:** Write site's content in polish language.
- ⚠️ **Ask first:** Before changing database engines or modifying `compose.yaml`.
- 🚫 **Never:** Run `npm install` on the host OS (breaks `better-sqlite3` bindings).
- 🚫 **Never:** Commit `.env` or `.env.local` files.
- 🚫 **Never:** Use `docker exec` on the `web` container for package management.

---

## 🌲 Git Workflow
1. **Branching:** `feature/description` or `fix/description`.
2. **Commits:** Conventional commits (e.g., `feat: add turnstile validation`, `fix: build error in docker`).
3. **Dependencies:** If `package.json` changes, immediately run `docker compose build web`.