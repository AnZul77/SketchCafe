# VICOLO: The Architectural Sketchbook Cafe

Vicolo is a high-fidelity web application built to translate the tactile, hand-drawn aesthetic of an architectural sketchbook into an immersive digital environment. Every element is designed with a **"Zero Deviation"** mandate, prioritizing the imperfect charm of charcoal lines and ink-washed paper over standard digital clean-lines.

---

## 🚀 Recent Expansion: The Reactive Platform
Vicolo has transitioned from a static sketchbook into a **fully functional cafe platform** featuring:
- **Member-First Identity**: A mandatory "Passport" login engine.
- **Tactile Receipt Engine**: A high-fidelity cart and checkout system.
- **Real-Time Status Tracking**: Live order progression (Brewing → Plating → Served).
- **Localized Table Ordering**: A transition from delivery to alley-based table assignment.

---

## 🛠️ Technical Stack

- **Framework**: [React](https://react.dev/) 19 via [Vite](https://vitejs.dev/)
- **State Management**: **React Context API** (`AppContext.jsx`) for Cart, Auth, and Orders.
- **Security**: **AuthGuard** middleware for route protection.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Custom Design Tokens)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Status bars, transitions)
- **Routing**: [React Router DOM](https://reactrouter.com/) (Seamless SPA navigation)
- **Asset Pipeline**: High-fidelity AI-generated Graphite/Charcoal sketches from `/public/assets/`

---

## 🎨 Design System & Aesthetics

### The "Anti-Digital" Mandate
The project utilizes custom SVG filters and CSS masks defined in `src/index.css`:
- **`rough-border`**: Irregular, hand-drawn ink outlines for containers and buttons.
- **`deckle-edge`**: Frayed, organic paper edges (used on `DeckleCard`).
- **`sketch-line`**: Underlines mimicking quick charcoal strokes.

### Color Palette
- **Paper (#FBF9F4)**: Primary textured ivory wash background.
- **Ink (#1B1C19)**: Deep charcoal for text and borders.
- **Ochre (#E3A032)**: Sun-drenched accent for emphasis and active states.

---

## 📖 Global Architecture

### 1. The Global State (`src/context/AppContext.jsx`)
The "Ink Engine" of the site, managing:
- **Cart**: Real-time quantity management and total calculations.
- **Auth**: Tracking the "Vicolo Passport" (User sessions).
- **Reservations**: Persistent booking history.
- **Orders**: Reactive status tracking for active meals.

### 2. The Auth Guard (`src/components/AuthGuard.jsx`)
A security wrapper that enforces a "Passport-First" entry. Protected routes:
- `/menu`, `/reservations`, `/cart`, `/checkout`, `/profile`.

---

## 🗺️ Page Inventory & Component Usage

### 1. Home (`/`)
- **Arrival**: Multi-layered parallax hero (depth interaction).
- **Story**: Dual-column architectural origins.

### 2. Menu (`/menu`) — *Auth Required*
- **Notebook**: Category-based layouts for Espresso, Brewed, and signature bites.
- **Interaction**: "Add to Order" with a floating **Receipt Badge**.

### 3. The Receipt (`/cart`) — *Auth Required*
- **Layout**: A full-page Roman receipt style on a `DeckleCard`.
- **Logic**: Dynamic quantity adjustment (remove-on-zero enabled).

### 4. Inscription (`/checkout`) — *Auth Required*
- **Table Order**: Transitioned to localized "Table Corner" selection (T-01 to T-15).
- **Automation**: Pre-filled member identity (no redundant data entry).

### 5. Member Journal (`/profile`) — *Auth Required*
- **The Feed**: A personal log tracking active reservations and the **Live Order Status**.
- **Progression**: Visual status bar (Brewing → Plating → Served) updating every 15s.

### 6. Reservations (`/reservations`) — *Auth Required*
- **The Logbook**: Centered inscription form with personalized member badges.

### 7. About & Gallery (`/about`, `/journal`) — *Public Access*
- **Asymmetrical Bento**: Representing the "Alley Chronicles".
- **Signature Sketches**: Cornetto, Bruschetta, and Roman Windows.

---

## 🧩 Component Mapping

| Component | Purpose | Technical Logic |
| :--- | :--- | :--- |
| `DeckleCard` | Frayed paper container | Framer Motion entrance + CSS mask |
| `RoughInkBorder` | Hand-drawn ink outlines | SVG Filter (`#rough-ink`) application |
| `AuthGuard` | Route Protection | Redirects to `/login` if `user` is null |
| `ScrollToTop` | Navigation UX | Clears scroll state on route change |
| `Navbar` | Reactive Navigation | Cart badge (Context Count) + Passport Link |

---

## 🏗️ The Trio: HTML, CSS, & JavaScript Roles

1. **HTML (Structure)**: Semantic hierarchy for "sketchbook chapters".
2. **CSS (Soul)**: Hand-drawn textures, grain filters, and HSL-tailored colors.
3. **JavaScript (Engine)**: Global state orchestration, HMR for status tracking, and physics-based motion.

---
**Lead Architect**: Antigravity (Advanced Agentic Coding)
**Aesthetic Goal**: Immersive, tactile, and strictly non-generic.
