# 🖥️ Varun's Portfolio

**Live Demo:** [singhvarun.com](https://singhvarun.com)

A 3D interactive portfolio built with React, Three.js, and Framer Motion — featuring a MacBook simulation that lets visitors browse the full portfolio experience inside a rendered 3D screen.

## ✨ Features

- 🖥️ **3D MacBook Simulation** — Interactive Three.js model with a live browser screen rendered inside
- 🌐 **Full Portfolio Inside** — Sections for About, Projects, Skills, and Contact rendered within the 3D display
- 📧 **Contact Form** — EmailJS-powered form with auto-reply support
- 🗄️ **Supabase Backend** — Message storage via Supabase
- 🎞️ **Smooth Animations** — Framer Motion & GSAP for transitions and scroll choreography
- 📱 **Responsive Design** — Works across desktop and mobile layouts

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| 3D Rendering | Three.js, React Three Fiber, Drei |
| Animations | Framer Motion, GSAP |
| Styling | Tailwind CSS, shadcn/ui |
| Backend | Supabase |
| Email | EmailJS |
| Forms | React Hook Form + Zod |
| Routing | React Router DOM |

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or bun

### 1. Clone the repo

```bash
git clone https://github.com/varun-s20/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Set up environment variables

Copy the example env file and fill in your keys:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS contact template ID |
| `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID` | EmailJS auto-reply template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── Macbook3D.tsx        # Three.js 3D MacBook model
│   ├── BrowserScreen.tsx    # Browser chrome rendered inside the 3D screen
│   ├── ScreenContent.tsx    # Portfolio content (About, Projects, Skills, Contact)
│   ├── Navbar.tsx           # Navigation bar with scroll tracking
│   ├── NavLink.tsx          # Individual nav link component
│   ├── ContactForm.tsx      # EmailJS contact form
│   └── ui/                  # shadcn/ui component library
├── pages/
│   ├── Index.tsx            # Main landing page
│   └── NotFound.tsx         # 404 page
├── hooks/                   # Custom React hooks
├── integrations/            # Supabase client setup
└── lib/                     # Utility functions
```

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🔐 Environment & Security

- **Never commit `.env`** — it is listed in `.gitignore`
- All environment variables must be prefixed with `VITE_` to be accessible in the browser

## 📄 License

This project is personal portfolio work. Feel free to use it as inspiration, but please don't directly copy and deploy it as your own.
