# Pharmacy Hub Sabot

> A centralized platform providing pharmacy tools and resources for Sabot Hospital's Pharmacy Department.

[![CI Quality](https://github.com/pharmacist-sabot/pharmacy-hub-sabot/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/pharmacist-sabot/pharmacy-hub-sabot/actions/workflows/ci.yml)
![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwindcss&logoColor=white)
![Firebase Hosting](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase&logoColor=black)

## Overview

Pharmacy Hub Sabot is a modern web application serving as a unified portal for pharmacy staff at Sabot Hospital. It provides quick access to various medical tools, calculators, and reporting dashboards to streamline daily pharmacy operations.

## Features

### Tools

| Tool                          | Description                                           | Status         |
| ----------------------------- | ----------------------------------------------------- | -------------- |
| **MedSafety Net**             | Medication error recording system                     | ✅ Active      |
| **Med Support Record**        | Record support medication values (TB drugs, vaccines) | ✅ Active      |
| **Warfarin Calculator**       | Dosage calculation tool for Warfarin                  | ✅ Active      |
| **Pediatric Dose Calculator** | Liquid medication dosing for pediatric patients       | ✅ Active      |
| **Document Download**         | Download pharmacy department documents                | ✅ Active      |
| **High-Alert Drugs List**     | Reference list of high-alert medications (HAD)        | ✅ Active      |
| **DrugTracker**               | Drug ordering and tracking system                     | ✅ Active      |
| **Hospital Drug List**        | Hospital formulary lookup                             | 🚧 Coming Soon |

### Reports

| Report                      | Description                               | Status         |
| --------------------------- | ----------------------------------------- | -------------- |
| **MedSafety Net Dashboard** | Medication error analytics and management | ✅ Active      |
| **Med Support Dashboard**   | Support medication value dashboard        | ✅ Active      |
| **Monthly Summary Report**  | Monthly operational summary               | 🚧 Coming Soon |
| **Stock Value Report**      | Drug inventory value tracking             | 🚧 Coming Soon |
| **OPD Drug Usage Report**   | Outpatient drug usage statistics          | 🚧 Coming Soon |

## Tech Stack

- **Framework:** [Vue.js 3](https://vuejs.org/) with Composition API and `<script setup>`
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide Vue Next](https://lucide.dev/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router 4](https://router.vuejs.org/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Utilities:** [@vueuse/core](https://vueuse.org/)
- **Hosting:** [Firebase Hosting](https://firebase.google.com/docs/hosting)

## Project Structure

```
pharmacy-hub-sabot/
├── src/
│   ├── assets/            # Static assets (CSS, images)
│   ├── components/
│   │   ├── common/        # Reusable UI components
│   │   └── layout/        # Layout components (Navbar, Footer)
│   ├── data/              # Static data and resources
│   ├── layouts/           # Page layout wrappers
│   ├── router/            # Vue Router configuration
│   ├── types/             # TypeScript type definitions
│   ├── views/             # Page components
│   ├── App.vue            # Root application component
│   └── main.ts            # Application entry point
├── tests/                 # Unit tests
├── .github/workflows/     # GitHub Actions CI/CD
└── firebase.json          # Firebase hosting configuration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/) >= 18

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pharmacist-sabot/pharmacy-hub-sabot.git
   cd pharmacy-hub-sabot
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view the application.

## Available Scripts

| Command                 | Description                      |
| ----------------------- | -------------------------------- |
| `bun run dev`           | Start development server         |
| `bun run build`         | Build for production             |
| `bun run preview`       | Preview production build locally |
| `bun run type-check`    | Run TypeScript type checking     |
| `bun run lint`          | Run ESLint for code linting      |
| `bun run lint:fix`      | Fix linting issues automatically |
| `bun run test:unit`     | Run unit tests with Vitest       |
| `bun run test:coverage` | Run tests with coverage report   |

## Code Quality

This project enforces high code quality standards through:

- **ESLint** with [@antfu/eslint-config](https://github.com/antfu/eslint-config) for consistent code style
- **TypeScript** for type safety
- **Husky** with **lint-staged** for pre-commit hooks
- **Commitlint** for conventional commit messages
- **Vitest** for unit testing

## CI/CD

The project uses GitHub Actions for continuous integration:

- **CI Quality Workflow** (`ci.yml`)
  - Linting and formatting checks
  - TypeScript type checking
  - Unit tests
  - Production build verification

- **Release Workflow** (`release.yml`)
  - Semantic versioning with [semantic-release](https://semantic-release.gitbook.io/)
  - Automated changelog generation
  - GitHub releases

## Deployment

The application is deployed to Firebase Hosting:

```bash
# Build for production
bun run build

# Deploy to Firebase
firebase deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and intended for use by Sabot Hospital Pharmacy Department.
