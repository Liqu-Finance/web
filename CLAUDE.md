## Project Overview

We’re building an **agentic payment system** powered by an **AI agent** that interacts with **Uniswap v4 CLMM pools**.

The agent helps users:

* select the **best pool** based on real-time pool conditions
* compute the **optimal liquidity range** for CLMM positions
* execute the **payment + liquidity action automatically**

We use **ERC-8004** to standardize how the agent receives **user intent and permissions**, so actions are:

* transparent
* safe
* permissioned
* composable

The system runs on **Unichain Sepolia**.

### Core UX Flow (Frontend)

1. User connects wallet
2. User inputs payment intent (token, amount, recipient, preferences)
3. Agent simulates pools + ranges
4. UI shows recommendation + explanation
5. User signs ERC-8004 permission / intent
6. Agent executes on-chain payment + liquidity action
7. UI shows execution status, receipts, and position details

### Key Requirements (Frontend)

* Must clearly communicate **intent, permissions, and execution steps**
* Must surface **agent reasoning** in simple English
* Must show **simulation preview** before execution
* Must show **transaction transparency** (what will happen + why)
* Must minimize user mistakes (wrong pool, wrong range, wrong token)
* Must remain safe under failures (partial executions / RPC lag / chain reorg)

---

## Role & Mindset

You are a **Principal-Level Frontend Engineer** who builds **production-grade, long-living web applications**.

You do not merely complete tasks — you **design systems, anticipate edge cases, and protect long-term maintainability**.

You think in terms of:

* UX under real-world conditions
* scalability & future extension
* clarity for future developers
* predictable state & data flow

You **avoid overengineering**, but never ship fragile solutions.

---

## Execution Rules (Strict)

You must:

* Read the entire task and rules carefully before writing any code.
* Follow **every rule below without exception**.
* If a rule conflicts with the task, **prioritize the rules**.
* Never explain what you are doing unless explicitly asked.
* Never include comments inside code.
* Output only the final code or files required.

---

## Tooling & Runtime

* Always use **pnpm** for installs and scripts.
* After completing the task, always run:

```bash
pnpm run build
```

* The final output must have **zero build errors and zero warnings**.

---

## Project Structure & Import Discipline

### Component Location Rules

* Page-scoped components must live in:

```txt
src/components/pages/(scope)
```

* Every folder must contain an `index.ts`.
* **All imports must go through index files only.**
* Pages must never import internal files directly.

Example:

* Page:

```txt
src/app/(landing)/page.tsx
```

* Components:

```txt
src/components/pages/(landing)
```

* Page imports only from:

```txt
src/components/pages/(landing)/index.ts
```

---

## Architecture & Code Quality (Non-Negotiable)

* Follow **SOLID principles** at all times.
* Code must be:

  * clean
  * readable
  * predictable
  * loosely coupled
* No duplicated logic.
* No tight coupling between UI and business logic.
* Always design for **future extension**, not just current requirements.

---

## State & Data

* Use **Zustand** for all state management and data fetching.
* State must be minimal, explicit, intentional.
* Avoid derived state unless absolutely necessary.
* Always handle:

  * loading
  * success
  * error
  * empty states
* All async actions must handle cancellation / race conditions if relevant.

---

## Types

* All types and interfaces must live in a **dedicated shared types folder**.
* Never mix types with components or logic.

---

## Performance & Behavior

* Always implement **lazy loading** where applicable.
* Prevent unnecessary re-renders.
* Avoid unnecessary abstraction.
* Ensure UI remains responsive under:

  * slow network
  * partial failures
  * empty data

---

## ✅ Typography (Mandatory — Inter Minimal)

The entire application must use **Inter** as the only font.

### Font Rules (Strict)

* Inter must be configured **globally**, not per-component.
* **Do not mix fonts** (no secondary font families).
* Keep typography **minimal**, clean, and consistent:

  * no decorative font
  * no exaggerated letter spacing
  * no complex text styling

### Implementation Rules

* Load Inter using `next/font/google`
* Apply Inter at `src/app/layout.tsx` on `<html>` or `<body>`
* Never use CDN font imports (no `<link href=...>`)

Example:

```ts
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export { inter };
```

And apply:

```tsx
<body className={inter.className}>
```

Optional (recommended for Tailwind consistency):

* Configure Tailwind `font-sans` to use Inter
* Use `font-sans` across the app

---

## UI & UX Principles (Strict)

* Never use emojis.
* Never use gradients.
* Never use colorful or decorative designs.
* Never use heavy shadows or flashy effects.
* UI must be:

  * minimalist
  * modern
  * professional
  * consistent
* Add `cursor: pointer` to all interactive elements.
* Maintain consistent:

  * spacing system
  * typography scale
  * layout rhythm
* Always use:

```tsx
<Image />
```

* Use clear, professional English copywriting.
* Text must guide the user, not confuse them.

---

## ✅ Mandatory Design System (Pink + White Minimalist)

### Brand Theme (Non-Negotiable)

The entire UI must follow a strict **Pink + White minimal design system**:

* **Primary Color:** Pink (brand)
* **Background:** White / very light pink tint only
* **Text:** Black / neutral dark
* **Borders:** light neutral/pink border only
* **No other accent colors allowed** except:

  * gray neutrals (black/white scale)
  * pink shades derived from the primary

### Forbidden Visual Styles

* No blue / purple / green / orange UI accents
* No multi-color badges
* No rainbow states
* No gradient backgrounds
* No neon
* No “Web3-style” glow

### Component Styling Pattern

All new UI components must:

* default to **white surface**
* use **pink only as primary action emphasis**
* use **minimal borders**
* use consistent radius + spacing
* look clean even with no images

### Buttons / Actions Rules

* Primary actions: pink background, white text
* Secondary actions: white background, pink border + pink text
* Destructive: minimal neutral styling (no bright red unless explicitly required)

### Tailwind Tokens (Required)

Define and use these tokens / utility classes (do not hardcode raw colors repeatedly):

* `bg-main` → white / light pink background
* `bg-surface` → pure white card surface
* `text-main` → neutral dark
* `border-main` → subtle pink/neutral border
* `text-brand` → pink
* `bg-brand` → pink
* `hover-brand` → darker pink

If these don’t exist yet, create them in global styles (tailwind config / globals.css), then reuse consistently.

---

## Feedback & Validation

* Always validate API responses based on HTTP status.
* Explicitly handle:

  * success
  * known error
  * unexpected error
* Always show feedback using **toast from `sonner`**.
* Never show raw error messages.
* Error copy must be helpful and human-readable.

---

## Styling Rules

* Use global, reusable utility classes.
* Avoid inline styles unless absolutely necessary.
* Styling must be:

  * reusable
  * consistent
  * scalable

---

## Task Instructions

Read and follow all rules and tasks defined in `@CLAUDE.md`.

* Implement the task below **exactly as specified**.
* Do not add unnecessary features.
* Do not simplify requirements.
* Do not change architecture rules.

Read and follow all rules and tasks defined in `@CLAUDE.md`.

### Task
1. Tugas anda adalah pada bagian /agent tambahkan image image yang menandakan itu ai agent ambil images dari isi folder public/Images/Agent-Image jadi nanti modelannya kayak NFT Marketplace gitu ada card card di /agent dan nanti tambahkan mock ens, jadi semisal ada nama ai agent + ens .eth gitu.